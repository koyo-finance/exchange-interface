import { SwapInfo, SwapTypes } from '@balancer-labs/sor';
import { toBigNumber } from '@koyofinance/core-sdk';
import type { useGetQoute } from '@koyofinance/momiji-hooks';
import { TokenInfo } from '@uniswap/token-lists';
import SwapCardToken from 'components/apps/amm/unified/swap/cards/SwapCardToken';
import SwapSwapTokensSlot from 'components/apps/amm/unified/swap/SwapSwapTokensSlot';
import GuideLink from 'components/GuideLink';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { SwapTokenNumber } from 'constants/swaps';
import { Form, Formik } from 'formik';
import { useWeb3 } from 'hooks/useWeb3';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { selectTokenOne, selectTokenTwo, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useSwapSOR } from 'hooks/swap/useSwapSOR';
import PerpetualsDepositBtn from 'components/apps/trade/PerpetualsDepositBtn';
import Chart from 'components/apps/trade/Chart';

const SwapTokenModal = dynamic(() => import('components/apps/amm/unified/swap/modals/SwapTokenModal'));

const swapType = SwapTypes.SwapExactIn;

export interface SwapFormValues {
	1: number;
	2: number;
	swapType: SwapTypes;
	info?: SwapInfo;
	quote?: ReturnType<typeof useGetQoute>['data'];
}

const PerpetualsPage: ExtendedNextPage = () => {
	const { chainId } = useWeb3();
	const dispatch = useAppDispatch();
	const { swapSOR, swapStatusSOR } = useSwapSOR();

	const TOKENS = useSelector(selectAllTokensByChainId(chainId));
	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState<SwapTokenNumber>(SwapTokenNumber.IN);
	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const setTokenHandler = (token: TokenInfo, tokenNum: number) => {
		if (tokenNum === SwapTokenNumber.IN) {
			dispatch(setTokenOne(token));
		} else if (tokenNum === SwapTokenNumber.OUT) {
			dispatch(setTokenTwo(token));
		}
	};

	useEffect(() => {
		setTokenHandler(TOKENS[0], 1);
		setTokenHandler(TOKENS[1], 2);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId]);

	const openTokenModalHandler = (tokenNum: number) => {
		setActiveToken(tokenNum);
		setTokenModalIsOpen(true);
	};

	return (
		<>
			<NextSeo
				title="Perpetuals"
				canonical={`${ROOT_WITH_PROTOCOL}/trade/perpetuals`}
				description="Trade your assets in our perpetual pools."
			/>
			<div className="relative flex min-h-screen w-full justify-center bg-darks-500 pt-24 pb-6 md:pb-0 lg:pt-20">
				{tokenModalOneIsOpen && (
					<SwapTokenModal
						tokenNum={activeToken}
						oppositeToken={activeToken === 2 ? tokenOne : tokenTwo}
						closeModal={() => setTokenModalIsOpen(false)}
						setToken={setTokenHandler}
					/>
				)}
				<Chart />
				<div className="flex h-[90vh] transform-gpu animate-fade-in flex-col gap-2 rounded-xl bg-black bg-opacity-50 p-4 sm:w-[75vw] sm:p-6 md:w-[55vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[30vw]">
					<Formik<SwapFormValues>
						initialValues={{
							[SwapTokenNumber.IN]: undefined as unknown as number,
							[SwapTokenNumber.OUT]: undefined as unknown as number,
							swapType
						}}
						onSubmit={(values) => {
							swapSOR(toBigNumber(values[SwapTokenNumber.IN], tokenOne.decimals));
						}}
					>
						{() => (
							<Form>
								<div className="flex w-full flex-col gap-1">
									<SwapCardToken
										tokenNum={SwapTokenNumber.IN}
										token={tokenOne}
										swapStatus={swapStatusSOR}
										isIn={true}
										openTokenModal={openTokenModalHandler}
										setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
									/>
									<SwapSwapTokensSlot />
									<SwapCardToken
										tokenNum={SwapTokenNumber.OUT}
										token={tokenTwo}
										swapStatus={swapStatusSOR}
										isIn={false}
										openTokenModal={openTokenModalHandler}
										setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
									/>
									<PerpetualsDepositBtn />
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<GuideLink type="Swap" text="Trouble swapping?" link="https://docs.koyo.finance/protocol/guide/exchange/swap" />
			</div>
		</>
	);
};

export default PerpetualsPage;
