'use server';

import { db } from '@/lib/db';
import { portfolio, stocks, transactions, users } from '@/drizzle/schema';
import { and, asc, desc, eq, ilike, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { TradeOptions } from '@/types';

export async function fetchBalance(username: String) {
	const result = await db
		.select({
			balance: users.balance,
		})
		.from(users)
		.where(ilike(users.name, username));

	return result[0].balance;
}

export async function getStocks() {
	try {
		const allStocks = await db
			.select()
			.from(stocks)
			.orderBy(stocks.championship_pos);
		return allStocks;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getBalanceById(userId: String) {
	const result = await db
		.select({
			balance: users.balance,
		})
		.from(users)
		.where(eq(users.id, userId));

	console.log(result[0]);

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
	stockId: string,
	amount: number,
	type: TradeOptions
) {
	try {
		const session = await auth();

		if (!session || !session.user || !session.user.id) throw Error;

		console.log(
			`User ${session?.user.name} submitted ${type} order for ${amount} shares of stock: ${stockId}`
		);

		const transactionRecord = await db.insert(transactions).values({
			userId: session.user.id,
			stockId: stockId,
			transaction_type: type,
			quantity: amount,
		});

		return {
			success: `You have successfully ${
				type === 'buy' ? 'bought' : 'sold'
			} ${amount} ${amount > 1 ? 'shares!' : 'share!'}`,
		};
	} catch (error) {
		console.error('Error performing transaction');
		console.log(error);
		return {
			error: 'There was a problem with your transaction.',
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

export async function getPortfolioValue() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) return null;

	const portfolioResult = await db
		.select({
			quantity: portfolio.quantity,
			price: stocks.price,
		})
		.from(portfolio)
		.innerJoin(
			stocks,
			and(
				eq(portfolio.stockId, stocks.id),
				eq(portfolio.userId, session.user.id)
			)
		);

	let totalAmount = 0;

	for (let stock of portfolioResult) {
		totalAmount += Number(stock.price) * Number(stock.quantity);
	}

	return Math.round(totalAmount * 100) / 100;
}

export async function setBalance(username: string, amount: number) {
	console.log(`Setting balance to ${amount}`);

	const result = await db
		.update(users)
		.set({ balance: amount })
		.where(ilike(users.name, username));

	console.log(result);
}

export async function getStockPrice(stockId: string) {
	const result = await db
		.select({
			price: stocks.price,
		})
		.from(stocks)
		.where(eq(stocks.id, stockId));

	return result[0].price;
}

export async function getLeaderboardResults() {
	const usersResult = await db
		.select({
			name: users.name,
			stockId: portfolio.stockId,
			quantity: portfolio.quantity,
			//portfolioCount: sql<number>`cast(count(${portfolio.userId}) as int)`,
			price: stocks.price,
			totalPrice: sql<number>`sum(${portfolio.quantity} * ${stocks.price})`,
		})
		.from(users)
		.leftJoin(portfolio, eq(users.id, portfolio.userId))
		.leftJoin(stocks, eq(portfolio.stockId, stocks.id))
		.groupBy(
			users.name,
			portfolio.stockId,
			portfolio.quantity,
			users.balance,
			stocks.price
		)
		.orderBy(asc(users.balance));

	console.log(usersResult);

	// const combined = usersResult.reduce((acc, { name, portfolio }) => {
	// 	if (!acc[name]) {
	// 		acc[name] = { name, portfolio: [] };
	// 	}
	// 	acc[name].portfolio.push(portfolio);
	// 	return acc;
	// }, {});

	return [];
}

export async function getRecentTransactions(limit: number) {
	const transactionsResult = await db
		.select({
			name: users.name,
			image: users.image,
			symbol: stocks.symbol,
			type: transactions.transaction_type,
			quantity: transactions.quantity,
			totalPrice: sql<number>`sum(${transactions.total_price} * ${transactions.quantity})`,
		})
		.from(transactions)
		.innerJoin(users, eq(users.id, transactions.userId))
		.innerJoin(stocks, eq(stocks.id, transactions.stockId))
		.groupBy(
			users.name,
			users.image,
			transactions.transaction_type,
			transactions.quantity,
			stocks.symbol,
			transactions.created_at
		)
		.orderBy(desc(transactions.created_at))
		.limit(limit);
	return transactionsResult;
}
