import { PinnedChainId } from 'constants/chains';
import { useEffect, useState } from 'react';
import { noop } from 'utils/utils';
import useProviders from './useProviders';

/**
 * Converts/resolves a ENS domain into an address.
 * @param ENSName The ENS domain provided by the user. Ofter ends with ".eth".
 * @returns An address resolved from the ENS domain.
 */
export default function useENSDomain(ENSName?: string | null) {
	const mainnet = useProviders()[PinnedChainId.MAINNET];
	const [address, setAddress] = useState('');

	// @ts-expect-error Not all code paths return a value.
	useEffect(() => {
		if (mainnet && typeof ENSName === 'string') {
			let stale = false;

			mainnet
				.resolveName(ENSName)
				.then((addr) => {
					if (!stale && typeof addr === 'string') {
						setAddress(addr);
					}
				})
				.catch(noop);

			return () => {
				stale = true;
				setAddress('');
			};
		}
	}, [mainnet, ENSName]);

	return address;
}
