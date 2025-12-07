// Optimized loading skeleton for faster First Contentful Paint
// This renders immediately while the page is being generated
export default function MenuLoading() {
    return (
        <div className="min-h-screen bg-white">
            {/* Fixed Navbar Skeleton - Critical above-the-fold content */}
            <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3">
                <div className="h-8 w-16 bg-gray-200 rounded-full" />
                <div className="h-8 w-24 bg-gray-200 rounded-full" />
                <div className="w-16" />
            </nav>

            {/* Hero Skeleton - Large visual element for FCP */}
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

            {/* Grid Skeleton - Initial 4 items */}
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

