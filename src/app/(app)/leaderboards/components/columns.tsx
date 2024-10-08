'use client';

import { ColumnDef } from '@tanstack/react-table';

type User = {
	name: String | null;
	netWorth: Number;
	portfolioSize: Number;
};

export const columns: ColumnDef<User>[] = [
	{
		header: 'Rank',
		cell: ({ row }) => {
			return <div className=''>{row.index + 1}</div>;
		},
	},
	{
		accessorKey: 'name',
		header: 'Username',
	},
	{
		accessorKey: 'netWorth',
		header: 'Net Worth',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('netWorth'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'portfolioSize',
		header: 'Portfolio Size',
		cell: ({ row }) => {
			return (
				<div>{`${row.getValue('portfolioSize')} ${
					Number(row.getValue('portfolioSize')) === 1
						? 'stock'
						: 'stocks'
				}`}</div>
			);
		},
	},
];
