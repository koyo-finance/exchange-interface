import type { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { ONTOWebConnector } from './connectors/ontoWeb';

export interface OntoOptions {
	chains: Chain[];
	shimDisconnect?: boolean;
}

export const ontoWeb = ({ chains, shimDisconnect }: OntoOptions): Wallet => ({
	id: 'onto-web',
	name: 'ONTO',
	iconUrl: 'https://tassets.koyo.finance/wallets/onto.png',
	iconBackground: '#fff',
	createConnector: () => ({
		connector: new ONTOWebConnector({
			chains,
			options: { shimDisconnect }
		})
	})
});
