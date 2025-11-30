import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Menu',
  description: 'Beautiful digital menus for restaurants',
};

export default function MenuPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Clean layout without navigation or footer for standalone menu experience
  return <>{children}</>;
}
