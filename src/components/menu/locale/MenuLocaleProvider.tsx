'use client';

import { useEffect, type ReactNode } from 'react';
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
    const setCustomExchangeRate = useMenuLocaleStore((s) => s.setCustomExchangeRate);

    useEffect(() => {
        // Always update - use null when undefined to clear any stored value
        setCustomExchangeRate(customExchangeRate ?? null);
    }, [customExchangeRate, setCustomExchangeRate]);

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

    // Direct function calls to ensure re-render on state change
    const t = (key: TranslationKey) => tHelper(key, locale);

    const formatPrice = (priceUSD: number) =>
        formatPriceHelper(priceUSD, currency, locale, customExchangeRate);

    const getLocalizedText = (item: { name: string; name_km?: string | null }) =>
        getLocalizedTextHelper(item, locale);

    const getLocalizedDescription = (item: { description?: string | null; description_km?: string | null }) =>
        getLocalizedDescriptionHelper(item, locale);

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
