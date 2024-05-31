import { auth } from '@/lib/auth';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';

export default async function AccountPage() {
	const session = await auth();

	if (!session) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className='space-y-6'>
				<div>
					<h3 className='text-lg font-medium'>Profile</h3>
					<p className='text-sm text-muted-foreground'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<Separator />
				<ProfileForm session={session} />
			</div>
		</>
	);
}
