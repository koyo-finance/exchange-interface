import React from 'react';

export interface PoolCurrencyLogoWrapperProps {
	margin: boolean;
	sizeRaw: number;
	numberOfTokens: number;
}

const PoolCurrencyLogoWrapper: React.FC<PoolCurrencyLogoWrapperProps> = ({ children, margin, sizeRaw, numberOfTokens }) => {
	return (
		<div
			style={{
				position: 'absolute',
				display: 'flex',
				flexDirection: 'row',
				marginRight: margin ? `${((sizeRaw * (numberOfTokens - 1)) / 1.5 + 10).toString()}px` : undefined
			}}
		>
			{children}
		</div>
	);
};

export default PoolCurrencyLogoWrapper;
