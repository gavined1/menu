'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { T } from '@/components/ui/Typography';
import { Github, Instagram, Linkedin, Twitter, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="border-t border-stone-200 bg-stone-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 pb-12">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900">
                MenuCraft
              </span>
            </Link>

            <T.P className="text-sm text-stone-500 leading-relaxed">
              Beautiful digital menus for modern restaurants. Create, customize,
              and share your menu with the world.
            </T.P>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9 text-stone-500 hover:text-amber-600 hover:bg-amber-50"
              >
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9 text-stone-500 hover:text-amber-600 hover:bg-amber-50"
              >
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9 text-stone-500 hover:text-amber-600 hover:bg-amber-50"
              >
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9 text-stone-500 hover:text-amber-600 hover:bg-amber-50"
              >
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <T.H4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Product
            </T.H4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/menu/omni"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Live Demo
              </Link>
              <Link
                href="/login"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Features
              </Link>
            </nav>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <T.H4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Resources
            </T.H4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <T.H4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Legal
            </T.H4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="bg-stone-200" />

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <T.Small className="text-stone-500">
            © {year} MenuCraft. All rights reserved.
          </T.Small>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-stone-500 hover:text-amber-600 transition-colors"
            >
              Privacy
              </Link>
            <Link
              href="#"
              className="text-xs text-stone-500 hover:text-amber-600 transition-colors"
            >
              Terms
              </Link>
            <Link
              href="#"
              className="text-xs text-stone-500 hover:text-amber-600 transition-colors"
            >
              Cookies
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
