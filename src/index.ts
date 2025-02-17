import { Elysia, t } from 'elysia';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';

import redis from './redisClient';
import { _createPurchase, Purchase, purchase } from './database/purchase';
import { User, user } from './database/user';
import { Product } from './dto/common.dto';
import { product } from './database/product';

const URL = 'https://api.skinport.com/v1/items';
const { PORT, TTL_SECONDS, POSTGRES_URL } = process.env;

const db = drizzle(POSTGRES_URL || 'localhost:5432');
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
    return { message: 'Sorry. Something wrong.' };
  }
});

app.post('/purchase', async ({ body, set }: { body: Purchase, set: { status: number } }) => {
  const whereUser = sql`id = ${body?.userId}`;
  const whereProduct = sql`name = ${body?.name}`;
  const users: User[] = await db.select().from(user).where(whereUser).execute();
  const products: Product[] = await db.select().from(product).where(whereProduct).execute();
  const curUser = users[0];
  const curProduct = products[0];
  if (curProduct) {
    if (Number.parseFloat(curProduct?.price) !== body?.price) {
      set.status = 203;
      return { message: 'Sorry. Item price is changed' };
    }
    const endProductQuatity = curProduct?.quantity - body?.quantity;
    if (endProductQuatity >= 0) {
      set.status = 203;
      return { message: 'Sorry. Item quantity is not enough' };
    }
    if (curUser) {
      const cost = Number((Math.round(Math.round(body?.price * 100) * body?.quantity) / 100).toFixed(2));
      const endBalance = Number(curUser?.balance) - cost;
      if (endBalance >= 0) {
        await db.transaction(async (tx) => {
          await db.insert(purchase).values({ ...body, price: String(body.price), cost: String(cost) }).execute();
          await db.update(user).set({ balance: String(endBalance) }).where(whereUser);
          await db.update(product).set({ quantity: endProductQuatity }).where(whereProduct);
        });
        set.status = 201;
        return { message: 'Congratilations! You baught this item', balance: endBalance };
      } else {
        set.status = 203;
        return { message: 'Sorry. Your balance is not enough', balance: Number(curUser?.balance) };
      }
    } else {
      set.status = 404;
      return { message: 'Sorry. This user not found' }
    }
  } else {
    set.status = 204;
    return { message: 'Sorry. Item not found' };
  }
}, {
  body: t.Omit(
    _createPurchase,
    ['id', 'created_at']
  )
})

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
