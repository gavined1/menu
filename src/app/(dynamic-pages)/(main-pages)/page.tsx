'use client';

import { useTheme } from 'next-themes';
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Hotel,
  Languages,
  ScanLine,
  Smartphone,
  Store,
  UtensilsCrossed,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const featureItems = [
  {
    title: 'Instant Updates',
    description:
      'Edit prices and items in seconds. Every customer sees changes immediately.',
    icon: Smartphone,
  },
  {
    title: 'USD + KHR Pricing',
    description:
      'Show dual currency clearly for locals and tourists without extra work.',
    icon: Coins,
  },
  {
    title: 'Khmer + English',
    description:
      'Serve both local and international visitors with native multilingual support.',
    icon: Languages,
  },
];

const useCases = [
  {
    title: 'Restaurants & Cafés',
    description: 'Beautiful menus, category browsing, and quick item discovery.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Retail Stores',
    description: 'Show products, variants, and prices in a clean mobile catalog.',
    icon: Store,
  },
  {
    title: 'Hotels & Resorts',
    description: 'Display room service, amenities, and promotions in one place.',
    icon: Hotel,
  },
];

export default function LandingPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden antialiased transition-colors duration-300 ${
        isDark
          ? 'bg-[#050816] text-slate-100 selection:bg-cyan-500/30'
          : 'bg-[#f8fafc] text-slate-900 selection:bg-orange-200'
      }`}
    >
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[radial-gradient(circle_at_20%_10%,rgba(14,116,144,0.22),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(99,102,241,0.2),transparent_30%),radial-gradient(circle_at_65%_80%,rgba(249,115,22,0.18),transparent_36%),linear-gradient(180deg,#030712_0%,#0B1025_45%,#060913_100%)]'
              : 'bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(251,146,60,0.18),transparent_34%),radial-gradient(circle_at_65%_78%,rgba(99,102,241,0.16),transparent_36%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)]'
          }`}
        />

        <div
          className={`absolute -top-36 -left-36 h-[42rem] w-[42rem] rounded-full blur-3xl ${
            isDark ? 'bg-cyan-500/25' : 'bg-cyan-300/40'
          }`}
          style={{ animation: 'meshFloatA 19s ease-in-out infinite alternate' }}
        />
        <div
          className={`absolute top-[8%] -right-32 h-[34rem] w-[34rem] rounded-full blur-3xl ${
            isDark ? 'bg-indigo-500/25' : 'bg-violet-300/40'
          }`}
          style={{ animation: 'meshFloatB 23s ease-in-out infinite alternate' }}
        />
        <div
          className={`absolute -bottom-40 left-[24%] h-[44rem] w-[44rem] rounded-full blur-3xl ${
            isDark ? 'bg-orange-500/20' : 'bg-amber-200/50'
          }`}
          style={{ animation: 'meshFloatC 26s ease-in-out infinite alternate' }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? "url('/patterns-grid-dark.svg')"
              : "url('/patterns-grid-light.svg')",
            backgroundSize: '120px 120px',
            opacity: isDark ? 0.52 : 0.62,
          }}
        />
      </div>

      <nav
        className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl ${
          isDark ? 'border-white/10 bg-slate-950/45' : 'border-slate-200/70 bg-white/65'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/angkor-menu-favicon.png"
              alt="Angkor Menu"
              width={28}
              height={28}
              className="rounded"
            />
            <span className={`text-sm font-semibold tracking-[0.2em] ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ANGKOR MENU
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm`}>
              Features
            </a>
            <a href="#demo" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm`}>
              Demo
            </a>
            <a href="#use-cases" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm`}>
              Use Cases
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'} hidden text-sm md:block`}>
              Log in
            </Link>
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                isDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-slate-900 text-white hover:bg-slate-700'
              }`}
            >
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </nav>

      <main className="px-6 pb-24 pt-32 md:pt-40">
        <section className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs ${isDark ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200' : 'border-cyan-700/20 bg-cyan-50 text-cyan-800'}`}>
              <span>🇰🇭</span>
              Built in Cambodia for modern businesses
            </div>

            <h1 className={`text-4xl font-semibold leading-tight md:text-6xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              A premium digital menu
              <span className="block bg-gradient-to-r from-cyan-400 via-indigo-400 to-orange-400 bg-clip-text text-transparent">
                that feels alive.
              </span>
            </h1>

            <p className={`mt-6 max-w-2xl text-base md:text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Replace outdated printed menus with a fast, beautiful mobile experience.
              Keep products fresh, searchable, and instantly up-to-date with zero printing waste.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://t.me/gavined"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-orange-500 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
              >
                Start now <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/omni"
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3 text-sm font-medium ${
                  isDark
                    ? 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                    : 'border-slate-300 bg-white/80 text-slate-900 hover:bg-white'
                }`}
              >
                <ScanLine className="h-4 w-4" /> Live demo
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {[
                ['1 minute', 'to publish menu updates'],
                ['2 languages', 'Khmer + English ready'],
                ['0 print cost', 'digital-first operations'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className={`rounded-2xl border px-4 py-3 ${
                    isDark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-white/70'
                  }`}
                >
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="demo" className="relative flex justify-center">
            <div
              className={`absolute inset-0 -z-10 rounded-[3rem] blur-3xl ${
                isDark ? 'bg-cyan-500/25' : 'bg-cyan-300/45'
              }`}
            />
            <div
              className={`relative h-[620px] w-[310px] rounded-[2.6rem] p-2.5 shadow-2xl ${
                isDark
                  ? 'border border-white/15 bg-slate-900 shadow-black/50'
                  : 'bg-slate-900 shadow-slate-500/35'
              }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
                <div className="absolute left-0 top-0 h-[900px] w-[375px] origin-top-left scale-[0.8]">
                  <iframe
                    src="/omni"
                    className="h-full w-full border-0"
                    title="Angkor Menu Demo"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
                <Link
                  href="/omni"
                  className="group absolute inset-0 flex items-center justify-center bg-transparent transition hover:bg-black/10"
                >
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 opacity-0 transition group-hover:opacity-100">
                    Open interactive demo
                  </span>
                </Link>
              </div>
              <div className={`absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-xl ${isDark ? 'bg-slate-900' : 'bg-slate-900'}`} />
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto mt-24 max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Designed to convert scans into sales.
              </h2>
              <p className={`mt-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Premium visual design, practical business outcomes.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featureItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`rounded-2xl border p-6 ${
                    isDark
                      ? 'border-white/10 bg-white/[0.04] backdrop-blur'
                      : 'border-slate-200 bg-white/80'
                  }`}
                >
                  <div className={`mb-4 inline-flex rounded-xl p-2 ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                    <Icon className={`h-5 w-5 ${isDark ? 'text-cyan-300' : 'text-slate-700'}`} />
                  </div>
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="use-cases" className="mx-auto mt-24 max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`rounded-2xl border p-6 ${
                    isDark ? 'border-white/10 bg-black/20' : 'border-slate-200 bg-white/80'
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className={`h-5 w-5 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`} />
                    <CheckCircle2 className={`h-4 w-4 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`mt-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes meshFloatA {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(52px, 36px, 0) scale(1.14);
          }
        }
        @keyframes meshFloatB {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-42px, 56px, 0) scale(1.11);
          }
        }
        @keyframes meshFloatC {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(14px, -48px, 0) scale(1.12);
          }
        }
      `}</style>
    </div>
  );
}
