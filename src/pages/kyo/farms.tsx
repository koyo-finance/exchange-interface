import { ChainId, formatBalance, formatDollarAmount, fromBigNumber } from '@koyofinance/core-sdk';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import FormApproveAsset from 'components/UI/Cards/FormApproveAsset';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { BigNumber } from 'ethers';
import { useDepositIntoGauge } from 'hooks/contracts/KYO/gauges/useDepositIntoGauge';
import { useDistributeGaugeEmissions } from 'hooks/contracts/KYO/gauges/useDistributeGaugeEmissions';
import useMultiCheckClaimableTokens from 'hooks/contracts/KYO/gauges/useMultiCheckClaimableTokens';
import { useWithdrawFromGauge } from 'hooks/contracts/KYO/gauges/useWithdrawFromGauge';
import useMultiTokenBalances from 'hooks/contracts/useMultiTokenBalances';
import useTokenAllowance from 'hooks/contracts/useTokenAllowance';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { selectAllPoolsByChainId } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount, useSigner } from 'wagmi';

const FarmsPage: ExtendedNextPage = () => {
	const FourKoyoGaugeAddress = '0x24f47A11AEE5d1bF96C18dDA7bB0c0Ef248A8e71';
	const gauges = [FourKoyoGaugeAddress];

	const { data: account } = useAccount();
	const accountAddress = account?.address;
	const { data: signer } = useSigner();

	const [pool] = useSelector(selectAllPoolsByChainId(ChainId.BOBA)).filter((pool) => pool.name === '4pool');

	const { data: lpTokenBalance = BigNumber.from(0) } = useTokenBalance(accountAddress, pool?.addresses.lpToken);
	const gaugeTokenBalances = useMultiTokenBalances(account?.address, gauges);
	const gaugeClaimAmounts = useMultiCheckClaimableTokens(accountAddress, gauges);
	const { data: LPtotal = BigNumber.from(0) } = useTokenBalance(FourKoyoGaugeAddress, pool?.addresses.lpToken || '');
	const { data: lpTokenAllowance = BigNumber.from(0) } = useTokenAllowance(account?.address, FourKoyoGaugeAddress, pool?.addresses.lpToken);

	const { mutate: gaugeDeposit } = useDepositIntoGauge(signer || undefined, FourKoyoGaugeAddress);
	const { mutate: gaugeWithdraw } = useWithdrawFromGauge(signer || undefined, FourKoyoGaugeAddress);
	const { mutate: claimEmissions } = useDistributeGaugeEmissions(signer || undefined);

	return (
		<>
			<NextSeo
				title="Farms"
				canonical={`${ROOT_WITH_PROTOCOL}/kyo/farms`}
				description="Deposit your LP tokens to desired gauges and earn rewards."
			/>
			<div className=" flex min-h-screen w-full flex-col items-center gap-[5vh] bg-darks-500 px-4 pb-8 pt-24 md:px-0 lg:pt-20 ">
				<div className="mt-8 flex w-full flex-col items-center justify-center gap-8 text-center text-white">
					<h1 className=" text-4xl font-bold md:text-5xl">Kōyō Farms</h1>
					<div className="w-full font-normal md:w-3/4 md:text-xl md:font-semibold lg:w-1/2">
						Stake your LP tokens into desired gauges to earn and claim emissions.
					</div>
				</div>
				<div className=" flex w-full flex-row flex-wrap items-center justify-center">
					{gauges.map((gauge, i) => (
						<div className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white sm:w-3/4 md:w-1/2 lg:w-2/5 lg:text-lg xl:w-1/3 xl:text-xl">
							<div className="w-full text-center">4pool - 4koyo (FRAX + DAI stablecoin + USDT + USDC)</div>
							<div className=" flex w-full flex-row justify-between ">
								<div>TVL </div>
								<div className=" font-bold">{formatDollarAmount(fromBigNumber(LPtotal))}</div>
							</div>
							<div className="flex flex-row justify-between">
								<div>LP token balance:</div> <div className=" font-bold">{formatBalance(lpTokenBalance)}</div>
							</div>
							<div className="flex flex-row justify-between">
								Gauge share balance:{' '}
								<span className=" font-bold">
									{formatBalance(gaugeTokenBalances[i].data || 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
								</span>
							</div>
							<div className=" flex w-full flex-col gap-2 ">
								<CoreCardConnectButton
									className=" btn w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-200"
									invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
								>
									<Switch>
										<Case condition={BigNumber.from(lpTokenAllowance).lt(lpTokenBalance)}>
											<FormApproveAsset
												asset={pool.addresses.lpToken}
												spender={FourKoyoGaugeAddress}
												amount={100_000}
												decimals={18}
												className="h-full w-full"
											>
												APPROVE - <span className="italic">4KOYO LP TOKEN</span>
											</FormApproveAsset>
										</Case>
										<Default>
											<button type="button" className=" h-full w-full" onClick={() => gaugeDeposit([lpTokenBalance])}>
												DEPOSIT LP TOKENS
											</button>
										</Default>
									</Switch>
								</CoreCardConnectButton>
								{(gaugeTokenBalances[i].data || 0) > 0 && (
									<>
										<hr className="w-full bg-white" />
										<CoreCardConnectButton
											className=" btn w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-200"
											invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400 hidden"
										>
											<button type="button" className=" h-full w-full uppercase" onClick={() => claimEmissions([gauge])}>
												Claim - {fromBigNumber(gaugeClaimAmounts[i].data || 0)} KYO
											</button>
										</CoreCardConnectButton>
										<hr className="w-full bg-white" />
										<CoreCardConnectButton
											className=" btn w-full border-red-600 bg-transparent bg-opacity-100 p-0 text-red-600 hover:bg-red-600 hover:text-white"
											invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400 hidden"
										>
											<button
												type="button"
												className="h-full w-full"
												onClick={() => gaugeWithdraw([gaugeTokenBalances[i].data || 0])}
											>
												WITHDRAW LP TOKENS
											</button>
										</CoreCardConnectButton>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

FarmsPage.Layout = SwapLayout('gauge-vote');
export default FarmsPage;
