import { t } from 'elysia';
import {
  pgTable,
  varchar,
  timestamp,
  decimal,
  numeric
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { createInsertSchema } from 'drizzle-typebox';

export const user = pgTable(
  'users',
  {
    id: varchar('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    username: varchar('username').notNull().unique(),
    passwordHash: varchar('passwordHash').notNull(),
    balance: numeric('balance', { precision: 10, scale: 2 }).default('0.00').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
  }
)

export const usersTable = {
  user
} as const

export type User = {
  id: string;
  username: string;
  passwordHash: string;
  balance: string;
  created_at: Date;
};

export const _createUser = createInsertSchema(usersTable.user, {
  username: t.String({ format: 'username' })
});

export const createUser = t.Omit(
  _createUser,
  ['id', 'passwordHash', 'createdAt']
)