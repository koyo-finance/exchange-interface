import React from 'react';
import { UDFCompatibleDatafeed } from 'utils/udf/UDFCompatibleDatafeed';
import { ResolutionString } from 'public/static/charting/charting_library';
import dynamic from 'next/dynamic';

const TradingViewChartContainer = dynamic(() => import('components/TradingView/TradingViewChartContainer'), { ssr: false });

const Chart: React.FC = () => {
	return (
		<div className="mx-0 h-[60vh] w-full rounded-xl lg:mx-2 lg:h-[93.25vh] lg:w-1/2 lg:pb-2 2xl:w-3/5">
			<TradingViewChartContainer
				tvOptions={{
					symbol: 'AAPL',
					library_path: '/static/charting/charting_library/',
					charts_storage_url: 'https://saveload.tradingview.com',
					charts_storage_api_version: '1.1',
					client_id: 'tradingview.com',
					user_id: 'public_user_id',
					fullscreen: false,
					autosize: true,
					locale: 'en',
					interval: 'D' as ResolutionString,
					datafeed: new UDFCompatibleDatafeed('https://demo_feed.tradingview.com'),
					theme: 'Dark'
				}}
				style={{
					height: '60%'
				}}
			/>
		</div>
	);
};

export default Chart;
