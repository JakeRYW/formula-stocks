'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import { useEffect, useState, useTransition } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormError } from '@/app/auth/components/form-error';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaTwitch } from 'react-icons/fa';
import { FormSuccess } from '@/app/auth/components/form-success';
import { login } from '@/app/actions/auth';
import { BarChart2 } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export function LoginForm() {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider'
			: '';

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	return (
		<>
			<div className='min-h-[calc(100vh-88px)] flex items-center justify-center '>
				<Card
					className='mx-auto max-w-sm w-full'
					onClick={(e) => {
						e.stopPropagation();
						console.log('actual click');
					}}
				>
					<CardHeader>
						<CardTitle className='text-2xl flex flex-row items-center justify-center'>
							<BarChart2 className='mr-2' />
							FormulaStocks
						</CardTitle>
						<CardDescription className='flex justify-center'>
							Continue with a social login below
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* <Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid gap-4'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='user@example.com'
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='password'
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormError message={error} />
								<FormSuccess message={success} />
								<Button
									type='submit'
									className='w-full'
									disabled={isPending}
								>
									Login
								</Button>
								<div className='grid gap-2'>
									<div className='flex items-center w-full gap-x-2'>
										<Button
											variant='outline'
											className='w-1/2'
											disabled={isPending}
										>
											<FaGoogle />
										</Button>
										<Button
											variant='outline'
											className='w-1/2'
											disabled={isPending}
										>
											<BsTwitterX />
										</Button>
										<Button
											variant='outline'
											className='w-1/2'
											disabled={isPending}
										>
											<FaDiscord />
										</Button>
									</div>
									<div className='mt-4 text-center text-sm'>
										Don&apos;t have an account?{' '}
										<Link
											href='/register'
											className='underline'
										>
											Sign up
										</Link>
									</div>
								</div>
							</div>
						</form>
					</Form> */}
						<div className='grid gap-4'>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								onClick={() => signIn('google')}
								disabled={isPending}
							>
								<FcGoogle size={23} /> Google
							</Button>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								onClick={() => signIn('discord')}
								disabled={isPending}
							>
								<FaDiscord color='5661ea' size={23} /> Discord
							</Button>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								disabled={isPending}
								onClick={() => signIn('github')}
							>
								<FaGithub size={23} /> Github
							</Button>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								onClick={() => signIn('twitch')}
								disabled={isPending}
							>
								<FaTwitch color='6441a5' size={23} /> Twitch
							</Button>
							<FormError message={error || urlError} />
							<FormSuccess message={success} />
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
