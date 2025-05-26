import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const PUBLIC_ROUTES = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/ip',
  '/banned',
  '/api/webhooks(.*)',
];

// Contoh rute yang hanya bisa diakses user yang sudah login
const PROTECTED_ROUTES = [
  '/dashboard',
];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const authData = await auth(); // Await the auth() Promise
  const { userId } = authData;

  // Handle public routes
  if (PUBLIC_ROUTES.some(route => new RegExp(`^${route.replace('(.*)', '.*')}$`).test(pathname))) {
    return NextResponse.next();
  }

  // Handle protected routes (contoh: /dashboard)
  if (PROTECTED_ROUTES.some(route => new RegExp(`^${route}$`).test(pathname))) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', nextUrl.origin);
      signInUrl.searchParams.set('redirect_url', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Default Clerk auth check
  if (!userId) {
    const signInUrl = new URL('/sign-in', nextUrl.origin);
    signInUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(signInUrl);
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