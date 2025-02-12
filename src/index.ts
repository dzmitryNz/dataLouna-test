
import { Elysia, t } from 'elysia';
import path from 'path';

import redis from './redisClient';

const { PORT, TTL_SECONDS } = process.env;

const app = new Elysia().get('/', async ({ set }) => {
  try {
    const cacheKey = 'data';
    
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    
    const data = await fetchDataFromDatabase();

    redis.set(cacheKey, JSON.stringify(data), 'EX', Number(TTL_SECONDS));

    return data;
  } catch (error) {
    console.error(error);
    set.status = 400;
    return 'Something wrong';
  }
}).get('favicon.ico', ({ set }) => {
  set.headers = { 'Content-Type': 'image/x-icon' };
  return path.join(__dirname, '.', 'public', 'favicon.ico');
});;

async function fetchDataFromDatabase() {
  return 'Hello, world!';
}

app.listen(PORT ?? 3000, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});
