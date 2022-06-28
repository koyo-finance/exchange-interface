import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export interface SingleEntityConnectButtonProps {
	className?: string;
	invalidNetworkClassName?: string;
	textClassName?: string;
	customText?: string;
}

const SingleEntityConnectButton: React.FC<SingleEntityConnectButtonProps> = ({
	children,
	className,
	invalidNetworkClassName,
	textClassName,
	customText
}) => {
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
									<button onClick={openConnectModal} type="button" className={`h-full w-full ${textClassName || ''}`}>
										Connect Wallet{customText || ''}
									</button>
								);
							}

							if (chain.unsupported) {
								return (
									<button onClick={openChainModal} type="button" className={`h-full w-full ${textClassName || ''}`}>
										Wrong network{customText || ''}
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
