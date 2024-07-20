'use server';

import { db } from '@/lib/db';
import { portfolio, stocks, transactions, users } from '@/drizzle/schema';
import { and, desc, eq, ilike, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { TradeOptions } from '@/types';
import { unstable_cache } from 'next/cache';

const RED = '\u001b[31m';
const BLUE = '\u001b[34m';
const WHITE = '\u001b[37m';

const REDBACKGROUND = '\u001b[37;41m';
const WHITEBACKGROUND = '\u001b[37;47m';

const BOLD = '\u001b[1m';
const ITALICIZE = '\u001b[3m';
const UNDERLINE = '\u001b[4m';

const RESET = '\u001b[0m';

export async function fetchBalance(username: string) {
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
		switch (error.code) {
			case 'ECONNREFUSED':
				console.error(
					RED + BOLD + UNDERLINE + 'Error: Database' + RESET
				);
				console.error(
					'ECONNREFUSED Error trying to acccess database in getStocks'
				);
				break;
			default:
				console.error(`Error in getStocks: ${error}`);
				break;
		}
		return [];
	}
}

export async function getStockByName(stockName: string) {
	const result = await db
		.select()
		.from(stocks)
		.where(ilike(stocks.name, stockName));

	return result[0];
}

export async function getBalanceById(userId: string) {
	const result = await db
		.select({
			balance: users.balance,
		})
		.from(users)
		.where(eq(users.id, userId));

	return result[0].balance;
}

export async function getUserBalance() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) return null;

	try {
		const account = await db
			.select()
			.from(users)
			.where(eq(users.id, session.user.id));

		return account[0].balance;
	} catch (error) {
		switch (error.code) {
			case 'ECONNREFUSED':
				console.error(
					RED + BOLD + UNDERLINE + 'Error: Database' + RESET
				);
				console.error(
					'ECONNREFUSED Error trying to access database in getUserBalance'
				);
				break;
			default:
				console.error(`Error in getUserBalance: ${error}`);
				break;
		}
		return null;
	}
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
			BLUE +
				'Transaction Record: ' +
				RESET +
				`User ${session?.user.name} submitted ${type} order for ${amount} shares of stock: ${stockId}`
		);

		const transactionRecord = await db.insert(transactions).values({
			userId: session.user.id,
			stockId: stockId,
			transaction_type: type,
			quantity: amount,
		});

		const balanceResult = await db
			.select({ balance: users.balance })
			.from(users)
			.where(eq(users.id, session.user.id));

		const portfolioValueResult = await getPortfolioValue();

		return {
			success: `You have successfully ${
				type === 'buy' ? 'bought' : 'sold'
			} ${amount} ${amount > 1 ? 'shares!' : 'share!'}`,
			balance: balanceResult[0].balance,
			portfolioValue: portfolioValueResult,
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

	try {
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
	} catch (error) {
		switch (error.code) {
			case 'ECONNREFUSED':
				console.error(
					RED + BOLD + UNDERLINE + 'Error: Database' + RESET
				);
				console.error(
					'ECONNREFUSED Error trying to access database in getStockQuantity'
				);
				break;
			default:
				console.error(`Error in getStockQuantity: ${error}`);
				break;
		}
		return 0;
	}
}

export async function getPortfolioValue() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) return null;

	try {
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
	} catch (error) {
		switch (error.code) {
			case 'ECONNREFUSED':
				console.error(
					RED + BOLD + UNDERLINE + 'Error: Database' + RESET
				);
				console.error(
					'ECONNREFUSED Error trying to access database in getPortfolioValue'
				);
				break;
			default:
				console.error(`Error in getPortfolioValue: ${error}`);
				break;
		}
		return 0;
	}
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

export const getCachedLeaderboardResults = unstable_cache(
	async () => getLeaderboardResults(10),
	['leaderboard-results'],
	{ revalidate: 1 }
);

export async function getLeaderboardResults(limit: number) {
	try {
		const leaderboardResults = await db
			.select({
				name: users.name,
				netWorth: sql<number>`${users.balance} + COALESCE(sum(${portfolio.quantity} * ${stocks.price}), 0)`,
				portfolioSize: sql<number>`count(CASE WHEN ${portfolio.quantity} > 0 THEN 1 ELSE NULL END)`,
			})
			.from(users)
			.leftJoin(portfolio, eq(users.id, portfolio.userId))
			.leftJoin(stocks, eq(portfolio.stockId, stocks.id))
			.groupBy(users.name, users.balance)
			.orderBy(
				desc(
					sql<number>`${users.balance} + COALESCE(sum(${portfolio.quantity} * ${stocks.price}), 0)`
				)
			)
			.limit(limit);

		return leaderboardResults;
	} catch (error) {
		switch (error.code) {
			case 'ECONNREFUSED':
				console.error(
					RED + BOLD + UNDERLINE + 'Error: Database' + RESET
				);
				console.error(
					'ECONNREFUSED Error trying to acccess database in getLeaderboardResults'
				);
				break;
			default:
				console.error(`Error in getLeaderboardResults: ${error}`);
				break;
		}
		return null;
	}
}

export async function getRecentTransactions(limit: number) {
	try {
		const transactionsResult = await db
			.select({
				name: users.name,
				image: users.image,
				symbol: stocks.symbol,
				type: transactions.transaction_type,
				quantity: transactions.quantity,
				totalPrice: transactions.total_price,
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
				transactions.created_at,
				transactions.total_price
			)
			.orderBy(desc(transactions.created_at))
			.limit(limit);
		return transactionsResult;
	} catch (error) {
		switch (error.code) {
			case 'ECONNREFUSED':
				console.error(
					RED + BOLD + UNDERLINE + 'Error: Database' + RESET
				);
				console.error(
					'ECONNREFUSED Error trying to acccess database in getPortfolioValue'
				);
				break;
			default:
				console.error(`Error in getPortfolioValue: ${error}`);
				break;
		}
		return [];
	}
}
