import { fetch, FetchResultTypes } from '@sapphire/fetch';
import React from 'react';
import useSWR from 'swr';

function fetcher<T = unknown>(url: string) {
	return fetch<T>(url, 'json' as FetchResultTypes.JSON);
}

export interface DepositPoolAPYCardProps extends React.HTMLAttributes<HTMLDivElement> {
	poolId: string;
}

const DepositPoolAPYCard: React.FC<DepositPoolAPYCardProps> = ({ poolId, ...rest }) => {
	const { data, error } = useSWR('https://api.exchange.koyo.finance/apys/day/boba', (url: string) => fetcher<DailyAPYReturnData>(url));

	if (!data || error || !poolId) return null;

	return (
		<div {...rest}>
			Daily Percentage Yield:{' '}
			<span className="underline">
				{data.data[poolId]?.toLocaleString('default', { minimumFractionDigits: 2, maximumFractionDigits: 5 }) || '?'}
			</span>{' '}
			%
		</div>
	);
};

interface DailyAPYReturnData {
	data: { [pool: string]: number };
}

export default DepositPoolAPYCard;
