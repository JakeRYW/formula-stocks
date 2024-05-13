import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
	path: '.env.local',
});

export default {
	schema: './src/drizzle/schema.ts',
	out: './src/drizzle',
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DRIZZLE_DATABASE_URL!,
	},
} satisfies Config;
