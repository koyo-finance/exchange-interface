import { config } from 'core/config';
import flagsmith from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import React from 'react';

const FlagsmithWrapper: React.FC = ({ children }) => {
	if (!config.flagsmithEnvironmentId) return <>{children}</>;

	return (
		<FlagsmithProvider
			flagsmith={flagsmith}
			options={{
				environmentID: config.flagsmithEnvironmentId
			}}
		>
			<>{children}</>
		</FlagsmithProvider>
	);
};

export default FlagsmithWrapper;
