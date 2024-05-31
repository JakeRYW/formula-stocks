import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function AdminHeader() {
	return (
		<header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
			<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<Link
					href='#'
					className='flex items-center gap-2 text-lg font-semibold md:text-base'
				>
					<Shield className='h-6 w-6' />
					<span className='sr-only'>Admin Dashboard</span>
				</Link>
				<Link
					href='/admin/dashboard'
					className='text-foreground transition-colors hover:text-foreground'
				>
					Dashboard
				</Link>
				<Link
					href='/admin/users'
					className='text-muted-foreground transition-colors hover:text-foreground'
				>
					Users
				</Link>
				<Link
					href='#'
					className='text-muted-foreground transition-colors hover:text-foreground'
				>
					Stocks
				</Link>
				<Link
					href='#'
					className='text-muted-foreground transition-colors hover:text-foreground'
				>
					Analytics
				</Link>
			</nav>
		</header>
	);
}
