import React from 'react';

export interface LeverageSliderProps {
	leverage: number;
	setLeverage: (amount: number) => void;
}

const LeverageSlider: React.FC<LeverageSliderProps> = ({ leverage, setLeverage }) => {
	return (
		<div className="mt-4 flex w-full flex-col gap-1">
			<div className="w-full text-right text-lg font-semibold text-white">
				{leverage.toLocaleString(navigator.language, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}
				x
			</div>
			<div>
				<input
					type="range"
					min="1.50"
					max="30.50"
					value={leverage}
					className="range range-primary range-sm"
					step="0.10"
					onChange={(e) => setLeverage(Number(e.target.value))}
				/>
				<div className="flex w-full flex-row text-xs ">
					<div className="ml-[2.5%] flex cursor-pointer flex-col items-center justify-center" onClick={() => setLeverage(2)}>
						<div>|</div>
						<div>2x</div>
					</div>
					<div className="ml-[7.1%] flex cursor-pointer flex-col items-center justify-center" onClick={() => setLeverage(5)}>
						<div>|</div>
						<div>5x</div>
					</div>
					<div className="ml-[13.25%] flex cursor-pointer flex-col items-center justify-center" onClick={() => setLeverage(10)}>
						<div>|</div>
						<div>10x</div>
					</div>
					<div className="ml-[12.75%] flex cursor-pointer flex-col items-center justify-center" onClick={() => setLeverage(15)}>
						<div>|</div>
						<div>15x</div>
					</div>
					<div className="ml-[12.7%] flex cursor-pointer flex-col items-center justify-center" onClick={() => setLeverage(20)}>
						<div>|</div>
						<div>20x</div>
					</div>
					<div className="ml-[12.5%] flex cursor-pointer flex-col items-center justify-center" onClick={() => setLeverage(25)}>
						<div>|</div>
						<div>25x</div>
					</div>
					<div className="ml-[12.25%] flex cursor-pointer flex-col items-center justify-center" onClick={() => setLeverage(30)}>
						<div>|</div>
						<div>30x</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeverageSlider;
