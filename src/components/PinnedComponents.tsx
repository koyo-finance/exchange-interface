import React from 'react';
import { Toaster } from 'react-hot-toast';

const PinnedComponents: React.FC = (props) => {
	return (
		<>
			<Toaster position="top-right" />
			<>{props.children}</>
		</>
	);
};

export default PinnedComponents;
