import HungaroringLoader from './loading-spinner/tracks/hungaroring';
import MonzaLoader from './loading-spinner/tracks/monza';
import RedbullLoader from './loading-spinner/tracks/redbull';

export default function TrackLoadingSpinner() {
	// let track = Math.random() * (3 - 0) + 0;
	// let fact = Math.random() * (2 - 0) + 0;

	// switch (track) {
	// 	case 0: {
	// 		return <></>;
	// 	}
	// 	case 1: {
	// 		return <></>;
	// 	}
	// }

	return (
		<div className='flex flex-col justify-center'>
			{/* <HungaroringLoader /> */}
			{/* <RedbullLoader /> */}
			<MonzaLoader />

			<div className='flex justify-center'>
				<p className='font-semibold opacity-35 text-center text-xs -mt-5 max-w-56'>
					Jenson Button recieved a 70-place grid penalty at the 2015
					Mexican GP
				</p>
			</div>
		</div>
	);
}
