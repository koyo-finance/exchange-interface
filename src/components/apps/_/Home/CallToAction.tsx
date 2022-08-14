import BaseLink from 'components/Links/BaseLink';
import React from 'react';

const CallToAction: React.FC = () => {
	return (
		<BaseLink href="/swap">
			<button className=" btn transform-gpu border-0 bg-lights-400 px-10 text-black outline-none duration-100 hover:bg-lights-300 active:bg-lights-200">
				Launch App
			</button>
		</BaseLink>
	);
};

export default CallToAction;
