import ErrorMessage from '@/components/error-message';
import StockCard from '@/components/stock-card';
import { getStocks } from '@/app/actions/actions';

export default async function HomePage() {
	const stocks = await getStocks();

	return (
		<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
			<div className='grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-5'>
				{!stocks || stocks.length === 0 ? (
					<div className='mt-5 flex items-center justify-center'>
						<div>
							<ErrorMessage />
						</div>
					</div>
				) : (
					stocks.map((stock) => (
						<StockCard key={stock.id} stock={stock} />
					))
				)}
			</div>
		</main>
	);
}
