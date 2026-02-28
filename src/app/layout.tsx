import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Kantumruy_Pro } from 'next/font/google';

// Khmer font only - Kantumruy Pro (modern, clean) used site-wide
const kantumruy = Kantumruy_Pro({
  subsets: ['khmer', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-khmer',
  display: 'swap',
  preload: false,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'https://angkormenu.com');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Angkor Menu - Digital Catalogs for Any Business',
    template: '%s | Angkor Menu',
  },
  description:
    'Create beautiful digital menus and catalogs for your business. QR code ready, mobile-first, and easy to customize.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Angkor Menu',
    title: 'Angkor Menu - Digital Catalogs for Any Business',
    description:
      'Create beautiful digital menus and catalogs for your business. QR code ready, mobile-first, and easy to customize.',
    images: [
      {
        url: `${siteUrl}/logos/angkor-menu-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Angkor Menu - Digital Catalogs for Any Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angkor Menu - Digital Catalogs for Any Business',
    description:
      'Create beautiful digital menus and catalogs for your business. QR code ready, mobile-first, and easy to customize.',
    images: [`${siteUrl}/logos/angkor-menu-logo.png`],
  },
  icons: {
    icon: '/logos/angkor-menu-favicon.png',
    apple: '/logos/angkor-menu-favicon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={kantumruy.variable}
      data-scroll-behavior="smooth"
    >
      <head />
      <body className="font-khmer">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
