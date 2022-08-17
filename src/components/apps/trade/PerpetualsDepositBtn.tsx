import React from 'react';
import { MaxUint256 } from '@ethersproject/constants';
import { useFormikContext } from 'formik';
import type { SwapFormValues } from 'pages/swap';
import { BigNumber } from 'ethers';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import { Case, Default, Else, If, Switch, Then } from 'react-if';
import { toBigNumber } from '@koyofinance/core-sdk';
import FormApproveAsset from 'components/FormApproveAsset';
import { SwapTokenNumber } from 'constants/swaps';
import useTokenAllowance from 'hooks/generic/useTokenAllowance';
import useVaultContract from 'hooks/contracts/useVaultContract';
import { useWeb3 } from 'hooks/useWeb3';
import { selectTokenOne } from 'state/reducers/selectedTokens';
import { useSelector } from 'react-redux';

const PerpetualsDepositBtn: React.FC = () => {
	const { values } = useFormikContext<SwapFormValues>();
	const { accountAddress } = useWeb3();
	const vaultContract = useVaultContract();

	const tokenOne = useSelector(selectTokenOne);

	const { data: allowance = 0 } = useTokenAllowance(accountAddress, vaultContract.address, tokenOne?.address || '');

	return values.info ? (
		<>
			<If condition={values.info.swapAmount.gt(BigNumber.from(0)) && values.info.swaps.length > 0}>
				<Then>
					<SingleEntityConnectButton
						className="btn mt-2 w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
						invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
					>
						<Switch>
							<Case condition={BigNumber.from(allowance).lte(toBigNumber(values[SwapTokenNumber.IN] || 0, tokenOne.decimals || 18))}>
								<FormApproveAsset
									asset={tokenOne.address}
									spender={vaultContract.address}
									amount={MaxUint256}
									className="h-full w-full"
								>
									APPROVE - <span className="italic">{tokenOne.symbol.toUpperCase()}</span>
								</FormApproveAsset>
							</Case>
							<Default>
								<button type="submit" className="h-full w-full">
									SWAP
								</button>
							</Default>
						</Switch>
					</SingleEntityConnectButton>
				</Then>
				<Else>
					<button type="button" className="mt-2 w-full rounded-lg bg-gray-600 bg-opacity-100 p-3 text-center text-black">
						Cannot swap - {values.info.swapAmount.lte(BigNumber.from(0)) ? 'No amount or insufficient liquidity' : 'Invalid path'}
					</button>
				</Else>
			</If>
		</>
	) : null;
};

export default PerpetualsDepositBtn;
