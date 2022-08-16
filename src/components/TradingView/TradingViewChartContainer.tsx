import React, { useEffect, useRef } from 'react';
import { TradingViewWidgetOptions } from 'types/TradingView';
import { widget } from '../../public/static/charting/charting_library';

export interface TradingViewChartContainerProps
	extends Pick<React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'style' | 'className'> {
	tvOptions: Omit<TradingViewWidgetOptions, 'container'>;
}

const TradingViewChartContainer: React.FC<TradingViewChartContainerProps> = ({ className, tvOptions, style }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tvWidget = new widget({
			...tvOptions,
			disabled_features: [...(tvOptions.disabled_features || []), 'use_localstorage_for_settings'],
			container: ref.current!
		});

		return () => {
			tvWidget.remove();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div className={className} style={style} ref={ref} />;
};

export default TradingViewChartContainer;
