'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const stockFormSchema = z.object({
	username: z
		.string()
		.min(4, { message: 'Username must be at least 4 characters' })
		.max(25),
	symbol: z
		.string()
		.min(3, { message: 'Symbol must be at least 3 letters' })
		.max(5, { message: 'Symbol can only contain 5 letters' })
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: 'Symbol can only contain letters.',
		}),
	price: z.coerce
		.number()
		.positive({ message: 'Initial price must be greater than zero.' })
		.lte(5000, { message: 'Initial price must not exceed 5000' }),
});

type StockFormValues = z.infer<typeof stockFormSchema>;

export default function AddStockForm({ data, setData }) {
	const [isLoading, setIsLoading] = useState(false);
	const [addStockError, setAddStockError] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof stockFormSchema>>({
		resolver: zodResolver(stockFormSchema),
		defaultValues: {
			username: '',
			symbol: '',
			price: undefined,
		},
	});

	async function onSubmit(values: StockFormValues) {
		setIsLoading(true);
		try {
			const data = {
				username: values.username,
				symbol: values.symbol,
				price: values.price,
			};

			const response = await fetch('http://localhost:3000/api/stocks', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			if (response.status === 409) throw new Error('exists');

			const responseJson = await response.json();
			const addedStreamerData = responseJson[0];

			const addedStreamer = {
				id: addedStreamerData.id,
				name: addedStreamerData.name,
				symbol: addedStreamerData.symbol,
				price: addedStreamerData.price,
				followers: addedStreamerData.followers,
				dateAdded: new Date(
					addedStreamerData.date_added
				).toLocaleDateString('en-US'),
			};

			setData((currentData) => [...currentData, addedStreamer]);
			toast({
				description: `Successfully added ${addedStreamer.name}!`,
			});
		} catch (error) {
			// ! SHOULD PROBABLY JUST CHECK THIS CLIENT SIDE
			// ! SINCE WE ALREADY HAVE THE DATA PULLED BUT ITS KINDA COOL
			if (error instanceof Error) {
				if (error.message === 'exists') {
					toast({
						variant: 'destructive',
						title: 'Uh oh! Something went wrong.',
						description:
							'The streamer you are trying to add already exists!',
					});
				} else {
					toast({
						variant: 'destructive',
						title: 'Uh oh! Something went wrong.',
						description: 'There was a problem adding the streamer.',
					});
				}
			}
		}

		setIsLoading(false);
	}

	function handleSymbolInput(e: React.KeyboardEvent<HTMLInputElement>) {
		// Allow only alphabetic characters
		const isAlphabetic = /^[a-zA-Z]+$/.test(e.key);

		if (!isAlphabetic) {
			e.preventDefault();
		}
	}

	return (
		<>
			<div className='bg-white rounded-lg shadow-md h-fit outline outline-1 outline-[#e4e4e7]'>
				<div className='px-20 py-5'>
					<h2 className='pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0'>
						Add New Stock
					</h2>
					<div className='mt-6'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-8'
							>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													placeholder='Chummy'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												The username of the streamer you
												wish to add.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='symbol'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Symbol</FormLabel>
											<FormControl>
												<Input
													placeholder='CHUM'
													{...field}
													maxLength={5}
													type='text'
													onKeyDown={
														handleSymbolInput
													}
												/>
											</FormControl>
											<FormDescription>
												The symbol of the stock. This
												must be between 3 and 6 letters.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='price'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Initial Price</FormLabel>
											<FormControl>
												<Input
													placeholder='420.69'
													{...field}
													type='number'
													step={0.01}
													min={0}
													value={field.value ?? ''}
												/>
											</FormControl>
											<FormDescription>
												The intial price of the stock.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' disabled={isLoading}>
									{isLoading ? (
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />
									) : (
										''
									)}
									{isLoading ? 'Please Wait' : 'Submit'}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}
