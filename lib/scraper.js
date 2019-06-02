import axios from 'axios';
import cheerio from 'cheerio';
import { getDB } from './db';

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}
export async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data().count;
}
export async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}
export async function getInstagramCount() {
  const html = await getHTML('htpps://www.instagram.com/burakzeytinci');
  const insCount = await getInstagramFollowers(html);
  return insCount;
}
export async function getTwitterCount() {
  const html = await getHTML('https://twitter.com/ABurakZeytinci');
  const twCount = await getTwitterFollowers(html);
  return twCount;
  // get Youtube Followers
}
export async function runCron() {
  const db = await getDB();

  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);
  db.get('twitter')
    .push({
      date: Date.now(),
      count: tCount,
    })
    .write();
  db.get('instagram')
    .push({
      date: Date.now(),
      count: iCount,
    })
    .write();
  console.log('Done!.');
}
