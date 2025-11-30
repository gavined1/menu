import type { MenuItemWithCategory } from '@/components/menu';
import { DigitalMenu } from '@/components/menu';
import { getFullMenuData } from '@/rsc-data/menu/queries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface MenuPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: MenuPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getFullMenuData(slug);

  if (!data) {
    return {
      title: 'Menu Not Found',
    };
  }

  return {
    title: `${data.client.name} - Digital Menu`,
    description:
      data.client.description ||
      `View the digital menu for ${data.client.name}`,
    openGraph: {
      title: `${data.client.name} - Digital Menu`,
      description:
        data.client.description ||
        `View the digital menu for ${data.client.name}`,
      images: data.client.cover_image_url ? [data.client.cover_image_url] : [],
    },
  };
}

function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Navbar skeleton */}
      <div className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4">
        <div className="bg-gray-200 rounded-full px-4 py-2 h-10 w-24" />
        <div className="bg-gray-200 rounded-full p-2.5 h-10 w-10" />
      </div>

      {/* Hero skeleton */}
      <div className="h-[55vh] bg-gray-200 rounded-b-[2.5rem]" />

      {/* Search skeleton */}
      <div className="sticky top-0 z-40 bg-gray-50 p-4">
        <div className="h-12 bg-gray-200 rounded-2xl mb-4" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="px-4 py-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-2.5 h-64">
              <div className="h-32 bg-gray-200 rounded-xl mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function MenuContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getFullMenuData(slug);

  if (!data) {
    notFound();
  }

  const menuData = {
    ...data,
    items: data.items as MenuItemWithCategory[],
  };

  return <DigitalMenu data={menuData} />;
}

export default function MenuPage({ params }: MenuPageProps) {
  return (
    <Suspense fallback={<MenuSkeleton />}>
      <MenuContent params={params} />
    </Suspense>
  );
}
