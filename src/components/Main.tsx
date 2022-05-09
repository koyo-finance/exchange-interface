import React from 'react';

const Main: React.FC = ({ children }) => {
	return (
		<main className="flex h-full w-full flex-grow flex-col items-center justify-start" style={{ height: 'max-content' }}>
			{children}
		</main>
	);
};

export default Main;
