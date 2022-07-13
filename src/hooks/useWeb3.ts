import { Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import { Signer } from 'ethers';
import { Chain, useAccount, useNetwork, useProvider, useSigner } from 'wagmi';
import useProviders from './useProviders';

export type WagmiAccountStatus = 'connected' | 'reconnecting' | 'connecting' | 'disconnected';
export interface Web3State {
	status: WagmiAccountStatus;
	isConnected: boolean;

	accountAddress: string;
	signer?: Signer;

	provider: Provider;
	defaultedProvider: Provider;

	chain?: Chain & { unsupported?: boolean };
	chains: Chain[];
	chainId: ChainId;
}

export function useWeb3(): Web3State {
	const { address, status, isConnected } = useAccount();
	const { data: signer } = useSigner();
	const { chain, chains } = useNetwork();

	const chainId: ChainId = (!chain?.unsupported && chain?.id) || DEFAULT_CHAIN;

	const providers = useProviders();
	const provider = useProvider();
	const defaultedProvider = providers[chainId] || providers[DEFAULT_CHAIN]!;

	return {
		status,
		isConnected,

		accountAddress: address || '',
		signer: signer || undefined,

		provider,
		defaultedProvider,

		chain,
		chains,
		chainId
	};
}
