import { TokenInfo } from '@uniswap/token-lists';
import React from 'react';
import { FiArrowDown } from 'react-icons/fi';

export interface InfoSummaryProps {
	setCollateralDropdownOpen: (value: boolean) => void;
	collateralAsset: TokenInfo;
	entryPrice: number;
	liquidationPrice: number;
	fees: number;
	leverage: number;
}

const InfoSummary: React.FC<InfoSummaryProps> = ({ setCollateralDropdownOpen, collateralAsset, entryPrice, liquidationPrice, fees, leverage }) => {
	return (
		<div className="mt-2 flex flex-col gap-2">
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Collateral in</div>
				<div
					className=" flex transform-gpu cursor-pointer flex-row items-center gap-1 text-base font-semibold text-white duration-100 hover:underline"
					onClick={() => setCollateralDropdownOpen(true)}
				>
					{collateralAsset.symbol} <FiArrowDown className="text-lg" />
				</div>
			</div>
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Entry price</div>
				<div className="text-base font-semibold text-white">
					{entryPrice?.toLocaleString(navigator.language, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
				</div>
			</div>
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Liquidation price</div>
				<div className="text-base font-semibold text-white">
					{liquidationPrice?.toLocaleString(navigator.language, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
				</div>
			</div>
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Fees</div>
				<div className="text-base font-semibold text-white">
					{fees?.toLocaleString(navigator.language, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
				</div>
			</div>
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Leverage</div>
				<div className="text-base font-semibold text-white">
					{leverage.toLocaleString(navigator.language, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}
					x
				</div>
			</div>
		</div>
	);
};

export default InfoSummary;
