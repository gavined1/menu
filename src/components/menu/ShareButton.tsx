'use client';

import { Check, Link2, Share2, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMenuLocale } from './locale';
import type { MenuClient, MenuItemWithCategory } from './types';

interface ShareButtonProps {
    item: MenuItemWithCategory;
    client: MenuClient;
    className?: string;
}

export function ShareButton({ item, client, className = '' }: ShareButtonProps) {
    const { t, getLocalizedText } = useMenuLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);

    const itemName = getLocalizedText(item);

    // Check if native share is available (client-side only)
    useEffect(() => {
        setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
    }, []);

    // Generate shareable URL
    const shareUrl = useMemo(() => {
        if (typeof window === 'undefined') return '';
        return `${window.location.origin}/${client.slug}?item=${item.slug}`;
    }, [client.slug, item.slug]);

    // Copy to clipboard using multiple methods
    const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
        // Method 1: Modern Clipboard API (works on HTTPS)
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (e) {
                console.warn('Clipboard API failed:', e);
            }
        }

        // Method 2: execCommand fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:none;outline:none;box-shadow:none;background:transparent;font-size:16px;';
        document.body.appendChild(textArea);

        // iOS specific handling
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            const range = document.createRange();
            range.selectNodeContents(textArea);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
            textArea.setSelectionRange(0, text.length);
        } else {
            textArea.select();
        }

        let success = false;
        try {
            success = document.execCommand('copy');
        } catch (e) {
            console.warn('execCommand failed:', e);
        }

        document.body.removeChild(textArea);
        return success;
    }, []);

    // Handle copy button click
    const handleCopy = useCallback(async () => {
        const success = await copyToClipboard(shareUrl);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            // Show URL in prompt for manual copy
            window.prompt(t('copyLink'), shareUrl);
        }
    }, [shareUrl, copyToClipboard, t]);

    // Native share (mobile) - just URL, let preview do the work
    const handleNativeShare = useCallback(async () => {
        const shareData = {
            url: shareUrl,
        };

        if (navigator.share && navigator.canShare?.(shareData)) {
            try {
                await navigator.share(shareData);
                setIsOpen(false);
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        }
    }, [shareUrl]);

    // Share to WhatsApp - just URL, WhatsApp generates preview from Open Graph
    const handleWhatsApp = useCallback(() => {
        const url = encodeURIComponent(shareUrl);
        window.open(`https://wa.me/?text=${url}`, '_blank');
        setIsOpen(false);
    }, [shareUrl]);

    // Share to Telegram - only use URL, let the preview show the content
    // Telegram auto-generates preview from Open Graph meta tags
    const handleTelegram = useCallback(() => {
        const url = encodeURIComponent(shareUrl);
        window.open(`https://t.me/share/url?url=${url}`, '_blank');
        setIsOpen(false);
    }, [shareUrl]);

    // Share to Facebook - only URL, Facebook uses Open Graph for preview
    const handleFacebook = useCallback(() => {
        const url = encodeURIComponent(shareUrl);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        setIsOpen(false);
    }, [shareUrl]);

    // Share to Messenger - only URL, Messenger uses Open Graph for preview
    const handleMessenger = useCallback(() => {
        const url = encodeURIComponent(shareUrl);
        window.open(`https://www.facebook.com/dialog/send?link=${url}&redirect_uri=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
    }, [shareUrl]);

    // Handle main share button click - use native share on mobile if available
    const handleShareButtonClick = useCallback(async () => {
        if (canNativeShare) {
            // On mobile, try native share first (most reliable)
            const shareData = { url: shareUrl };

            try {
                if (navigator.canShare?.(shareData)) {
                    await navigator.share(shareData);
                    return; // Success, don't open modal
                }
            } catch (err) {
                if ((err as Error).name === 'AbortError') {
                    return; // User cancelled, don't open modal
                }
                // Failed, fall through to open modal
            }
        }
        // Open share modal as fallback or on desktop
        setIsOpen(true);
    }, [canNativeShare, shareUrl]);

    return (
        <>
            {/* Share Button */}
            <button
                onClick={handleShareButtonClick}
                className={`p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors ${className}`}
                aria-label={t('share')}
            >
                <Share2 className="w-5 h-5 text-white" />
            </button>

            {/* Share Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Share Sheet */}
                    <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
                        {/* Handle */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full" />

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* Header */}
                        <div className="mt-4 mb-6">
                            <h3 className="text-lg font-bold text-gray-900">{t('shareItem')}</h3>
                            <p className="text-sm text-gray-500 mt-1 truncate">{itemName}</p>
                        </div>

                        {/* Share Options */}
                        <div className="space-y-3">
                            {/* Copy Link */}
                            <button
                                onClick={handleCopy}
                                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${copied ? 'bg-green-100' : 'bg-gray-200'}`}>
                                    {copied ? (
                                        <Check className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <Link2 className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">
                                        {copied ? t('linkCopied') : t('copyLink')}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{shareUrl}</p>
                                </div>
                            </button>

                            {/* Share Apps */}
                            <div className="pt-2">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                                    {t('shareVia')}
                                </p>
                                <div className="flex gap-4">
                                    {/* WhatsApp */}
                                    <button
                                        onClick={handleWhatsApp}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-105 transition-transform">
                                            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-600">WhatsApp</span>
                                    </button>

                                    {/* Telegram */}
                                    <button
                                        onClick={handleTelegram}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-[#0088cc] flex items-center justify-center hover:scale-105 transition-transform">
                                            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-600">Telegram</span>
                                    </button>

                                    {/* Facebook */}
                                    <button
                                        onClick={handleFacebook}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-105 transition-transform">
                                            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-600">Facebook</span>
                                    </button>

                                    {/* Messenger */}
                                    <button
                                        onClick={handleMessenger}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00B2FF] to-[#006AFF] flex items-center justify-center hover:scale-105 transition-transform">
                                            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.26L19.752 8l-6.561 6.963z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-600">Messenger</span>
                                    </button>

                                    {/* Native Share (if available on mobile) */}
                                    {'share' in navigator && (
                                        <button
                                            onClick={handleNativeShare}
                                            className="flex flex-col items-center gap-2"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition-transform">
                                                <Share2 className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-xs text-gray-600">More</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

