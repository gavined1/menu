import { ClientLayout } from '@/app/ClientLayout';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/images/logo-black-main.ico',
  },
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
    <div className="flex flex-col min-h-screen bg-stone-50">
      <ClientLayout>{children}</ClientLayout>
      <Footer />
    </div>
  );
}
