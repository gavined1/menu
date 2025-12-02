'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMenuLocale } from './locale';
import type { MenuFeaturedItem } from './types';

interface HeroCarouselProps {
  featuredItems: MenuFeaturedItem[];
}

export function HeroCarousel({ featuredItems }: HeroCarouselProps) {
  const { locale } = useMenuLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Get localized title/subtitle for featured items
  const getLocalizedTitle = (item: MenuFeaturedItem): string => {
    const translations = item.translations as Record<
      string,
      { title?: string }
    > | null;
    if (translations?.[locale]?.title) {
      return translations[locale].title;
    }
    if (locale === 'km' && item.title_km) {
      return item.title_km;
    }
    return item.title;
  };

  const getLocalizedSubtitle = (item: MenuFeaturedItem): string | null => {
    const translations = item.translations as Record<
      string,
      { subtitle?: string }
    > | null;
    if (translations?.[locale]?.subtitle) {
      return translations[locale].subtitle;
    }
    if (locale === 'km' && item.subtitle_km) {
      return item.subtitle_km;
    }
    return item.subtitle;
  };

  // Use IntersectionObserver to detect which slide is visible
  useEffect(() => {
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = slides.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.5,
      }
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [featuredItems.length]);

  // Handle user interaction - stop auto-play
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const stopAutoPlay = () => {
      setIsAutoPlaying(false);
    };

    scrollContainer.addEventListener('touchstart', stopAutoPlay, {
      passive: true,
    });
    scrollContainer.addEventListener('mousedown', stopAutoPlay);

    return () => {
      scrollContainer.removeEventListener('touchstart', stopAutoPlay);
      scrollContainer.removeEventListener('mousedown', stopAutoPlay);
    };
  }, []);

  // Scroll to slide within container only (doesn't affect page scroll)
  const scrollToSlide = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const slideWidth = container.clientWidth;
    container.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    });
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || featuredItems.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % featuredItems.length;
        scrollToSlide(nextIndex);
        return nextIndex;
      });
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, featuredItems.length, scrollToSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      setIsAutoPlaying(false);
    setActiveIndex(index);
      scrollToSlide(index);
    },
    [scrollToSlide]
  );

  if (featuredItems.length === 0) return null;

  return (
    <header className="relative bg-gray-900 rounded-b-3xl overflow-hidden">
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
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
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
