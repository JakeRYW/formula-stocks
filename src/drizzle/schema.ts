import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	numeric,
	pgEnum,
	doublePrecision,
	serial,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID())
		.$type<String>(),
	name: text('name').unique().$type<String>(),
	email: text('email').unique().notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	role: roleEnum('role').default('user').notNull(),
	balance: numeric('balance').default('100000').$type<number>(),
	date_added: timestamp('date_added', { mode: 'string' }).defaultNow(),
	updated_at: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccountType>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const stocks = pgTable('stocks', {
	id: text('id').notNull().primaryKey(),
	symbol: text('symbol').unique().notNull(),
	name: text('name').notNull(),
	price: numeric('price').notNull().default('0'),
	change_1hr: numeric('change_1hr').notNull().default('0'),
	change_24hr: numeric('change_24hr').notNull().default('0'),
	change_1wk: numeric('change_1wk').notNull().default('0'),
	change_1mth: numeric('change_1mth').notNull().default('0'),
	change_all: numeric('change_all').notNull().default('0'),
	team: text('team').notNull(),
	country: text('country').notNull(),
	points: integer('points').notNull(),
	championship_pos: integer('championship_pos').notNull().default(0),
	color: text('color').notNull(),
	category: text('category').notNull(),
	image: text('image').notNull(),
	date_added: timestamp('date_added', { mode: 'string' }).defaultNow(),
	updated_at: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const transactions = pgTable('transactions', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('userId')
		.notNull()
		.references(() => users.id),
	stockId: text('stockId')
		.notNull()
		.references(() => stocks.id),
	transaction_type: text('transaction_type', {
		enum: ['buy', 'sell'],
	}).notNull(),
	quantity: integer('quantity').notNull(),
	total_price: numeric('total_price'),
	created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const portfolio = pgTable(
	'portfolio',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		stockId: text('stockId')
			.notNull()
			.references(() => stocks.id, { onDelete: 'cascade' }),
		quantity: integer('quantity'),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(t) => ({
		primaryKey: primaryKey({ columns: [t.userId, t.stockId] }),
	})
);

export const history = pgTable(
	'history',
	{
		id: serial('id'),
		stockId: text('stockId')
			.notNull()
			.references(() => stocks.id, { onDelete: 'cascade' }),
		price: doublePrecision('price'),
		time: timestamp('time', { withTimezone: true }).notNull().defaultNow(),
	},
	(t) => ({
		primaryKey: primaryKey({ columns: [t.id, t.time] }),
	})
);
