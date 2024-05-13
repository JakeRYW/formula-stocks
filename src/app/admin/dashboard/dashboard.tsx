'use client';

import AdminTable from './components/admin-table/admin-table';
import AddStockForm from './components/add-stock-form';
import { useState } from 'react';

export default function Dashboard({ apiData }) {
	const [data, setData] = useState(apiData);

	return (
		<div className='flex flex-col w-full px-10 lg:flex-row'>
			<div className='w-full px-10 mt-10'>
				<div className='bg-white rounded-lg shadow-md outline outline-1 outline-[#e4e4e7]'>
					<div className='p-5'>
						<AdminTable data={data} setData={setData} />
					</div>
				</div>
			</div>
			<div className='mt-10'>
				<AddStockForm data={data} setData={setData} />
			</div>
		</div>
	);
}
