'use client';

import { Stock } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { addOrdinalSuffix } from '@/lib/utils';

export const columns: ColumnDef<Stock>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'symbol',
		header: 'Symbol',
		cell: ({ row }) => {
			const symbol = row.getValue<String>('symbol');
			return <div className='font-medium'>{symbol}</div>;
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('price'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'change_1hr',
		header: 'Change (1H)',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('change_1hr'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return (
				<div
					className={`${
						amount >= 0 ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{formatted}
				</div>
			);
		},
	},
	{
		accessorKey: 'change_24hr',
		header: 'Change (1D)',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('change_24hr'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return (
				<div
					className={`${
						amount >= 0 ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{formatted}
				</div>
			);
		},
	},
	{
		accessorKey: 'championship_pos',
		header: 'Championship Position',
		cell: ({ row }) => {
			const pos: number = row.getValue('championship_pos');

			return <div>{addOrdinalSuffix(pos)}</div>;
		},
	},
	{
		accessorKey: 'points',
		header: 'Points',
	},
	{
		accessorKey: 'team',
		header: 'Team',
	},
];
