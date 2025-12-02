'use client';

import {
  Calendar,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Leaf,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Drawer } from 'vaul';
import { useMenuLocale, type TranslationKey } from './locale';
import { ShareButton } from './ShareButton';
import type { MenuClient, MenuItemBadgeType, MenuItemWithCategory } from './types';

interface ItemDetailModalProps {
  item: MenuItemWithCategory | null;
  client: MenuClient;
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
  client,
  isOpen,
  onClose,
}: ItemDetailModalProps) {
  const { t, formatPrice, getLocalizedText, getLocalizedDescription } = useMenuLocale();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get all images (prefer images array, fallback to single image_url)
  const allImages = useMemo(() => {
    if (!item) return [];
    if (item.images && item.images.length > 0) {
      return item.images;
    }
    if (item.image_url) {
      return [item.image_url];
    }
    return [];
  }, [item]);

  const hasMultipleImages = allImages.length > 1;

  // Reset index when item changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [item?.id]);

  // Handle scroll to update active index - using onScroll prop instead
  const handleCarouselScroll = useCallback(() => {
    if (!hasMultipleImages) return;

    const container = carouselRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const imageWidth = container.clientWidth;
    if (imageWidth === 0) return;

    const newIndex = Math.round(scrollLeft / imageWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, allImages.length - 1));

    if (clampedIndex !== activeImageIndex) {
      setActiveImageIndex(clampedIndex);
    }
  }, [hasMultipleImages, allImages.length, activeImageIndex]);

  const scrollToImage = useCallback((index: number) => {
    const container = carouselRef.current;
    if (!container) return;

    const imageWidth = container.clientWidth;
    container.scrollTo({
      left: index * imageWidth,
      behavior: 'smooth',
    });
  }, []);

  const goToPrevious = useCallback(() => {
    const newIndex = activeImageIndex > 0 ? activeImageIndex - 1 : allImages.length - 1;
    setActiveImageIndex(newIndex);
    scrollToImage(newIndex);
  }, [activeImageIndex, allImages.length, scrollToImage]);

  const goToNext = useCallback(() => {
    const newIndex = activeImageIndex < allImages.length - 1 ? activeImageIndex + 1 : 0;
    setActiveImageIndex(newIndex);
    scrollToImage(newIndex);
  }, [activeImageIndex, allImages.length, scrollToImage]);

  if (!item) return null;

  const itemName = getLocalizedText(item);
  const itemDescription = getLocalizedDescription(item);
  const categoryName = item.category ? getLocalizedText(item.category) : null;

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} modal>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] bg-white outline-none overflow-hidden flex flex-col"
          style={{ maxHeight: '92dvh', height: 'auto' }}
        >
          {/* Image Carousel - Responsive height */}
          <div
            className="relative w-full flex-shrink-0"
            style={{ height: 'min(40dvh, 300px)' }}
          >
            {allImages.length > 0 ? (
              <div
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                className="flex overflow-x-auto snap-x snap-mandatory w-full h-full scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {allImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="flex-shrink-0 w-full h-full snap-center relative"
                  >
              <Image
                      src={imageUrl}
                      alt={`${itemName} - ${index + 1}`}
                fill
                      sizes="100vw"
                className="object-cover"
              />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Drag Handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-white/50" />

            {/* Share & Close buttons */}
            <div className="absolute top-3 right-4 flex items-center gap-2">
              <ShareButton item={item} client={client} />
            <button
              onClick={onClose}
                className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                aria-label={t('close')}
            >
              <X className="w-5 h-5 text-white" />
            </button>
            </div>

            {/* Navigation arrows (only if multiple images) */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                  aria-label="Next image"
                    >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}

            {/* Pagination dots (only if multiple images) */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveImageIndex(index);
                      scrollToImage(index);
                    }}
                    aria-label={`Go to image ${index + 1}`}
                    className={`rounded-full transition-all duration-300 ${index === activeImageIndex
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/50'
                      }`}
                  />
                ))}
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
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
            {/* Header Section */}
            <div className="px-5 pt-4 pb-3">
              {/* Category */}
              {categoryName && (
                <Drawer.Description className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {categoryName}
                </Drawer.Description>
              )}

              {/* Title */}
              <Drawer.Title className="text-xl font-bold text-gray-900 leading-tight">
                {itemName}
              </Drawer.Title>

              {/* Info Pills Row - Time, Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {item.prep_time_minutes && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {item.prep_time_minutes} {t('prepTime')}
                    </span>
                  </div>
                )}
                {/* Dietary Badges */}
                {item.badges?.map((badge) => {
                    const config = badgeConfig[badge];
                    const Icon = config.icon;
                    return (
                      <div
                        key={badge}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${config.bg} rounded-full`}
                      >
                      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                      <span className={`text-sm font-medium ${config.color}`}>
                        {t(config.labelKey)}
                        </span>
                      </div>
                    );
                  })}
                </div>
            </div>

            {/* Description Section */}
            {itemDescription && (
              <div className="px-5 py-3 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {t('aboutThisItem')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {itemDescription}
                </p>
              </div>
            )}

            {/* Bottom Padding - includes safe area for devices with home indicator */}
            <div className="h-4 pb-safe" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
