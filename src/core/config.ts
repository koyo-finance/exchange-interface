import * as z from 'zod';

export const configSchema = z.object({
	intercomId: z.string().optional(),
	momijiEnable: z.boolean()
});

export const config = configSchema.parse({
	intercomId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
	momijiEnable: JSON.parse(process.env.NEXT_PUBLIC_MOMIJI_ENABLE || 'false') as boolean
});

export type Config = z.infer<typeof configSchema>;
