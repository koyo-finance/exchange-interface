import { SwapTypes } from '@balancer-labs/sor';
import { useCreateOrder } from '@koyofinance/momiji-hooks';
import { OrderBalance, Signer as MomijiSigner } from '@koyofinance/momiji-sdk';
import { BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useRoutedSwap } from 'hooks/SOR/useRoutedSwap';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapFormValues } from 'pages/swap';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectTokenOne, selectTokenTwo } from 'state/reducers/selectedTokens';
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
	const { accountAddress, signer } = useWeb3();

	const momijiEnabled = useSelector(selectMomijiUsage);

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const { mutate: swapMutationSOR, status: swapStatusSOR } = useRoutedSwap(signer);
	const { mutate: swapMutationMomiji, status: swapStatusMomiji, data: orderIdMomiji } = useCreateOrder(signer as MomijiSigner);

	const swapSOR = (amount: BigNumber) =>
		swapMutationSOR({
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

	const swapMomiji = (_amount: BigNumber, quote?: SwapFormValues['quote']) =>
		quote
			? swapMutationMomiji({
					order: {
						kind: quote.quote.kind,
						receiver: getAddress(accountAddress),
						partiallyFillable: quote.quote.partiallyFillable,
						sellToken: getAddress(quote.quote.sellToken),
						sellAmount: quote.quote.sellAmount,
						sellTokenBalance: OrderBalance.ERC20,
						buyToken: getAddress(quote.quote.buyToken),
						buyTokenBalance: OrderBalance.ERC20,
						buyAmount: quote.quote.buyAmount,
						feeAmount: quote.quote.feeAmount,
						validTo: parseInt(quote.quote.validTo, 10)
					}
			  })
			: null;

	useEffect(() => {
		if (orderIdMomiji)
			toast(() => (
				<span>
					<a
						className="text-lights-400 underline"
						target="_blank"
						href={`https://explorer.momiji.exchange/tx/${orderIdMomiji}`}
						rel="noreferrer"
					>
						Explorer
					</a>
				</span>
			));
	}, [orderIdMomiji]);

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
