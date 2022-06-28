import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import React from 'react';

const WithdrawCardWithdrawButton: React.FC = () => {
	return (
		<div className="mt-4">
			<SingleEntityConnectButton
				className="btn mt-2 w-full bg-lights-400 bg-opacity-100 font-sora text-black hover:bg-lights-200"
				invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
			>
				<button type="submit" className="h-full w-full">
					WITHDRAW
				</button>
			</SingleEntityConnectButton>
		</div>
	);
};

export default WithdrawCardWithdrawButton;
