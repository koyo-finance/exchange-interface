import React, { useEffect } from 'react';
import { useAppDispatch } from 'state/hooks';
import { fetchTokenLists } from 'state/reducers/lists';

const InitialStateWrapper: React.FC = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		// dispatch(fetchPoolLists());
		dispatch(fetchTokenLists());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};

export default InitialStateWrapper;
