import React from 'react';

export interface InfoSummaryProps {
	earningsAssets: string;
	entryPrice: number;
	liquidationPrice: number;
	fees: number;
	leverage: number;
}

const InfoSummary: React.FC<InfoSummaryProps> = ({ earningsAssets, entryPrice, liquidationPrice, fees, leverage }) => {
	return (
		<div className="mt-8 flex flex-col gap-2">
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Earnings in</div>
				<div className="text-base font-semibold text-white">{earningsAssets}</div>
			</div>
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Entry price</div>
				<div className="text-base font-semibold text-white">
					{entryPrice.toLocaleString(navigator.language, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
				</div>
			</div>
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Liquidation price</div>
				<div className="text-base font-semibold text-white">
					{liquidationPrice.toLocaleString(navigator.language, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
				</div>
			</div>
			<div className=" flex w-full flex-row items-center justify-between">
				<div className="text-base font-normal text-gray-300">Fees</div>
				<div className="text-base font-semibold text-white">
					{fees.toLocaleString(navigator.language, {
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
