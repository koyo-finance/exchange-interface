import { config } from 'core/config';
import { loadIntercom } from 'next-intercom';
import { useEffect } from 'react';

let BLOCK = false;

export function useInitializeIntercom(enable: boolean) {
	useEffect(() => {
		if (BLOCK || !enable || !config.intercomId) return;

		void loadIntercom({
			appId: config.intercomId!,
			scriptType: 'defer'
		});

		BLOCK = true;
	}, [enable]);
}
