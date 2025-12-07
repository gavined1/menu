import type { MenuItemWithCategory } from '@/components/menu';
import { DigitalMenu } from '@/components/menu';
import { getFullMenuData } from '@/rsc-data/menu/queries';
import { getAbsoluteImageUrl, getSiteBaseUrl } from '@/utils/og-helpers';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface MenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ item?: string }>;
}

export async function generateMetadata({
    params,
    searchParams,
}: MenuPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { item: itemSlug } = await searchParams;

    // Only fetch client data for metadata (lightweight)
    const { getMenuClientBySlug } = await import('@/rsc-data/menu/queries');
    const client = await getMenuClientBySlug(slug);

    if (!client) {
        return {
            title: 'Menu Not Found',
        };
    }

    // If an item is specified, fetch only that specific item (not all items)
    if (itemSlug) {
        const { getMenuItemBySlug } = await import('@/rsc-data/menu/queries');
        const item = await getMenuItemBySlug(client.id, itemSlug);

        if (item) {
            const itemImage = item.images?.[0] || item.image_url;
            const price = item.price ? ` - $${item.price}` : '';
            const title = `${item.name}${price}`;
            const description = item.description || `${item.name} at ${client.name}`;
            const siteUrl = getSiteBaseUrl();
            const ogImageUrl = getAbsoluteImageUrl(itemImage) || getAbsoluteImageUrl(client.cover_image_url);

            return {
                title: `${item.name} | ${client.name}`,
                description,
                openGraph: {
                    type: 'website',
                    url: `${siteUrl}/${slug}?item=${itemSlug}`,
                    siteName: client.name,
                    title,
                    description,
                    images: ogImageUrl
                        ? [
                            {
                                url: ogImageUrl,
                                width: 1200,
                                height: 630,
                                alt: item.name,
                            },
                        ]
                        : [],
                },
                twitter: {
                    card: 'summary_large_image',
                    title,
                    description,
                    images: ogImageUrl ? [ogImageUrl] : [],
                },
            };
        }
    }

    // Default: show client/business metadata (no need to fetch all items)
    const siteUrl = getSiteBaseUrl();
    const ogImageUrl = getAbsoluteImageUrl(client.cover_image_url);

    return {
        title: `${client.name} - Digital Menu`,
        description:
            client.description ||
            `View the digital menu for ${client.name}`,
        openGraph: {
            type: 'website',
            url: `${siteUrl}/${slug}`,
            siteName: client.name,
            title: `${client.name} - Digital Menu`,
            description:
                client.description ||
                `View the digital menu for ${client.name}`,
            images: ogImageUrl
                ? [
                    {
                        url: ogImageUrl,
                        width: 1200,
                        height: 630,
                        alt: `${client.name} - Digital Menu`,
                    },
                ]
                : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${client.name} - Digital Menu`,
            description:
                client.description ||
                `View the digital menu for ${client.name}`,
            images: ogImageUrl ? [ogImageUrl] : [],
        },
    };
}

// Skeleton for Suspense fallback - must match loading.tsx exactly
function MenuSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Fixed Navbar Skeleton */}
            <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3">
                <div className="h-8 w-16 bg-gray-200 rounded-full" />
                <div className="h-8 w-24 bg-gray-200 rounded-full" />
                <div className="w-16" />
            </nav>

            {/* Hero Skeleton */}
            <div className="bg-gray-200 rounded-b-3xl aspect-[4/3] sm:aspect-[16/9] w-full" />

            {/* Search & Filter Skeleton */}
            <div className="sticky top-0 z-30 bg-white p-4 border-b">
                <div className="h-12 bg-gray-100 rounded-2xl mb-3" />
                <div className="flex gap-2 overflow-x-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-20 bg-gray-100 rounded-full flex-shrink-0" />
                    ))}
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-5">
                    <div className="h-6 w-32 bg-gray-100 rounded" />
                    <div className="h-4 w-16 bg-gray-100 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                            <div className="aspect-[4/3] bg-gray-100" />
                            <div className="p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-16 bg-gray-100 rounded" />
                                    <div className="h-5 w-12 bg-gray-100 rounded" />
                                </div>
                                <div className="space-y-1">
                                    <div className="h-3.5 w-full bg-gray-100 rounded" />
                                    <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 rounded" />
                            </div>
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

