import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
	const [activeTitleWord, setActiveTitleWord] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			if (activeTitleWord === 2) {
				setActiveTitleWord(0);
				return;
			}
			setActiveTitleWord(activeTitleWord + 1);
		}, 2000);
	}, [activeTitleWord]);

	return (
		<div className=" flex flex-col items-center justify-center gap-4 text-center text-6xl font-bold transition-all duration-300 xl:text-7xl 2xl:text-8xl">
			<div className={`transform-gpu duration-500 ${activeTitleWord === 0 ? ' text-lights-400' : ''}`}>SWAP.</div>
			<div className={`transform-gpu duration-500 ${activeTitleWord === 1 ? ' text-lights-400' : ''}`}>DEPOSIT.</div>
			<div className={`transform-gpu duration-500 ${activeTitleWord === 2 ? ' text-lights-400' : ''}`}>EARN.</div>
		</div>
	);
};

export default Header;
