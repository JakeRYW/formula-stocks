import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';

import { ThemeProvider } from '@/components/theme-provider';
import { auth } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'FormulaStocks',
	description: 'Buy and Sell your favorite drivers',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
			</head>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='light'>
					<header className='sticky top-0 z-40'>
						<Header session={session} />
					</header>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
