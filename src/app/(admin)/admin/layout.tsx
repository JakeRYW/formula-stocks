import AdminHeader from './components/admin-header';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AdminHeader />
			<main>{children}</main>
		</>
	);
}
