import ErrorMessage from '@/components/error-message';
import SideBar from '@/components/side-bar';
import StreamerCard from '@/components/streamer-card';

import { auth } from '@/lib/auth';
import { convertPercentage } from '@/lib/utils';

let fetchingError: boolean = false;

async function getStocks() {
	try {
		const res = await fetch(`${process.env.API_BASE}/api/stocks`);
		if (!res.ok) {
			throw new Error('Error getting stocks');
		}
		return res.json();
	} catch (error) {
		console.error('Failed to fetch stocks from the server!', error);
		fetchingError = true;
		return null;
	}
}

export default async function HomePage() {
	const session = await auth();
	const stocks = await getStocks();

	return (
		<>
			{/* <div className='bg-yellow-500 py-3 shadow-md'>
				<div className='flex flex-row justify-center'>
					<p className='font-semibold text-center py-0'>
						New features are here!{' '}
						<a className='underline underline-offset-2 font-bold cursor-pointer'>
							Read More
						</a>
					</p>
					<p className='absolute right-0'>X</p>
				</div>
			</div> */}
			<div
				className={
					session?.user
						? 'grid min-h-[calc(100vh-88px)] w-full md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] bg-[#fafafa] dark:bg-[#0c0c0c]'
						: 'grid min-h-[calc(100vh-88px)] w-full bg-[#fafafa] dark:bg-[#0c0c0c]'
				}
			>
				{session?.user ? (
					<SideBar session={session} portfolioValue={'0.00'} />
				) : (
					''
				)}
				<div className='flex flex-col'>
					<main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
						<div className='flex items-center flex-col'>
							{fetchingError ? (
								<div className='mt-5 flex items-center justify-center'>
									<div>
										<ErrorMessage />
									</div>
								</div>
							) : (
								<div className='flex flex-wrap justify-center mx-4 my-8 overflow-hidden'>
									{stocks.map((stock: Stock) => (
										<div className='p-3' key={stock.id}>
											<StreamerCard
												key={stock.id}
												username={stock.name}
												streamerSymbol={stock.symbol}
												price={stock.price}
												priceChange={stock.change_1hr}
												percentage={convertPercentage(
													stock.price,
													stock.change_1hr
												)}
												profile_img={stock.avatar}
												points={stock.points}
												championship_pos={
													stock.championship_pos
												}
												category={stock.category}
												color={stock.color}
											/>
										</div>
									))}
								</div>
							)}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
