import { SwapInfo, SwapTypes } from '@balancer-labs/sor';
import { MaxUint256 } from '@ethersproject/constants';
import { toBigNumber } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import SwapCardToken from 'components/apps/amm/unified/swap/cards/SwapCardToken';
import SwapCardTop from 'components/apps/amm/unified/swap/cards/SwapCardTop';
import SwapCardTradeRoute from 'components/apps/amm/unified/swap/cards/SwapCardTradeRoute';
import SwapTokenModal from 'components/apps/amm/unified/swap/modals/SwapTokenModal';
import SwapSwapTokensSlot from 'components/apps/amm/unified/swap/SwapSwapTokensSlot';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import FormApproveAsset from 'components/FormApproveAsset';
import GuideLink from 'components/GuideLink';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { SwapTokenNumber } from 'constants/swaps';
import { BigNumber } from 'ethers';
import { Form, Formik } from 'formik';
import useVaultContract from 'hooks/contracts/useVaultContract';
import useTokenAllowance from 'hooks/generic/useTokenAllowance';
import { useRoutedSwap } from 'hooks/SOR/useRoutedSwap';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { Case, Default, Else, If, Switch, Then } from 'react-if';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { selectTokenOne, selectTokenTwo, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const swapType = SwapTypes.SwapExactIn;

export interface SwapFormValues {
	1: number;
	2: number;
	swapType: SwapTypes;
	info?: SwapInfo;
}

const SwapIndexPage: ExtendedNextPage = () => {
	const { accountAddress, signer, chainId } = useWeb3();
	const dispatch = useAppDispatch();
	const vaultContract = useVaultContract();

	const TOKENS = useSelector(selectAllTokensByChainId(chainId));
	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState<SwapTokenNumber>(SwapTokenNumber.IN);
	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	useEffect(() => {
		setTokenHandler(TOKENS[0], 1);
		setTokenHandler(TOKENS[1], 2);
	}, [chainId]);

	const { data: allowance = 0 } = useTokenAllowance(accountAddress, vaultContract.address, tokenOne.address);

	const openTokenModalHandler = (tokenNum: number) => {
		setActiveToken(tokenNum);
		setTokenModalIsOpen(true);
	};

	const setTokenHandler = (token: TokenInfo, tokenNum: number) => {
		if (tokenNum === SwapTokenNumber.IN) {
			dispatch(setTokenOne(token));
		} else if (tokenNum === SwapTokenNumber.OUT) {
			dispatch(setTokenTwo(token));
		}
	};

	const { mutate: swap, status: swapStatus } = useRoutedSwap(signer);

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
					<Formik<SwapFormValues>
						initialValues={{
							[SwapTokenNumber.IN]: undefined as unknown as number,
							[SwapTokenNumber.OUT]: undefined as unknown as number,
							swapType
						}}
						onSubmit={(values) => {
							swap({
								options: {
									tokenIn: tokenOne.address,
									tokenOut: tokenTwo.address,
									amount: toBigNumber(values[SwapTokenNumber.IN], tokenOne.decimals),
									swapType,
									funds: {
										sender: accountAddress,
										fromInternalBalance: false,
										recipient: accountAddress,
										toInternalBalance: false
									}
								}
							});
						}}
					>
						{(props) => (
							<Form>
								<div className="flex w-full flex-col gap-1">
									<SwapCardTop />
									<SwapCardToken
										tokenNum={SwapTokenNumber.IN}
										token={tokenOne}
										swapStatus={swapStatus}
										isIn={true}
										openTokenModal={openTokenModalHandler}
										setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
									/>
									<SwapSwapTokensSlot />
									<SwapCardToken
										tokenNum={SwapTokenNumber.OUT}
										token={tokenTwo}
										swapStatus={swapStatus}
										isIn={false}
										openTokenModal={openTokenModalHandler}
										setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
									/>

									{props.values.info && (
										<>
											<SwapCardTradeRoute />
											<If
												condition={
													!(props.values.info.swapAmount.lte(BigNumber.from(0)) || props.values.info.swaps.length === 0)
												}
											>
												<Then>
													<SingleEntityConnectButton
														className="btn mt-2 w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
														invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
													>
														<Switch>
															{/* <SwapTokenApprovalCase token={tokenOne} amount={props.values[SwapTokenNumber.IN]} /> */}
															<Case
																condition={BigNumber.from(allowance).lte(
																	toBigNumber(props.values[SwapTokenNumber.IN] || 0, tokenOne.decimals)
																)}
															>
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
													<button
														type="button"
														className="mt-2 w-full rounded-lg bg-gray-600 bg-opacity-100 p-3 text-center text-black"
													>
														Cannot swap -{' '}
														{props.values.info.swapAmount.lte(BigNumber.from(0))
															? 'No amount or insufficient liquidity'
															: 'Invalid path'}
													</button>
												</Else>
											</If>
										</>
									)}
								</div>
							</Form>
						)}
					</Formik>
				</SwapLayoutCard>
				<GuideLink type="Swap" text="Trouble swapping?" link="https://docs.koyo.finance/protocol/guide/exchange/swap" />
			</div>
		</>
	);
};

SwapIndexPage.Layout = SwapLayout('swap');
export default SwapIndexPage;
