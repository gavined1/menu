// Lightweight loading shell for fast first paint while menu data streams.
export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3">
        <div className="h-8 w-16 rounded-full bg-gray-200" />
        <div className="h-8 w-24 rounded-full bg-gray-200" />
        <div className="w-[72px]" />
      </nav>

      <header className="relative overflow-hidden rounded-b-3xl bg-gray-900">
        <div className="aspect-[4/3] w-full bg-gray-200 sm:aspect-[16/9]" />
      </header>

      <main className="px-5 py-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="h-7 w-32 rounded bg-gray-100" />
          <div className="h-4 w-16 rounded bg-gray-100" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
            >
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="space-y-2 p-3">
                <div className="h-3.5 w-16 rounded bg-gray-200" />
                <div className="h-3.5 w-full rounded bg-gray-200" />
                <div className="h-3.5 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
