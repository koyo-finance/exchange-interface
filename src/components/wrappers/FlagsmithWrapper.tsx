import { config } from 'core/config';
import { getAddress } from 'ethers/lib/utils';
import flagsmith from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import { useWeb3 } from 'hooks/useWeb3';
import React, { useEffect } from 'react';

const FlagsmithWrapper: React.FC = ({ children }) => {
	const { accountAddress } = useWeb3();
	const { flagsmithEnvironmentId } = config;

	useEffect(() => {
		if (!flagsmithEnvironmentId || !accountAddress) return;

		void flagsmith.identify(getAddress(accountAddress));
	}, [accountAddress, flagsmithEnvironmentId]);

	if (!flagsmithEnvironmentId) return <>{children}</>;

	return (
		<FlagsmithProvider
			flagsmith={flagsmith}
			options={{
				environmentID: flagsmithEnvironmentId
			}}
		>
			<>{children}</>
		</FlagsmithProvider>
	);
};

export default FlagsmithWrapper;
