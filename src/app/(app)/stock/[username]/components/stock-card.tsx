'use client';

import { useState, useMemo } from 'react';

import { Stock } from '@/types';
import { addOrdinalSuffix, convertPercentage } from '@/lib/utils';

import {
	MonitorPlay,
	UsersRound,
	Gamepad2,
	MessageSquareText,
	Text,
} from 'lucide-react';

import TrackLoadingSpinner from '@/components/track-loading';
import RangeButtons from './range-buttons';
import StockChart from '@/components/stock-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ErrorMessage from '@/components/error-message';

interface StockCardProps {
	stock: Stock;
	changeData: any;
}

export default function StockCard({ stock, changeData }: StockCardProps) {
	//TODO Deal with changeData errors more gracefully - This works for now until refactor of this file
	if (!changeData) return <ChartErrorCard stock={stock} />;

	let currentPrice =
		changeData.day.length !== 0
			? changeData.day[changeData.day.length - 1].price
			: Number(stock.price);
	let firstPrice =
		changeData.day.length !== 0 ? changeData.day[0].price : currentPrice;
	let currentChange = currentPrice - firstPrice;

	const [hoveredPrice, setHoveredPrice] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const [data, setData] = useState(changeData !== null ? changeData.day : []);

	function handleRangeChange(type: number) {
		switch (type) {
			case 0:
				setData(changeData.hour);
				break;
			case 1:
				setData(changeData.day);
				break;
			case 2:
				setData(changeData.week);
				break;
			case 3:
				setData(changeData.month);
				break;
			case 4:
				setData(changeData.all);
				break;
		}
	}

	const memoizedData = useMemo(() => data, [data]);
	const memoizedSetIsHovering = useMemo(() => setIsHovering, []);
	const memoizedSetHoveredPrice = useMemo(() => setHoveredPrice, []);

	return (
		<>
			<Card className='w-full max-w-2xl h-fit'>
				<CardHeader>
					<CardTitle className='text-2xl sm:text-3xl flex flex-row items-center'>
						{stock.name}
						<span className='ml-2 sm:ml-3 text-base sm:text-xl font-semibold'>
							{stock.symbol}
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='-mt-4 mb-5'>
						<p className='text-primary text-2xl sm:text-3xl font-semibold'>
							{isHovering
								? `$${hoveredPrice}`
								: `$${currentPrice.toFixed(2)}`}
						</p>
						<div className='mt-0'>
							<p
								className={`font-semibold text-md ${
									isHovering
										? hoveredPrice - firstPrice > 0
											? 'text-green-600'
											: 'text-red-600'
										: currentChange > 0
										? 'text-green-600'
										: 'text-red-600'
								}`}
							>
								{isHovering
									? `${hoveredPrice - firstPrice > 0 ? '$' : '-$'}${(Math.abs(hoveredPrice - firstPrice)).toFixed(2)} (${(
                                        ((hoveredPrice - firstPrice) /
                                        firstPrice) *
                                        100
                                    ).toFixed(2)}%)` //prettier-ignore
									: `${
											currentChange > 0 ? '$' : '-$'
									  }${Math.abs(currentChange).toFixed(
											2
									  )} (${(
											((currentPrice - firstPrice) /
												firstPrice) *
											100
									  ).toFixed(2)}%)`}
								<span className='text-black opacity-50 dark:text-white'>
									{isHovering ? '' : ' past 24 hours'}
								</span>
							</p>
						</div>
					</div>
					<div className='border border-b-0 rounded-t-md'>
						{memoizedData.length === 0 ? (
							<div className='min-h-[16rem] sm:min-h-[20rem] md:min-h-[22rem]'>
								<div className='relative top-12 sm:top-24'>
									<TrackLoadingSpinner />
								</div>
							</div>
						) : (
							<StockChart
								chartData={memoizedData}
								setIsHovering={memoizedSetIsHovering}
								setHoveredPrice={memoizedSetHoveredPrice}
							/>
						)}
					</div>

					<RangeButtons handleRangeChange={handleRangeChange} />
					<div className='mt-6'>
						<div>
							<h2 className='text-xl sm:text-2xl font-semibold'>{`About ${stock.symbol?.toUpperCase()}`}</h2>
						</div>
						<div className='flex flex-wrap mt-4'>
							<div className='flex flex-row px-4 sm:px-8 w-1/2 sm:w-fit mb-4'>
								<div className='flex items-center justify-center text-center'>
									<MonitorPlay />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>
										{addOrdinalSuffix(
											stock.championship_pos
										)}
									</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Championship Standing
									</p>
								</div>
							</div>
							<div className='flex flex-row px-4 sm:px-8 w-1/2 sm:w-fit mb-4'>
								<div className='flex items-center justify-center text-center'>
									<UsersRound />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.points}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Points
									</p>
								</div>
							</div>
							<div className='flex flex-row px-4 sm:px-8 w-1/2 sm:w-fit mb-4'>
								<div className='flex items-center justify-center text-center'>
									<Gamepad2 />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.category.toUpperCase()}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Category
									</p>
								</div>
							</div>
						</div>
						<div className='mt-2'>
							<div className='flex flex-row w-full px-4 sm:px-8'>
								<div className='flex items-center justify-center text-center'>
									<MessageSquareText />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.team}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Team
									</p>
								</div>
							</div>
						</div>
						<div className='mt-2'>
							<div className='flex flex-row w-full px-4 sm:px-8'>
								<div className='flex items-center justify-center text-center'>
									<Text />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.country}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Country
									</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

interface ChartErrorCardProps {
	stock: Stock;
}

function ChartErrorCard({ stock }: ChartErrorCardProps) {
	return (
		<>
			<Card className='w-full max-w-2xl h-fit'>
				<CardHeader>
					<CardTitle className='text-xl sm:text-2xl md:text-3xl flex flex-col sm:flex-row items-start sm:items-center'>
						{stock.name}
						<span className='mt-1 sm:mt-0 sm:ml-3 text-lg sm:text-xl font-semibold'>
							{stock.symbol}
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='-mt-4 mb-5'>
						<p className='text-primary text-2xl sm:text-3xl font-semibold'>
							$
							{Number(stock.price).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</p>

						<p
							className={`font-semibold -mt-1 ${
								Number(stock.change_24hr) >= 0
									? 'text-green-600'
									: 'text-red-700'
							}`}
						>
							{`${
								Number(stock.change_24hr) >= 0
									? '$' + Number(stock.change_24hr)
									: '-$' + Math.abs(Number(stock.change_24hr))
							} (%${convertPercentage(
								Number(stock.price),
								Number(stock.change_24hr)
							).toFixed(2)})`}
							<span className='text-sm text-black opacity-50 dark:text-white'>
								{' past day'}
							</span>
						</p>
					</div>
					<div className='border rounded-md h-[30rem]'>
						<div className='relative top-36 left-1/4'>
							<div className='w-1/2'>
								<ErrorMessage />
							</div>
						</div>
					</div>
					<div className='mt-6'>
						<div>
							<h2 className='text-xl sm:text-2xl font-semibold'>{`About ${stock.symbol?.toUpperCase()}`}</h2>
						</div>
						<div className='flex flex-wrap mt-4'>
							<div className='flex flex-row px-4 sm:px-8 w-1/2 sm:w-fit mb-4'>
								<div className='flex items-center justify-center text-center'>
									<MonitorPlay />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>
										{addOrdinalSuffix(
											stock.championship_pos
										)}
									</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Championship Standing
									</p>
								</div>
							</div>
							<div className='flex flex-row px-4 sm:px-8 w-1/2 sm:w-fit mb-4'>
								<div className='flex items-center justify-center text-center'>
									<UsersRound />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.points}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Points
									</p>
								</div>
							</div>
							<div className='flex flex-row px-4 sm:px-8 w-1/2 sm:w-fit mb-4'>
								<div className='flex items-center justify-center text-center'>
									<Gamepad2 />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.category.toUpperCase()}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Category
									</p>
								</div>
							</div>
						</div>
						<div className='mt-2'>
							<div className='flex flex-row w-full px-4 sm:px-8'>
								<div className='flex items-center justify-center text-center'>
									<MessageSquareText />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.team}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Team
									</p>
								</div>
							</div>
						</div>
						<div className='mt-2'>
							<div className='flex flex-row w-full px-4 sm:px-8'>
								<div className='flex items-center justify-center text-center'>
									<Text />
								</div>
								<div className='px-2 sm:px-5 py-3 leading-5 text-sm sm:text-md'>
									<p>{stock.country}</p>
									<p className='text-xs sm:text-sm opacity-75'>
										Country
									</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
