'use client';

import { LightBeams } from '@/components/landing/LightBeams';
import {
  ArrowRight,
  Bus,
  Coins,
  Hotel,
  Image as ImageIcon,
  Languages,
  ScanLine,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Utensils,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="antialiased relative z-0 min-h-screen overflow-hidden bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Background Layer (non-interactive) – z-0 on parent so -z-10 is scoped here, not behind layout */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-white to-slate-50" />
        {/* Grid: lighter on mobile */}
        <div
          className="absolute inset-0 opacity-40 md:opacity-90"
          style={{
            backgroundImage: [
              'linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px)',
              'linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
              'linear-gradient(45deg, rgba(59,130,246,0.04) 25%, transparent 25%, transparent 75%, rgba(59,130,246,0.04) 75%, rgba(59,130,246,0.04))',
              'linear-gradient(45deg, rgba(251,146,60,0.04) 25%, transparent 25%, transparent 75%, rgba(251,146,60,0.04) 75%, rgba(251,146,60,0.04))',
            ].join(','),
            backgroundSize: '48px 48px, 48px 48px, 96px 96px, 96px 96px',
            backgroundPosition: 'center center, center center, 0 0, 48px 48px',
            maskImage:
              'radial-gradient(ellipse at center, black 56%, rgba(0,0,0,0.92) 68%, transparent 96%)',
          }}
        />
        {/* Radial color blobs: much lighter on mobile */}
        <div
          className="absolute inset-0 opacity-30 md:opacity-80"
          style={{
            background:
              'radial-gradient(circle at 20% 12%, rgba(56,189,248,0.08), transparent 34%), radial-gradient(circle at 82% 30%, rgba(251,146,60,0.1), transparent 32%), radial-gradient(circle at 70% 78%, rgba(59,130,246,0.06), transparent 38%)',
          }}
        />
        {/* Blur orbs: hidden on mobile, full on md+ */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[128px] bg-orange-200/40 hidden md:block" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-amber-200/30 hidden md:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-slate-200/30 hidden md:block" />
        <LightBeams />
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b bg-white/80 border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/angkor-menu-favicon.png"
              alt="Angkor Menu"
              width={28}
              height={28}
              className="rounded"
            />
            <Link
              href="/"
              className="text-lg font-semibold tracking-tighter text-slate-900"
            >
              ANGKOR MENU.
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#use-cases"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Use Cases
            </a>
            <a
              href="#demo"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Demo
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 md:pt-44 md:pb-32 px-6 overflow-hidden relative">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 bg-orange-50 border border-orange-200">
            <span className="text-base">🇰🇭</span>
            <span className="text-xs font-medium uppercase tracking-wide text-orange-600">
              Made in Cambodia
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 leading-[1.1] text-slate-900">
            Showcase your products <br className="hidden md:block" />
            <span className="bg-linear-to-r from-orange-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              beautifully.
            </span>
          </h1>

          <p className="text-lg mb-12 max-w-2xl mx-auto font-normal leading-relaxed text-slate-600">
            The mobile-first digital catalog for restaurants, retail, and
            hotels. Instant updates, dual currency support, and zero printing
            costs.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/gavined"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-full hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/omni"
              className="w-full md:w-auto px-8 py-3 text-sm font-medium rounded-full transition-all flex items-center justify-center gap-2 backdrop-blur-sm bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
            >
              <ScanLine className="w-4 h-4" /> View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Catalog Preview */}
      <section id="demo" className="pb-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl p-4 md:p-12 shadow-2xl bg-white/90 border-slate-200 shadow-slate-200/50">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Feature Highlights */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2
                    className="text-2xl font-medium tracking-tight text-slate-900"
                  >
                    Your menu, reimagined for the digital age.
                  </h2>
                  <p
                    className="text-sm leading-relaxed text-slate-600"
                  >
                    Traditional paper menus are expensive and static. Angkor
                    Menu gives you a dynamic, searchable, and eco-friendly way
                    to connect with customers.
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg shrink-0 bg-cyan-50 border border-cyan-100">
                      <Languages
                        className="w-4 h-4 text-cyan-600"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-sm font-semibold text-slate-900"
                      >
                        Khmer & English Ready
                      </h3>
                      <p
                        className="text-xs mt-1 text-slate-500"
                      >
                        Native support for multiple languages. Auto-detects user
                        preference.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg shrink-0 bg-orange-50 border border-orange-100">
                      <Coins
                        className="w-4 h-4 text-orange-600"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-sm font-semibold text-slate-900"
                      >
                        Multi-Currency Display
                      </h3>
                      <p
                        className="text-xs mt-1 text-slate-500"
                      >
                        Display prices in USD ($) and KHR (៛) simultaneously
                        with auto-conversion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Phone UI Mockup with Scaled Iframe */}
              <div className="relative flex justify-center">
                {/* Glow effect behind phone */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div
                    className="w-64 h-64 rounded-full blur-[80px] bg-orange-300/30"
                  />
                </div>
                {/* Phone Frame */}
                <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] rounded-[2.5rem] shadow-2xl p-2 md:p-2.5 bg-slate-900 shadow-slate-400/30">
                  {/* Screen container - clips everything */}
                  <div className="relative w-full h-full rounded-4xl overflow-hidden bg-white">
                    {/* Scaled iframe container - calculated to fill screen exactly */}
                    {/* Mobile: screen is 264x544, scale = 264/375 = 0.704 */}
                    {/* Desktop: screen is 300x620, scale = 300/375 = 0.8 */}
                    <div
                      className="absolute origin-top-left w-[375px] h-[900px] scale-[0.704] md:scale-[0.8]"
                      style={{
                        transformOrigin: 'top left',
                      }}
                    >
                      <iframe
                        src="/omni"
                        className="w-full h-full border-0"
                        title="Angkor Menu Demo"
                        style={{
                          pointerEvents: 'none',
                        }}
                      />
                    </div>

                    {/* Click overlay to go to demo */}
                    <Link
                      href="/omni"
                      className="absolute inset-0 z-10 flex items-center justify-center bg-transparent hover:bg-black/10 transition-colors group"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-5 py-2.5 rounded-full shadow-xl">
                        <span className="text-sm font-semibold text-slate-900">
                          View Demo →
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Notch */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-28 rounded-b-xl z-20 bg-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-28 relative">
        {/* Section beam decoration */}
        <div
          className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent to-transparent via-slate-200"
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2
              className="text-3xl font-semibold tracking-tight mb-4 text-slate-900"
            >
              Everything needed to <br />
              run a smarter business.
            </h2>
            <p
              className="text-sm max-w-md text-slate-600"
            >
              Designed for speed, built for reliability. From street food stalls
              to luxury hotels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Mobile First */}
            <div className="group p-8 rounded-2xl transition-all bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-6 bg-cyan-50 border border-cyan-100">
                <Smartphone
                  className="w-5 h-5 text-cyan-600"
                />
              </div>
              <h3
                className="text-sm font-semibold mb-2 text-slate-900"
              >
                Mobile-First Design
              </h3>
              <p
                className="text-sm leading-relaxed text-slate-600"
              >
                Optimized for smartphones where 80% of customers browse. Fast
                loading even on 3G connections.
              </p>
            </div>

            {/* Feature 2: Smart Search */}
            <div
              className="group p-8 rounded-2xl transition-all bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center mb-6 bg-indigo-50 border border-indigo-100"
              >
                <Search
                  className="w-5 h-5 text-indigo-600"
                />
              </div>
              <h3
                className="text-sm font-semibold mb-2 text-slate-900"
              >
                Instant Search & Filter
              </h3>
              <p
                className="text-sm leading-relaxed text-slate-600"
              >
                Customers find items instantly as they type. Filter by category,
                dietary tags, or specials.
              </p>
            </div>

            {/* Feature 3: Social Sharing */}
            <div
              className="group p-8 rounded-2xl transition-all bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center mb-6 bg-orange-50 border border-orange-100"
              >
                <Share2
                  className="w-5 h-5 text-orange-600"
                />
              </div>
              <h3
                className="text-sm font-semibold mb-2 text-slate-900"
              >
                Social Sharing
              </h3>
              <p
                className="text-sm leading-relaxed text-slate-600"
              >
                Share specific items directly to Telegram, WhatsApp, or Facebook
                with rich link previews.
              </p>
            </div>

            {/* Feature 4 (Span 2): Visuals */}
            <div
              className="md:col-span-2 group p-8 rounded-2xl relative overflow-hidden linear-to-br from-orange-50 via-amber-50/50 to-white border border-orange-200"
            >
              <div className="relative z-10">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center mb-6 bg-orange-100 border border-orange-200"
                >
                  <ImageIcon
                    className="w-5 h-5 text-orange-600"
                  />
                </div>
                <h3
                  className="text-sm font-semibold mb-2 text-slate-900"
                >
                  Beautiful Visual Experience
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-sm text-slate-600"
                >
                  Showcase your offerings with stunning hero banners and
                  multi-image galleries. Support for high-quality photos that
                  make your products shine.
                </p>
              </div>
              {/* Decorative Element */}
              <div
                className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-orange-300 opacity-20"
              />
            </div>

            {/* Feature 5: Security/Tech */}
            <div
              className="group p-8 rounded-2xl transition-all flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
            >
              <div>
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center mb-6 bg-emerald-50 border border-emerald-100"
                >
                  <ShieldCheck
                    className="w-5 h-5 text-emerald-600"
                  />
                </div>
                <h3
                  className="text-sm font-semibold mb-2 text-slate-900"
                >
                  Enterprise Security
                </h3>
                <p
                  className="text-sm leading-relaxed text-slate-600"
                >
                  Built with Row Level Security, HTTPS everywhere, and optimized
                  for SEO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 relative">
        {/* Section beam decorations */}
        <div
          className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent to-transparent via-slate-200"
        />
        <div
          className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent to-transparent via-slate-200"
        />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 text-orange-600"
            >
              Versatile Platform
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              Who is Angkor Menu for?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Use Case 1 */}
            <div className="p-6 rounded-xl text-center transition-all cursor-default group bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50">
              <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 transition-colors bg-orange-50 text-orange-600 group-hover:bg-orange-100">
                <Utensils className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-semibold text-slate-900"
              >
                Restaurants
              </h3>
              <p
                className="text-xs mt-2 text-slate-500"
              >
                Digital menus & specials
              </p>
            </div>

            {/* Use Case 2 */}
            <div className="p-6 rounded-xl text-center transition-all cursor-default group bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100/50">
              <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 transition-colors bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-semibold text-slate-900"
              >
                Retail Stores
              </h3>
              <p
                className="text-xs mt-2 text-slate-500"
              >
                Product catalogs & inventory
              </p>
            </div>

            {/* Use Case 3 */}
            <div className="p-6 rounded-xl text-center transition-all cursor-default group bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50">
              <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 transition-colors bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100">
                <Hotel className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-semibold text-slate-900"
              >
                Hotels
              </h3>
              <p
                className="text-xs mt-2 text-slate-500"
              >
                Room service & amenities
              </p>
            </div>

            {/* Use Case 4 */}
            <div className="p-6 rounded-xl text-center transition-all cursor-default group bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100/50">
              <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 transition-colors bg-purple-50 text-purple-600 group-hover:bg-purple-100">
                <Bus className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-semibold text-slate-900"
              >
                Transport
              </h3>
              <p
                className="text-xs mt-2 text-slate-500"
              >
                Routes & ticketing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-28 pb-32 px-6 relative">
        {/* CTA glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px] bg-linear-to-r from-orange-200/50 via-amber-200/30 to-slate-200/50" />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6 text-slate-900"
          >
            Ready to digitize your business?
          </h2>
          <p
            className="text-lg mb-10 font-normal text-slate-600"
          >
            Join businesses across Southeast Asia modernizing their workflow.{' '}
            <br /> Contact us to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/gavined"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20"
            >
              Contact Us
            </a>
          </div>
          <p className="text-xs mt-6 text-slate-400">
            Proudly built in Cambodia 🇰🇭
          </p>
        </div>
      </section>
    </div>
  );
}
