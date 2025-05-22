import { NextResponse, type NextRequest } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import auth from '@clerk/nextjs/server';
const PUBLIC_ROUTES = [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/ip',
    '/banned',
    '/not-authorized',
    '/api/webhooks(.*)',
];
const ADMIN_ROUTES = [
    '/admin(.*)',
    '/settings(.*)',
];
export async function middleware(request: NextRequest) {
    const { nextUrl, cookies } = request;
    const { pathname } = nextUrl;
    const token = cookies.get('admin-token')?.value;
    if (ADMIN_ROUTES.some(route => {
        const regex = new RegExp(`^${route.replace('(.*)', '.*')}$`);
        return regex.test(pathname);
    })) {
        if (token === process.env.ADMIN_TOKEN_SECRET) {
            if (pathname === '/admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
            }
            return NextResponse.next();
        }
        if (pathname === '/admin') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/admin', nextUrl));
    }
    if (PUBLIC_ROUTES.some(route => {
        const regex = new RegExp(`^${route.replace('(.*)', '.*')}$`);
        return regex.test(pathname);
    })) {
        return NextResponse.next();
    }
    try {
        const { userId } = auth();
        if (!userId) {
            const signInUrl = new URL('/sign-in', nextUrl.origin);
            signInUrl.searchParams.set('redirect_url', pathname);
            return NextResponse.redirect(signInUrl);
        }
        if (userId) {
            const user = await clerkClient.users.getUser(userId);
            const isBanned = user.publicMetadata.isBanned;
            if (isBanned && pathname !== '/banned') {
                return NextResponse.redirect(new URL('/banned', nextUrl));
            }
        }
    }
    catch (error) {
        console.error('Middleware error:', error);
        if (pathname.startsWith('/admin')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/sign-in', nextUrl));
    }
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');
    return response;
}
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/uploadthing).*)',
    ],
};
