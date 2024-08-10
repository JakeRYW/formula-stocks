'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Separator } from './ui/separator';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface StockData {
	time: string;
	price: number;
}

interface StockChartProps {
	chartData: StockData[];
	setIsHovering: (value: boolean) => void;
	setHoveredPrice: (price: number) => void;
}

const StockChart = React.memo(
	({ chartData, setIsHovering, setHoveredPrice }: StockChartProps) => {
		if (chartData.length === 0)
			return (
				<>
					<h1>Error</h1>
				</>
			);

		const [hover, setHover] = useState(false);

		const firstPrice = useMemo(() => chartData[0].price, [chartData]);
		const lastPrice = useMemo(
			() => chartData[chartData.length - 1].price,
			[chartData]
		);
		const priceChange = useMemo(
			() => lastPrice - firstPrice,
			[firstPrice, lastPrice]
		);

		const minPrice = useMemo(
			() => Math.min(...chartData.map((item) => item.price)),
			[chartData]
		);
		const maxPrice = useMemo(
			() => Math.max(...chartData.map((item) => item.price)),
			[chartData]
		);

		const chartConfig = {
			time: {
				label: 'Date',
			},
			price: {
				label: 'Price',
				color: '#60a5fa',
			},
		} satisfies ChartConfig;

		const handleMouseMove = useCallback(
			(e) => {
				if (e.activePayload) {
					setHoveredPrice(
						e.activePayload[0].payload.price.toFixed(2)
					);
				}
			},
			[setHoveredPrice]
		);

		const handleMouseEnter = useCallback(() => {
			setIsHovering(true);
			setHover(true);
		}, [setIsHovering]);

		const handleMouseLeave = useCallback(() => {
			setIsHovering(false);
			setHover(false);
		}, [setIsHovering]);

		return (
			<ChartContainer config={chartConfig} className='h-full w-full'>
				<AreaChart
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					accessibilityLayer
					className='transition-colors'
					data={chartData}
					margin={{ left: 0, right: 0, top: 0 }}
				>
					<defs>
						<linearGradient
							id='colorUv'
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop
								offset='5%'
								stopColor={
									priceChange >= 0 ? '#54a289' : '#e10600'
								}
								stopOpacity={0.8}
							/>
							<stop
								offset='90%'
								stopColor={
									priceChange >= 0 ? '#54a289' : '#e10600'
								}
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray='3 3' />
					<YAxis domain={[minPrice * 0.9, maxPrice * 1.1]} hide />
					<XAxis
						dataKey='time'
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						minTickGap={32}
						tickFormatter={(value) => {
							return value.toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								hour: 'numeric',
								minute: 'numeric',
							});
						}}
					/>
					<ChartTooltip
						cursor={true}
						content={
							<ChartTooltipContent
								className='bg-card dark:bg-black'
								labelKey='time'
								indicator='line'
								nameKey='price'
								formatter={(value, name, item) => (
									<div>
										<span>
											{new Date(
												item.payload.time
											).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												hour: 'numeric',
												minute: 'numeric',
											})}
										</span>
										<Separator />
										<div className='mt-1 flex min-w-[130px] items-center text-xs text-muted-foreground'>
											{chartConfig[
												name as keyof typeof chartConfig
											]?.label || name}
											<div className='ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground'>
												{`$${value.toLocaleString(
													undefined,
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													}
												)}`}
											</div>
										</div>
									</div>
								)}
								labelFormatter={(value) =>
									new Date(value).toLocaleDateString(
										'en-US',
										{
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										}
									)
								}
							/>
						}
					/>
					<Area
						className='transition-colors duration-700'
						dataKey='price'
						type='linear'
						fill='url(#colorUv)'
						fillOpacity={0.1}
						stroke={priceChange >= 0 ? '#54a289' : '#e10600'}
						strokeWidth={hover ? 2.8 : 2}
						animationDuration={450}
					/>
				</AreaChart>
			</ChartContainer>
		);
	}
);

export default StockChart;
