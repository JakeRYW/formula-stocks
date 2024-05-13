'use server';

import { db } from '@/lib/db';
import { stocks, users } from '@/drizzle/schema';
import { eq, ilike, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function fetchBalance(username: String) {
  const result = await db
    .select({
      balance: users.balance,
    })
    .from(users)
    .where(eq(users.name, username));

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

export async function transaction(id: number, amount: number) {
  const session = await auth();
  console.log(
    `User ${session?.user.name} submitted buy order for ${amount} shares of stock: ${id}`
  );

  const stockPrice = await getStockPrice(id);
  const cost = Number(stockPrice) * amount;

  const result = await db
    .update(users)
    .set({ balance: sql`${users.balance} - ${cost}` })
    .where(ilike(users.id, session?.user?.id));

  const portfolioResult = await db
    .select({
      portfolio: users.portfolio,
    })
    .from(users)
    .where(eq(users.id, session?.user?.id));

  const portfolio = portfolioResult[0].portfolio;

  const purchase = {
    [id]: amount,
  };

  const test = await db
    .insert(users)
    .values({ portfolio: sql`${users.portfolio} || ${purchase}::jsonb` });

  // ? Possibly make new object with purchase data and then just sql merge to existing object. need to check if merge would add values. also look into jsonb operators to make this a lot easier

  // for (const stock in portfolio) {
  //   if (stock === id) {
  //     portfolio[stock] += amount;
  //   }
  // }
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
