// Optimized loading skeleton matching exact layout structure
// This renders immediately while the page is being generated
export default function MenuLoading() {
    return (
        <div className="min-h-screen bg-white m-0 p-0">
            {/* Fixed Navbar Skeleton - Matches MenuNavbar exactly */}
            <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3">
                {/* Language Switcher - Left */}
                <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse" />

                {/* Business Name Button - Center */}
                <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />

                {/* Spacer for balance - matches w-[72px] */}
                <div className="w-[72px]" />
            </nav>

            {/* Hero Carousel Skeleton - Matches HeroCarousel exactly, starts at top with no margin */}
            <header className="relative bg-gray-900 rounded-b-3xl overflow-hidden m-0 p-0">
                <div className="aspect-[4/3] sm:aspect-[16/9] w-full bg-gray-200 animate-pulse" />
                {/* Pagination dots skeleton */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <div className="w-6 h-1.5 bg-white/40 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                </div>
            </header>

            {/* Search & Filter Skeleton - Matches SearchAndFilter exactly */}
            <>
                {/* Sentinel for intersection observer */}
                <div className="h-0" />

                <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
                    <div className="px-5 pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            {/* Search Icon Button */}
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full animate-pulse" />

                            {/* Category Pills */}
                            <div className="flex gap-2 flex-1 overflow-x-auto">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="flex-shrink-0 h-10 w-20 bg-gray-100 rounded-full animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>

            {/* Menu Grid Skeleton - Matches MenuGrid exactly */}
            <main className="px-5 py-6">
                {/* Section Header - Matches MenuGrid header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="h-7 w-32 bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                </div>

                {/* Grid - Matches MenuGrid grid classes exactly */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
                        >
                            {/* Image Container - Matches MenuItemCard image */}
                            <div className="relative aspect-[4/3] bg-gray-200 flex-shrink-0" />

                            {/* Content Area - Matches MenuItemCard content structure */}
                            <div className="flex flex-col flex-1 p-3">
                                {/* Price + Badge Row - Matches MenuItemCard */}
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <div className="h-3.5 w-16 bg-gray-200 rounded" />
                                    <div className="h-5 w-12 bg-gray-200 rounded" />
                                </div>

                                {/* Name - Matches MenuItemCard name (line-clamp-2 min-h-[2rem]) */}
                                <div className="space-y-1 mb-1 min-h-[2rem]">
                                    <div className="h-3.5 w-full bg-gray-200 rounded" />
                                    <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
                                </div>

                                {/* Description - Matches MenuItemCard description */}
                                <div className="h-2.5 w-full bg-gray-200 rounded mt-0.5" />

                                {/* Category Row - Matches MenuItemCard category */}
                                <div className="flex items-center gap-1.5 mt-auto pt-1">
                                    <div className="h-2.5 w-20 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

