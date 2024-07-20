import { getPortfolioValue, getUserBalance } from '@/app/actions/actions';
import SideBarContent from './side-bar-content';

export default async function SideBar() {
	const balance = await getUserBalance();
	const portfolioValue = await getPortfolioValue();
	const netWorth = Number(balance) + Number(portfolioValue);

	return (
		<>
			<SideBarContent
				balance={balance}
				portfolioValue={portfolioValue}
				networth={netWorth}
			/>
		</>
	);
}
