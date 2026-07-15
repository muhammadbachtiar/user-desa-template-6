"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import useArticle from "@/features/article/hooks/useArticle";
import { useContent } from "@/hooks/useContent";
import { ArticleType } from "@/features/article/types/article.type";

export function NewsSection() {
  // Fetch berita terbaru (published_at)
  const { data: latestData, isLoading: isLatestLoading } = useArticle({
    "page_size": 8,
    'order': 'desc',
    'by': 'published_at'
  });

  // Fetch berita populer (views terbanyak)
  const { data: popularData, isLoading: isPopularLoading } = useArticle({
    "page_size": 5,
    'order': 'desc',
    'by': 'views'
  });

  const { article } = useContent();

  const latestArticles = latestData?.pages[0].data ?? [];
  const popularArticles = popularData?.pages[0].data ?? [];

  const isLoading = isLatestLoading || isPopularLoading;

  return (
    <section id="article" className="py-16 md:py-24 bg-neutral-bg flex justify-center">
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-text">
              {article?.title || "Berita & Artikel"}
            </h2>
          </div>
          <Link href="/article" className="text-brand-primary font-bold flex items-center hover:text-brand-gold transition-colors text-sm">
            Lihat Semua
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {/* Layout Utama */}
        {isLoading ? (
          <LocalSkeletonLoader />
        ) : latestArticles.length === 0 ? (
          <div className="h-36 w-full flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-neutral-bg-subtle/30">
            <p className="text-center text-neutral-text-muted text-sm">Tidak ada artikel tersedia.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* KOLOM KIRI: Berita Utama & Grid Berita Terbaru (2/3 Width) */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              {/* 1. Featured Card (Berita Pertama) */}
              {latestArticles[0] && (
                <FeaturedCard item={latestArticles[0]} />
              )}

              {/* 2. Grid Card untuk Berita Terbaru Lainnya (Maksimal 4) */}
              {latestArticles.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestArticles.slice(1, 5).map((item) => (
                    <NormalNewsCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* KOLOM KANAN: Daftar Berita Populer (1/3 Width) */}
            <div className="w-full lg:w-1/3 shrink-0">
              <div className="bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <h3 className="text-lg font-bold text-neutral-text mb-5 pb-3 border-b-2 border-brand-primary/20 flex items-center justify-between">
                  <span>Berita Populer</span>
                  <span className="h-2 w-2 rounded-full bg-brand-gold shrink-0 animate-pulse" />
                </h3>

                {popularArticles.length === 0 ? (
                  <p className="text-center text-neutral-text-muted text-xs py-8">Tidak ada data populer.</p>
                ) : (
                  <div className="flex flex-col">
                    {popularArticles.map((item, idx) => (
                      <PopularNewsItem key={item.id} item={item} idx={idx} />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}

/* --- FORMAT TANGGAL LOKAL INDONESIA --- */
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "Baru saja";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch (e) {
    return "Baru saja";
  }
};

/* --- DETAILED CARD COMPONENTS --- */

// 1. Featured Card (Berita Utama Besar ber-Overlay Teks)
function FeaturedCard({ item }: { item: ArticleType }) {
  return (
    <Link
      href={`/article/${item.slug}`}
      className="group relative block w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Thumbnail */}
      <img
        src={item.thumbnail || "/images/placeholder.svg"}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/placeholder.svg";
        }}
      />
      {/* Overlay Gradien Gelap untuk keterbacaan teks */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10" />

      {/* Konten teks di atas gambar */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-6 text-left">
        <div className="flex flex-wrap items-center gap-2 text-white/80 text-[10px] sm:text-xs font-semibold mb-2">
          <span className="bg-brand-primary px-2 py-0.5 rounded text-[10px] text-white">
            {item.category?.name || "Artikel"}
          </span>
          <span>•</span>
          <span className="truncate max-w-[100px]">{item.user?.name || "Admin"}</span>
          <span>•</span>
          <span>{formatDate(item.published_at)}</span>
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug group-hover:text-brand-gold transition-colors line-clamp-2">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

// 2. Normal Card (Kartu Grid Berita Terbaru)
function NormalNewsCard({ item }: { item: ArticleType }) {
  return (
    <Link
      href={`/article/${item.slug}`}
      className="group flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full text-left"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[140px] sm:h-[155px] overflow-hidden shrink-0">
        <img
          src={item.thumbnail || "/images/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder.svg";
          }}
        />
        <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          {item.category?.name || "Artikel"}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Meta */}
          <div className="text-[10px] text-neutral-text-muted font-semibold flex items-center space-x-2">
            <span className="truncate max-w-[80px]">{item.user?.name || "Admin"}</span>
            <span>•</span>
            <span>{formatDate(item.published_at)}</span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-bold text-neutral-text mt-2 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-neutral-text-muted mt-1.5 line-clamp-2 leading-relaxed">
            {item.description || "Klik untuk membaca selengkapnya mengenai berita ini."}
          </p>
        </div>
      </div>
    </Link>
  );
}

// 3. Popular List Item (Urutan Berita Populer di Kolom Kanan)
function PopularNewsItem({ item, idx }: { item: ArticleType; idx: number }) {
  return (
    <div className="flex gap-4 items-start py-3 border-b border-gray-100 dark:border-gray-800/80 last:border-none hover:bg-brand-primary/5 p-2 rounded-xl transition-all duration-200">
      <span className="text-xl sm:text-2xl font-black text-brand-gold/60 dark:text-brand-gold/40 select-none">
        {String(idx + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <Link href={`/article/${item.slug}`}>
          <h4 className="text-xs sm:text-sm font-bold text-neutral-text hover:text-brand-primary line-clamp-2 transition-colors leading-snug">
            {item.title}
          </h4>
        </Link>
        <div className="flex items-center space-x-2 text-[10px] text-neutral-text-muted mt-1.5 font-semibold">
          <span>{item.category?.name || "Artikel"}</span>
          <span>•</span>
          <span>{formatDate(item.published_at)}</span>
        </div>
      </div>
    </div>
  );
}

/* --- LOCAL LOADING SKELETON (Mencegah CLS / Layout Shifts) --- */
function LocalSkeletonLoader() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full animate-pulse">
      {/* Left Column Skeleton */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <div className="w-full h-[280px] sm:h-[340px] bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden h-[290px]">
              <div className="w-full h-[155px] bg-gray-100 dark:bg-gray-800" />
              <div className="p-4 space-y-3 flex-grow">
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column Skeleton */}
      <div className="w-full lg:w-1/3 shrink-0 bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5">
        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-1/3 mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4 items-start py-3">
              <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-full" />
              <div className="flex-grow space-y-2">
                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
