import { TokenPriceService } from '@balancer-labs/sor';
import { fromBigNumber } from '@koyofinance/core-sdk';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import jpex from 'jpex';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFeeAddress, selectInitialLiquidity, selectPoolFee, selectPoolType, selectTokens, selectWeights } from 'state/reducers/createPool';
import { useAccount } from 'wagmi';
import StepBackCard from '../../cards/StepBackCard';
import TokenUSDPrice from '../../cards/TokenUSDPrice';

export interface PoolConfirmationProps {
	setStep: (step: number) => void;
}

const PoolConfirmation: React.FC<PoolConfirmationProps> = ({ setStep }) => {
	const tokens = useSelector(selectTokens);
	const weights = useSelector(selectWeights);
	const initialLiquidity = useSelector(selectInitialLiquidity);
	const poolFee = useSelector(selectPoolFee);
	const feeManagerAddress = useSelector(selectFeeAddress);
	const poolType = useSelector(selectPoolType);

	const [tokenPrices, setTokenPrices] = useState<number[]>([]);

	const { data: account } = useAccount();
	const accountAddress = account?.address;
	const koyoManageAddress = '0xBA1BA1ba1BA1bA1bA1Ba1BA1ba1BA1bA1ba1ba1B';
	const zeroAddress = '0x0000000000000000000000000000000000000000';

	const priceService = jpex.resolve<TokenPriceService>();

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

		Promise.all(tokenPricesInUSD).then((data) => setTokenPrices(data));
	}, [tokens]);

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
			<button className="btn w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-300">Create liquidity pool</button>
		</>
	);
};

export default PoolConfirmation;
