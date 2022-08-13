import { ChainId } from '@koyofinance/core-sdk';
import { CHAIN_VAULT, SupportedChainsList } from '@koyofinance/exchange-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { Vault__factory } from 'types/contracts/exchange';

export default function useVaultContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return Vault__factory.connect(
		CHAIN_VAULT[(activeChainId || chainId || DEFAULT_CHAIN) as SupportedChainsList] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
