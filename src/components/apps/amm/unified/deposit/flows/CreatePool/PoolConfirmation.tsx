import { TokenPriceService } from '@balancer-labs/sor';
import { MaxUint256 } from '@ethersproject/constants';
import { fromBigNumber } from '@koyofinance/core-sdk';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import FormApproveAsset from 'components/FormApproveAsset';
import { vaultContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import useJoinPool from 'hooks/contracts/exchange/useJoinPool';
import usePoolId from 'hooks/contracts/exchange/usePoolId';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import { useCreatePool } from 'hooks/useCreatePool';
import { useWeb3 } from 'hooks/useWeb3';
import jpex from 'jpex';
import React, { useEffect, useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { selectFeeAddress, selectInitialLiquidity, selectPoolFee, selectPoolType, selectTokens, selectWeights } from 'state/reducers/createPool';
import { assetHelperBoba } from 'utils/assets';
import { switchPoolCreationParameters } from 'utils/exchange/switchPoolCreationParameters';
import { joinInit } from 'utils/exchange/userData/joins';
import { isSameAddress } from 'utils/isSameAddress';
import { useSendTransaction } from 'wagmi';
import StepBackCard from '../../cards/StepBackCard';
import TokenUSDPrice from '../../cards/TokenUSDPrice';

const koyoManageAddress = '0xBA1BA1ba1BA1bA1bA1Ba1BA1ba1BA1bA1ba1ba1B';
const zeroAddress = '0x0000000000000000000000000000000000000000';

export interface PoolConfirmationProps {
	setStep: (step: number) => void;
	cancelPoolCreation: (status: boolean) => void;
}

const PoolConfirmation: React.FC<PoolConfirmationProps> = ({ setStep, cancelPoolCreation }) => {
	const priceService = jpex.resolve<TokenPriceService>();
	const { accountAddress, signer } = useWeb3();

	const tokens = useSelector(selectTokens);
	const weights = useSelector(selectWeights);
	const initialLiquidity = useSelector(selectInitialLiquidity);
	const poolFee = useSelector(selectPoolFee);
	const feeManagerAddress = useSelector(selectFeeAddress);
	const poolType = useSelector(selectPoolType);

	const [tokenPrices, setTokenPrices] = useState<number[]>([]);
	const [addInititalLiquidityEnabled, setAddInititalLiquidityEnabled] = useState(false);
	const [forceConfirmTx, setForceConfirmTx] = useState(false);

	const { mutate: createPool, status: poolCreationStatus, data: createdPoolData } = useCreatePool(signer);

	const { mutate: addLiqudity, status: deposited } = useJoinPool(signer);
	const { data: poolId = '' } = usePoolId((createdPoolData?.events?.find((event) => event.event === 'PoolCreated')?.args || [])[0]);

	console.log(poolCreationStatus, createdPoolData);

	const { sendTransaction, status: txConfirmationStatus } = useSendTransaction({
		request: {
			to: accountAddress,
			value: BigNumber.from('10000000000000')
		}
	});

	const allowances = useMultiTokenAllowance(
		accountAddress,
		vaultContract.address,
		tokens?.map((token) => token.address)
	);

	useEffect(() => {
		const fetchETHPrice = async () => {
			const req = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json'
				}
			});

			const data = await req.json();
			const usdPrice = data.ethereum.usd;

			return usdPrice;
		};

		const fetched = fetchETHPrice();

		const tokenPricesInUSD = tokens.map(async (token, i) => {
			const usdPrice = await fetched.then((data) => Number(data));
			const priceInETH = await priceService.getNativeAssetPriceInToken(token.address.toLowerCase());
			const tokenPriceInETH = Number(priceInETH);

			const tokenAmount = fromBigNumber(initialLiquidity[i], token.decimals);
			const tokenPriceInUSD = Math.floor((tokenPriceInETH / usdPrice) * tokenAmount * 100000) / 100000;

			return tokenPriceInUSD;
		});

		void Promise.all(tokenPricesInUSD).then((data) => setTokenPrices(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tokens]);

	useEffect(() => {
		if (deposited === 'success') cancelPoolCreation(false);
	}, [deposited, cancelPoolCreation]);

	useEffect(() => {
		if (txConfirmationStatus === 'success') {
			setForceConfirmTx(false);
			setAddInititalLiquidityEnabled(true);
		}
		if (poolCreationStatus === 'success') {
			setForceConfirmTx(false);
			setAddInititalLiquidityEnabled(true);
		}
		if (poolCreationStatus === 'loading') setForceConfirmTx(true);
	}, [poolCreationStatus, txConfirmationStatus]);

	// @ts-expect-error Types can be weird ya know.
	const [tokensSorted, weightsSorted]: [tokensSorted: string[], weightsSorted: number[]] = assetHelperBoba.sortTokens(
		tokens.map((t) => t.address),
		weights
	);

	return (
		<>
			<StepBackCard setStep={setStep} step={3} previousStep="initial liquidity" />
			<div className="flex w-full flex-col gap-3 rounded-xl bg-darks-500 p-2 sm:p-3">
				{tokens.map((token, i) => (
					<div key={token.symbol} className="flex w-full flex-row items-center justify-between text-right">
						<div className="flex flex-row items-center justify-between gap-2 sm:w-2/5 md:text-xl">
							<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
							<div>{token.symbol}</div>
							<div>-</div>
							<div>{weights[i].toFixed(2)}%</div>
						</div>
						<div>
							<div>{fromBigNumber(initialLiquidity[i], token.decimals)}</div>
							<TokenUSDPrice amount={tokenPrices[i]} />
						</div>
					</div>
				))}
			</div>
			<div className=" flex flex-col gap-2">
				<div className="w-full text-center text-xl">SUMMARY</div>
				<div className="flex w-full flex-row flex-wrap items-center justify-between">
					<div>Pool Name:</div>
					<div className="flex flex-row text-sm underline sm:text-base md:no-underline ">
						<div>K-</div>
						{tokens.map((token, i) => (
							<div className="flex w-full flex-row items-center justify-center">
								<div>{poolType === 'stable' ? '' : Math.round(weights[i])}</div>
								<div>{token.symbol}</div>
								{i + 1 !== tokens.length && <div>-</div>}
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-row items-center justify-between">
					<div>Pool type:</div>
					<div>{poolType}</div>
				</div>
				<div className="flex flex-row items-center justify-between">
					<div>Swap fee:</div>
					<div>{poolFee}%</div>
				</div>
				<div className="flex flex-row items-center justify-between">
					<div>Fee Manager</div>
					<div className="text-right">
						{feeManagerAddress === accountAddress && `My address: `}
						{feeManagerAddress === koyoManageAddress && `Kōyō Finance: `}
						{feeManagerAddress === zeroAddress && `No manager`}
						{feeManagerAddress !== zeroAddress &&
							`${feeManagerAddress?.substring(0, 5)}...${feeManagerAddress?.substring(
								feeManagerAddress.length - 5,
								feeManagerAddress.length
							)}`}
					</div>
				</div>
			</div>
			<SingleEntityConnectButton
				className=" btn w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-400"
				invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
			>
				{!addInititalLiquidityEnabled && !forceConfirmTx && (
					<button
						type="button"
						onClick={() =>
							createPool([
								poolType,
								[
									`Koyo ${tokensSorted
										.map((st, i) => `${weightsSorted[i].toFixed(0)} ${tokens.find((t) => isSameAddress(st, t.address))?.symbol}`)
										.join(' ')}`, //
									`K-${tokensSorted
										.map((st, i) => `${weightsSorted[i].toFixed(0)}${tokens.find((t) => isSameAddress(st, t.address))?.symbol}`)
										.join('-')}`,
									tokensSorted,
									...switchPoolCreationParameters(poolType, weights, 200, poolFee),
									feeManagerAddress
								]
							])
						}
					>
						Create liquidity pool
					</button>
				)}
				{forceConfirmTx && !addInititalLiquidityEnabled && (
					<button type="button" onClick={() => sendTransaction()}>
						Force confirm transaction
					</button>
				)}
				{addInititalLiquidityEnabled && (
					<Switch>
						{tokens?.map((token, i) => (
							<Case
								condition={BigNumber.from(allowances[i].data || 0).lt(
									parseUnits((initialLiquidity[i] || 0).toString(), token.decimals)
								)}
								key={token.symbol}
							>
								<FormApproveAsset asset={token.address} spender={vaultContract.address} amount={MaxUint256} className="h-full w-full">
									APPROVE - <span className="italic">{token.name.toUpperCase()}</span>
								</FormApproveAsset>
							</Case>
						))}
						<Default>
							<button
								type="button"
								className="btn w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-300"
								onClick={() => {
									// @ts-expect-error We know what we passed.
									const [sortedTokens, sortedAmounts]: [tokens: string[], amounts: BigNumber[]] = assetHelperBoba.sortTokens(
										tokens.map((token) => token.address) || [],
										tokens.map((_, i) => initialLiquidity[i]) || []
									);

									addLiqudity([
										poolId,
										accountAddress,
										accountAddress,
										{
											assets: sortedTokens,
											maxAmountsIn: sortedAmounts,
											userData: joinInit(sortedAmounts),
											fromInternalBalance: false
										}
									]);
								}}
							>
								Add Initial Liquidity
							</button>
						</Default>
					</Switch>
				)}
			</SingleEntityConnectButton>
		</>
	);
};

export default PoolConfirmation;
