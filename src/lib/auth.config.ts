import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Twitch from 'next-auth/providers/twitch';
import Discord from 'next-auth/providers/discord';

import type { NextAuthConfig } from 'next-auth';

export default {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.email.split('@')[0],
					email: profile.email,
					image: profile.picture,
					role: 'user',
				};
			},
		}),
		Github({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: 'user',
				};
			},
		}),
		Discord({
			clientId: process.env.AUTH_DISCORD_ID,
			clientSecret: process.env.AUTH_DISCORD_SECRET,
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.username,
					email: profile.email,
					image: `https://cdn.discordapp.com/avatars/${profile.id.toString()}/${
						profile.avatar
					}.png`,
					role: 'user',
				};
			},
		}),
		Twitch({
			clientId: process.env.AUTH_TWITCH_ID,
			clientSecret: process.env.AUTH_TWITCH_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.preferred_username,
					email: profile.email,
					image: profile.picture,
					role: 'user',
				};
			},
			account(account) {
				return {
					role: 'user',
				};
			},
		}),
	],
	pages: { signIn: '/auth/login', error: '/auth/error' },
	callbacks: {
		signIn({ user, account }) {
			console.log('marc', user, account);
			return true;
		},
		jwt({ token, user }) {
			console.log('BROCK', user);
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (session) {
				session.user.id = String(token.id);
				session.user.role = token.role;
			}
			return session;
		},
	},
} satisfies NextAuthConfig;
