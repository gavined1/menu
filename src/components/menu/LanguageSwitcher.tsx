'use client';

import { Check, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    currencies,
    locales,
    supportedCurrencies,
    supportedLocales,
    useMenuLocale,
    type SupportedCurrency,
    type SupportedLocale,
} from './locale';

export function LanguageSwitcher() {
    const { locale, currency, setLocale, setCurrency, t } = useMenuLocale();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all text-xs"
                aria-label="Language and currency settings"
            >
                <Globe className="w-3.5 h-3.5 text-white/90" />
                <span className="text-white/90 font-medium">
                    {locale.toUpperCase()}/{currencies[currency].symbol}
                </span>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Language Section */}
                    <div className="p-1.5 border-b border-gray-100">
                        <p className="px-2.5 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                            {t('language')}
                        </p>
                        {supportedLocales.map((localeCode) => {
                            const config = locales[localeCode as SupportedLocale];
                            return (
                                <button
                                    key={localeCode}
                                    onClick={() => {
                                        setLocale(localeCode as SupportedLocale);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                                        locale === localeCode
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-base">{config.flag}</span>
                                        <span className="font-medium text-sm">{config.name}</span>
                                    </span>
                                    {locale === localeCode && (
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Currency Section */}
                    <div className="p-1.5">
                        <p className="px-2.5 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                            {t('currency')}
                        </p>
                        {supportedCurrencies.map((currencyCode) => {
                            const config = currencies[currencyCode as SupportedCurrency];
                            return (
                                <button
                                    key={currencyCode}
                                    onClick={() => {
                                        setCurrency(currencyCode as SupportedCurrency);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                                        currency === currencyCode
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="w-5 text-center font-mono">{config.symbol}</span>
                                        <span className="font-medium text-sm">{config.code}</span>
                                    </span>
                                    {currency === currencyCode && (
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
