"use client"

import { PressReleaseCard } from '@/features/press-release/component/PressReleaseCard'
import React, { useEffect, useRef, useState } from 'react'
import SelectCategoryFilter from '@/components/form/form-elements/SelectCategoryFilter'
import CustomDatePicker from '@/components/form/form-elements/DatePicker'
import usePressRelease from '@/features/press-release/hooks/usePressRelease'
import { PressReleaseType } from '@/features/press-release/types/pressRelease.type'
import { useRouter } from 'next/navigation'
import useFeatureFlags from '@/hooks/useFeatureFlags'

export default function PressReleaseListPage() {
  const router = useRouter();
  const { pressRelease, isLoading: isFeaturesLoading } = useFeatureFlags();
  
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setRangeDate] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = usePressRelease({
    page: 1,
    page_size: 9,
    search: searchTerm,
    date: dateRange,
    sortBy: 'publishedAt',
  }, categoryId)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const pressReleaseData = data?.pages.flatMap((page) => page?.data) ?? []

  useEffect(() => {
    const handleScroll = () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
        if (
          !isLoading &&
          hasNextPage &&
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 600
        ) {
          fetchNextPage()
        }
      }, 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading, hasNextPage, fetchNextPage])

  useEffect(() => {
    if (!isFeaturesLoading && !pressRelease) {
      router.replace('/');
    }
  }, [pressRelease, isFeaturesLoading, router]);

  // Loading state saat mengecek features
  if (isFeaturesLoading) {
    return (
      <div className="flex justify-center bg-neutral-bg pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen">
        <div className="w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
        </div>
      </div>
    );
  }

  if (!pressRelease) {
    return null;
  }

  return (
    <div className="flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen bg-neutral-bg">
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col lg:flex-row gap-8">
        
        {/* KOLOM KIRI: Filter Panel (Sticky Aside) */}
        <aside className="w-full lg:w-1/4 bg-neutral-bg border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.01)] lg:sticky lg:top-[120px] self-start transition-all duration-300 text-left select-none animate-fade-in">
          <h2 className="text-base font-bold text-neutral-text mb-5 pb-2 border-b border-gray-100 dark:border-gray-800/80">
            Filter Pencarian
          </h2>
          <div className="space-y-4">
            {/* Input Kata Kunci */}
            <div className="relative">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Cari siaran pers..."
                className="w-full py-2.5 px-4 text-sm text-neutral-text rounded-xl bg-neutral-bg-subtle border border-gray-200 dark:border-gray-850 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 placeholder-neutral-text-muted/65"
              />
            </div>
            
            {/* Pemilih Kategori */}
            <div className="relative w-full">
              <SelectCategoryFilter setCategoryId={setCategoryId} />
            </div>
            
            {/* Pemilih Tanggal */}
            <div className="relative w-full">
              <CustomDatePicker setDate={setRangeDate} />
            </div>
          </div>
        </aside>

        {/* KOLOM KANAN: Hasil Indeks Siaran Pers */}
        <main className="w-full lg:w-3/4 flex flex-col">
          {/* Header Siaran Pers */}
          <header className="text-left mb-8 pb-5 border-b border-gray-100 dark:border-gray-800/80 select-none">
            <span className="text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-wider mb-2 block">
              Media & Publikasi
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-text leading-tight tracking-tight uppercase">
              Siaran Pers Resmi
            </h1>
          </header>

          {/* Grid Hasil Pencarian */}
          {isLoading && pressReleaseData.length === 0 ? (
            <PressReleaseSkeleton />
          ) : pressReleaseData.length === 0 || pressReleaseData[0] === undefined ? (
            <div className="h-44 w-full flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-850 rounded-2xl bg-neutral-bg-subtle/20 select-none">
              <p className="text-center text-neutral-text-muted text-sm">Tidak ada siaran pers ditemukan.</p>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pressReleaseData.map((item: PressReleaseType) => (
                  <PressReleaseCard
                    key={item.id}
                    id={item.id}
                    category={item.category?.name}
                    title={item.title}
                    description={item.description}
                    date={item.published_at}
                    image={item.thumbnail ?? '/images/placeholder.svg'}
                    slug={item.slug}
                    author={item.user?.name}
                  />
                ))}
              </div>

              {/* Loader Infinite Scroll */}
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
        </main>

      </div>
    </div>
  )
}

/* --- LOCAL SKELETON LOADER (Mencegah CLS) --- */
function PressReleaseSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-pulse select-none">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden h-[290px]">
          <div className="w-full h-44 bg-gray-100 dark:bg-gray-850 animate-pulse" />
          <div className="p-5 space-y-3 flex-grow">
            <div className="h-3.5 bg-gray-100 dark:bg-gray-850 rounded w-1/4" />
            <div className="h-4.5 bg-gray-100 dark:bg-gray-850 rounded w-3/4" />
            <div className="h-3 bg-gray-100 dark:bg-gray-850 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
