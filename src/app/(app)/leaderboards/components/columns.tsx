'use client';

import { Stock } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Stock>[] = [
	{
		accessorKey: 'name',
		header: 'Username',
	},
];
