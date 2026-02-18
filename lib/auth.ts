import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@/lib/models/User';
import { NextAuthOptions } from 'next-auth';

import connectDB from '@/lib/mongodb';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                await connectDB();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const isMatch = await user.matchPassword(credentials.password);

                if (!isMatch) {
                    throw new Error('Invalid password');
                }

                console.log('User found:', { email: user.email, role: user.role });

                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                console.log('JWT Callback - User:', user);
                token.role = user.role;
                token.id = user.id;
            }
            console.log('JWT Callback - Token:', token);
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // Enable debug logs
    // @ts-ignore
    trustHost: true, // Crucial for Vercel
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
};
