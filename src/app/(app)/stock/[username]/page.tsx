import StockCard from './components/stock-card';
import OrderCard from './components/order-card';

import { auth } from '@/lib/auth';
import { getBalanceById, getStockQuantity } from '@/app/actions/actions';

import { Toaster } from '@/components/ui/toaster';

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

export default async function StockPage({
	params,
}: {
	params: { username: string };
}) {
	const session = await auth();
	const stock = await getStock(params.username);
	const changeData = await getChangeData(params.username);

	const balance = session ? await getBalanceById(session?.user.id) : 0;
	const stockQuantity = session ? await getStockQuantity(stock[0].id) : 0;

	return (
		<>
			<div className='flex flex-row justify-center mt-10 mb-20'>
				<StockCard
					stock={stock[0]}
					changeData={changeData !== null ? changeData[0] : null}
				/>
				{session && balance !== null && stockQuantity !== null ? (
					<div className='ml-5'>
						<OrderCard
							stock={stock[0]}
							balance={Number(balance)}
							quantity={stockQuantity}
						/>
					</div>
				) : (
					''
				)}
			</div>
			<Toaster />
		</>
	);
}