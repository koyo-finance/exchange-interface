import { BigNumberish } from 'ethers';
import useLocked from './useLocked';

export default function useGetLockedAmount(address: string | null | undefined): BigNumberish {
	const { data: lockedAmount } = useLocked(address);

	return lockedAmount ? lockedAmount[0] : 0;
}
