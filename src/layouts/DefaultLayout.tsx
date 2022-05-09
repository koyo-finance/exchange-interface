import Main from 'components/Main';
import Navbar from 'components/Navbar/Navbar';
import PinnedComponents from 'components/PinnedComponents';
import React from 'react';

const DefaultLayout: React.FC = ({ children }) => {
	return (
		<div className="z-0 flex h-screen w-full flex-col items-center">
			<PinnedComponents />
			<Navbar />

			<Main>{children}</Main>
		</div>
	);
};

export default DefaultLayout;
