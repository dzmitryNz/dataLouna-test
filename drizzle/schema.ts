import { pgTable, unique, varchar, integer, numeric, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const products = pgTable("products", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	itemPage: varchar("item_page").notNull(),
	quantity: integer().default(0).notNull(),
	currency: varchar().default('EUR').notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("products_name_unique").on(table.name),
	unique("products_item_page_unique").on(table.itemPage),
]);

export const purchases = pgTable("purchases", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	itemPage: varchar("item_page").notNull(),
	quantity: integer().notNull(),
	currency: varchar().notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	cost: numeric({ precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	userId: varchar().notNull(),
});

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	username: varchar().notNull(),
	passwordHash: varchar().notNull(),
	balance: numeric({ precision: 10, scale:  2 }).default('0.00').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username),
]);
