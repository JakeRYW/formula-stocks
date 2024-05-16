import StockCard from './components/stock-card';
import OrderCard from './components/order-card';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { Session } from 'next-auth';
import { headers } from 'next/headers';

async function getStock(username: string) {
	try {
		const res = await fetch(
			`${process.env.API_BASE}/api/stocks/${username}`,
			{
				cache: 'no-cache',
			}
		);
		if (!res.ok) throw new Error('Failed to fetch stocks');
		return res.json();
	} catch (error) {
		console.error('Failed to fetch stocks from the server!', error);
		return null;
	}
}

async function getChangeData(username: string) {
	try {
		const res = await fetch(
			`${process.env.API_BASE}/api/stocks/${username}/history`,
			{ cache: 'no-cache' }
		);
		if (!res.ok) throw new Error('Failed to fetch change data');
		return res.json();
	} catch (error) {
		console.error('Failed to fetch change data from the server!', error);
		return null;
	}
}

async function getBalance() {
	try {
		// const account = await db
		// 	.select()
		// 	.from(users)
		// 	.where(eq(users.id, session.user.id));

		// return account[0].balance;

		const res = await fetch(`http://localhost:3000/api/account`, {
			headers: new Headers(headers()),
		});

		const data = await res.json();

		return data.balance;
	} catch (error) {
		console.error('Failed to fetch account data from the server!', error);
	}
}

export default async function StockPage({
	params,
}: {
	params: { username: string };
}) {
	const session = await auth();
	const stock = await getStock(params.username);
	const changeData = await getChangeData(params.username);
	const balance = await getBalance();

	return (
		<>
			<div className='flex flex-row justify-center mt-10 mb-20'>
				<StockCard
					stock={stock[0]}
					changeData={changeData !== null ? changeData[0] : null}
				/>
				<div className='ml-5'>
					{session ? (
						<OrderCard stock={stock[0]} balance={balance} />
					) : (
						''
					)}
				</div>
			</div>
		</>
	);
}
