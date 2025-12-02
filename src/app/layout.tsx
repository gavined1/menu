import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Kantumruy_Pro, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';

// English font - Plus Jakarta Sans (modern, premium) - used in menu pages
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-english',
  display: 'swap',
  preload: false, // Don't preload - loaded on-demand when menu pages are visited
});

// Khmer font - Kantumruy Pro (modern, clean) - used in menu pages
const kantumruy = Kantumruy_Pro({
  subsets: ['khmer', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-khmer',
  display: 'swap',
  preload: false, // Don't preload - loaded on-demand when Khmer is selected
});

const inter = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const roboto_mono = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MenuCraft - Digital Menus for Modern Restaurants',
  description:
    'Create beautiful digital menus for your restaurant. QR code ready, mobile-first, and easy to customize.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable} ${kantumruy.variable} ${plusJakarta.variable}`}
      data-scroll-behavior="smooth"
    >
      <head />
      <body>{children}</body>
    </html>
  );
}
