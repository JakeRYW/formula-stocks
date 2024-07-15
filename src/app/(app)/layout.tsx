import SideBar from '@/components/side-bar/side-bar';
import { auth } from '@/lib/auth';

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<>
			<main>
				<div
					className={
						session?.user
							? 'grid min-h-[calc(100vh-88px)] w-full md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] bg-[#fafafa] dark:bg-[#0c0c0c]'
							: 'grid min-h-[calc(100vh-88px)] w-full bg-[#fafafa] dark:bg-[#0c0c0c]'
					}
				>
					{session?.user ? <SideBar /> : ''}
					{children}
				</div>
			</main>
		</>
	);
}
