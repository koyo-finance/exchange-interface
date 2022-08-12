import SwapCardKoyoSORTradeRoute from 'components/apps/amm/unified/swap/koyo/SwapCardKoyoSORTradeRoute';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectMomijiUsage } from 'state/reducers/swap';

const SwapCardTradeRoute: React.FC = () => {
	const momijiEnabled = useSelector(selectMomijiUsage);

	return <>{momijiEnabled ? null : <SwapCardKoyoSORTradeRoute />}</>;
};

export default SwapCardTradeRoute;
