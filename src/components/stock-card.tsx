'use client';

import { LayoutList, Trophy, MoreHorizontal } from 'lucide-react';
import { IoPodiumOutline } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { addOrdinalSuffix, getPriceChange } from '@/lib/utils';
import { Stock } from '@/types';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface StockCardProps {
	stock: Stock;
}

export default function StockCard({ stock }: StockCardProps) {
	const {
		name,
		symbol,
		price,
		change_24hr,
		championship_pos,
		points,
		category,
		color,
		image,
	} = stock;

	const [prevPrice, setPrevPrice] = useState(stock.price);

	useEffect(() => {
		setPrevPrice(stock.price);
	}, [stock.price]);

	return (
		<Card
			style={{ borderColor: `#${color}` }}
			className='border-0 border-l-[6px]'
		>
			<CardHeader className='pb-0'>
				<CardTitle>
					<div className='flex items-center '>
						<Image
							className='w-[1.70rem]'
							width={27.2}
							height={27.2}
							src={image}
							alt={name}
						/>

						<Link
							className='z-30 flex items-center'
							href={`stock/${name
								.replace(' ', '-')
								.toLowerCase()}`}
						>
							<h3 className='ml-2 mt-[-0.25rem] text-xl font-semibold'>
								{name}
							</h3>

							<p className='ml-2 -mt-5 text-sm'>
								{symbol.toUpperCase()}
							</p>
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger className='-z-0 ml-auto -mt-3 -mr-3 hidden xs:block'>
								<Button
									variant='ghost'
									className='hover:bg-transparent px-0 '
									asChild
								>
									<MoreHorizontal />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									Stock Options
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link
										className='flex flex-row items-center'
										href={`stock/${name
											.replace(' ', '-')
											.toLowerCase()}`}
									>
										View more info
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Buy/Sell</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col'>
					<div className='mt-3 text-lg font-semibold'>
						{`$${Number(price).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}`}
					</div>

					<p
						className={`font-semibold -mt-1 ${
							Number(change_24hr) >= 0
								? 'text-green-600'
								: 'text-red-700'
						}`}
					>
						{`${
							Number(change_24hr) >= 0
								? '$' +
								  getPriceChange(
										Number(price),
										Number(change_24hr)
								  ).toFixed(2)
								: '-$' +
								  Math.abs(
										getPriceChange(
											Number(price),
											Number(change_24hr)
										)
								  ).toFixed(2)
						} (%${Math.abs(Number(change_24hr)).toFixed(2)})`}
						<span className='text-sm text-black opacity-50 dark:text-white'>
							{' past day'}
						</span>
					</p>
				</div>
				<div className='flex flex-wrap gap-2 mt-5'>
					<div className='px-4 py-1 rounded-full bg-slate-200 w-fit dark:bg-[#3b3b3b]'>
						<div className='flex items-center'>
							<IoPodiumOutline
								className='mr-1 -ml-1'
								size={16}
								strokeWidth={20}
							/>
							<span className='font-semibold'>
								{addOrdinalSuffix(Number(championship_pos))}
							</span>
						</div>
					</div>
					<div className='px-4 py-1 rounded-full bg-slate-200 w-fit dark:bg-[#3b3b3b]'>
						<div className='flex items-center'>
							<Trophy
								className='mr-1 -ml-1'
								size={16}
								strokeWidth={2.0}
							/>
							<span className='font-semibold'>
								{points.toLocaleString()}
							</span>
						</div>
					</div>
					<div className='px-4 py-1 rounded-full bg-slate-200 w-fit dark:bg-[#3b3b3b]'>
						<div className='flex items-center'>
							<LayoutList
								className='mr-1 -ml-1'
								size={16}
								strokeWidth={2.0}
							/>
							<span className='font-semibold'>
								{category.toUpperCase()}
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
