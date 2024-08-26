import { getAchievements, getUserAchievements } from '@/app/actions/actions';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { MdStars } from 'react-icons/md';

export default async function Page() {
	const achievements = await getAchievements();
	const userAchievements = await getUserAchievements();

	const unlockedAchievements = userAchievements ? userAchievements.length : 0;
	const totalAchievements = achievements.length;

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Achievements</CardTitle>
					<CardDescription>
						Unlock achievements by hitting certain milestones in the
						app.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col items-start space-y-2 mb-6'>
						<div className='flex flex-row justify-between w-full'>
							<p>{`${unlockedAchievements} of ${totalAchievements} achievements unlocked`}</p>
							<p>{`${Math.floor(
								(unlockedAchievements / totalAchievements) * 100
							)}%`}</p>
						</div>
						<Progress
							value={
								(unlockedAchievements / totalAchievements) * 100
							}
						/>
					</div>
					<Separator className='mb-6' />
					<div className='flex flex-col space-y-5'>
						{achievements.map((achievement) => {
							const isUnlocked =
								userAchievements?.some(
									(ua) => ua.achievementId === achievement.id
								) ?? false;
							return (
								<>
									<Achievement
										key={achievement.id}
										title={achievement.name}
										description={achievement.description}
										unlocked={isUnlocked}
										unlocked_at={
											userAchievements?.find(
												(userAchievement) =>
													userAchievement.achievementId ===
													achievement.id
											)?.unlocked_at
										}
									/>
									<Separator />
								</>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</>
	);
}

function Achievement({
	title,
	description,
	unlocked,
	unlocked_at,
}: {
	title: string;
	description: string;
	unlocked: boolean;
	unlocked_at?: string | null;
}) {
	return (
		<div className='flex items-center space-x-4'>
			<MdStars
				className='w-8 h-8 text-foreground'
				color={unlocked ? '#ffbb00' : ''}
			/>
			<div className='flex flex-col space-y-0 tracking-tight leading-5  w-full'>
				<div className='flex flex-row justify-between'>
					<h3
						className={`font-bold ${
							!unlocked ? 'text-muted-foreground' : 'text-primary'
						}`}
					>
						{title}
					</h3>
					<p className='text-sm text-muted-foreground sm:block hidden'>
						{formatUnlockDate(unlocked, unlocked_at)}
					</p>
				</div>
				<p
					className={`${
						!unlocked ? 'text-muted-foreground' : 'text-primary'
					}`}
				>
					{description}
				</p>
			</div>
		</div>
	);
}

function formatUnlockDate(
	unlocked: boolean,
	unlocked_at: string | null | undefined
): string {
	if (!unlocked || !unlocked_at) return '';

	const date = new Date(unlocked_at);
	return `Unlocked ${date.toLocaleDateString()}, ${date.toLocaleTimeString(
		[],
		{
			hour: '2-digit',
			minute: '2-digit',
		}
	)}`;
}
