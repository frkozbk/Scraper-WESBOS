import express from 'express';
import { getTwitterCount, getInstagramCount } from './lib/scraper';
import './lib/cron';

const app = express();
app.get('/scrape', async (req, res) => {
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);

  res.json({ iCount, tCount });
});
app.listen(3333, () => {
  console.log(`App is running`);
});
