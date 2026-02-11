import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import AuthProvider from '@/components/providers/AuthProvider';

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: 'Student Platform - Notes, Blog & Tools',
    description: 'Your one-stop platform for study notes, career guidance articles, and essential student tools.',
    keywords: ['student notes', 'study materials', 'student tools', 'career guidance', 'education'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                    <SpeedInsights />
                    <Analytics />
                </AuthProvider>
            </body>
        </html>
    );
}
