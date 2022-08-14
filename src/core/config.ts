import { ChainId } from '@koyofinance/core-sdk';
import * as z from 'zod';

export const configSchema = z.object({
	defaultChainId: z.number().optional().default(ChainId.BOBA),
	intercomId: z.string().optional(),
	momijiEnable: z.boolean(),
	ipfs: z.boolean()
});

export const config = configSchema.parse({
	defaultChainId: process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID, 10) : undefined,
	intercomId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
	momijiEnable: JSON.parse(process.env.NEXT_PUBLIC_MOMIJI_ENABLE || 'false') as boolean,
	ipfs: JSON.parse(process.env.NEXT_PUBLIC_IPFS_EXPORT || 'false') as boolean
});

export type Config = z.infer<typeof configSchema>;
