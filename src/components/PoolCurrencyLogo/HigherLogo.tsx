import CurrencyIcon, { SymbolCurrencyIconProps } from 'components/CurrencyIcon/CurrencyIcon';
import React from 'react';

export interface HigherLogoProps extends SymbolCurrencyIconProps {
	size?: string;
}

const HigherLogo: React.FC<HigherLogoProps> = ({ className, size, ...rest }) => {
	return (
		<CurrencyIcon
			{...rest}
			className={`${className || ''} z-0`}
			style={{
				width: size,
				height: size,
				borderRadius: size
			}}
		/>
	);
};

export default HigherLogo;
