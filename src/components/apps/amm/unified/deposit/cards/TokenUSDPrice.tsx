import React from 'react';

export interface TokenUSDPriceProps {
	amount: number;
}

const TokenUSDPrice: React.FC<TokenUSDPriceProps> = ({ amount }) => {
	return <div>${amount}</div>;
};

export default TokenUSDPrice;
