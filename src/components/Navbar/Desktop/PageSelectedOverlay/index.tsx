import { useRouter } from 'next/router';
import React from 'react';

const PageSelectedOverlay: React.FC = () => {
	const router = useRouter();

	return (
		<div
			className={`absolute left-0 z-0 h-10 w-1/2 transform rounded-2xl bg-darks-200 bg-opacity-100 duration-200 ${
				router.pathname === '/swap' ? ' translate-x-0' : ''
			} ${router.pathname === '/deposit' ? ' ml-0 translate-x-[100%]' : ''} ${
				router.pathname === '/withdraw' ? 'ml-0 translate-x-[200%]' : ''
			} ${router.pathname === '/' ? ' -translate-x-[100%] opacity-0' : ''}`}
		></div>
	);
};

export default PageSelectedOverlay;
