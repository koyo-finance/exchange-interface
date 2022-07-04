import { loadIntercom } from 'next-intercom';
import { useEffect } from 'react';

let BLOCK = false;

export function useInitializeIntercom(enable: boolean) {
	useEffect(() => {
		if (BLOCK || !enable || !process.env.NEXT_PUBLIC_INTERCOM_APP_ID) return;

		void loadIntercom({
			appId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
			scriptType: 'defer'
		});

		BLOCK = true;
	}, [enable]);
}
