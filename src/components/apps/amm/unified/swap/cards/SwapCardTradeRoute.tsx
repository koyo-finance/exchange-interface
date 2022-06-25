import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import { useFormikContext } from 'formik';
import { useGetRoutes } from 'hooks/sor/useGetRoutes';
import { useGetSORPools } from 'hooks/sor/useGetSORPools';
import { SwapFormValues } from 'pages/swap';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokens } from 'state/reducers/lists';
import { selectTokenOne, selectTokenTwo } from 'state/reducers/selectedTokens';
import { isSameAddress } from 'utils/isSameAddress';

const SwapCardTradeRoute: React.FC = () => {
	const TOKENS = useSelector(selectAllTokens());
	const { values } = useFormikContext<SwapFormValues>();
	const { data: pools } = useGetSORPools();

	const { address: addressIn } = useSelector(selectTokenOne);
	const { address: addressOut } = useSelector(selectTokenTwo);

	const routes = useGetRoutes(addressIn, addressOut, pools || [], values.info?.swaps || [], values.info?.tokenAddresses || []);

	if (routes.length === 0) return null;

	return (
		<div>
			<div>
				<div className="flex justify-between text-xs">
					<div></div>
					<div></div>
				</div>
				<div className="relative mt-2">
					<div className="pair-line absolute mx-9 h-1/2 border-b border-dashed border-gray-500" />
					<div className="relative z-10 flex justify-between">
						<SymbolCurrencyIcon
							symbol={TOKENS.find((t) => isSameAddress(t.address, addressIn))?.symbol}
							className="inline-block h-9 w-9 leading-none"
						/>
						<SymbolCurrencyIcon
							symbol={TOKENS.find((t) => isSameAddress(t.address, addressOut))?.symbol}
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
							height: `${18 + 70 * index}px`,
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
									<a href="/" target="_blank" className="flex p-1.5">
										{hop.pool.tokens.map((token) => (
											<SymbolCurrencyIcon
												symbol={TOKENS.find((t) => isSameAddress(t.address, token.address))?.symbol}
												className="inline-block h-5 w-5 leading-none"
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
	);
};

export default SwapCardTradeRoute;