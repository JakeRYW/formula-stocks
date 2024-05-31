import { Toaster } from '@/components/ui/toaster';
import { Stock } from '@/types';
import Dashboard from '../components/dashboard';
import { getStocks, getRecentTransactions } from '@/app/actions/actions';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Activity, CreditCard, LineChart, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AdminTable from '../components/admin-table/admin-table';
import StockTable from '../components/dashboard';

export default async function AdminPage() {
	let stocks = await getStocks();
	const recentTransactions = await getRecentTransactions(10);

	//Only map the stock data if the API actually returned valid data
	if (Object.keys(stocks).length !== 0) {
		stocks = stocks.map((stock: Stock) => ({
			id: stock.id,
			name: stock.name,
			symbol: stock.symbol,
			price: stock.price,
			category: stock.category,
			dateAdded: new Date(stock.date_added).toLocaleDateString('en-us'),
		}));
	}

	return (
		<>
			<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
				<div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
					<Card x-chunk='chunk-0'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Active Now
							</CardTitle>
							<Activity className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+2</div>
							<p className='text-xs text-muted-foreground'>
								+1 since last hour
							</p>
						</CardContent>
					</Card>
					<Card x-chunk='chunk-1'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Total Users
							</CardTitle>
							<Users className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>4</div>
							<p className='text-xs text-muted-foreground'>
								+180.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card x-chunk='chunk-2'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Total Stocks
							</CardTitle>
							<LineChart className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>3</div>
							<p className='text-xs text-muted-foreground'>
								+19% from last month
							</p>
						</CardContent>
					</Card>
					<Card x-chunk='chunk-3'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Transactions
							</CardTitle>
							<CreditCard className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+5</div>
							<p className='text-xs text-muted-foreground'>
								+20.5% since last hour
							</p>
						</CardContent>
					</Card>
				</div>
				<div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4'>
					<Card
						className='xl:col-span-3'
						x-chunk='dashboard-01-chunk-4'
					>
						<CardHeader className='flex flex-row items-center'>
							<div className='grid gap-2'>
								<CardTitle>Stocks</CardTitle>
								<CardDescription>
									All drivers in the stock database.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<StockTable apiData={stocks} />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Recent Transactions</CardTitle>
						</CardHeader>
						<CardContent className='grid gap-8'>
							{recentTransactions.map((transaction) => (
								<div className='flex items-center gap-4'>
									<Avatar className='hidden h-9 w-9 sm:flex'>
										<AvatarImage
											src={transaction.image}
											alt='Avatar'
										/>
										<AvatarFallback>
											{transaction.name?.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className='grid gap-1'>
										<p className='text-sm font-medium leading-none'>
											{transaction.name}
										</p>
										<p className='text-sm text-muted-foreground'>
											{`${
												transaction.type === 'buy'
													? 'Bought'
													: 'Sold'
											} ${
												transaction.quantity
											} shares of ${transaction.symbol}`}
										</p>
									</div>
									<div
										className={`ml-auto font-medium ${
											transaction.type === 'buy'
												? 'text-red-600'
												: 'text-green-700'
										}`}
									>
										{`${
											transaction.type === 'buy'
												? '-$'
												: '+$'
										}${Number(
											transaction.totalPrice
										).toLocaleString(undefined, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}`}
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</main>
			{/* <div className='flex flex-col items-center justify-center mt-10 mb-20'>
        
				<Dashboard apiData={stocks} />
				<Toaster />
			</div> */}
		</>
	);
}
