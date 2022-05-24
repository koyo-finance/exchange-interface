import { InjectedConnector, Chain } from '@wagmi/core';
import type { InjectedConnectorOptions } from '@wagmi/core/dist/declarations/src/connectors/injected';

export class ONTOConnector extends InjectedConnector {
	public readonly id: string = 'onto';
	public readonly name: string = 'Onto';

	// @ts-expect-error We know that "isONTO" could be present. https://publicdocs.gitbook.io/onto/integrate-onto-in-mobile-dapp
	public readonly ready = typeof window !== 'undefined' && Boolean(window?.ethereum) && Boolean(window?.ethereum?.isONTO);

	#provider?: Window['ethereum'];

	public constructor({
		chains,
		options = { shimDisconnect: true, name: 'Onto' }
	}: {
		chains?: Chain[];
		options?: InjectedConnectorOptions;
	} = {}) {
		super({ chains, options });

		this.id = 'onto';
		this.name = 'Onto';
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async getProvider() {
		if (this.ready) this.#provider = window.ethereum;
		return this.#provider;
	}
}
