import { TokenPriceService } from '@balancer-labs/sor';
import { ChainId } from '@koyofinance/core-sdk';
import { fetch as sapphireFetch, FetchResultTypes } from '@sapphire/fetch';

export class CoingeckoTokenPriceService implements TokenPriceService {
	public constructor(private readonly chainId: ChainId) {}

	public async getNativeAssetPriceInToken(tokenAddress: string): Promise<string> {
		const ethPerToken = await this.getTokenPriceInNativeAsset(tokenAddress);

		// We get the price of token in terms of ETH
		// We want the price of 1 ETH in terms of the token base units
		return `${1 / parseFloat(ethPerToken)}`;
	}

	public async getTokenPriceInNativeAsset(tokenAddress: string): Promise<string> {
		const endpoint = `https://api.coingecko.com/api/v3/simple/token_price/${this.platformId}?contract_addresses=${tokenAddress}&vs_currencies=${this.nativeAssetId}`;

		const { data } = await sapphireFetch(endpoint, 'json' as FetchResultTypes.JSON);

		if (!data || data[tokenAddress.toLowerCase()][this.nativeAssetId] === undefined) {
			throw Error('No price returned from Coingecko');
		}

		return data[tokenAddress.toLowerCase()][this.nativeAssetId];
	}

	private get platformId(): string {
		switch (this.chainId) {
			case ChainId.BOBA:
				return 'boba';
			case ChainId.AURORA:
				return 'aurora';
			default:
				return '2';
		}
	}

	private get nativeAssetId(): string {
		switch (this.chainId) {
			case ChainId.BOBA:
				return 'boba';
			case ChainId.AURORA:
				return 'aurora';
			default:
				return '';
		}
	}
}
