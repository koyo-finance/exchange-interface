import { Transition } from '@headlessui/react';
import CurrencyIcon from 'components/CurrencyIcon/CurrencyIcon';
import { useFormikContext } from 'formik';
import { useGetRoutes } from 'hooks/SOR/useGetRoutes';
import { useGetSORPools } from 'hooks/SOR/useGetSORPools';
import { SwapFormValues } from 'pages/swap';
import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokens } from 'state/reducers/lists';
import { selectTokenOne, selectTokenTwo } from 'state/reducers/selectedTokens';
import { isSameAddress } from 'utils/isSameAddress';
import SwapCardRouterIcon from './SwapCardRouterIcon';

const SwapCardTradeRoute: React.FC = () => {
	const TOKENS = useSelector(selectAllTokens());
	const { values } = useFormikContext<SwapFormValues>();
	const { data: pools } = useGetSORPools();

	const { address: addressIn } = useSelector(selectTokenOne);
	const { address: addressOut } = useSelector(selectTokenTwo);

	const routes = useGetRoutes(addressIn, addressOut, pools || [], values.info?.swaps || [], values.info?.tokenAddresses || []);

	const [showRoutes, toggleRoutes] = useReducer((state) => {
		return !state;
	}, false);

	if (routes.length === 0) return null;

	return (
		<div className="mt-2 rounded-xl bg-darks-500 p-4">
			<button type="button" onClick={() => toggleRoutes()} className="w-full min-w-full text-left">
				<SwapCardRouterIcon className="inline-block" />{' '}
				<span
					className="bg-router-label-gradient"
					style={{
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent'
					}}
				>
					Auto Router
				</span>
			</button>
			<Transition
				show={showRoutes}
				enter="transition-opacity duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="pt-4">
					<div>
						<div className="flex justify-between text-xs">
							<div></div>
							<div></div>
						</div>
						<div className="relative">
							<div className="pair-line absolute mx-9 h-1/2 border-b border-dashed border-gray-500" />
							<div className="relative z-10 flex justify-between">
								<CurrencyIcon
									symbol={TOKENS.find((t) => isSameAddress(t.address, addressIn))?.symbol}
									overrides={[TOKENS.find((t) => isSameAddress(t.address, addressIn))?.logoURI || '']}
									className="inline-block h-9 w-9 leading-none"
								/>
								<CurrencyIcon
									symbol={TOKENS.find((t) => isSameAddress(t.address, addressOut))?.symbol}
									overrides={[TOKENS.find((t) => isSameAddress(t.address, addressOut))?.logoURI || '']}
									className="inline-block h-9 w-9 leading-none"
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-between" style={{ margin: `8px ${12 + routes.length}px` }}></div>
					<div className="relative my-1.5 mx-4">
						{routes.map((_route, index) => (
							<div
								key={index}
								className="absolute rounded-b-md border-l border-r border-b border-gray-500"
								style={{
									height: `${18 + 42 * index}px`,
									width: `calc(100% - ${4 * (routes.length - index - 1)}px + 1px)`,
									margin: `0 ${2 * (routes.length - index - 1) - 1}px`
								}}
							/>
						))}
						{routes.map((route) => (
							<div key={route.hops[0]?.pool?.id} className="mt-2 flex justify-between first:mt-0">
								<div className="ml-4 flex w-4 items-center"></div>
								<div className="flex">
									{route.hops.map((hop) => (
										<div
											key={hop?.pool?.id}
											className="z-[1] ml-4 flex rounded-xl border border-gray-600 bg-gray-900 shadow transition-colors first:ml-0 hover:border-gray-400 hover:bg-gray-800"
										>
											<a href={`https://info.koyo.finance/#/pools/${hop.pool.id}`} target="_blank" className="flex p-1.5">
												{hop.pool.tokens.map((token) => (
													<CurrencyIcon
														symbol={TOKENS.find((t) => isSameAddress(t.address, token.address))?.symbol}
														overrides={[TOKENS.find((t) => isSameAddress(t.address, token.address))?.logoURI || '']}
														className="inline-block h-5 w-5 leading-none"
														key={token.address}
													/>
												))}
											</a>
										</div>
									))}
								</div>
								<div className="mr-4 w-10 text-right text-xs text-gray-500">{route.share * 100}%</div>
							</div>
						))}
					</div>
				</div>
			</Transition>
		</div>
	);
};

export default SwapCardTradeRoute;
