import FallbackCurrencyIcon from 'components/FallbackCurrencyIcon';
import React, { useMemo } from 'react';

export interface SymbolCurrencyIconProps {
	symbol?: string;
	style?: React.CSSProperties;
	className?: string;
}

const SymbolCurrencyIcon: React.FC<SymbolCurrencyIconProps> = ({ symbol, style, className }) => {
	const overrideSources: { [symbol: string]: string } = useMemo(() => {
		return {
			[`${symbol}`]: `https://tassets.koyo.finance/logos/${symbol}/512x512.png`
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [symbol]);

	const srcs: string[] = useMemo(() => {
		if (symbol) {
			const override = overrideSources[symbol];
			return [override];
		}
		return [];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [symbol, overrideSources]);

	return (
		<FallbackCurrencyIcon
			srcs={srcs}
			alt={'token logo'}
			className={`h-6 w-6 rounded-3xl bg-transparent text-gray-500 ${className}`}
			style={style}
		/>
	);
};

export default SymbolCurrencyIcon;
