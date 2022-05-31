import { InjectedConnector, Chain } from '@wagmi/core';
import type { InjectedConnectorOptions } from '@wagmi/core/dist/declarations/src/connectors/injected';

export class ONTOWebConnector extends InjectedConnector {
	public readonly id: string = 'onto-web';
	public readonly name: string = 'Onto';

	// @ts-expect-error https://publicdocs.gitbook.io/onto-web-help-center/developers/onto-wallet-plugin-integration
	public readonly ready = typeof window !== 'undefined' && Boolean(window?.onto);

	// @ts-expect-error https://publicdocs.gitbook.io/onto-web-help-center/developers/onto-wallet-plugin-integration
	#provider?: Window['onto'];

	public constructor({
		chains,
		options = { shimDisconnect: true, name: 'Onto' }
	}: {
		chains?: Chain[];
		options?: InjectedConnectorOptions;
	} = {}) {
		super({ chains, options });

		this.id = 'onto-web';
		this.name = 'Onto';
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async getProvider() {
		// @ts-expect-error https://publicdocs.gitbook.io/onto-web-help-center/developers/onto-wallet-plugin-integration
		if (this.ready) this.#provider = window.onto;
		return this.#provider;
	}
}
