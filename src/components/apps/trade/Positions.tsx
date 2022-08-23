import React from 'react';

const Positions: React.FC = () => {
	return (
		<div className="flex h-auto w-full flex-col rounded-xl bg-black bg-opacity-50">
			<div className="flex w-full flex-row items-center justify-between border-b-2 border-gray-500 p-3 pr-24 text-gray-300">
				<div>Position</div>
				<div>Net value</div>
				<div>Size</div>
				<div>Entry price</div>
				<div>Market price</div>
				<div>Liq. price</div>
			</div>
			<div className="h-auto w-full p-3">No positions open.</div>
		</div>
	);
};

export default Positions;
