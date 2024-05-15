import authConfig from '@/lib/auth.config';
import NextAuth from 'next-auth';
import {
	publicRoutes,
	authRoutes,
	apiAuthPrefix,
	apiRoutes,
	adminRoutes,
	BASE_URL,
} from '@/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const isAdmin = req.auth?.user?.role === 'admin';
	const isHome = nextUrl.pathname === '/';
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isPublicRoute = publicRoutes.find((route) =>
		nextUrl.pathname.startsWith(`${route}`)
	);
	const isApiRoute = apiRoutes.find((route) =>
		nextUrl.pathname.startsWith(`${route}`)
	);
	const isAdminRoute = adminRoutes.find((route) =>
		nextUrl.pathname.startsWith(`${route}`)
	);

	if (isHome) {
		return;
	}

	if (isApiAuthRoute) {
		return;
	}

	if (isApiRoute) {
		return;
	}

	if (isAdminRoute) {
		if (isAdmin) {
			console.log('admin');
			return;
		}
		return Response.redirect(new URL(BASE_URL, nextUrl));
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(BASE_URL, nextUrl));
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(
			new URL(`/auth/login?callbackUrl=${nextUrl.pathname}`, nextUrl)
		);
	}

	return;
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
