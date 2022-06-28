import { BigNumber } from 'ethers';
import useSetTokenAllowance from 'hooks/contracts/useSetTokenAllowance';
import React from 'react';
import { useSigner } from 'wagmi';

export interface FormApproveAssetProps {
	asset: string;
	spender: string;
	amount: BigNumber;
	className?: string;
}

const FormApproveAsset: React.FC<FormApproveAssetProps> = ({ asset, spender, amount, className, children }) => {
	const { data: signer } = useSigner();
	const { mutate: approve, isLoading: approveLoading } = useSetTokenAllowance(signer || undefined, asset);

	return (
		<button type="button" onClick={() => approve([spender, amount, { gasLimit: 600_000 }])} disabled={approveLoading} className={className}>
			{children}
		</button>
	);
};

export default FormApproveAsset;
