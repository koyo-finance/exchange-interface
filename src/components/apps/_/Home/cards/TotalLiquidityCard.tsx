import { formatDollarAmount } from '@koyofinance/core-sdk';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import InformativeCardBase from 'components/apps/_/Home/InformativeCardBase';
import React from 'react';
import useSWRImmutable from 'swr/immutable';
import { DefiLlamaProtocol } from 'types/DefiLlama';

function fetcher<T = unknown>(url: string) {
	return fetch<T>(url, 'json' as FetchResultTypes.JSON);
}

const TotalLiquidityCard: React.FC = () => {
	const { data: tvlData } = useSWRImmutable('https://api.llama.fi/protocol/koyo-finance', (url: string) => fetcher<DefiLlamaProtocol>(url), {});

	return (
		<InformativeCardBase
			data="TOTAL LIQUIDITY"
			value={formatDollarAmount((tvlData?.currentChainTvls?.Boba || 0) + (tvlData?.currentChainTvls?.Treasury || 0))}
		/>
	);
};

export default TotalLiquidityCard;
