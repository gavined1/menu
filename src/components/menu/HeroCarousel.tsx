'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMenuLocale } from './locale';
import type { MenuFeaturedItem } from './types';

interface HeroCarouselProps {
  featuredItems: MenuFeaturedItem[];
}

export function HeroCarousel({ featuredItems }: HeroCarouselProps) {
  const { locale } = useMenuLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get localized title/subtitle for featured items
  const getLocalizedTitle = (item: MenuFeaturedItem): string => {
    // Try JSONB translations first
    const translations = item.translations as Record<string, { title?: string }> | null;
    if (translations?.[locale]?.title) {
      return translations[locale].title;
    }
    // Fallback to column-based (legacy)
    if (locale === 'km' && item.title_km) {
      return item.title_km;
    }
    return item.title;
  };

  const getLocalizedSubtitle = (item: MenuFeaturedItem): string | null => {
    // Try JSONB translations first
    const translations = item.translations as Record<string, { subtitle?: string }> | null;
    if (translations?.[locale]?.subtitle) {
      return translations[locale].subtitle;
    }
    // Fallback to column-based (legacy)
    if (locale === 'km' && item.subtitle_km) {
      return item.subtitle_km;
    }
    return item.subtitle;
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || featuredItems.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredItems.length]);

  // Scroll to active slide
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const itemWidth = scrollContainer.clientWidth;
    scrollContainer.scrollTo({
      left: activeIndex * itemWidth,
      behavior: 'smooth',
    });
  }, [activeIndex]);

  // Handle manual scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const itemWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        setIsAutoPlaying(false);
      }
    };

    scrollContainer.addEventListener('scrollend', handleScroll);
    return () => scrollContainer.removeEventListener('scrollend', handleScroll);
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  if (featuredItems.length === 0) return null;

  return (
    <header className="relative bg-gray-900">
      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide aspect-[4/3] sm:aspect-[16/9] w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredItems.map((item, index) => {
          const title = getLocalizedTitle(item);
          const subtitle = getLocalizedSubtitle(item);

          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-full h-full snap-center relative"
            >
              <Image
                src={item.image_url}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Content - Clean and minimal */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                {item.badge_text && (
                  <span className="inline-block px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-900 mb-3">
                    {item.badge_text}
                  </span>
                )}
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-white/60 text-sm mt-1 line-clamp-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots - Simple */}
      {featuredItems.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${index === activeIndex
                ? 'w-6 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/40'
                }`}
            />
          ))}
        </div>
      )}
    </header>
  );
}
