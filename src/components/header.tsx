'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

import { ClipboardList, FolderClock, LogIn, Moon, Trophy } from 'lucide-react';
import {
	BarChart2,
	Folder,
	Home,
	ListOrdered,
	UserRound,
	LogOut,
	Settings,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from './mode-toggle';

import { useState } from 'react';
import { LoginModal } from './login-modal';

interface HeaderProps {
	session: Session | null;
}

export default function Header({ session: data }: HeaderProps) {
	const username = data?.user?.name;

	const { setTheme, theme } = useTheme();
	const [loginModal, setLoginModal] = useState(false);

	const handleThemeChange = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	return (
		<>
			<div>
				{loginModal ? (
					<LoginModal setShowLoginModal={setLoginModal} />
				) : (
					''
				)}
			</div>
			<header className='sticky top-0 z-40'>
				<div className='relative z-50 bg-formulared shadow-md drop-shadow-md '>
					<nav className='flex justify-between p-6 bg-formulared'>
						<div className='flex items-center flex-shrink-0 mr-6 text-white'>
							<BarChart2 />
							<span className='ml-2 text-xl font-semibold tracking-tight'>
								FormulaStocks
							</span>
						</div>
						<div className='flex-grow w-full lg:items-center lg:w-auto lg:flex'>
							<div className='text-md hidden lg:block lg:flex-grow'>
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
							<div className='flex flex-row items-center justify-end'>
								<div className='flex items-center'>
									{data ? (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<div>
													<div className='hidden lg:block'>
														<Avatar className='cursor-pointer select-none'>
															<AvatarImage
																src={
																	data?.user
																		?.image ??
																	undefined
																}
															/>
															<AvatarFallback>
																{username?.charAt(
																	0
																)}
															</AvatarFallback>
														</Avatar>
													</div>
													<div className='lg:hidden px-3 py-2 my-[0.313rem] text-white border border-white rounded hover:text-white hover:border-white'>
														<svg
															className='w-3 h-3 fill-current'
															viewBox='0 0 20 20'
															xmlns='http://www.w3.org/2000/svg'
														>
															<title>Menu</title>
															<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
														</svg>
													</div>
												</div>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												className='w-48'
												align='end'
											>
												<div className='lg:hidden'>
													<DropdownMenuItem asChild>
														<Link
															className='flex flex-row items-center'
															href={'/account'}
														>
															<Home
																width={20}
																className='mr-2'
															/>
															Home
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link
															className='flex flex-row items-center'
															href={'/account'}
														>
															<UserRound
																width={20}
																className='mr-2'
															/>
															Drivers
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link
															className='flex flex-row items-center'
															href={'/account'}
														>
															<ListOrdered
																width={20}
																className='mr-2'
															/>
															Leaderboards
														</Link>
													</DropdownMenuItem>
													<Separator />
												</div>
												<DropdownMenuItem asChild>
													<Link
														className='flex flex-row items-center'
														href={'/account'}
													>
														<UserRound
															width={20}
															className='mr-2'
														/>
														Profile
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														className='flex flex-row items-center'
														href={
															'/account/portfolio'
														}
													>
														<Folder
															width={20}
															className='mr-2'
														/>
														Portfolio
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														className='flex flex-row items-center'
														href={
															'/account/history'
														}
													>
														<FolderClock
															width={20}
															className='mr-2'
														/>
														History
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														className='flex flex-row items-center'
														href={
															'/account/watchlist'
														}
													>
														<ClipboardList
															width={20}
															className='mr-2'
														/>
														Watchlist
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														className='flex flex-row items-center'
														href={
															'/account/achievements'
														}
													>
														<Trophy
															width={20}
															className='mr-2'
														/>
														Achievements
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														className='flex flex-row items-center'
														href={
															'/account/settings'
														}
													>
														<Settings
															width={20}
															className='mr-2'
														/>
														Settings
													</Link>
												</DropdownMenuItem>
												<Separator />
												<DropdownMenuItem>
													<Moon
														width={20}
														className='mr-2'
													/>
													Dark Theme
												</DropdownMenuItem>
												<Separator />

												<DropdownMenuItem
													onClick={() => signOut()}
												>
													<LogOut
														width={20}
														className='mr-2'
													/>
													Log Out
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									) : (
										<>
											<div className='lg:hidden'>
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild
													>
														<div>
															<div className='hidden lg:block'>
																<Avatar className='cursor-pointer select-none'>
																	<AvatarImage
																		src={
																			data
																				?.user
																				?.image ??
																			undefined
																		}
																	/>
																	<AvatarFallback>
																		{username?.charAt(
																			0
																		)}
																	</AvatarFallback>
																</Avatar>
															</div>
															<div className='lg:hidden px-3 py-2 my-[0.313rem] text-white border border-white rounded hover:text-white hover:border-white'>
																<svg
																	className='w-3 h-3 fill-current'
																	viewBox='0 0 20 20'
																	xmlns='http://www.w3.org/2000/svg'
																>
																	<title>
																		Menu
																	</title>
																	<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
																</svg>
															</div>
														</div>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														className='w-48'
														align='end'
													>
														<DropdownMenuItem
															asChild
														>
															<Link
																className='flex flex-row items-center'
																href={'/'}
															>
																<Home
																	width={20}
																	className='mr-2'
																/>
																Home
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem
															asChild
														>
															<Link
																className='flex flex-row items-center'
																href={
																	'/drivers'
																}
															>
																<UserRound
																	width={20}
																	className='mr-2'
																/>
																Drivers
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem
															asChild
														>
															<Link
																className='flex flex-row items-center'
																href={
																	'/leaderboards'
																}
															>
																<ListOrdered
																	width={20}
																	className='mr-2'
																/>
																Leaderboards
															</Link>
														</DropdownMenuItem>
														<Separator />
														<DropdownMenuItem>
															<Moon
																width={20}
																className='mr-2'
															/>
															Dark Theme
														</DropdownMenuItem>
														<Separator />

														<DropdownMenuItem
															onClick={() =>
																setLoginModal(
																	true
																)
															}
														>
															<LogIn
																width={20}
																className='mr-2'
															/>
															Log In
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
											<div className='hidden lg:justify-end lg:flex'>
												<Button
													variant={'outline'}
													className='bg-formulared text-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'
													onClick={() =>
														setLoginModal(true)
													}
												>
													Login
												</Button>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</nav>
				</div>
			</header>
		</>
	);
}
