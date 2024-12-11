import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // Skip handling for static files, API routes, and specific paths
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api') || url.pathname.startsWith('/public') ) {
    return NextResponse.next();
  }

  // Example: Authentication logic
  const token = req.cookies.get('auth_user'); // Adjust based on your cookie key
  const publicPaths = ['/signin', '/signup'];

  // Handle authenticated users trying to access public routes
  if (token && publicPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to home page
  }

  // Prevent unauthenticated access to protected routes
  if (!token && !publicPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/signin', req.url)); // Redirect to signin page
  }

  // Allow the request to proceed
  return NextResponse.next();
}
