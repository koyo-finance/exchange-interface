import FormApproveAsset from 'components/Pools/StableSwap/FormApproveAsset';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const SwapIndexPage: ExtendedNextPage = () => {
	return (
		<>
			<SwapLayoutCard>
				<div className="px-2">Hi</div>
				<div className="flex flex-col gap-3"></div>
			</SwapLayoutCard>
		</>
	);
};
SwapIndexPage.Layout = SwapLayout('swap-page');

export default SwapIndexPage;
