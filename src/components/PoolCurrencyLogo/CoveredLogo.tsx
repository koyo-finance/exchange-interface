import CurrencyIcon, { SymbolCurrencyIconProps } from 'components/CurrencyIcon/CurrencyIcon';
import React from 'react';

export interface CoveredLogoProps extends SymbolCurrencyIconProps {
	size?: string;
	sizeRaw: number;
	index: number;
}

const CoveredLogo: React.FC<CoveredLogoProps> = ({ size, sizeRaw, index, ...rest }) => {
	return (
		<CurrencyIcon
			{...rest}
			style={{
				position: 'absolute',
				right: `-${((sizeRaw * index) / 1.5).toString()}px`,
				width: size,
				height: size,
				borderRadius: size
			}}
		/>
	);
};

export default CoveredLogo;
