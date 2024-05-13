import Twitch from 'next-auth/providers/twitch';

import type { NextAuthConfig } from 'next-auth';

export default {
	providers: [Twitch],
	pages: { signIn: '/signin' },
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }) {
			session.user.id = String(token.id);
			return session;
		},
	},
} satisfies NextAuthConfig;
