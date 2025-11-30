'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
    formatPrice as formatPriceHelper,
    getExchangeRate,
    getLocalizedDescription as getLocalizedDescriptionHelper,
    getLocalizedText as getLocalizedTextHelper,
    t as tHelper,
    useMenuLocaleStore,
} from './store';
import type { TranslationKey } from './translations';

// =============================================================================
// PROVIDER
// =============================================================================

interface MenuLocaleProviderProps {
    children: ReactNode;
    customExchangeRate?: number;
}

export function MenuLocaleProvider({
    children,
    customExchangeRate,
}: MenuLocaleProviderProps) {
    const [hydrated, setHydrated] = useState(false);
    const setCustomExchangeRate = useMenuLocaleStore((s) => s.setCustomExchangeRate);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (customExchangeRate !== undefined) {
            setCustomExchangeRate(customExchangeRate);
        }
    }, [customExchangeRate, setCustomExchangeRate]);

    if (!hydrated) {
        return (
            <div className="min-h-screen bg-white">
                <div className="animate-pulse">
                    <div className="h-14" />
                    <div className="aspect-[4/3] sm:aspect-[16/9] bg-gray-100" />
                    <div className="p-5 space-y-4">
                        <div className="h-12 bg-gray-100 rounded-2xl" />
                        <div className="flex gap-3 overflow-hidden">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-10 w-20 bg-gray-100 rounded-full flex-shrink-0" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

// =============================================================================
// HOOK
// =============================================================================

export function useMenuLocale() {
    const locale = useMenuLocaleStore((s) => s.locale);
    const currency = useMenuLocaleStore((s) => s.currency);
    const customExchangeRate = useMenuLocaleStore((s) => s.customExchangeRate);
    const setLocale = useMenuLocaleStore((s) => s.setLocale);
    const setCurrency = useMenuLocaleStore((s) => s.setCurrency);

    const exchangeRate = getExchangeRate(currency, customExchangeRate);

    const t = useCallback(
        (key: TranslationKey) => tHelper(key, locale),
        [locale]
    );

    const formatPrice = useCallback(
        (priceUSD: number) => formatPriceHelper(priceUSD, currency, locale, customExchangeRate),
        [currency, locale, customExchangeRate]
    );

    const getLocalizedText = useCallback(
        (item: { name: string; name_km?: string | null; translations?: unknown }) =>
            getLocalizedTextHelper(item, locale),
        [locale]
    );

    const getLocalizedDescription = useCallback(
        (item: { description?: string | null; description_km?: string | null; translations?: unknown }) =>
            getLocalizedDescriptionHelper(item, locale),
        [locale]
    );

    return {
        locale,
        currency,
        exchangeRate,
        setLocale,
        setCurrency,
        t,
        formatPrice,
        getLocalizedText,
        getLocalizedDescription,
    };
}
