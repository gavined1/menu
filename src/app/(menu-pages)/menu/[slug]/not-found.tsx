import Link from 'next/link';

export default function MenuNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Menu Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          The menu you&apos;re looking for doesn&apos;t exist or may have been
          removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
