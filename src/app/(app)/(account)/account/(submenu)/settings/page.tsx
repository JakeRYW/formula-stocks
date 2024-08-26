import { cookies } from 'next/headers';

import { auth } from '@/lib/auth';
import { ProfileForm } from '../../profile-form';
import { SettingsForm } from './components/SettingsForm';

export default async function Page() {
	const session = await auth();

	if (!session) {
		return <div>Loading...</div>;
	}

	const cookieStore = cookies();
	const graphStyle = cookieStore.get('graphStyle');

	function handleGraphStyleChange(event: any) {
		// cookieStore.set('graphStyle', value);
		console.log(event);
	}

	return (
		<div className='space-y-6'>
			<ProfileForm session={session} />
			<SettingsForm />
		</div>
	);
}
