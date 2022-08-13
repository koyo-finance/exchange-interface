import { SwapInfo, SwapTypes } from '@balancer-labs/sor';
import { toBigNumber } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import SwapCardToken from 'components/apps/amm/unified/swap/cards/SwapCardToken';
import SwapCardTop from 'components/apps/amm/unified/swap/cards/SwapCardTop';
import SwapTokenModal from 'components/apps/amm/unified/swap/modals/SwapTokenModal';
import SwapSwapTokensSlot from 'components/apps/amm/unified/swap/SwapSwapTokensSlot';
import SwapWrapper from 'components/apps/amm/unified/swap/SwapWrapper';
import GuideLink from 'components/GuideLink';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { SwapTokenNumber } from 'constants/swaps';
import { Form, Formik } from 'formik';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { selectTokenOne, selectTokenTwo, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import type { useGetQoute } from '@koyofinance/momiji-hooks';

const swapType = SwapTypes.SwapExactIn;

export interface SwapFormValues {
	1: number;
	2: number;
	swapType: SwapTypes;
	info?: SwapInfo;
	quote?: ReturnType<typeof useGetQoute>['data'];
}

const SwapIndexPage: ExtendedNextPage = () => {
	const { chainId } = useWeb3();
	const dispatch = useAppDispatch();

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
				title="Swap"
				canonical={`${ROOT_WITH_PROTOCOL}/swap`}
				description="Swap your tokens between different pools. Kōyō Finance makes swapping tokens easier than ever before."
			/>
			<div className="relative flex min-h-screen w-full items-center justify-center bg-darks-500 pt-24 pb-6 md:pb-0 lg:pt-20">
				{tokenModalOneIsOpen && (
					<SwapTokenModal
						tokenNum={activeToken}
						oppositeToken={activeToken === 2 ? tokenOne : tokenTwo}
						closeModal={() => setTokenModalIsOpen(false)}
						setToken={setTokenHandler}
					/>
				)}
				<SwapLayoutCard className="w-[95vw] sm:w-[75vw] md:w-[55vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[30vw]">
					<SwapWrapper>
						{(sw) => (
							<Formik<SwapFormValues>
								initialValues={{
									[SwapTokenNumber.IN]: undefined as unknown as number,
									[SwapTokenNumber.OUT]: undefined as unknown as number,
									swapType
								}}
								onSubmit={(values) => {
									sw.swapFunction(toBigNumber(values[SwapTokenNumber.IN], tokenOne.decimals), values.quote);
								}}
							>
								{() => (
									<Form>
										<div className="flex w-full flex-col gap-1">
											<SwapCardTop />
											<SwapCardToken
												tokenNum={SwapTokenNumber.IN}
												token={tokenOne}
												swapStatus={sw.status}
												isIn={true}
												openTokenModal={openTokenModalHandler}
												setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
											/>
											<SwapSwapTokensSlot />
											<SwapCardToken
												tokenNum={SwapTokenNumber.OUT}
												token={tokenTwo}
												swapStatus={sw.status}
												isIn={false}
												openTokenModal={openTokenModalHandler}
												setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
											/>
											<sw.content />
										</div>
									</Form>
								)}
							</Formik>
						)}
					</SwapWrapper>
				</SwapLayoutCard>
				<GuideLink type="Swap" text="Trouble swapping?" link="https://docs.koyo.finance/protocol/guide/exchange/swap" />
			</div>
		</>
	);
};

SwapIndexPage.Layout = SwapLayout('swap');
export default SwapIndexPage;
