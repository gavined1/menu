'use client';

import { Facebook, Instagram, Send } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tighter text-slate-950 block mb-4"
            >
              ANGKOR MENU.
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Modern digital catalog platform designed for businesses in
              Cambodia and beyond.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#features"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#use-cases"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/omni"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hello@gavined.com"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://gavined.com"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-100 pt-8">
          <p className="text-xs text-slate-400">
            © {year} Angkor Menu. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="https://www.facebook.com/tangsoklim"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </Link>
            <a
              href="https://t.me/gavined"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <Link
              href="https://www.instagram.com/gaivned4"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
