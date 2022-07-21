import React from 'react';
import CoveredLogo from './CoveredLogo';
import HigherLogo from './HigherLogo';
import PoolCurrencyLogoWrapper from './PoolCurrencyLogoWrapper';

export interface PoolCurrencyLogoProps {
	margin?: boolean;
	size?: number;
	tokens: { symbol: string; overrides?: string[] }[];
}

const PoolCurrencyLogo: React.FC<PoolCurrencyLogoProps> = ({ tokens, size = 20, margin = true }) => {
	return (
		<PoolCurrencyLogoWrapper numberOfTokens={tokens.length} sizeRaw={size} margin={margin}>
			{tokens.map((token, index) =>
				index === 0 ? (
					<HigherLogo symbol={token.symbol} overrides={token.overrides} size={`${size.toString()}px`} key={token.symbol} />
				) : (
					<CoveredLogo
						symbol={token.symbol}
						overrides={token.overrides}
						index={index}
						size={`${size.toString()}px`}
						sizeRaw={size}
						key={token.symbol}
					/>
				)
			)}
		</PoolCurrencyLogoWrapper>
	);
};

export default PoolCurrencyLogo;
