import { TokenPriceService } from '@balancer-labs/sor';

export class AggregateTokenPriceService implements TokenPriceService {
	public constructor(private readonly services: TokenPriceService[]) {}

	public async getNativeAssetPriceInToken(tokenAddress: string): Promise<string> {
		return Promise.any(this.services.map((service) => service.getNativeAssetPriceInToken(tokenAddress)));
	}
}
