import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import { useFormikContext } from 'formik';
import { SwapFormValues } from 'pages/swap';
import React from 'react';

const SwapCardMomijiContent: React.FC = () => {
	const { values } = useFormikContext<SwapFormValues>();

	return values.error ? (
		<div className="btn pointer-events-none mt-2 w-full bg-darks-200 bg-opacity-100 normal-case text-black hover:translate-x-0 hover:cursor-default hover:bg-darks-200">
			{values.error}
		</div>
	) : (
		<SingleEntityConnectButton
			className="btn mt-2 w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
			invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
		>
			<button type="submit" className="h-full w-full">
				CREATE ORDER
			</button>
		</SingleEntityConnectButton>
	);
};

export default SwapCardMomijiContent;
