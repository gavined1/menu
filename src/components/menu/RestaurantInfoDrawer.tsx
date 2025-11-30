'use client';

import {
    Clock,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { Drawer } from 'vaul';
import { useMenuLocale, type TranslationKey } from './locale';
import type { MenuClient } from './types';

interface RestaurantInfoDrawerProps {
    client: MenuClient;
    isOpen: boolean;
    onClose: () => void;
}

const dayOrder: TranslationKey[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];

function getCurrentDay(): string {
    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];
    return days[new Date().getDay()];
}

export function RestaurantInfoDrawer({
    client,
    isOpen,
    onClose,
}: RestaurantInfoDrawerProps) {
    const { t } = useMenuLocale();
    const openingHours = client.opening_hours as Record<string, string> | null;
    const socialLinks = client.social_links as Record<string, string> | null;
    const currentDay = getCurrentDay();
    const todayHours = openingHours?.[currentDay];

    return (
        <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} modal>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[2rem] bg-white max-h-[90vh] outline-none overflow-hidden">
                    {/* Header with cover image */}
                    <div className="relative h-44 w-full flex-shrink-0 bg-gray-900">
                        {client.cover_image_url ? (
                            <Image
                                src={client.cover_image_url}
                                alt={client.name}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                        {/* Drag Handle */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-white/40" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                            aria-label={t('close')}
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Logo and Name */}
                        <div className="absolute bottom-4 left-5 right-5 flex items-end gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl overflow-hidden border-2 border-white flex-shrink-0">
                                {client.logo_url ? (
                                    <Image
                                        src={client.logo_url}
                                        alt={client.name}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                        <span className="text-xl font-bold text-white">
                                            {client.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <Drawer.Title className="text-xl font-bold text-white">
                                    {client.name}
                                </Drawer.Title>
                                {client.city && (
                                    <p className="text-white/70 text-sm">{client.city}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                        {/* Today's Hours */}
                        {todayHours && (
                            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
                                <div className="p-2 bg-emerald-100 rounded-xl">
                                    <Clock className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-emerald-600 font-medium">
                                        {t('today')}
                                    </p>
                                    <p className="text-emerald-700 font-semibold">{todayHours}</p>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {client.description && (
                            <Drawer.Description className="text-gray-600 leading-relaxed">
                                {client.description}
                            </Drawer.Description>
                        )}

                        {/* Quick Actions */}
                        <div className="flex gap-3">
                            {client.phone && (
                                <a
                                    href={`tel:${client.phone}`}
                                    className="flex-1 flex flex-col items-center gap-1.5 py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                                >
                                    <Phone className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        {t('contact')}
                                    </span>
                                </a>
                            )}
                            {client.address && (
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(
                                        client.address + (client.city ? ', ' + client.city : '')
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex flex-col items-center gap-1.5 py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                                >
                                    <MapPin className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        {t('location')}
                                    </span>
                                </a>
                            )}
                        </div>

                        {/* Contact Info */}
                        {(client.address || client.email) && (
                            <div className="space-y-3">
                                {client.address && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-900">{client.address}</p>
                                            {client.city && (
                                                <p className="text-gray-500 text-sm">{client.city}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {client.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <a
                                            href={`mailto:${client.email}`}
                                            className="text-gray-900 hover:underline"
                                        >
                                            {client.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Social Links */}
                        {socialLinks && Object.keys(socialLinks).length > 0 && (
                            <div className="flex gap-3">
                                {socialLinks.instagram && (
                                    <a
                                        href={socialLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:opacity-90 transition-opacity"
                                    >
                                        <Instagram className="w-5 h-5" />
                                        <span className="font-medium">Instagram</span>
                                    </a>
                                )}
                                {socialLinks.facebook && (
                                    <a
                                        href={socialLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-2xl hover:opacity-90 transition-opacity"
                                    >
                                        <Facebook className="w-5 h-5" />
                                        <span className="font-medium">Facebook</span>
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Opening Hours */}
                        {openingHours && Object.keys(openingHours).length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                    {t('openingHours')}
                                </h3>
                                <div className="bg-gray-50 rounded-2xl overflow-hidden">
                                    {dayOrder.map((dayKey, index) => {
                                        const hours = openingHours[dayKey];
                                        if (!hours) return null;
                                        const isToday = dayKey === currentDay;
                                        return (
                                            <div
                                                key={dayKey}
                                                className={`flex items-center justify-between px-4 py-3 ${isToday ? 'bg-emerald-50' : ''
                                                    } ${index !== dayOrder.length - 1 ? 'border-b border-gray-100' : ''}`}
                                            >
                                                <span
                                                    className={`font-medium ${isToday ? 'text-emerald-700' : 'text-gray-600'
                                                        }`}
                                                >
                                                    {t(dayKey)}
                                                </span>
                                                <span
                                                    className={`${isToday
                                                        ? 'text-emerald-700 font-semibold'
                                                        : 'text-gray-900'
                                                        }`}
                                                >
                                                    {hours}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
