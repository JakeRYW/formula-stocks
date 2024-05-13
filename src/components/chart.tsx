'use client';

import { Point, ResponsiveLine } from '@nivo/line';
import { useRef } from 'react';
import { useTheme } from 'next-themes';

interface ChartProps {
	setIsHovering?: any;
	setHoveredPrice?: any;
	changeData?: any;
}

const Chart = ({ setHoveredPrice, setIsHovering, changeData }: ChartProps) => {
	const { theme } = useTheme();
	const currentPoint = useRef<Point[] | null>();

	const priceData = [
		{
			id: 'Price',
			color: 'hsl(223, 70%, 50%)',
			data: changeData.map(({ x, y }) => ({ x: new Date(x), y })),
		},
	];

	const CustomPoints = () => {
		if (currentPoint.current) {
			return (
				<div className='absolute p-4 text-white bg-black top-1/2 left-1/2'>
					test
				</div>
			);
		}
	};

	const handlePointHover = (event) => {
		setHoveredPrice(event.points[0].data.y.toFixed(2));
	};

	const handleMouseLeave = (event, data) => {
		setIsHovering(false);
	};

	const handleMouseEnter = (event, data) => {
		setIsHovering(true);
	};

	return (
		<ResponsiveLine
			data={priceData}
			theme={{
				crosshair: {
					line: {
						strokeOpacity: 0.25,
						strokeWidth: 1,
						strokeDasharray: '50 0',
					},
				},
			}}
			margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
			xScale={{ type: 'time' }}
			yScale={{
				type: 'linear',
				min: 'auto',
				max: 'auto',
				stacked: true,
				reverse: false,
			}}
			yFormat=' >-.2f'
			axisTop={null}
			axisRight={null}
			axisBottom={null}
			axisLeft={null}
			enablePoints={false}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			enableGridX={false}
			enableGridY={false}
			useMesh={true}
			enableSlices={'x'}
			crosshairType='x'
			colors={theme === 'light' ? '#000' : '#fff'}
			onMouseMove={handlePointHover}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			animate={false}
			motionConfig={'default'}
			sliceTooltip={({ slice }) => {
				currentPoint.current = slice.points;
				return (
					<div
						className={`px-2 py-1 text-xs text-white bg-black rounded-sm `}
					>
						{slice.points[0].data.x.toLocaleString('en-US')}
					</div>
				);
			}}
			layers={[
				CustomPoints,
				'grid',
				'markers',
				'areas',
				'crosshair',
				'lines',
				'slices',
				'axes',
				'points',
				'legends',
			]}
		/>
	);
};

export default Chart;
