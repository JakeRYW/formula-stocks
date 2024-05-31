export default function DataBlock({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='w-full px-10 mt-10'>
			<div className='bg-white rounded-lg shadow-md outline outline-1 outline-[#e4e4e7]'>
				{children}
			</div>
		</div>
	);
}
