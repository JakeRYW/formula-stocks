import { getStocks } from '@/app/actions/actions';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default async function DriversPage() {
	const stocks = await getStocks();

	return (
		<>
			<main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
				<div className='mt-10 flex items-center justify-center flex-col'>
					<h2 className='text-5xl font-semibold'>Driver List</h2>
					<div className='container mx-auto py-10'>
						<div className='bg-white rounded-lg shadow-md outline outline-1 outline-[#e4e4e7]'>
							<div className='p-5'>
								<DataTable
									columns={columns}
									data={stocks ? stocks : []}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
