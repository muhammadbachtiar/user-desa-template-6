"use client"

import { TourCard } from "@/components/common/tour-card";
import useTour from "@/features/tour/hooks/useList";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useFeatureFlags from "@/hooks/useFeatureFlags";

export default function TourPage() {
  const router = useRouter();
  const { isSectionEnabled, isLoading: isFeaturesLoading } = useFeatureFlags();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useTour({ "search": searchValue, 'page_size': 8 });
  const allTour = data?.pages?.flatMap(page => page?.data) || [];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (
          !isLoading &&
          hasNextPage &&
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 600
        ) {
          fetchNextPage();
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isFeaturesLoading && !isSectionEnabled("tour")) {
      router.replace('/');
    }
  }, [isSectionEnabled, isFeaturesLoading, router]);

  // Jangan render apapun jika sedang loading features atau fitur dinonaktifkan
  if (isFeaturesLoading) {
    return (
      <section className="bg-gray-50 flex justify-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-center my-10">
          <div className="w-full flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }
  if (!isSectionEnabled("tour")) {
    return null; // Will redirect
  }

  return (
    <section className="bg-neutral-bg flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen">
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-center">

        {/* Kolom Pencarian/Filter */}
        <div className="relative w-full mb-10 select-none animate-fade-in max-w-md self-start">
          <input
            id="search-dropdown"
            type="search"
            value={searchValue}
            onChange={handleChange}
            className="block py-3 px-5 pe-12 w-full rounded-xl text-sm text-neutral-text bg-neutral-bg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:outline-none transition-all duration-200 placeholder-neutral-text-muted/65"
            placeholder="Cari wisata ..."
          />
          <span className="absolute top-0 end-0 h-full flex items-center justify-center px-4 text-neutral-text-muted pointer-events-none">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </span>
        </div>

        {/* Hasil Grid Destinasi */}
        {isLoading && allTour.length === 0 ? (
          <TourSkeleton />
        ) : allTour.length === 0 ? (
          <div className="h-44 w-full flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-850 rounded-2xl bg-neutral-bg-subtle/20 select-none">
            <p className="text-center text-neutral-text-muted text-sm">Tidak ada lokasi yang ditemukan.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allTour.map((item) => (
                <TourCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  excerpt={item.description || "Deskripsi tidak tersedia"}
                  image={item.thumbnail ?? "/images/placeholder.svg"}
                  slug={item.slug}
                  address={item.address}
                />
              ))}
            </div>

            {/* Loader untuk Infinite Scroll */}
            {isFetchingNextPage && (
              <div className="w-full flex justify-center items-center my-12 select-none animate-pulse">
                <div className="flex items-center space-x-3 bg-neutral-bg border border-gray-100 dark:border-gray-800/80 px-5 py-3 rounded-full shadow-sm">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-primary"></div>
                  <span className="text-neutral-text-muted text-xs font-bold uppercase tracking-wider">Memuat...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/* --- LOCAL SKELETON LOADER (Mencegah CLS) --- */
function TourSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse select-none">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden h-[290px]">
          <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800/50" />
          <div className="p-5 space-y-3 flex-grow">
            <div className="h-4.5 bg-gray-100 dark:bg-gray-800/50 rounded w-3/4" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-1/2" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

