import { useCreateOrder } from '@koyofinance/momiji-hooks';
import { OrderBalance, Signer as MomijiSigner } from '@koyofinance/momiji-sdk';
import { BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapFormValues } from 'pages/swap';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

export function useSwapMomiji() {
	const { accountAddress, signer } = useWeb3();

	const { mutate: swapMutationMomiji, status: swapStatusMomiji, data: orderIdMomiji } = useCreateOrder(signer as MomijiSigner);

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

	return { swapMomiji, swapStatusMomiji };
}
