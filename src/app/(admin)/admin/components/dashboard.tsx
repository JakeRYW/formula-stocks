'use client';

import AdminTable from './admin-table/admin-table';
import { useState } from 'react';

export default function StockTable({ apiData }) {
	const [data, setData] = useState(apiData);

	return <AdminTable data={data} setData={setData} />;
}
