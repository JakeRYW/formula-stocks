import ErrorMessage from '@/components/error-message';
import StockCard from '@/components/stock-card';

import { getStocks } from '@/app/actions/actions';
import { Stock } from '@/types';

export default async function HomePage() {
	const stocks = await getStocks();

	return (
		<>
			<div className='flex flex-col'>
				<main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
					<div className='flex items-center flex-col'>
						{!stocks || stocks.length === 0 ? (
							<div className='mt-5 flex items-center justify-center'>
								<div>
									<ErrorMessage />
								</div>
							</div>
						) : (
							<div className='flex flex-wrap justify-center mx-4 my-8 overflow-hidden'>
								{stocks.map((stock: Stock) => (
									<div className='p-3' key={stock.id}>
										<StockCard
											key={stock.id}
											stock={stock}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</main>
			</div>
		</>
	);
}
