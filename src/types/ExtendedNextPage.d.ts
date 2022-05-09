import { NextPage } from 'next';
import React from 'react';

export type ExtendedNextPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
	Layout?: React.FC;
};
