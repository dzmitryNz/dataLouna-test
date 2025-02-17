import { t } from 'elysia';
import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  decimal,
  numeric
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { createInsertSchema } from 'drizzle-typebox';

export const purchase = pgTable(
  'purchases',
  {
    id: varchar('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name').notNull(),
    item_page: varchar('item_page').notNull(),
    quantity: integer('quantity').notNull(),
    currency: varchar('currency').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    cost: numeric('cost', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    userId: varchar('userId').notNull().notNull(),
  }
)

export const purchasesTable = {
  purchase
} as const;

export type Purchase = {
  id: string;
  name: string;
  item_page: string;
  quantity: number;
  currency: string;
  price: number;
  created_at: Date
  userId: string;
};

export const _createPurchase = createInsertSchema(purchasesTable.purchase, {
  name: t.String({ format: 'name' }),
  item_page: t.String({ format: 'item_page' }),
  quantity: t.Numeric({ format: 'quantity' }),
  currency: t.String({ format: 'currency' }),
  price: t.Numeric({ format: 'price' }),
  userId: t.String({ format: 'userId' }),
})