import { SidebarNav } from './components/sidebar-nav';

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
			<div className='sm:space-y-6 p-3 sm:p-10 sm:pb-16 block'>
				<div className='space-y-0.5 mb-8 sm:block hidden'>
					<h2 className='text-3xl font-bold tracking-tight'>
						Account
					</h2>
				</div>
				<div className='flex flex-col space-y-0 sm:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5 sm:block hidden'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex justify-center w-full'>
						<div className='max-w-3xl w-full'>{children}</div>
					</div>
				</div>
			</div>
		</>
	);
}
