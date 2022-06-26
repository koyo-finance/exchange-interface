import { TokenPriceService } from '@balancer-labs/sor';
import { fromBigNumber } from '@koyofinance/core-sdk';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import jpex from 'jpex';
import React, { useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectInitialLiquidity, selectTokens, selectWeights } from 'state/reducers/createPool';

export interface PoolConfirmationProps {
	setStep: (step: number) => void;
}

const PoolConfirmation: React.FC<PoolConfirmationProps> = ({ setStep }) => {
	const tokens = useSelector(selectTokens);
	const weights = useSelector(selectWeights);
	const initialLiquidity = useSelector(selectInitialLiquidity);

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

		tokens.map(async (token, i) => {
			const usdPrice = await fetched.then((data) => Number(data));
			const priceInETH = await priceService.getNativeAssetPriceInToken(token.address);
			const tokenPriceInETH = Number(priceInETH);
			console.log(tokenPriceInETH);

			const tokenAmount = fromBigNumber(initialLiquidity[i], token.decimals);

			const tokenPriceInUSD = (tokenPriceInETH / usdPrice) * tokenAmount;
			console.log(tokenPriceInUSD);
		});
	}, [tokens]);

	return (
		<>
			<div
				className="mt-1 flex w-full transform-gpu cursor-pointer flex-row items-center gap-1 text-lights-400 duration-100 hover:translate-x-1 hover:text-lights-300"
				onClick={() => setStep(3)}
			>
				<BsArrowLeft className=" text-xl font-bold" />
				<div>Back to initital liquidity</div>
			</div>
			<div className="flex w-full flex-col gap-4 rounded-xl bg-darks-500 p-4">
				{tokens.map((token, i) => (
					<div key={token.symbol} className="flex w-full flex-row items-center justify-between">
						<div className="flex w-1/2 flex-row items-center justify-between gap-2 text-xl">
							<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
							<div>{token.symbol}</div>
							<div>-</div>
							<div>{weights[i].toFixed(2)}%</div>
						</div>
						<div>
							<div>{fromBigNumber(initialLiquidity[i], token.decimals)}</div>
							{/* <TokenUSDPrice token={token} amount={initialLiquidity[i]} /> */}
						</div>
					</div>
				))}
			</div>
			<button className="btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-300">Confirm Initial Liquidity</button>
		</>
	);
};

export default PoolConfirmation;
