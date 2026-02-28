'use client';

import { useEffect, type ReactNode } from 'react';
import {
    formatPrice as formatPriceHelper,
    getExchangeRate,
    getLocalizedDescription as getLocalizedDescriptionHelper,
    getLocalizedText as getLocalizedTextHelper,
    t as tHelper,
    type ClientBaseCurrency,
    type LocalizableDescriptionItem,
    type LocalizableNameItem,
    useMenuLocaleStore,
} from './store';
import type { TranslationKey } from './translations';

// =============================================================================
// PROVIDER
// =============================================================================

interface MenuLocaleProviderProps {
    children: ReactNode;
    customExchangeRate?: number;
    /** Client's base currency (how prices are stored). KHR = stored prices are in KHR. */
    clientCurrency?: ClientBaseCurrency;
}

export function MenuLocaleProvider({
    children,
    customExchangeRate,
    clientCurrency = null,
}: MenuLocaleProviderProps) {
    const setCustomExchangeRate = useMenuLocaleStore((s) => s.setCustomExchangeRate);
    const setClientCurrency = useMenuLocaleStore((s) => s.setClientCurrency);

    useEffect(() => {
        setCustomExchangeRate(customExchangeRate ?? null);
    }, [customExchangeRate, setCustomExchangeRate]);

    useEffect(() => {
        setClientCurrency(clientCurrency ?? null);
    }, [clientCurrency, setClientCurrency]);

    return <>{children}</>;
}

// =============================================================================
// HOOK
// =============================================================================

export function useMenuLocale() {
    const locale = useMenuLocaleStore((s) => s.locale);
    const currency = useMenuLocaleStore((s) => s.currency);
    const customExchangeRate = useMenuLocaleStore((s) => s.customExchangeRate);
    const clientCurrency = useMenuLocaleStore((s) => s.clientCurrency);
    const setLocale = useMenuLocaleStore((s) => s.setLocale);
    const setCurrency = useMenuLocaleStore((s) => s.setCurrency);

    const exchangeRate = getExchangeRate(currency, customExchangeRate);

    const t = (key: TranslationKey) => tHelper(key, locale);

    /** Formats a price. Stored value is in client base currency (USD or KHR); converts to display currency. */
    const formatPrice = (storedPrice: number) => {
        const rate = customExchangeRate ?? 0;
        const priceUSD =
            clientCurrency === 'KHR' && rate > 0
                ? storedPrice / rate
                : storedPrice;
        return formatPriceHelper(priceUSD, currency, locale, customExchangeRate);
    };

    const getLocalizedText = (item: LocalizableNameItem) =>
        getLocalizedTextHelper(item, locale);

    const getLocalizedDescription = (item: LocalizableDescriptionItem) =>
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
