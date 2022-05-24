import type { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { ONTOConnector } from './connectors/onto';

export interface OntoOptions {
	chains: Chain[];
	shimDisconnect?: boolean;
}

export const onto = ({ chains, shimDisconnect }: OntoOptions): Wallet => ({
	id: 'onto',
	name: 'ONTO',
	iconUrl: 'https://tassets.koyo.finance/wallets/onto.png',
	iconBackground: '#fff',
	createConnector: () => ({
		connector: new ONTOConnector({
			chains,
			options: { shimDisconnect }
		})
	})
});
