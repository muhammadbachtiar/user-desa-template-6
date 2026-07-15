"use client"

import LightboxImage from "@/features/infografis/component/Lightbox";
import useInfografis from "@/features/infografis/hooks/useInfografies";
import { Infografis } from "@/features/infografis/types/type";
import Image from "next/image";
import { useState } from "react";

export function InfografisSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mengambil data infografis dengan jumlah halaman maksimal 12 untuk penanganan data banyak
  const { data: infografis, isLoading: isInfografisLoading, isFetching: isInfografisFetching } = useInfografis({
    "page_size": 12
  });

  // Menyimpan batas tampilan infografis awal (default 4)
  const [visibleLimit, setVisibleLimit] = useState(4);

  const items = infografis ?? [];
  const hasMore = items.length > visibleLimit;

  const handleShowMore = () => {
    setVisibleLimit((prev) => Math.min(prev + 4, items.length));
  };

  const handleShowLess = () => {
    setVisibleLimit(4);
  };

  return (
    <section id="infografis" className="py-16 md:py-24 bg-neutral-bg-subtle/30 flex justify-center border-t border-b border-gray-100 dark:border-gray-800">
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">

        {/* Grid Area */}
        {isInfografisLoading || (isInfografisFetching && items.length === 0) ? (
          <SkeletonLoader />
        ) : items.length === 0 ? (
          <div className="h-36 w-full flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-neutral-bg-subtle/30">
            <p className="text-center text-neutral-text-muted text-sm">Tidak ada infografis tersedia.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {items.map((item: Infografis, index: number) => (
                <div
                  key={item.slug}
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentIndex(index);
                  }}
                  className="group cursor-pointer flex flex-col text-left space-y-3"
                >
                  {/* Container Gambar Infografis aspect 4:5 */}
                  <div className="relative overflow-hidden w-full aspect-[4/5] rounded-2xl bg-neutral-bg shadow-sm border border-gray-100 dark:border-gray-800/80 group-hover:shadow-md group-hover:border-brand-primary/30 transition-all duration-300">
                    <Image
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      src={item.link?.startsWith("https:/") ? item.link : '/images/not-found-image.jpg'}
                      alt={item.title || "Infografis"}
                      width={500}
                      height={625}
                      priority={index < 4}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/not-found-image.jpg';
                      }}
                    />
                    {/* Hover Tint Overlay dengan HSL tone CSS global */}
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Judul Infografis */}
                  <div className="px-1">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-text group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>


            {/* Lightbox Viewer */}
            <LightboxImage
              data={items}
              isOpen={isOpen}
              currentIndex={currentIndex}
              setIsOpen={setIsOpen}
            />
          </>
        )}

      </div>
    </section>
  );
}

/* --- LOCAL LOADING SKELETON (Mencegah CLS / Layout Shifts) --- */
function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <div className="w-full aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-2xl" />
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mx-1" />
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mx-1" />
        </div>
      ))}
    </div>
  );
}
