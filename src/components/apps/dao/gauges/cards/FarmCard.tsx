import { MaxUint256 } from '@ethersproject/constants';
import { ChainId, formatAmount, formatBalance, formatDollarAmount, fromBigNumber } from '@koyofinance/core-sdk';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import FormApproveAsset from 'components/FormApproveAsset';
import { BigNumber } from 'ethers';
import useCheckClaimableTokens from 'hooks/KYO/gauges/useCheckClaimableTokens';
import { useDepositIntoGauge } from 'hooks/KYO/gauges/useDepositIntoGauge';
import { useDistributeGaugeEmissions } from 'hooks/KYO/gauges/useDistributeGaugeEmissions';
import { useWithdrawFromGauge } from 'hooks/KYO/gauges/useWithdrawFromGauge';
import useTokenAllowance from 'hooks/generic/useTokenAllowance';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';
import { Case, Default, Switch } from 'react-if';

export interface Gauge {
	address: string;
	name: string;
	pool: {
		id: string;
		address: string;
		name: string;
	};
}

export interface FarmCardProps {
	gauge: Gauge;
}

const FarmCard: React.FC<FarmCardProps> = ({ gauge }) => {
	const { accountAddress, signer, chainId } = useWeb3();

	const { data: lpTokenBalance = BigNumber.from(0) } = useTokenBalance(accountAddress, gauge.pool.address);
	const { data: gaugeTokenBalance = BigNumber.from(0) } = useTokenBalance(accountAddress, gauge.address);
	const { data: gaugeClaimAmount = BigNumber.from(0) } = useCheckClaimableTokens(accountAddress, gauge.address);
	const { data: lpTotal = BigNumber.from(0) } = useTokenBalance(gauge.address, gauge.pool.address);
	const { data: lpTokenAllowance = BigNumber.from(0) } = useTokenAllowance(accountAddress, gauge.address, gauge.pool.address);

	const { mutate: gaugeDeposit } = useDepositIntoGauge(signer, gauge.address);
	const { mutate: gaugeWithdraw } = useWithdrawFromGauge(signer, gauge.address);
	const { mutate: claimEmissions } = useDistributeGaugeEmissions(signer);

	if (!gauge.pool.address) return null;

	return (
		<div className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white sm:w-3/4 md:w-1/2 lg:w-2/5 lg:text-lg xl:w-1/3 xl:text-xl">
			<div className="w-full text-center">{gauge.name}</div>
			<div className=" flex w-full flex-row justify-between ">
				<div>TVL </div>
				<div className=" font-bold">{formatDollarAmount(fromBigNumber(lpTotal))}</div>
			</div>
			<div className="flex flex-row justify-between">
				<div>LP token balance:</div> <div className=" font-bold">{formatBalance(lpTokenBalance)}</div>
			</div>
			<div className="flex flex-row justify-between">
				Gauge share balance:{' '}
				<span className=" font-bold">{formatBalance(gaugeTokenBalance, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
			</div>
			<div className=" flex w-full flex-col gap-2 ">
				<SingleEntityConnectButton
					className="btn w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-200"
					invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
					unsupported={chainId !== ChainId.BOBA}
				>
					<Switch>
						<Case condition={BigNumber.from(lpTokenAllowance).lt(lpTokenBalance)}>
							<FormApproveAsset asset={gauge.pool?.address || ''} spender={gauge.address} amount={MaxUint256} className="h-full w-full">
								APPROVE - <span className="italic">{gauge.pool.name}</span>
							</FormApproveAsset>
						</Case>
						<Default>
							<button type="button" className=" h-full w-full" onClick={() => gaugeDeposit([lpTokenBalance])}>
								DEPOSIT LP TOKENS
							</button>
						</Default>
					</Switch>
				</SingleEntityConnectButton>
				{BigNumber.from(gaugeTokenBalance).gt(0) && (
					<>
						<hr className="w-full bg-white" />
						<SingleEntityConnectButton
							className=" btn w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-200"
							invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400 hidden"
						>
							<button type="button" className=" h-full w-full uppercase" onClick={() => claimEmissions([gauge.address])}>
								Claim - {formatAmount(fromBigNumber(gaugeClaimAmount))} KYO
							</button>
						</SingleEntityConnectButton>
						<hr className="w-full bg-white" />
						<SingleEntityConnectButton
							className=" btn w-full border-red-600 bg-transparent bg-opacity-100 p-0 text-red-600 hover:bg-red-600 hover:text-white"
							invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400 hidden"
						>
							<button type="button" className="h-full w-full" onClick={() => gaugeWithdraw([gaugeTokenBalance])}>
								WITHDRAW LP TOKENS
							</button>
						</SingleEntityConnectButton>
					</>
				)}
			</div>
		</div>
	);
};

export default FarmCard;
