'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import '@tanstack/react-table';

import { useState } from 'react';
import Link from 'next/link';

export type Streamer = {
	id: string;
	name: string;
	symbol: string;
	price: number;
	category: string;
	dateAdded: string;
};

export const columns: ColumnDef<Streamer>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Name
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'symbol',
		header: 'Symbol',
		cell: ({ row }) => {
			return <div className='font-medium'>{row.getValue('symbol')}</div>;
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === 'asc')
				}
			>
				Price
				<ArrowUpDown className='w-4 h-4 ml-2' />
			</Button>
		),
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(price);

			return <div className='text-left pl-4'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === 'asc')
				}
			>
				category
				<ArrowUpDown className='w-4 h-4 ml-2' />
			</Button>
		),
		cell: ({ row }) => {
			return (
				<div className='text-left pl-4'>
					{row.getValue('category').toUpperCase()}
				</div>
			);
		},
	},
	{
		accessorKey: 'dateAdded',
		header: 'Date Added',
	},
	{
		id: 'actions',
		cell: ({ row, table }) => {
			const { toast } = useToast();
			const [confirmed, setConfirmed] = useState(false);

			const streamer = row.original;

			async function handleDelete(id: string) {
				const res = await fetch(
					`http://localhost:3000/api/stocks/${id}`,
					{
						method: 'DELETE',
					}
				);

				if (res.ok) {
					table.options.meta?.setData(
						table.options.meta?.data.filter((row) => row.id !== id)
					);
				} else {
					if (res.status === 404) {
						toast({
							variant: 'destructive',
							title: 'Uh oh! Something went wrong.',
							description: 'No streamer found.',
						});
					} else if (!res.ok) {
						toast({
							variant: 'destructive',
							title: 'Uh oh! Something went wrong.',
							description:
								'There was a problem deleting the streamer.',
						});
					}
				}
			}

			return (
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='w-8 h-8 p-0'>
								<span className='sr-only'>Open Menu</span>
								<MoreHorizontal className='w-4 h-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem>Update stock</DropdownMenuItem>
							<DialogTrigger asChild>
								<DropdownMenuItem>
									Delete stock
								</DropdownMenuItem>
							</DialogTrigger>

							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link
									href={`/stock/${streamer.name
										.toLowerCase()
										.replace(' ', '-')}`}
								>
									View stock page
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle className='text-2xl text-center'>{`Delete ${streamer.name}`}</DialogTitle>
							<DialogDescription className='text-center'>
								<span className='mt-2 text-center'>
									{`This cannot be undone. Are you sure you want to permanetly remove ${streamer.name} from the user database?`}
								</span>
								<span className='block mt-3 text-center'>
									Please type
									<span className='font-semibold '>{` 'Delete' `}</span>
									to confirm.
								</span>
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid items-center grid-cols-4 gap-4'>
								<Label htmlFor='confirm' className='text-right'>
									Confirm
								</Label>
								<Input
									id='confirm'
									className='col-span-3'
									onChange={(e) => {
										if (e.target.value === 'Delete') {
											setConfirmed(true);
										} else {
											setConfirmed(false);
										}
									}}
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									disabled={!confirmed}
									variant={'destructive'}
									onClick={() => handleDelete(streamer.id)}
								>{`Delete ${streamer.name}`}</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			);
		},
	},
];
