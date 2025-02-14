
import { Elysia, t } from 'elysia';

import redis from './redisClient';

const URL = 'https://api.skinport.com/v1/items';
const { PORT, TTL_SECONDS } = process.env;

const app = new Elysia();

app.get('/', async ({ set }) => {
  try {
    const cacheKey = 'data';

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const data = await fetchDataFromApi();
    if (Array.isArray(data)) {
      if (data?.length) {
        redis.set(cacheKey, JSON.stringify(data), 'EX', Number(TTL_SECONDS));
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    set.status = 400;
    return 'Sorry. Something wrong.';
  }
});

async function fetchDataFromApi() {
  try {
    const params = new URLSearchParams({
      tradable: 'true'
    });

    const res = await fetch(`${URL}?${params}`, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'br'
      }
    });
    const data: any[] = await res?.json();
    if (res?.status === 200) {
      if (Array.isArray(data)) {
        const sorted = data?.filter((el) => el.quantity).sort((a, b) => a?.min_price - b?.min_price).map((el) => ({
          market_hash_name: el.market_hash_name,
          currency: el?.currency,
          item_page: el?.item_page,
          market_page: el?.market_page,
          quantity: el?.quantity,
          min_price: el?.min_price,
          suggested_price: el?.suggested_price,
        }))
        return sorted || [];
      } else return data;
    } else return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

app.listen(PORT ?? 3000, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});
