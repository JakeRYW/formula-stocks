'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { FormError } from '@/app/auth/components/form-error';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaTwitch } from 'react-icons/fa';
import { BarChart2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export function LoginForm() {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider'
			: '';

	return (
		<>
			<div className='min-h-[calc(100vh-88px)] flex items-center justify-center '>
				<Card
					className='mx-auto max-w-sm w-full'
					onClick={(e) => {
						e.stopPropagation();
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
						<div className='grid gap-4'>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								onClick={() => signIn('google')}
							>
								<FcGoogle size={23} /> Google
							</Button>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								onClick={() => signIn('discord')}
							>
								<FaDiscord color='5661ea' size={23} /> Discord
							</Button>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								onClick={() => signIn('github')}
							>
								<FaGithub size={23} /> Github
							</Button>
							<Button
								variant='outline'
								className='w-full gap-2 font-semibold'
								onClick={() => signIn('twitch')}
							>
								<FaTwitch color='6441a5' size={23} /> Twitch
							</Button>
							<FormError message={urlError} />
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
