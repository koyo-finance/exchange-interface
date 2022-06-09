import Link from 'next/link';
import React from 'react';

const CallToAction: React.FC = () => {
	return (
		<Link href="/swap">
			<button className=" btn transform-gpu border-0 bg-lights-400 px-10 text-black outline-none duration-100 hover:bg-lights-300 active:bg-lights-200">
				Launch App
			</button>
		</Link>
	);
};

export default CallToAction;
