import { parseUnits } from 'ethers/lib/utils';
import useSetTokenAllowance from 'hooks/contracts/useSetTokenAllowance';
import React from 'react';
import { useSigner } from 'wagmi';

export interface FormApproveAssetProps {
	asset: string;
	spender: string;
	amount: number;
	decimals: number;
	className?: string;
}

const FormApproveAsset: React.FC<FormApproveAssetProps> = ({ asset, spender, amount, decimals, className, children }) => {
	const { data: signer } = useSigner();
	const { mutate: approve, isLoading: approveLoading } = useSetTokenAllowance(signer || undefined, asset);

	return (
		<button
			type="button"
			onClick={() => {
				return approve([spender, parseUnits(amount.toString(), decimals), { gasLimit: 400_000 }]);
			}}
			disabled={approveLoading}
			className={className}
		>
			{children}
		</button>
	);
};

export default FormApproveAsset;
