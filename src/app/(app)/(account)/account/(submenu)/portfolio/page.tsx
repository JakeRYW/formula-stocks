import { getPortfolio } from '@/app/actions/actions';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default async function Page() {
	const portfolio = await getPortfolio();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Portfolio</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Nulla possimus porro voluptatem.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{!portfolio ? (
					<div>No trades</div>
				) : (
					portfolio.map((portfolio) => (
						<div key={portfolio.symbol}>
							<div className='my-2'>
								<div className='flex flex-row justify-between'>
									<div className='flex flex-row space-x-2'>
										<p>{portfolio.name}</p>
										<p className='font-semibold text-sm xs:block hidden'>
											{portfolio.symbol}
										</p>
									</div>
									<div>Total Value:</div>
								</div>
								<div className='flex flex-row justify-between'>
									<p>{`${portfolio.quantity} shares`}</p>
									<p>{`$${(
										Number(portfolio.price) *
										portfolio.quantity
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
