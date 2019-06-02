import chalk from 'chalk';
import {
  getHTML,
  getTwitterFollowers,
  getInstagramFollowers,
} from './lib/scraper';

console.clear();
async function go() {
  // Get Instagram And Twitter HTML
  const insPromise = await getHTML('htpps://www.instagram.com/burakzeytinci');
  const twitPromise = await getHTML('https://twitter.com/ABurakZeytinci');
  const yPromise = await getHTML(
    'https://www.youtube.com/channel/UCpKAlC-CipkkBYyBY9k5PiA'
  );
  const [instagramHTML, twitterHTML] = await Promise.all([
    insPromise,
    twitPromise,
    yPromise,
  ]);
  // get Instagram Followers
  const insCount = await getInstagramFollowers(instagramHTML);
  console.log(
    `Burak Zeytinci you have ${chalk.red.inverse.bold(
      insCount
    )} followers on Instagram and`
  );

  // get Twitter Followers

  const twCount = await getTwitterFollowers(twitterHTML);
  console.log(`${chalk.green.inverse.bold(twCount)} followers on Twitter`);
  // get Youtube Followers
}
go();
