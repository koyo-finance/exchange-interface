import { useCreateOrder } from '@koyofinance/momiji-hooks';
import { BigNumber } from 'ethers';
import { useRoutedSwap } from 'hooks/SOR/useRoutedSwap';
import { useSwapMomiji } from 'hooks/swap/useSwapMomiji';
import { useSwapSOR } from 'hooks/swap/useSwapSOR';
import { SwapFormValues } from 'pages/swap';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectMomijiUsage } from 'state/reducers/swap';
import SwapCardKoyoSORContent from './koyo/SwapCardKoyoSORContent';
import SwapCardMomijiContent from './momiji/SwapCardMomijiContent';

export type SORSwapMutation = ReturnType<typeof useRoutedSwap>['mutate'];
export type SORSwapStatus = ReturnType<typeof useRoutedSwap>['status'];

export type MomijiSwapMutation = ReturnType<typeof useCreateOrder>['mutate'];
export type MomijiSwapStatus = ReturnType<typeof useCreateOrder>['status'];

export interface SwapWrapped {
	swapFunction: (amount: BigNumber, quote?: SwapFormValues['quote']) => ReturnType<SORSwapMutation | MomijiSwapMutation>;
	status: SORSwapStatus | MomijiSwapStatus;
	content: React.FC;
}

export interface SwapWrapperProps {
	children: ((sw: SwapWrapped) => React.ReactNode) | React.ReactNode;
}

const SwapWrapper: React.FC<SwapWrapperProps> = ({ children }) => {
	const momijiEnabled = useSelector(selectMomijiUsage);

	const { swapSOR, swapStatusSOR } = useSwapSOR();
	const { swapMomiji, swapStatusMomiji } = useSwapMomiji();

	return (
		<>
			{typeof children === 'function'
				? children({
						swapFunction: momijiEnabled ? swapMomiji : swapSOR,
						status: momijiEnabled ? swapStatusMomiji : swapStatusSOR,
						content: momijiEnabled ? SwapCardMomijiContent : SwapCardKoyoSORContent
				  })
				: null}
		</>
	);
};

export default SwapWrapper;
