import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Twitch from 'next-auth/providers/twitch';
import Discord from 'next-auth/providers/discord';

import type { NextAuthConfig } from 'next-auth';

export default {
	pages: { signIn: '/auth/login', error: '/auth/error' },
	providers: [
		Google({
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.email.split('@')[0],
					email: profile.email,
					image: profile.picture,
				};
			},
		}),
		Github({
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
		Discord({
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.username,
					email: profile.email,
					image: `https://cdn.discordapp.com/avatars/${profile.id.toString()}/${
						profile.avatar
					}.png`,
				};
			},
		}),
		Twitch({
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.preferred_username,
					email: profile.email,
					image: profile.picture,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role;
			}

			return session;
		},
	},
} satisfies NextAuthConfig;
