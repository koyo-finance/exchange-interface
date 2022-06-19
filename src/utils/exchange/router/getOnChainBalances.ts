import { PoolFilter, SubgraphPoolBase } from '@balancer-labs/sor';
import { formatFixed } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import { OracleWeightedPool__factory, Vault__factory, WeightedPool__factory } from 'types/contracts/exchange';
import { StablePool__factory } from 'types/contracts/exchange/factories/StablePool__factory';
import { isSameAddress } from 'utils/isSameAddress';
import { Multicaller } from '../Multicaller';

export async function getOnChainBalances(
	subgraphPoolsOriginal: SubgraphPoolBase[],
	multiAddress: string,
	vaultAddress: string,
	provider: Provider
): Promise<SubgraphPoolBase[]> {
	if (subgraphPoolsOriginal.length === 0) return subgraphPoolsOriginal;

	const abis: any = Object.values(
		// Remove duplicate entries using their names
		Object.fromEntries(
			[
				...Vault__factory.abi, //
				...OracleWeightedPool__factory.abi,
				...WeightedPool__factory.abi,
				...StablePool__factory.abi
			].map((row) => [row.name, row])
		)
	);

	const multiPool = new Multicaller(multiAddress, provider, abis);

	const supportedPoolTypes: string[] = Object.values(PoolFilter);
	const subgraphPools: SubgraphPoolBase[] = [];
	subgraphPoolsOriginal.forEach((pool) => {
		if (!supportedPoolTypes.includes(pool.poolType)) {
			console.error(`Unknown pool type: ${pool.poolType} ${pool.id}`);
			return;
		}

		subgraphPools.push(pool);

		multiPool.call(`${pool.id}.poolTokens`, vaultAddress, 'getPoolTokens', [pool.id]);
		multiPool.call(`${pool.id}.totalSupply`, pool.address, 'totalSupply');

		if (pool.poolType === 'Weighted') {
			multiPool.call(`${pool.id}.weights`, pool.address, 'getNormalizedWeights');
			multiPool.call(`${pool.id}.swapFee`, pool.address, 'getSwapFeePercentage');
		} else if (pool.poolType === 'Stable') {
			multiPool.call(`${pool.id}.amp`, pool.address, 'getAmplificationParameter');
			multiPool.call(`${pool.id}.swapFee`, pool.address, 'getSwapFeePercentage');
		}
	});

	let pools = {} as Record<
		string,
		{
			amp?: string[];
			swapFee: string;
			weights?: string[];
			targets?: string[];
			poolTokens: {
				tokens: string[];
				balances: string[];
			};
			rate?: string;
		}
	>;

	try {
		pools = (await multiPool.execute()) as Record<
			string,
			{
				amp?: string[];
				swapFee: string;
				weights?: string[];
				poolTokens: {
					tokens: string[];
					balances: string[];
				};
				rate?: string;
			}
		>;
	} catch (err) {
		throw new Error('Issue with multicall execution.');
	}

	const onChainPools: SubgraphPoolBase[] = [];

	Object.entries(pools).forEach(([poolId, onchainData], index) => {
		try {
			const { poolTokens, swapFee, weights } = onchainData;

			if (
				subgraphPools[index].poolType === 'Stable' ||
				subgraphPools[index].poolType === 'MetaStable' ||
				subgraphPools[index].poolType === 'StablePhantom'
			) {
				if (!onchainData.amp) {
					console.error(`Stable Pool Missing Amp: ${poolId}`);
					return;
				}
				// Need to scale amp by precision to match expected Subgraph scale
				// amp is stored with 3 decimals of precision
				subgraphPools[index].amp = formatFixed(onchainData.amp[0], 3);
			}

			if (subgraphPools[index].poolType.includes('Linear')) {
				if (!onchainData.targets) {
					console.error(`Linear Pool Missing Targets: ${poolId}`);
					return;
				}
				subgraphPools[index].lowerTarget = formatFixed(onchainData.targets[0], 18);
				subgraphPools[index].upperTarget = formatFixed(onchainData.targets[1], 18);

				const { wrappedIndex } = subgraphPools[index];
				if (wrappedIndex === undefined || onchainData.rate === undefined) {
					console.error(`Linear Pool Missing WrappedIndex or PriceRate: ${poolId}`);
					return;
				}
				// Update priceRate of wrappedToken
				subgraphPools[index].tokens[wrappedIndex].priceRate = formatFixed(onchainData.rate, 18);
			}

			subgraphPools[index].swapFee = formatFixed(swapFee, 18);

			poolTokens.tokens.forEach((token, i) => {
				const T = subgraphPools[index].tokens.find((t) => isSameAddress(t.address, token));
				if (!T) throw new Error(`Pool Missing Expected Token: ${poolId} ${token}`);
				T.balance = formatFixed(poolTokens.balances[i], T.decimals);
				if (weights) {
					// Only expected for WeightedPools
					T.weight = formatFixed(weights[i], 18);
				}
			});
			onChainPools.push(subgraphPools[index]);
		} catch (err) {
			throw new Error(`Issue with pool onchain data: ${err}`);
		}
	});

	return onChainPools;
}
