'use client';

import { ArrowUpRightFromSquare, Trophy } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import { addOrdinalSuffix } from '@/lib/utils';

interface StreamerCardProps {
	username: string;
	streamerSymbol: string;
	price: number;
	priceChange: number;
	percentage: number;
	profile_img: string;
	points: number;
	championship_pos: number;
	category: string;
	color: string;
}

export default function StreamerCard({
	username,
	streamerSymbol,
	price,
	priceChange,
	percentage,
	points,
	championship_pos,
	profile_img,
	category,
	color,
}: StreamerCardProps) {
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
							src={profile_img}
							alt={username}
						/>

						<Link
							className='z-30 flex items-center'
							href={`/${username
								.replace(' ', '-')
								.toLowerCase()}`}
						>
							<h3 className='ml-2 mt-[-0.25rem] text-xl font-semibold'>
								{username}
							</h3>

							<p className='ml-2 -mt-5 text-sm'>
								{streamerSymbol.toUpperCase()}
							</p>
						</Link>
						<a
							className='-z-0 ml-auto -mt-3 -mr-3 '
							href={`http://twitch.com/${username}`}
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
								priceChange > 0
									? 'text-green-600'
									: 'text-red-700'
							}`}
						>
							{`${
								priceChange > 0
									? '$' + priceChange
									: '-$' + Math.abs(priceChange)
							} (%${percentage.toFixed(2)})`}
							<span className='text-sm text-black opacity-50 dark:text-white'>
								{' past day'}
							</span>
						</p>
					</div>
					<div className='flex flex-row'>
						<div className='px-4 py-1 mt-5 rounded-full bg-slate-200 w-fit dark:bg-[#3b3b3b]'>
							<div className='flex items-center'>
								<Trophy
									className='mr-1 -ml-1'
									size={16}
									strokeWidth={2.0}
								/>
								<span className='font-semibold'>
									{addOrdinalSuffix(championship_pos)}
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
								<Trophy
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
