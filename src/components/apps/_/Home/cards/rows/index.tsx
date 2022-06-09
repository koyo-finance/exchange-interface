import React from 'react';
import KoyoPriceCard from '../KoyoPriceCard';
import KYOLockedCard from '../KYOLockedCard';
import MostActivePoolCard from '../MostActivePoolCard';
import TotalLiquidityCard from '../TotalLiquidityCard';

const HomeCardsRows: React.FC = () => {
	return (
		<>
			<div className="mt-12 flex w-full flex-row flex-wrap justify-evenly gap-10 lg:mt-2">
				<TotalLiquidityCard />
				<MostActivePoolCard />
				<KoyoPriceCard />
			</div>
			<div className="mt-10 flex w-full flex-row items-center justify-center">
				<KYOLockedCard />
			</div>
		</>
	);
};

export default HomeCardsRows;
