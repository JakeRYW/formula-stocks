'use client';

import Link from 'next/link';

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
import { FormError } from '@/app/(auth)/login/components/form-error';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaTwitch } from 'react-icons/fa';
import { FormSuccess } from '@/app/(auth)/login/components/form-success';
import { login } from '@/app/actions/auth';
import { BarChart2 } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { LoginForm } from './login-form';

interface LoginModalProps {
	setShowLoginModal: Function;
}

export function LoginModal({ setShowLoginModal }: LoginModalProps) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<String | undefined>('');
	const [success, setSuccess] = useState<String | undefined>('');

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			login(values).then((data) => {
				console.log(data);
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};

	return (
		<>
			<div
				className='bg-black/30 absolute w-screen h-screen z-50 flex items-center justify-center'
				onClick={() => {
					setShowLoginModal(false);
				}}
			>
				<LoginForm />
			</div>
		</>
	);
}
