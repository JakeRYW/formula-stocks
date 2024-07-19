'use client';

import { useState } from 'react';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Separator } from './ui/separator';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface StockData {
	date: string;
	price: number;
}

interface StockChartProps {
	chartData: StockData[];
	setIsHovering: Function;
	setHoveredPrice: Function;
}

const StockChart = ({
	chartData,
	setIsHovering,
	setHoveredPrice,
}: StockChartProps) => {
	const [hover, setHover] = useState(false);

	const firstPrice = chartData[0].price;
	const lastPrice = chartData[chartData.length - 1].price;
	const priceChange = lastPrice - firstPrice;
	const minPrice = Math.min(...chartData.map((item) => item.price));
	const maxPrice = Math.max(...chartData.map((item) => item.price));

	const chartConfig = {
		date: {
			label: 'Date',
		},
		price: {
			label: 'Price',
			color: '#60a5fa',
		},
	} satisfies ChartConfig;

	return (
		<>
			<ChartContainer config={chartConfig} className='h-full w-full'>
				<AreaChart
					onMouseMove={(e) => {
						if (e.activePayload) {
							setHoveredPrice(e.activePayload[0].payload.price);
						}
					}}
					onMouseEnter={() => {
						setIsHovering(true);
						setHover(true);
					}}
					onMouseLeave={() => {
						setIsHovering(false);
						setHover(false);
					}}
					accessibilityLayer
					className='transition-colors'
					data={chartData}
					margin={{
						left: 0,
						right: 0,
						top: 0,
					}}
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
						dataKey='date'
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						minTickGap={32}
						tickFormatter={(value) => {
							const date = new Date(value * 1000);
							return date.toLocaleDateString('en-US', {
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
								labelKey='date'
								indicator='line'
								nameKey='price'
								formatter={(value, name, item) => (
									<div>
										<span>
											{new Date(
												item.payload.date * 1000
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
													{ minimumFractionDigits: 2 }
												)}`}
											</div>
										</div>
									</div>
								)}
								labelFormatter={(value) => {
									return new Date(value).toLocaleDateString(
										'en-US',
										{
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										}
									);
								}}
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
		</>
	);
};

export default StockChart;
