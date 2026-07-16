"use client"

import React from 'react'
import Image from 'next/image'
import useArticle from '../hooks/useArticle'
import Link from 'next/link'
import ArticlePopulerSkeleton from '@/components/common/skeleton/ArticlePopulerSkeleton'
import { formatDate } from '@/lib/utils'

export default function ArtikelPopuler() {
    const { data, isLoading } = useArticle({ "page_size": 5, 'order': 'desc', 'by': 'views' });

    if (isLoading) return <ArticlePopulerSkeleton />;

    const articles = data?.pages[0].data ?? [];

    return (
        <div className="w-full text-left select-none">
            {/* Header Seksi Flat */}
            <h3 className="text-base font-bold text-neutral-text mb-5 pb-2 border-b border-gray-100 dark:border-gray-800/80">
                Berita Populer
            </h3>

            {articles.length === 0 ? (
                <p className="text-center text-neutral-text-muted text-xs py-8">Tidak ada berita populer.</p>
            ) : (
                <ul className="space-y-4">
                    {articles.map((item) => (
                        <li key={item.id} className="group border-b border-gray-50 dark:border-gray-800/30 last:border-none last:pb-0">
                            <Link href={`/article/${item.slug}`} className="flex gap-4 items-start">

                                {/* Foto Thumbnail Artikel */}
                                <div className="relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800/50 bg-neutral-bg-subtle shadow-sm select-none">
                                    <Image
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
                                        src={item.thumbnail || "/images/placeholder.svg"}
                                        alt={item.title || "Berita Populer"}
                                        fill
                                        sizes="(max-width: 768px) 80px, 100px"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/images/placeholder.svg";
                                        }}
                                    />
                                </div>

                                {/* Detail Konten Judul, Kategori & Tanggal */}
                                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                                    <h4 className="text-xs sm:text-sm font-bold text-neutral-text group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                                        {item.title}
                                    </h4>

                                    <div className="flex items-center text-[10px] text-neutral-text-muted gap-2 mt-1.5 font-semibold">
                                        <span className="text-brand-primary font-bold uppercase tracking-wider">
                                            {item.category?.name || "Berita"}
                                        </span>
                                        <span>•</span>
                                        <span>{formatDate(item.published_at || item.created_at)}</span>
                                    </div>
                                </div>

                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}