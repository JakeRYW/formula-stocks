'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

import {
	Twitch,
	BarChart2,
	Folder,
	Home,
	Shield,
	ListOrdered,
	Podcast,
	UserRound,
	LogOut,
	Moon,
	Settings,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from './mode-toggle';

import { useState } from 'react';

interface HeaderProps {
	session: Session | null;
}

export default function Header({ session: data }: HeaderProps) {
	const username = data?.user?.name;

	const { setTheme, theme } = useTheme();
	const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

	const closeMenu = () => {
		setHamburgerMenuOpen(false);
	};

	const handleClickMenu = () => {
		setHamburgerMenuOpen(!hamburgerMenuOpen);
	};

	const handleThemeChange = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	const handleTwitchSignIn = async () => {
		await signIn('twitch');
	};

	const handleTwitchSignOut = async () => {
		await signOut({ callbackUrl: '/', redirect: true });
	};

	return (
		<div className='relative z-50 bg-formulared shadow-md drop-shadow-md '>
			<nav className='flex flex-wrap items-center justify-between p-6 bg-formulared'>
				<div className='flex items-center flex-shrink-0 mr-6 text-white'>
					<BarChart2 />
					<span className='ml-2 text-xl font-semibold tracking-tight'>
						FormulaStocks
					</span>
				</div>
				<div className='block lg:hidden'>
					<button
						className='flex items-center px-3 py-2 text-white border border-white rounded hover:text-white hover:border-white'
						onClick={handleClickMenu}
					>
						<svg
							className='w-3 h-3 fill-current'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title>Menu</title>
							<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
						</svg>
					</button>
					{hamburgerMenuOpen ? (
						<div className='bg-white absolute h-fit pb-3 w-52 right-0 rounded-md mt-2 mr-2 z-50 dark:bg-[#1f1f23] dark:text-white'>
							<div className='flex flex-row ml-2 mt-3'>
								<Home />
								<Link
									href='/'
									className='text-black font-semibold ml-2 dark:text-white'
									onClick={closeMenu}
								>
									Home
								</Link>
							</div>
							<div className='flex flex-row ml-2 mt-3'>
								<UserRound />
								<Link
									href='/account'
									className='text-black font-semibold ml-2 dark:text-white'
									onClick={closeMenu}
								>
									Account
								</Link>
							</div>
							<div className='flex flex-row ml-2 mt-3'>
								<Podcast />
								<Link
									href='/drivers'
									className='text-black font-semibold ml-2 dark:text-white'
									onClick={closeMenu}
								>
									Drivers
								</Link>
							</div>
							<div className='flex flex-row ml-2 mt-3'>
								<ListOrdered />
								<Link
									href='/leaderboards'
									className='text-black font-semibold ml-2 dark:text-white'
									onClick={closeMenu}
								>
									Leaderboards
								</Link>
							</div>
							<div className='flex flex-row ml-2 mt-3'>
								<Shield />
								<Link
									href='/admin/dashboard'
									className='text-black font-semibold ml-2 dark:text-white'
									onClick={closeMenu}
								>
									Admin
								</Link>
							</div>
							<Separator className='w-[calc(100%-20px)] ml-3 mt-3 ' />
							<div className='flex flex-row ml-2 mt-3'>
								<Settings />
								<Link
									href='/admin/dashboard'
									className='text-black font-semibold ml-2 dark:text-white'
									onClick={closeMenu}
								>
									Settings
								</Link>
							</div>
							<div className='flex flex-row ml-2 mt-3'>
								<Moon />
								<Link
									href='/admin/dashboard'
									className='text-black font-semibold ml-2 dark:text-white'
									onClick={closeMenu}
								>
									Dark Theme
								</Link>
								<Switch
									className='ml-auto mr-2'
									onCheckedChange={handleThemeChange}
								/>
							</div>
							<Separator className='w-[calc(100%-20px)] ml-3 mt-3 dark:text-white' />
							<div className='flex flex-row ml-2 mt-3'>
								{data ? (
									<>
										<LogOut />
										<a
											className='text-black font-semibold ml-2 dark:text-white'
											onClick={handleTwitchSignOut}
										>
											Log Out
										</a>{' '}
									</>
								) : (
									<>
										<Twitch />
										<a
											className='text-black font-semibold ml-2 dark:text-white'
											onClick={handleTwitchSignIn}
										>
											Login with Twitch
										</a>{' '}
									</>
								)}
							</div>
						</div>
					) : (
						''
					)}
				</div>
				<div className='flex-grow hidden w-full lg:items-center lg:w-auto lg:flex'>
					<div className='text-md lg:flex-grow'>
						<div className='ml-4 -mb-1'>
							<Link
								href='/'
								className='block mt-4 mr-6 text-white border-b-2 border-formulared lg:inline-block lg:mt-0 hover:border-b-2 hover:border-white'
							>
								Home
							</Link>
							<Link
								href='/drivers'
								className='block mt-4 mr-6 text-white border-b-2 border-formulared lg:inline-block lg:mt-0 hover:border-b-2 hover:border-white'
							>
								Drivers
							</Link>
							<Link
								href='/leaderboards'
								className='block mt-4 mr-6 text-white border-b-2 border-formulared lg:inline-block lg:mt-0 hover:border-b-2 hover:border-white'
							>
								Leaderboards
							</Link>
						</div>
					</div>
					{data ? (
						<div className='flex flex-row items-center justify-center'>
							<div className='mr-4 flex items-center'>
								<Avatar>
									<AvatarImage
										src={data?.user?.image ?? undefined}
									/>
									<AvatarFallback>
										{username?.charAt(0)}
									</AvatarFallback>
								</Avatar>
								{/* <Image
									className='w-8 ml-3 rounded-full'
									src={data?.user?.image}
									width={32}
									height={32}
									alt={data?.user?.name}
								/> */}
								<p className='ml-3 font-semibold text-white'>
									{username}
								</p>
							</div>
							<Button
								variant={'outline'}
								className='bg-formulared text-white'
								onClick={handleTwitchSignOut}
							>
								Logout
							</Button>
						</div>
					) : (
						<div className='group'>
							<Button
								variant={'outline'}
								className='bg-formulared text-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'
								onClick={handleTwitchSignIn}
							>
								<Twitch className='w-5 h-5 mr-2 group-hover:text-purple-700' />{' '}
								Login with Twitch
							</Button>
						</div>
					)}
				</div>
				<div className='ml-2 hidden lg:block'>
					<ModeToggle />
				</div>
			</nav>
		</div>
	);
}
