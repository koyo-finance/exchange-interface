import { Signer } from 'ethers';
import { useAccount, useSigner } from 'wagmi';

export type WagmiAccountStatus = 'connected' | 'reconnecting' | 'connecting' | 'disconnected';
export interface Web3State {
	status: WagmiAccountStatus;
	isConnected: boolean;

	accountAddress: string;
	signer?: Signer;
}

export function useWeb3(): Web3State {
	const { address, status, isConnected } = useAccount();
	const { data: signer } = useSigner();

	return {
		status,
		isConnected,

		accountAddress: address || '',
		signer: signer || undefined
	};
}
