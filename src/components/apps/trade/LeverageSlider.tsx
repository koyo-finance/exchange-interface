import React from 'react';

export interface LeverageSliderProps {
	leverage: number;
	setLeverage: (amount: number) => void;
}

const LeverageSlider: React.FC<LeverageSliderProps> = ({ leverage, setLeverage }) => {
	return (
		<>
			<input type="range" min="0" max="50" value={leverage} className="range" step="1" onChange={(e) => setLeverage(Number(e.target.value))} />
			<div className="flex w-full justify-between px-2 text-xs">
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
			</div>
		</>
	);
};

export default LeverageSlider;
