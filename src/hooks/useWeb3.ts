import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { Chain, useAccount, useNetwork, useProvider, useSigner } from 'wagmi';

export type WagmiAccountStatus = 'connected' | 'reconnecting' | 'connecting' | 'disconnected';
export interface Web3State {
	status: WagmiAccountStatus;
	isConnected: boolean;

	accountAddress: string;
	signer?: Signer;
	provider: Provider;

	chain?: Chain & { unsupported?: boolean };
	chains: Chain[];
}

export function useWeb3(): Web3State {
	const { address, status, isConnected } = useAccount();
	const { data: signer } = useSigner();
	const provider = useProvider();
	const { chain, chains } = useNetwork();

	return {
		status,
		isConnected,

		accountAddress: address || '',
		signer: signer || undefined,
		provider,

		chain,
		chains
	};
}
