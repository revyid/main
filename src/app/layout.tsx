'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from 'next/dynamic';
const inter = Inter({ subsets: ['latin'] });
const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
];
const FloatingNavbar = dynamic(() => import('@/components/NavBar').then((mod) => mod.default), {
    ssr: false,
    loading: () => (<div className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800"/>)
});
export default function RootLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<ClerkProvider>
      <html lang="en">
        <SpeedInsights />
        <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
          <FloatingNavbar navItems={navItems}/>
          <main className="">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>);
}
