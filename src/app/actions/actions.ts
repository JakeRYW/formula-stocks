'use server';

import { db } from '@/lib/db';
import { portfolio, stocks, transactions, users } from '@/drizzle/schema';
import { and, eq, ilike, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { TradeOptions } from '@/types';

export async function fetchBalance(username: String) {
	const result = await db
		.select({
			balance: users.balance,
		})
		.from(users)
		.where(eq(users.name, username));

	return result[0].balance;
}

export async function getBalance(userId: String) {
	const result = await db
		.select({
			balance: users.balance,
		})
		.from(users)
		.where(eq(users.id, userId));

	return result[0].balance;
}

export async function manualTransaction(username: string, amount: number) {
	console.log(`Doing transaction with ${amount}`);

	const result = await db
		.update(users)
		.set({ balance: sql`${users.balance} + ${amount}` })
		.where(ilike(users.name, username));

	console.log(result);
}

export async function transaction(
	stockId: number,
	amount: number,
	type: TradeOptions
) {
	try {
		const session = await auth();

		if (!session || !session.user || !session.user.id) return null;

		console.log(
			`User ${session?.user.name} submitted ${type} order for ${amount} shares of stock: ${stockId}`
		);

		//const currentQuantity = await getStockQuantity(stockId);

		// if (type === 'sell' && amount > currentQuantity) {
		// 	throw Error;
		// }

		const transactionRecord = await db.insert(transactions).values({
			userId: session.user.id,
			stockId: stockId,
			transaction_type: type,
			quantity: amount,
		});

		return {
			message: 'Transaction successful!',
		};
	} catch (error) {
		console.error('Error performing transaction');
		console.log(error);
		return {
			message: "Couldn't perform transaction",
		};
	}
}

export async function getStockQuantity(stockId: string) {
	const session = await auth();

	if (!session || !session.user || !session.user.id) return null;

	const portfolioResult = await db
		.select()
		.from(portfolio)
		.where(
			and(
				eq(portfolio.userId, session.user.id),
				eq(portfolio.stockId, stockId)
			)
		);

	if (portfolioResult.length === 0) {
		return 0;
	}

	return portfolioResult[0].quantity;
}

export async function setBalance(username: string, amount: number) {
	console.log(`Setting balance to ${amount}`);

	const result = await db
		.update(users)
		.set({ balance: amount })
		.where(ilike(users.name, username));

	console.log(result);
}

export async function getStockPrice(stockId: number) {
	const result = await db
		.select({
			price: stocks.price,
		})
		.from(stocks)
		.where(eq(stocks.id, stockId));

	return result[0].price;
}
