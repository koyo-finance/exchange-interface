import React from 'react';
import { classNames } from 'utils/styling';
import DefaultLayout from './DefaultLayout';

export interface SwapLayoutCardProps {
	className?: string;
}

export interface LayoutProps {
	id: string;
}

export const SwapLayoutCard: React.FC<SwapLayoutCardProps> = ({ children, className }) => {
	return (
		<div
			className={classNames(
				' flex w-auto transform-gpu animate-fade-in flex-col gap-2 rounded-xl bg-black bg-opacity-50 p-4  sm:p-6',
				className
			)}
		>
			{children}
		</div>
	);
};

export const Layout: React.FC<LayoutProps> = ({ children, id }) => {
	return (
		<DefaultLayout>
			<div id={id} className="w-full">
				{children}
			</div>
		</DefaultLayout>
	);
};

export const SwapLayout: (id: string) => React.FC = (id: string) => {
	return (props) => <Layout id={id} {...props} />;
};
