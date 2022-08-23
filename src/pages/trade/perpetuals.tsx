import { SwapInfo, SwapTypes } from '@balancer-labs/sor';
import { toBigNumber } from '@koyofinance/core-sdk';
import type { useGetQoute } from '@koyofinance/momiji-hooks';
import { TokenInfo } from '@uniswap/token-lists';
import SwapCardToken from 'components/apps/amm/unified/swap/cards/SwapCardToken';
import SwapSwapTokensSlot from 'components/apps/amm/unified/swap/SwapSwapTokensSlot';
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
import Positions from 'components/apps/trade/Positions';
import DepositType from 'components/apps/trade/DepositType';
import LeverageSlider from 'components/apps/trade/LeverageSlider';
import InfoSummary from 'components/apps/trade/InfoSummary';
import { collateralAssets } from 'constants/perpetualCollateral';
import CollateralAssetModal from 'components/apps/trade/CollateralAssetModal';

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
	const [collateralAssetDropdownOpen, setCollateralAssetDropdownOpen] = useState(false);

	const tokensCanBeCollateral = TOKENS.filter((token) => token.tags?.includes('stablecoin'));
	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const [depositType, setDepositType] = useState('long');
	const [leverage, setLeverage] = useState(5);
	const [orderIsLimit, setOrderIsLimit] = useState(false);
	const [collateralAsset, setCollateralAsset] = useState(collateralAssets[0]);

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
			<div className="relative flex min-h-screen w-full flex-col justify-center gap-4 bg-darks-500 pt-24 pb-6 md:pb-0 lg:flex-row lg:pt-20">
				{tokenModalOneIsOpen && (
					<SwapTokenModal
						tokenNum={activeToken}
						oppositeToken={activeToken === 2 ? tokenOne : tokenTwo}
						closeModal={() => setTokenModalIsOpen(false)}
						setToken={setTokenHandler}
					/>
				)}
				{collateralAssetDropdownOpen && (
					<CollateralAssetModal
						collateralTokens={tokensCanBeCollateral}
						setCollateralAsset={setCollateralAsset}
						setCollateralDropdownOpen={setCollateralAssetDropdownOpen}
					/>
				)}
				<div className="flex w-full flex-col gap-4 lg:w-1/2 xl:w-3/5">
					<Chart />
					<div className="hidden lg:block">
						<Positions />
					</div>
				</div>
				<div className=" mb-2 flex h-fit w-full transform-gpu animate-fade-in flex-col gap-4 rounded-xl bg-black bg-opacity-50 p-4 lg:w-[45vw] xl:w-[40vw] 2xl:w-[30vw]">
					<DepositType depositType={depositType} setDepositType={setDepositType} />
					<div className="flex w-full flex-row items-center justify-start gap-4">
						<div
							className={`cursor-pointer text-base text-white ${
								orderIsLimit ? 'opacity-50 hover:opacity-75' : 'opacity-100'
							} transform-gpu duration-100 `}
							onClick={() => setOrderIsLimit(false)}
						>
							Market
						</div>
						<div
							className={`cursor-pointer text-base text-white ${
								orderIsLimit ? 'opacity-100' : 'opacity-50 hover:opacity-75'
							} transform-gpu duration-100 `}
							onClick={() => setOrderIsLimit(true)}
						>
							Limit
						</div>
					</div>
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
						{(props) => (
							<Form>
								<div className="flex w-full flex-col gap-2">
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
									{orderIsLimit && (
										<div className="mt-2 flex w-full flex-col gap-4 rounded-xl bg-darks-500 px-4 py-3">
											<div className="flex w-full flex-row items-center justify-between">
												<div className=" text-lg text-darks-200 md:text-xl lg:text-2xl">Price</div>
												<div className="pr-2 text-lg">Market: 1923</div>
											</div>
											<div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
												<div className=" flex w-full flex-row items-center gap-2 border-0 border-b-2 border-darks-200 md:w-3/4">
													<input
														type="number"
														min={0}
														step={0.01}
														placeholder={'0.00'}
														className="w-full bg-transparent font-jtm text-4xl font-thin text-white outline-none"
													/>
												</div>
												<div className="w-full gap-2 text-center text-3xl sm:w-1/4">USD</div>
											</div>
										</div>
									)}
									<LeverageSlider leverage={leverage} setLeverage={setLeverage} />
									<InfoSummary
										setCollateralDropdownOpen={setCollateralAssetDropdownOpen}
										collateralAsset={collateralAsset}
										entryPrice={props.values[SwapTokenNumber.IN]}
										liquidationPrice={0}
										fees={0}
										leverage={leverage}
									/>
									<PerpetualsDepositBtn />
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div className="mb-4 block lg:hidden">
					<Positions />
				</div>
			</div>
		</>
	);
};

export default PerpetualsPage;
