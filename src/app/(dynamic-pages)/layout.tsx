import { ClientLayout } from '@/app/ClientLayout';
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { DynamicLayoutProviders } from '@/app/(dynamic-pages)/DynamicLayoutProviders';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/logos/angkor-menu-favicon.png',
  },
  title: 'Angkor Menu - Digital Catalogs for Any Business',
  description:
    'Create beautiful digital menus and catalogs for your business. QR code ready, mobile-first, and easy to customize.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicLayoutProviders>
      <div className="flex flex-col min-h-screen bg-stone-50">
        <ClientLayout>{children}</ClientLayout>
        <ConditionalFooter />
      </div>
    </DynamicLayoutProviders>
  );
}
