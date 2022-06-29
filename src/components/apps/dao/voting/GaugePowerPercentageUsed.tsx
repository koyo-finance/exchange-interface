import { BigNumber } from 'ethers';
import useGetUserVoteGaugeSlope from 'hooks/KYO/gauges/useGetUserVoteGaugeSlope';
import React from 'react';

export interface GaugePowerPercentageUsedProps {
	account?: string;
	gauge?: string;
}

const GaugePowerPercentageUsed: React.FC<GaugePowerPercentageUsedProps> = ({ account, gauge }) => {
	const { data: slope = [BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)] } = useGetUserVoteGaugeSlope(account, gauge);

	if (account && gauge) return <>{slope[1].div(100).toString()}%</>;

	return <>?</>;
};

export default GaugePowerPercentageUsed;
