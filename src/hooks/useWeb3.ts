import { Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { Signer } from 'ethers';
import { Chain, useAccount, useNetwork, useProvider, useSigner } from 'wagmi';
import useProviders, { bobaReadonlyProvider } from './useProviders';

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

	const chainId: ChainId = (!chain?.unsupported && chain?.id) || ChainId.BOBA;

	const providers = useProviders();
	const provider = useProvider();
	const defaultedProvider = providers[chainId] || bobaReadonlyProvider;

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
