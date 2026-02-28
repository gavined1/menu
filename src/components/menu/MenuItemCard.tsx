'use client';

import {
  Calendar,
  ChefHat,
  Flame,
  Leaf,
  Sparkles,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { useMenuLocale, type TranslationKey } from './locale';
import type { MenuItemBadgeType, MenuItemWithCategory } from './types';

interface MenuItemCardProps {
  item: MenuItemWithCategory;
  onItemClick: (item: MenuItemWithCategory) => void;
  priority?: boolean;
  /** Eager load for above-the-fold items (LCP). Use without priority to avoid preload. */
  loading?: 'eager' | 'lazy';
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

export function MenuItemCard({
  item,
  onItemClick,
  priority = false,
  loading: loadingProp,
}: MenuItemCardProps) {
  const { t, formatPrice, getLocalizedText, getLocalizedDescription } = useMenuLocale();

  const primaryBadge = item.badges?.[0];
  const badgeInfo = primaryBadge ? badgeConfig[primaryBadge] : null;
  const BadgeIcon = badgeInfo?.icon;

  const itemName = getLocalizedText(item);
  const itemDescription = getLocalizedDescription(item);
  const categoryName = item.category ? getLocalizedText(item.category) : null;

  return (
    <div
      onClick={() => {
        // Blur any focused element to prevent aria-hidden conflict when modal opens
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        onItemClick(item);
      }}
      className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 active:scale-[0.98] border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-gray-100 shrink-0 overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={itemName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={80}
            priority={priority}
            loading={loadingProp ?? (priority ? 'eager' : 'lazy')}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <span className="text-3xl">🍽️</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-3">
        {/* Price + Badge Row */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-bold text-gray-900">
            {formatPrice(item.price)}
          </span>
          {badgeInfo && BadgeIcon && (
            <div
              className={`px-1.5 py-0.5 rounded ${badgeInfo.bg} flex items-center gap-0.5`}
            >
              <BadgeIcon className={`w-2.5 h-2.5 ${badgeInfo.color}`} />
              <span className={`text-[9px] font-semibold ${badgeInfo.color}`}>
                {t(badgeInfo.labelKey)}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-medium text-gray-900 text-[13px] leading-tight line-clamp-2 min-h-8">
          {itemName}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
          {itemDescription || '\u00A0'}
        </p>

        {/* Category Row */}
        <div className="flex items-center gap-1.5 mt-auto pt-1 overflow-hidden">
          {categoryName && (
            <span className="text-[10px] text-gray-400 truncate min-w-0">
              • {categoryName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
