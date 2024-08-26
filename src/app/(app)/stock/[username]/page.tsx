import StockCard from './components/stock-card';
import OrderCard from './components/order-card';

import { auth } from '@/lib/auth';
import {
	getBalanceById,
	getStockByName,
	getStockHistoryAll,
	getStockHistoryDay,
	getStockHistoryHour,
	getStockHistoryMonth,
	getStockHistoryWeek,
	getStockQuantity,
} from '@/app/actions/actions';

import { Toaster } from '@/components/ui/toaster';

export default async function StockPage({
	params,
}: {
	params: { username: string };
}) {
	const session = await auth();
	const stock = await getStockByName(params.username.replace('-', ' '));
	const balance = session ? await getBalanceById(session?.user.id) : 0;
	const stockQuantity = session ? await getStockQuantity(stock.id) : 0;

	const hourStockHistory = await getStockHistoryHour(
		params.username.replace('-', ' ')
	);
	const dayStockHistory = await getStockHistoryDay(
		params.username.replace('-', ' ')
	);
	const weekStockHistory = await getStockHistoryWeek(
		params.username.replace('-', ' ')
	);
	const monthStockHistory = await getStockHistoryMonth(
		params.username.replace('-', ' ')
	);
	const allStockHistory = await getStockHistoryAll(
		params.username.replace('-', ' ')
	);

	const downsampleData = (data, requiredPoints) => {
		if (data.length <= requiredPoints) {
			return data;
		}
		const valueCount = data.length;
		const step = Math.floor(valueCount / requiredPoints);
		return data.filter((_: {}, index: number) => index % step === 0);
	};

	const dummyData = {
		hour: downsampleData(hourStockHistory, 80),
		day: downsampleData(dayStockHistory, 80),
		week: downsampleData(weekStockHistory, 80),
		month: downsampleData(monthStockHistory, 80),
		all: downsampleData(allStockHistory, 80),
	};

	return (
		<>
			<div className='flex flex-col lg:flex-row justify-center items-center lg:items-start my-5 md:my-10 px-4'>
				<StockCard stock={stock} changeData={dummyData} />
				{session && balance !== null && stockQuantity !== null && (
					<div className='flex justify-center mt-5 lg:mt-0 lg:ml-5 w-full lg:w-auto'>
						<OrderCard
							stock={stock}
							balance={Number(balance)}
							quantity={stockQuantity}
						/>
					</div>
				)}
				<Toaster />
			</div>
		</>
	);
}
