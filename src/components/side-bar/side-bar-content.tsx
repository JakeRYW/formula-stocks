'use client';

import { Landmark, Folder, CreditCard, TrendingUp } from 'lucide-react';
import { HiLogout } from 'react-icons/hi';

import { BuyingPower } from './buying-power';
import { Networth } from './net-worth';
import { PortfolioValue } from './portfolio-value';
import { Button } from '../ui/button';
import { useState } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';

export default function SideBarContent({ netWorth, portfolioValue, balance }) {
	const [collapsed, setCollapsed] = useState(false);

	if (collapsed) {
		return (
			<div className='hidden border-r md:block bg-white dark:bg-[#0c0c0c] w-fit'>
				<div className='flex h-full max-h-screen flex-col gap-2 sticky top-[88px]'>
					<div className='flex-1 mt-4'>
						<div className='flex items-center border-b-[1px] border-stone-200 w-full pb-3 justify-center text-stone-400'>
							<div>
								<Button
									variant={'ghost'}
									className='hover:bg-transparent'
									onClick={() => setCollapsed(!collapsed)}
								>
									<HiLogout size={20} />
								</Button>
							</div>
						</div>
						{/* <div className='relative'>
                        <HiLogout
                            size={20}
                            className='rotate-180 absolute -right-2 bg-white rounded-md border p-[0.2rem]'
                        />
                    </div> */}
						<div className='grid items-start px-2 text-sm font-medium lg:px-4'>
							<div className='flex items-center px-1 py-2 text-primary '>
								<TooltipProvider>
									<Tooltip delayDuration={0}>
										<TooltipTrigger asChild>
											<Button
												className='px-2 py-4'
												variant={'ghost'}
											>
												<Landmark className='h-6 w-6 ' />
											</Button>
										</TooltipTrigger>
										<TooltipContent
											side='right'
											className='bg-primary text-primary-foreground'
										>
											<p>Net Worth</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								{/* <Networth initialNetworth={netWorth} /> */}
							</div>
							<div className='flex items-center rounded-lg px-1 py-2 text-primary'>
								<TooltipProvider>
									<Tooltip delayDuration={0}>
										<TooltipTrigger asChild>
											<Button
												className='px-2 py-4'
												variant={'ghost'}
											>
												<Folder className='h-6 w-6' />
											</Button>
										</TooltipTrigger>
										<TooltipContent
											side='right'
											className='bg-primary text-primary-foreground'
										>
											<p>Portfolio Value</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								{/* <PortfolioValue
									initialPortfolioValue={portfolioValue}
								/> */}
							</div>
							<div className='flex items-center rounded-lg  px-1 py-2 text-primary'>
								<TooltipProvider>
									<Tooltip delayDuration={0}>
										<TooltipTrigger asChild>
											<Button
												className='px-2 py-4'
												variant={'ghost'}
											>
												<CreditCard className='h-6 w-6' />
											</Button>
										</TooltipTrigger>
										<TooltipContent
											side='right'
											className='bg-primary text-primary-foreground'
										>
											<p>Buying Power</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								{/* <BuyingPower initialBuyingPower={balance} /> */}
							</div>
							<div className='flex items-center rounded-lg px-1 py-2 text-primary'>
								<TooltipProvider>
									<Tooltip delayDuration={0}>
										<TooltipTrigger asChild>
											<Button
												className='px-2 py-4'
												variant={'ghost'}
											>
												<TrendingUp className='h-6 w-6' />
											</Button>
										</TooltipTrigger>
										<TooltipContent
											side='right'
											className='bg-primary text-primary-foreground'
										>
											<p>Profit/Loss</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								{/* <div>
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
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='hidden border-r md:block bg-white dark:bg-[#0c0c0c] '>
				<div className='flex h-full max-h-screen flex-col gap-2 sticky top-[88px]'>
					<div className='flex-1 mt-4'>
						<div className='flex items-center border-b-[1px] border-stone-200 w-full pb-3 pl-6 pr-3 justify-between text-stone-400'>
							<div className='text-lg'>Portfolio</div>
							<div>
								<Button
									variant={'ghost'}
									className='hover:bg-transparent'
									onClick={() => setCollapsed(!collapsed)}
								>
									<HiLogout
										size={20}
										className='rotate-180'
									/>
								</Button>
							</div>
						</div>
						{/* <div className='relative'>
							<HiLogout
								size={20}
								className='rotate-180 absolute -right-2 bg-white rounded-md border p-[0.2rem]'
							/>
						</div> */}
						<div className='grid items-start px-2 text-sm font-medium lg:px-4'>
							<div className='flex items-center gap-5 px-3 py-4 text-primary'>
								<Landmark className='h-6 w-6' />
								<Networth initialNetworth={netWorth} />
							</div>
							<div className='flex items-center gap-5 rounded-lg px-3 py-4 text-primary'>
								<Folder className='h-6 w-6' />
								<PortfolioValue
									initialPortfolioValue={portfolioValue}
								/>
							</div>
							<div className='flex items-center gap-5 rounded-lg  px-3 py-4 text-primary'>
								<CreditCard className='h-6 w-6' />
								<BuyingPower initialBuyingPower={balance} />
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
