import Main from 'components/Main';
import PinnedComponents from 'components/wrappers/PinnedComponents';
import React from 'react';

const DefaultLayout: React.FC = ({ children }) => {
	return (
		<div className="z-0 flex h-screen w-full flex-col items-center">
			<PinnedComponents />
			<Main>{children}</Main>
		</div>
	);
};

export default DefaultLayout;
