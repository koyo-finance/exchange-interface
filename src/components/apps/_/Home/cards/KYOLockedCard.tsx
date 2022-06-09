import { formatAmount, fromBigNumber } from '@koyofinance/core-sdk';
import InfoCard from 'components/UI/Cards/HomePage/InfoCard';
import { kyoContract, votingEscrowContract } from 'core/contracts';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import React from 'react';

const KYOLockedCard: React.FC = () => {
	const { data: kyoLocked = 0 } = useTokenBalance(votingEscrowContract.address, kyoContract.address);

	return <InfoCard data="KŌYŌ LOCKED" value={formatAmount(fromBigNumber(kyoLocked))} />;
};

export default KYOLockedCard;
