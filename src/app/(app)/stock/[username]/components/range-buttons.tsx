import { useState } from 'react';

interface RangeButtonsProps {
	handleRangeChange: Function;
}

export default function RangeButtons({ handleRangeChange }: RangeButtonsProps) {
	const [range, setRange] = useState(1);

	return (
		<div className='flex flex-row border border-t-0 text-xs sm:text-base rounded-b-md'>
			<button
				className={
					range === 0
						? 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-primary border-b-[3px] border-primary'
						: 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-gray-500'
				}
				onClick={() => {
					setRange(0);
					handleRangeChange(0);
				}}
			>
				1H
			</button>
			<button
				className={
					range === 1
						? 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-primary border-b-[3px] border-primary'
						: 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-gray-500'
				}
				onClick={() => {
					setRange(1);
					handleRangeChange(1);
				}}
			>
				1D
			</button>
			<button
				className={
					range === 2
						? 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-primary border-b-[3px] border-primary'
						: 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-gray-500'
				}
				onClick={() => {
					setRange(2);
					handleRangeChange(2);
				}}
			>
				1W
			</button>
			<button
				className={
					range === 3
						? 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-primary border-b-[3px] border-primary'
						: 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-gray-500'
				}
				onClick={() => {
					setRange(3);
					handleRangeChange(3);
				}}
			>
				1M
			</button>
			<button
				className={
					range === 4
						? 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-primary border-b-[3px] border-primary'
						: 'px-3 py-2 sm:px-6 sm:py-3 mt-auto font-semibold text-gray-500'
				}
				onClick={() => {
					setRange(4);
					handleRangeChange(4);
				}}
			>
				All
			</button>
		</div>
	);
}
