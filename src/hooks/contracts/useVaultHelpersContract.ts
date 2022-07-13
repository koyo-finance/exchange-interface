import { ChainId } from '@koyofinance/core-sdk';
import { ChainVaultHelpers } from 'constants/contracts';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { KoyoHelpers__factory } from 'types/contracts/exchange';

export default function useVaultHelpersContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return KoyoHelpers__factory.connect(
		ChainVaultHelpers[activeChainId || chainId || ChainId.BOBA] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
