'use client';

import AdminTable from './admin-table/admin-table';
import { useState } from 'react';

// TODO Refactor this out to types folder
type TableStock = {
	id: string;
	name: string;
	symbol: string;
	price: string;
	category: string;
};

type StockTableProps = {
	stockData: TableStock[];
};

export default function StockTable({ stockData }: StockTableProps) {
	const [data, setData] = useState(stockData);

	return <AdminTable data={data} setData={setData} />;
}
