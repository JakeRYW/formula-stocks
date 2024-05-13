import authConfig from '@/lib/auth.config';
import NextAuth from 'next-auth';
import {
	publicRoutes,
	authRoutes,
	apiAuthPrefix,
	apiRoutes,
	DEFAULT_LOGIN_REDIRECT,
} from '@/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isApiRoute = apiRoutes.find((route) =>
		nextUrl.pathname.startsWith(`${route}`)
	);

	if (isApiAuthRoute) {
		return;
	}

	if (isApiRoute) {
		return;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(
			new URL(`/api/auth/signin?callbackUrl=${nextUrl.pathname}`, nextUrl)
		);
	}

	return;
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
