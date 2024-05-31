'use client';

import { ArrowUpRightFromSquare, LayoutList, Trophy } from 'lucide-react';
import { IoPodiumOutline } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { addOrdinalSuffix, convertPercentage } from '@/lib/utils';
import { Stock } from '@/types';

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

	return (
		<>
			<div>
				<div
					className={`-z-50 py-5 px-8 text-black bg-[#ffffff] shadow-md rounded-lg w-[23.5rem] dark:bg-[#1b1b1b] dark:text-white border-l-[6px]`}
					style={{ borderColor: `#${color}` }}
				>
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
						<a
							className='-z-0 ml-auto -mt-3 -mr-3 '
							href={`#`}
							target='_blank'
							rel='noreferrer'
						>
							<ArrowUpRightFromSquare />
						</a>
					</div>
					<div className='flex flex-col'>
						<p className='mt-3 text-lg font-semibold'>
							${Number(price).toFixed(2)}
						</p>

						<p
							className={`font-semibold -mt-1 ${
								Number(change_24hr) >= 0
									? 'text-green-600'
									: 'text-red-700'
							}`}
						>
							{`${
								Number(change_24hr) >= 0
									? '$' + Number(change_24hr)
									: '-$' + Math.abs(Number(change_24hr))
							} (%${convertPercentage(
								Number(price),
								Number(change_24hr)
							).toFixed(2)})`}
							<span className='text-sm text-black opacity-50 dark:text-white'>
								{' past day'}
							</span>
						</p>
					</div>
					<div className='flex flex-row'>
						<div className='px-4 py-1 mt-5 rounded-full bg-slate-200 w-fit dark:bg-[#3b3b3b]'>
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
						<div className='px-4 py-1 ml-3 mt-5 rounded-full bg-slate-200 w-fit dark:bg-[#3b3b3b]'>
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
						<div className='px-4 py-1 ml-3 mt-5 rounded-full bg-slate-200 w-fit dark:bg-[#3b3b3b]'>
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
				</div>
			</div>
		</>
	);
}
