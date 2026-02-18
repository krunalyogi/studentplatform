import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;

        // Allow the login page through without any checks
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        if (pathname.startsWith('/admin')) {
            const token = req.nextauth.token;
            console.log('Middleware - Token:', token);

            if (!token) {
                console.log('Middleware - No token, redirecting to login');
                return NextResponse.redirect(new URL('/admin/login', req.url));
            }

            if (token.role !== 'admin') {
                console.log('Middleware - Non-admin user, redirecting to home');
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    },
    {
        callbacks: {
            // Allow unauthenticated access to the login page; protect everything else
            authorized: ({ token, req }) => {
                if (req.nextUrl.pathname === '/admin/login') {
                    return true;
                }
                return !!token;
            }
        },
        pages: {
            signIn: '/admin/login',
        }
    }
);

export const config = {
    matcher: ['/admin', '/admin/:path*']
};
