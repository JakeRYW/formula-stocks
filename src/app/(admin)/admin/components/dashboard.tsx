'use client';

import AdminTable from './admin-table/admin-table';
import { useState } from 'react';
import { TableStock } from '@/types';

type StockTableProps = {
	stockData: TableStock[];
};

export default function StockTable({ stockData }: StockTableProps) {
	const [data, setData] = useState(stockData);

	return <AdminTable data={data} setData={setData} />;
}
