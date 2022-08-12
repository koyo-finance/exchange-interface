import { SwapTypes } from '@balancer-labs/sor';
import { BigNumber } from 'ethers';
import { useRoutedSwap } from 'hooks/SOR/useRoutedSwap';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectTokenOne, selectTokenTwo } from 'state/reducers/selectedTokens';
import SwapCardKoyoSORContent from './koyo/SwapCardKoyoSORContent';

export type SORSwapMutation = ReturnType<typeof useRoutedSwap>['mutate'];
export type SORSwapStatus = ReturnType<typeof useRoutedSwap>['status'];

export interface SwapWrapped {
	swapFunction: (amount: BigNumber) => ReturnType<SORSwapMutation>;
	status: SORSwapStatus;
	content: React.FC;
}

export interface SwapWrapperProps {
	children: ((sw: SwapWrapped) => React.ReactNode) | React.ReactNode;
}

const SwapWrapper: React.FC<SwapWrapperProps> = ({ children }) => {
	const { accountAddress, signer } = useWeb3();

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const { mutate: swapSORMutation, status: swapStatusSOR } = useRoutedSwap(signer);

	const swapSOR = (amount: BigNumber) =>
		swapSORMutation({
			options: {
				tokenIn: tokenOne.address,
				tokenOut: tokenTwo.address,
				amount,
				swapType: SwapTypes.SwapExactIn,
				funds: {
					sender: accountAddress,
					fromInternalBalance: false,
					recipient: accountAddress,
					toInternalBalance: false
				}
			}
		});

	return (
		<>
			{typeof children === 'function'
				? children({
						swapFunction: swapSOR,
						status: swapStatusSOR,
						content: SwapCardKoyoSORContent
				  })
				: null}
		</>
	);
};

export default SwapWrapper;
