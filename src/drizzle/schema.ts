import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	numeric,
	pgEnum,
	jsonb,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	role: roleEnum('role').default('user').notNull(),
	balance: numeric('balance').default('100000'),
	portfolio: jsonb('portfolio').default({}),
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
	symbol: text('symbol').notNull(),
	name: text('name').notNull(),
	price: numeric('price').notNull(),
	change_1hr: numeric('change_1hr'),
	change_24hr: numeric('change_24hr'),
	change_1wk: numeric('change_1wk'),
	change_1mth: numeric('change_1mth'),
	change_all: numeric('change_all'),
	team: text('team'),
	country: text('country'),
	points: integer('points'),
	championship_pos: numeric('championship_pos'),
	color: text('color'),
	category: text('category'),
	avatar: text('avatar'),
	date_added: timestamp('date_added', { mode: 'string' }).defaultNow(),
	updated_at: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date()),
});
