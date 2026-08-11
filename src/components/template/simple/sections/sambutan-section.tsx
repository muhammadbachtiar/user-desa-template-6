"use client";

import RichTextContent from "@/components/common/RichTextContent";
import { DynamicSectionData } from "@/types/DynamicSection";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SambutanSectionProps {
  sections: DynamicSectionData[];
  isLoading?: boolean;
}

export function SambutanSection({ sections, isLoading }: SambutanSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("");
  const [isPaused, setIsPaused] = useState(false);
  const mobileTabContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0].config.id);
    }
  }, [sections, activeTab]);

  // Autoplay Carousel dengan Interval 6 Detik & Auto Pause saat hover/touch/focus
  useEffect(() => {
    if (sections.length <= 1 || isPaused || !activeTab) return;

    const interval = setInterval(() => {
      const currentIndex = sections.findIndex((s) => s.config.id === activeTab);
      const nextIndex = (currentIndex + 1) % sections.length;
      setActiveTab(sections[nextIndex].config.id);
    }, 6000);

    return () => clearInterval(interval);
  }, [sections, activeTab, isPaused]);

  // Auto scroll tab aktif ke tengah area pandang di perangkat mobile
  useEffect(() => {
    if (activeTab && tabRefs.current[activeTab] && mobileTabContainerRef.current) {
      const activeEl = tabRefs.current[activeTab];
      const container = mobileTabContainerRef.current;
      if (activeEl && container) {
        const elLeft = activeEl.offsetLeft;
        const elWidth = activeEl.offsetWidth;
        const containerScrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;

        if (elLeft < containerScrollLeft || elLeft + elWidth > containerScrollLeft + containerWidth) {
          container.scrollTo({
            left: elLeft - containerWidth / 2 + elWidth / 2,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeTab]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-neutral-bg-subtle/30 flex justify-center border-t border-b border-gray-100 dark:border-gray-800">
        <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            {/* Sidebar Skeleton */}
            <div className="w-full md:w-1/4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
              ))}
            </div>
            {/* Content Skeleton */}
            <div className="w-full md:w-3/4 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sections.length === 0) {
    return null;
  }

  const activeSection = sections.find((s) => s.config.id === activeTab) || sections[0];
  const rawContent = activeSection?.content?.trim() || "";
  const cleanText = rawContent.replace(/<[^>]*>/g, "").trim();
  const hasContent = cleanText.length > 0 || /<img|<iframe|<video/i.test(rawContent);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const handleTouchEnd = () => {
    // Beri jeda 2 detik setelah pengguna melepas sentuhan agar dapat selesai membaca
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section
      className="py-16 md:py-24 bg-neutral-bg-subtle/30 flex justify-center border-t border-b border-gray-100 dark:border-gray-800 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={handleTouchEnd}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">

        {/* Keyframes untuk Autoplay Progress Bar */}
        <style>{`
          @keyframes progress-timer {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-progress-timer {
            animation: progress-timer 6000ms linear forwards;
          }
        `}</style>

        {/* PROGRESS TIMER BAR */}
        {sections.length > 1 && (
          <div className="w-full h-[3px] bg-gray-100 dark:bg-gray-800/60 rounded-full overflow-hidden mb-6">
            <div
              key={activeTab}
              className="h-full bg-brand-primary transition-opacity duration-300 animate-progress-timer"
              style={{
                animationPlayState: isPaused ? "paused" : "running"
              }}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">

          {/* TABS NAVIGATION - Mobile */}
          <div className="block md:hidden">
            <div
              ref={mobileTabContainerRef}
              className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 scroll-smooth"
            >
              {sections.map((section) => (
                <button
                  key={section.config.id}
                  ref={(el) => { tabRefs.current[section.config.id] = el; }}
                  onClick={() => handleTabClick(section.config.id)}
                  className={`py-2.5 px-4 text-xs font-semibold whitespace-nowrap rounded-t-lg transition-all duration-300 shrink-0 border-b-2 -mb-[10px] ${
                    activeTab === section.config.id
                      ? "text-brand-primary border-brand-primary bg-brand-primary/10 font-bold"
                      : "text-neutral-text-muted border-transparent hover:text-brand-primary hover:bg-neutral-bg-subtle/50"
                  }`}
                >
                  {section.config.title}
                </button>
              ))}
            </div>
          </div>

          {/* TABS NAVIGATION - Desktop */}
          <div className="hidden md:block md:w-1/4 shrink-0 border-r border-gray-200 dark:border-gray-800 pr-1">
            <ul className="list-none flex flex-col space-y-1.5 pr-2">
              {sections.map((section) => (
                <li key={section.config.id} className="w-full">
                  <button
                    onClick={() => handleTabClick(section.config.id)}
                    className={`w-full text-left py-3 px-4 text-sm font-semibold rounded-l-xl transition-all duration-300 flex justify-between items-center -mr-[1px] border-r-4 ${
                      activeTab === section.config.id
                        ? "text-brand-primary border-brand-primary bg-brand-primary/10 font-bold shadow-sm"
                        : "text-neutral-text-muted border-transparent hover:text-brand-primary hover:bg-neutral-bg-subtle/50"
                    }`}
                  >
                    <span className="truncate pr-2">{section.config.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTEN UTAMA DENGAN SOFT TRANSITION */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="prose prose-sm dark:prose-invert max-w-none text-neutral-text/90 leading-relaxed min-h-[250px] sm:min-h-[280px] flex flex-col"
                  >
                    {hasContent ? (
                      <RichTextContent content={rawContent} />
                    ) : (
                      <div className="w-full flex-1 flex items-center justify-center min-h-[200px] sm:min-h-[240px] text-neutral-text-muted text-sm font-medium italic border border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-neutral-bg-subtle/50 p-6 text-center select-none">
                        Informasi tidak tersedia.
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

