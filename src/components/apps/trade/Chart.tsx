import React from 'react';
import { UDFCompatibleDatafeed } from 'utils/udf/UDFCompatibleDatafeed';
import { ResolutionString } from 'public/static/charting/charting_library';
import dynamic from 'next/dynamic';

const TradingViewChartContainer = dynamic(() => import('components/TradingView/TradingViewChartContainer'), { ssr: false });

const Chart: React.FC = () => {
	return (
		<div className="mx-0 h-[50vh] w-full rounded-xl ">
			<TradingViewChartContainer
				tvOptions={{
					symbol: 'TSLA',
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
					height: '100%'
				}}
			/>
		</div>
	);
};

export default Chart;
