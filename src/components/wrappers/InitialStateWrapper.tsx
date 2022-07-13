import { useWeb3 } from 'hooks/useWeb3';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useAppDispatch } from 'state/hooks';
import { fetchTokenLists } from 'state/reducers/lists';

const InitialStateWrapper: React.FC = ({ children }) => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const { chainId } = useWeb3();

	useEffect(() => {
		dispatch(fetchTokenLists());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		void queryClient.resetQueries(['sor']);
		void queryClient.resetQueries(['swapRouting']);
		void queryClient.resetQueries(['contractCall']);
	}, [chainId, queryClient]);

	return <>{children}</>;
};

export default InitialStateWrapper;
