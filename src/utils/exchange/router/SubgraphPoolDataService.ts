import { PoolDataService, SubgraphPoolBase } from '@balancer-labs/sor';
import { Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { fetch as sapphireFetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { getOnChainBalances } from './getOnChainBalances';

const query = `
    {
        pool0: pools(
            first: 1000,
            where: { swapEnabled: true, totalShares_gt: "0" },
            orderBy: totalLiquidity,
            orderDirection: desc
        ) {
            id
            address
            poolType
            swapFee
            totalShares
            tokens {
                address
                balance
                decimals
                weight
                priceRate
            }
            tokensList
            totalWeight
            amp
            swapEnabled
        }
        pool1000: pools(
            first: 1000,
            skip: 1000,
            where: { swapEnabled: true, totalShares_gt: "0" },
            orderBy: totalLiquidity,
            orderDirection: desc
        ) {
            id
            address
            poolType
            swapFee
            totalShares
            tokens {
                address
                balance
                decimals
                weight
                priceRate
            }
            tokensList
            totalWeight
            amp
            swapEnabled
        }
    }
`;

export interface SubgraphPoolDataServiceConfig {
	chainId: ChainId;
	multiAddress: string;
	vaultAddress: string;
	subgraphUrl: string;
	provider: Provider;
	onchain: boolean;
}

export class SubgraphPoolDataService implements PoolDataService {
	private readonly config: SubgraphPoolDataServiceConfig;

	public constructor(config: SubgraphPoolDataServiceConfig) {
		this.config = config;
	}

	public async getPools(): Promise<SubgraphPoolBase[]> {
		const { data } = await sapphireFetch(
			this.config.subgraphUrl,
			{
				method: 'POST' as FetchMethods,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ query })
			},
			'json' as FetchResultTypes.JSON
		);
		console.log(data);

		const pools = [...data.pool0, ...data.pool1000];

		if (this.config.onchain) {
			return getOnChainBalances(pools ?? [], this.config.multiAddress, this.config.vaultAddress, this.config.provider);
		}

		return data.pools ?? [];
	}
}
