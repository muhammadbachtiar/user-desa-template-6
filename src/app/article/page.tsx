"use client"

import DatePicker from '@/components/form/form-elements/DatePicker';
import SelectCategoryFilter from '@/components/form/form-elements/SelectCategoryFilter';
import useArticle from '@/features/article/hooks/useArticle';
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import "moment/locale/id";
import { Calendar } from 'lucide-react';

export default function PageArticle() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [dateRange, setRangeDate] = useState('');

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useArticle({
    "page_size": 8,
    "search": searchValue,
    "date": dateRange,
    'order': 'desc',
    'by': 'published_at'
  }, categoryId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const articleImportData = data?.pages.flatMap(
    (page: any) => page?.data
  ) ?? [];

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

  return (
    <div className="flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen bg-neutral-bg">
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-center">

        {/* Panel Filter Terpadu */}
        <div className="w-full bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 md:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.01)] mb-10 text-left select-none animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Input Cari (5 Kolom) */}
            <div className="relative w-full md:col-span-5">
              <input
                id="search-dropdown"
                type="search"
                value={searchValue}
                onChange={handleChange}
                className="block py-3 px-5 pe-12 w-full rounded-xl text-sm text-neutral-text bg-neutral-bg-subtle border border-gray-200 dark:border-gray-850 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:outline-none transition-all duration-200 placeholder-neutral-text-muted/65"
                placeholder="Cari artikel ..."
              />
              <span className="absolute top-0 end-0 h-full flex items-center justify-center px-4 text-neutral-text-muted pointer-events-none">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </span>
            </div>

            {/* Filter Kategori (3 Kolom) */}
            <div className="relative w-full md:col-span-3">
              <SelectCategoryFilter setCategoryId={setCategoryId} />
            </div>

            {/* Date Picker (4 Kolom) */}
            <div className="relative w-full md:col-span-4">
              <DatePicker setDate={setRangeDate} />
            </div>
          </div>
        </div>

        {/* Area Penayangan Hasil */}
        {isLoading && articleImportData.length === 0 ? (
          <PageSkeleton />
        ) : articleImportData.length === 0 ? (
          <div className="h-44 w-full flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-850 rounded-2xl bg-neutral-bg-subtle/20 select-none">
            <p className="text-center text-neutral-text-muted text-sm">Tidak ada artikel yang cocok dengan filter pencarian.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            {/* Grid Berita Utama */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {articleImportData.map((item) => (
                <PremiumArticleGridCard key={item.id} item={item} />
              ))}
            </div>

            {/* Loading Spinner untuk Infinite Scroll (Tarik ke Bawah) */}
            {isFetchingNextPage && (
              <div className="w-full flex justify-center items-center my-12 select-none animate-pulse">
                <div className="flex items-center space-x-3 bg-neutral-bg border border-gray-100 dark:border-gray-800/80 px-5 py-3 rounded-full shadow-sm">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-primary"></div>
                  <span className="text-neutral-text-muted text-xs font-bold uppercase tracking-wider">Memuat Berita Lainnya...</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

/* --- PREMIUM CARD COMPONENT --- */
interface PremiumArticleGridCardProps {
  item: any;
}

function PremiumArticleGridCard({ item }: PremiumArticleGridCardProps) {
  const dateStr = item.published_at || item.created_at;
  const formattedDate = dateStr ? moment(dateStr).locale('id').format('dddd, D MMMM YYYY') : "Baru saja";

  return (
    <Link
      href={`/article/${item.slug}`}
      className="group flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full text-left"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[145px] sm:h-[155px] overflow-hidden shrink-0 select-none">
        <Image
          src={item.thumbnail || "/images/placeholder.svg"}
          alt={item.title || "Berita"}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder.svg";
          }}
        />
        <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm uppercase tracking-wider select-none">
          {item.category?.name || "Artikel"}
        </span>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Metadata */}
          <div className="text-[10px] text-neutral-text-muted font-bold flex items-center space-x-1.5 uppercase tracking-wider">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-neutral-text-muted/70" />
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-neutral-text mt-3 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* Excerpt */}
          {item.description && (
            <p className="text-xs text-neutral-text-muted mt-2 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

/* --- LOCAL SKELETON LOADER (Mencegah CLS) --- */
function PageSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse select-none">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden h-[320px]">
          <div className="w-full h-[155px] bg-gray-100 dark:bg-gray-800" />
          <div className="p-5 space-y-3 flex-grow">
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
            <div className="h-4.5 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}