import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith('/admin') &&
            req.nextUrl.pathname !== '/admin/login') {
            const token = req.nextauth.token;

            if (!token) {
                return NextResponse.redirect(new URL('/admin/login', req.url));
            }

            if (token.role !== 'admin') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
        pages: {
            signIn: '/admin/login',
        }
    }
);

export const config = {
    matcher: ['/admin', '/admin/:path*']
};
