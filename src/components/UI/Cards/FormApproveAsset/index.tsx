import { toBigNumber } from '@koyofinance/core-sdk';
import useSetTokenAllowance from 'hooks/contracts/useSetTokenAllowance';
import React from 'react';
import { useSigner } from 'wagmi';

export interface FormApproveAssetProps {
	asset: string;
	spender: string;
	amount: number;
	decimals: number;
	className?: string;
	// setStatus: (status: string) => void;
}

const FormApproveAsset: React.FC<FormApproveAssetProps> = ({ asset, spender, amount, decimals, className, children }) => {
	const { data: signer } = useSigner();
	const { mutate: approve, isLoading: approveLoading } = useSetTokenAllowance(signer || undefined, asset);

	const approveHandler = () => {
		// setStatus(approveStatus);
		return approve([spender, toBigNumber(amount, decimals), { gasLimit: 600_000 }]);
	};

	return (
		<button type="button" onClick={approveHandler} disabled={approveLoading} className={className}>
			{children}
		</button>
	);
};

export default FormApproveAsset;
