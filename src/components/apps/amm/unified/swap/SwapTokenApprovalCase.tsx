import { toBigNumber } from '@koyofinance/core-sdk';
import FormApproveAsset from 'components/FormApproveAsset';
import { vaultContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import useTokenAllowance from 'hooks/contracts/useTokenAllowance';
import React from 'react';
import { Case } from 'react-if';
import { useSelector } from 'react-redux';
import { selectAmount, selectTokenOne } from 'state/reducers/selectedTokens';
import { useAccount } from 'wagmi';

const SwapTokenApprovalCase: React.FC = () => {
	const { data: account } = useAccount();
	const accountAddress = account?.address || '';

	const tokenOne = useSelector(selectTokenOne);
	const tokenAmount = useSelector(selectAmount);

	const { data: allowances } = useTokenAllowance(accountAddress, vaultContract.address, tokenOne.address);

	return (
		<Case condition={BigNumber.from(allowances).lt(toBigNumber(tokenAmount, tokenOne.decimals))}>
			<FormApproveAsset
				asset={tokenOne.address}
				spender={vaultContract.address}
				amount={100_000}
				decimals={tokenOne.decimals}
				className="h-full w-full"
			>
				APPROVE - <span className="italic">{tokenOne.symbol.toUpperCase()}</span>
			</FormApproveAsset>
		</Case>
	);
};

export default SwapTokenApprovalCase;
