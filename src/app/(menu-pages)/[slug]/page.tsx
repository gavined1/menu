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

// Simplified skeleton for Suspense fallback (loading.tsx handles initial load)
function MenuSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <div className="h-[55vh] bg-gray-100 rounded-b-3xl" />
            <div className="px-4 py-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                            <div className="aspect-[4/3] bg-gray-100" />
                            <div className="p-3 space-y-2">
                                <div className="h-4 w-16 bg-gray-100 rounded" />
                                <div className="h-3.5 w-full bg-gray-100 rounded" />
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

