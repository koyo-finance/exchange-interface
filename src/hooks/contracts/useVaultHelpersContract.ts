import { ChainId } from '@koyofinance/core-sdk';
import { CHAIN_VAULT_HELPERS, SupportedChainsList } from '@koyofinance/exchange-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { KoyoHelpers__factory } from 'types/contracts/exchange';

export default function useVaultHelpersContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return KoyoHelpers__factory.connect(
		CHAIN_VAULT_HELPERS[(activeChainId || chainId || DEFAULT_CHAIN) as SupportedChainsList] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
