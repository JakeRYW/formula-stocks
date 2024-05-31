import { Landmark, Folder, CreditCard, TrendingUp } from 'lucide-react';
import { Session } from 'next-auth';

import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { getPortfolioValue } from '@/app/actions/actions';

interface SideBarProps {
	session: Session | null;
}

async function getBalance(session: Session | null) {
	if (!session || !session.user || !session.user.id) return null;

	try {
		const account = await db
			.select()
			.from(users)
			.where(eq(users.id, session.user.id));

		return account[0].balance;
	} catch (error) {
		console.error('Failed to fetch account data from the server!', error);
	}
}

export default async function SideBar({ session }: SideBarProps) {
	const balance = await getBalance(session);
	const portfolioValue = await getPortfolioValue();
	const netWorth = Number(balance) + Number(portfolioValue);

	return (
		<>
			<div className='hidden border-r md:block bg-white dark:bg-[#0c0c0c]'>
				<div className='flex h-full max-h-screen flex-col gap-2'>
					<div className='flex-1 mt-4'>
						<nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
							<div className='flex items-center gap-5 px-3 py-4 text-primary'>
								<Landmark className='h-6 w-6' />
								<div>
									<p>{`$${netWorth.toLocaleString(undefined, {
										minimumFractionDigits: 2,
									})}`}</p>
									<p className='text-muted-foreground font-semibold text-xs'>
										Net Worth
									</p>
								</div>
							</div>
							<div className='flex items-center gap-5 rounded-lg px-3 py-4 text-primary'>
								<Folder className='h-6 w-6' />
								<div>
									<p>{`$${Number(
										portfolioValue
									).toLocaleString(undefined, {
										minimumFractionDigits: 2,
									})}`}</p>
									<p className='text-muted-foreground text-xs'>
										Portfolio Value
									</p>
								</div>
							</div>
							<div className='flex items-center gap-5 rounded-lg  px-3 py-4 text-primary'>
								<CreditCard className='h-6 w-6' />
								<div>
									{`$${Number(balance)?.toLocaleString(
										undefined,
										{
											minimumFractionDigits: 2,
										}
									)}`}
									<p className='text-muted-foreground text-xs'>
										Buying Power
									</p>
								</div>
							</div>
							<div className='flex items-center gap-5 rounded-lg px-3 py-4 text-primary'>
								<TrendingUp className='h-6 w-6' />
								<div>
									<p
										className={`${
											netWorth >= 100000
												? 'text-green-600'
												: 'text-red-700'
										}`}
									>{`${
										netWorth >= 100000
											? '$' +
											  (
													netWorth - 100000
											  )?.toLocaleString(undefined, {
													minimumFractionDigits: 2,
											  })
											: '-$' +
											  Math.abs(
													netWorth - 100000
											  )?.toLocaleString(undefined, {
													minimumFractionDigits: 2,
											  })
									}`}</p>
									<p className='text-muted-foreground text-xs'>
										Profit/Loss
									</p>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}
