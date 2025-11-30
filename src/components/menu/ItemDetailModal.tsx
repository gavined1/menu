'use client';

import {
  Calendar,
  ChefHat,
  Clock,
  Flame,
  Leaf,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { Drawer } from 'vaul';
import { useMenuLocale, type TranslationKey } from './locale';
import type { MenuItemBadgeType, MenuItemWithCategory } from './types';

interface ItemDetailModalProps {
  item: MenuItemWithCategory | null;
  isOpen: boolean;
  onClose: () => void;
}

const badgeConfig: Record<
  MenuItemBadgeType,
  { icon: typeof Leaf; color: string; bg: string; labelKey: TranslationKey }
> = {
  vegan: {
    icon: Leaf,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    labelKey: 'vegan',
  },
  vegetarian: {
    icon: Leaf,
    color: 'text-green-700',
    bg: 'bg-green-50',
    labelKey: 'vegetarian',
  },
  spicy: {
    icon: Flame,
    color: 'text-red-600',
    bg: 'bg-red-50',
    labelKey: 'spicy',
  },
  gluten_free: {
    icon: Sparkles,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    labelKey: 'glutenFree',
  },
  new: {
    icon: Sparkles,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    labelKey: 'new',
  },
  best_seller: {
    icon: Star,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    labelKey: 'bestSeller',
  },
  chef_special: {
    icon: ChefHat,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    labelKey: 'chefSpecial',
  },
  seasonal: {
    icon: Calendar,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    labelKey: 'seasonal',
  },
};

export function ItemDetailModal({
  item,
  isOpen,
  onClose,
}: ItemDetailModalProps) {
  const { t, formatPrice, getLocalizedText, getLocalizedDescription } = useMenuLocale();

  if (!item) return null;

  const itemName = getLocalizedText(item);
  const itemDescription = getLocalizedDescription(item);
  const categoryName = item.category ? getLocalizedText(item.category) : null;

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} modal>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[2rem] bg-white max-h-[92vh] outline-none overflow-hidden">
          {/* Image - starts at the very top */}
          <div className="relative aspect-square w-full flex-shrink-0 max-h-[45vh]">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={itemName}
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            {/* Drag Handle - overlaid on image */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-white/50" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Badges on image */}
            {item.badges && item.badges.length > 0 && (
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {item.badges.map((badge) => {
                  const config = badgeConfig[badge];
                  const Icon = config.icon;
                  return (
                    <span
                      key={badge}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium ${config.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      {t(config.labelKey)}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Price badge */}
            <div className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-full shadow-lg">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(item.price)}
              </span>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {/* Header */}
            <div className="space-y-1">
              <Drawer.Title className="text-2xl font-bold text-gray-900">
                {itemName}
              </Drawer.Title>
              {categoryName && (
                <Drawer.Description className="text-gray-500">
                  {categoryName}
                </Drawer.Description>
              )}
            </div>

            {/* Meta info */}
            {(item.rating || item.prep_time_minutes) && (
              <div className="flex items-center gap-3">
                {item.rating && (
                  <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2.5 rounded-full">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{item.rating}</span>
                    {item.rating_count && (
                      <span className="text-amber-600/70">
                        ({item.rating_count}+)
                      </span>
                    )}
                  </div>
                )}
                {item.prep_time_minutes && (
                  <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                      {item.prep_time_minutes} {t('prepTime')}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {itemDescription && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t('aboutThisDish')}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {itemDescription}
                </p>
              </div>
            )}

            {/* Dietary info */}
            {item.badges && item.badges.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t('dietaryInformation')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.badges.map((badge) => {
                    const config = badgeConfig[badge];
                    const Icon = config.icon;
                    return (
                      <div
                        key={badge}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 ${config.bg} rounded-xl`}
                      >
                        <Icon className={`w-5 h-5 ${config.color}`} />
                        <span className={`font-medium ${config.color}`}>
                          {t(config.labelKey)}
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
