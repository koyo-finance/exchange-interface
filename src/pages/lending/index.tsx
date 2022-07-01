import { formatAmount, fromBigNumber } from '@koyofinance/core-sdk';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import useMultiTokenBalances from 'hooks/generic/useMultiTokenBalances';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokens } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const LendingPage: ExtendedNextPage = () => {
	const tokens = useSelector(selectAllTokens());

	const { accountAddress } = useWeb3();

	const tokensBalance = useMultiTokenBalances(
		accountAddress,
		tokens.map((fToken) => fToken.address)
	);

	const balances = tokens.map((token, i) => {
		return fromBigNumber(tokensBalance[i].data || 0, token.decimals);
	});

	return (
		<>
			<NextSeo
				title="Farms"
				canonical={`${ROOT_WITH_PROTOCOL}/kyo/farms`}
				description="Deposit your LP tokens to desired gauges and earn rewards."
			/>
			<div className=" flex min-h-screen w-full flex-col items-center gap-[5vh] bg-darks-500 px-4 pb-8 pt-24 md:px-0 lg:pt-20 ">
				<div className="m-5 flex w-full flex-row items-center justify-center">
					<div>
						<img src="/assets/icons/tokens-left.svg" alt="tokens" />
					</div>
					<div className="mt-8 flex w-1/2 flex-col items-center justify-center gap-8 text-center text-white">
						<h1 className=" text-4xl font-bold md:text-5xl">Kōyō Lending</h1>
						<div className="w-full font-normal md:w-3/4 md:text-xl md:font-semibold lg:w-1/2">
							Lend & borrow, to open yourself new financial opportunities for your DeFi assets.
						</div>
					</div>
					<div>
						<img src="/assets/icons/tokens-right.svg" alt="tokens" />
					</div>
				</div>
				<div className="flex w-full flex-row justify-items-center gap-6 px-6">
					<div className="flex w-1/2 flex-col gap-6">
						<div
							key={'Your lendings'}
							className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white  xl:text-xl"
						>
							<div className="w-full">Your lendings</div>
							<div>
								<div>Total balance: </div>
								<div>Total collateral</div>
								<div>Total APY:</div>
							</div>
						</div>
						<div
							key={'lend'}
							className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white   xl:text-xl"
						>
							<div>Lend your assets</div>
							{tokens.map((token, i) =>
								Number(balances[i]) > 0 ? (
									<div className="flex w-full flex-row">
										<div className="flex flex-row items-center gap-2">
											<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
											<div>{token.name}</div>
										</div>
										<div>{formatAmount(balances[i], 4)}</div>
									</div>
								) : (
									''
								)
							)}
						</div>
					</div>
					<div className="flex w-1/2 flex-col gap-6">
						<div
							key={'Borrowings'}
							className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white   xl:text-xl"
						>
							<div>Your borrowings</div>
							<div>
								<div>Total debt: </div>
								<div>Total debt: </div>
								<div>Total APY: </div>
								<div></div>
							</div>
						</div>
						<div
							key={'borrow'}
							className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white   xl:text-xl"
						>
							<div>Borrow assets</div>
							{tokens.map((token) => (
								<div className="flex w-full flex-row">
									<div className="flex flex-row items-center gap-2">
										<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
										<div>{token.name}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

LendingPage.Layout = SwapLayout('lending');
export default LendingPage;
