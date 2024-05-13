import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';
import authConfig from '@/lib/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});

export const currentUser = async () => {
	const session = await auth();
	return session?.user;
};
