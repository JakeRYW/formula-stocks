import { getTrades } from '@/app/actions/actions';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

//TODO Turn this into a table
export default async function Page() {
	const trades = await getTrades(100);

	return (
		<Card>
			<CardHeader>
				<CardTitle>History</CardTitle>
				<CardDescription>Last 100 trades</CardDescription>
			</CardHeader>
			<CardContent>
				{!trades ? (
					<div>No trades</div>
				) : (
					trades.map((trade) => (
						<div key={trade.date}>
							<div className='my-2'>
								<div className='flex flex-row justify-between'>
									<div className='flex flex-row space-x-2'>
										<p>{trade.name}</p>
										<p className='font-semibold text-sm'>
											{trade.symbol}
										</p>
									</div>
									<div className='text-muted-foreground sm:block hidden'>
										{trade.date
											? new Date(
													trade.date
											  ).toLocaleDateString() +
											  ' ' +
											  new Date(
													trade.date
											  ).toLocaleTimeString()
											: 'N/A'}
									</div>
								</div>
								<div>
									<p>{`${
										trade.trade_type === 'buy'
											? 'Bought'
											: 'Sold'
									} ${trade.quantity} shares at $${Number(
										trade.total_price
									).toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}`}</p>
								</div>
							</div>
							<Separator />
						</div>
					))
				)}
			</CardContent>
		</Card>
	);
}
