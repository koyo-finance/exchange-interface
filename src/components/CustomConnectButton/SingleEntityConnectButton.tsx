import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export interface SingleEntityConnectButtonProps {
	className?: string;
	invalidNetworkClassName?: string;
}

const SingleEntityConnectButton: React.FC<SingleEntityConnectButtonProps> = ({ children, className, invalidNetworkClassName }) => {
	return (
		<ConnectButton.Custom>
			{({ account, chain, openChainModal, openConnectModal, mounted }) => {
				return (
					<div
						{...(!mounted && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none'
							}
						})}
						className={chain?.unsupported ? `${className} ${invalidNetworkClassName}` : className}
					>
						{(() => {
							if (!mounted || !account || !chain) {
								return (
									<button onClick={openConnectModal} type="button" className="h-full w-full">
										Connect Wallet
									</button>
								);
							}

							if (chain.unsupported) {
								return (
									<button onClick={openChainModal} type="button" className="h-full w-full">
										Wrong network
									</button>
								);
							}

							return children;
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default SingleEntityConnectButton;
