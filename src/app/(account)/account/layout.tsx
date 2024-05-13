import { SidebarNav } from './components/sidebar-nav';
import { Separator } from '@/components/ui/separator';

const sidebarNavItems = [
	{
		title: 'Portfolio',
		href: '/account/portfolio',
	},
	{
		title: 'History',
		href: '/account/history',
	},
	{
		title: 'Watchlist',
		href: '/account/watchlist',
	},
	{
		title: 'Achievements',
		href: '/account/achievements',
	},
	{
		title: 'Settings',
		href: '/account/settings',
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<div className='md:hidden'></div>
			<div className='hidden space-y-6 p-10 pb-16 md:block'>
				<div className='space-y-0.5'>
					<h2 className='text-2xl font-bold tracking-tight'>
						Account
					</h2>
					<p className='text-muted-foreground'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Nulla possimus porro voluptatem.
					</p>
				</div>
				<Separator className='my-6' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1 lg:max-w-2xl'>{children}</div>
				</div>
			</div>
		</>
	);
}
