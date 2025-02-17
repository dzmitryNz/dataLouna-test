import {
  pgTable,
  varchar,
  timestamp,
  integer,
  decimal,
  numeric
} from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

export const product = pgTable(
  'products',
  {
    id: varchar('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name').notNull().unique(),
    item_page: varchar('item_page').notNull().unique(),
    quantity: integer('quantity').default(0).notNull(),
    currency: varchar('currency').default('EUR').notNull(),
    price: numeric('min_price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  }
)

export const productsTable = {
  product
} as const