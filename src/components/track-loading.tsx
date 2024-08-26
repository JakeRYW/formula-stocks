import HungaroringLoader from './loading-spinner/tracks/hungaroring';
import MonzaLoader from './loading-spinner/tracks/monza';
import RedbullLoader from './loading-spinner/tracks/redbull';

export default function TrackLoadingSpinner() {
	const facts = [
		'Jenson Button recieved a 70-place grid penalty at the 2015 Mexican GP',
		'Lewis Hamilton has won the most races in the history of the F1 World Championship',
		'Brawn GP won every WDC and WCC they competed in',
		'A modern F1 car is made up of 80,000 components',
	];

	const loaders = [HungaroringLoader, MonzaLoader, RedbullLoader];
	const RandomLoader = loaders[Math.floor(Math.random() * loaders.length)];

	return (
		<div className='flex flex-col justify-center'>
			<RandomLoader />

			<div className='flex justify-center'>
				<p className='font-semibold opacity-35 text-center text-xs -mt-5 max-w-56'>
					{facts[Math.floor(Math.random() * facts.length)]}
				</p>
			</div>
		</div>
	);
}
