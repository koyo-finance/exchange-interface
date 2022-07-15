import { ChainId } from '@koyofinance/core-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import { ChainVault } from 'constants/contracts';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { Vault__factory } from 'types/contracts/exchange';

export default function useVaultContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return Vault__factory.connect(
		ChainVault[activeChainId || chainId || DEFAULT_CHAIN] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
