import { formatDollarAmount } from '@koyofinance/core-sdk';
import React from 'react';

export interface TokenUSDPriceProps {
	amount: number;
	price: number;
}

const TokenUSDPrice: React.FC<TokenUSDPriceProps> = ({ amount, price }) => {
	return <div className="text-sm text-darks-200">Value: {formatDollarAmount(amount * price)}</div>;
};

export default TokenUSDPrice;
