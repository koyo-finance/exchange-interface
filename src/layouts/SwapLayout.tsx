import Container from 'components/Container';
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
		<div className={classNames('bg-dark-800 shadow-dark-1000 flex flex-col gap-3 rounded-[24px] p-2 pt-4 shadow-md md:p-4', className)}>
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
