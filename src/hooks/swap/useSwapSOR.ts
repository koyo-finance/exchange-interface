import { SwapTypes } from '@balancer-labs/sor';
import { BigNumber } from 'ethers';
import { useRoutedSwap } from 'hooks/SOR/useRoutedSwap';
import { useWeb3 } from 'hooks/useWeb3';
import { useSelector } from 'react-redux';
import { selectTokenOne, selectTokenTwo } from 'state/reducers/selectedTokens';

export function useSwapSOR() {
	const { accountAddress, signer } = useWeb3();

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const { mutate: swapMutationSOR, status: swapStatusSOR } = useRoutedSwap(signer);

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

	return { swapSOR, swapStatusSOR };
}
