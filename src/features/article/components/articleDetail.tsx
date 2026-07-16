"use client"

import React from 'react'
import ArtikelPopuler from './artikelPopuler';
import { ArticleType } from '../types/article.type';
import SliderCard from '@/features/infografis/component/sliderInfografis';
import Image from 'next/image';
import { Calendar, Eye } from 'lucide-react';
import RichTextContent from '@/components/common/RichTextContent';
import moment from 'moment';
import Link from 'next/link';

interface ArticleDetailProps {
    slug: string;
    article: ArticleType;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    return (        
       <div className='flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen bg-neutral-bg'>
            <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                <div className='box-border grid grid-cols-12 gap-6 xl:gap-12 justify-between'>
                    
                    {/* Kolom Kiri: Detail Artikel (8 kolom) */}
                    <div className='w-full col-span-12 lg:col-span-8 flex flex-col text-left'>
                        
                        {/* Judul Artikel */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-text leading-tight tracking-tight mb-4">
                          {article?.title ?? "Artikel Tidak Ditemukan"}
                        </h1>

                        {/* Metadata Artikel */}
                        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-text-muted font-medium mb-6 pb-6 border-b border-gray-100 dark:border-gray-800/80">
                          <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider select-none">
                            {article?.category?.name || 'Umum'}
                          </span>
                          <span className="flex items-center text-neutral-text-muted">
                            <Calendar className="h-4 w-4 mr-1.5 text-neutral-text-muted/70" />
                            {moment(article?.published_at ?? "").locale('id').format('dddd, D MMMM YYYY')}
                          </span>
                          <span className="flex items-center text-neutral-text-muted">
                            <Eye className="h-4 w-4 mr-1.5 text-neutral-text-muted/70" />
                            {article?.views?.toString() ?? "0"} Kali Dibaca
                          </span>
                        </div>

                        {/* Gambar Utama Artikel */}
                        {article?.thumbnail && (
                          <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-800/80 aspect-[16/9] mb-8 select-none">
                            <Image
                              src={article.thumbnail}
                              alt={article.title || "Detail Artikel"}
                              fill
                              className="object-cover hover:scale-101 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/placeholder.svg";
                              }}
                            />
                          </div>
                        )}

                        {/* Konten Artikel */}
                        <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-text leading-relaxed">
                          <RichTextContent content={article?.content || ''}/>
                        </div>

                        {/* Informasi Penulis & Navigasi Kembali */}
                        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs sm:text-sm text-neutral-text-muted font-bold">
                          <span className="flex items-center gap-1.5">
                            Penulis: <span className="text-neutral-text font-black">{article?.user?.name || 'Admin'}</span>
                          </span>
                          <Link href="/article" className="text-brand-primary hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                            <span>←</span> Kembali ke Berita
                          </Link>
                        </div>
                    </div>

                    {/* Kolom Kanan: Sidebar Sticky (4 kolom) */}
                    <div className='lg:sticky lg:top-[120px] lg:self-start h-fit flex flex-col col-span-12 lg:col-span-4 gap-8 w-full mt-8 lg:mt-0'>    
                        <ArtikelPopuler />
                        <SliderCard slideToShow={1} />
                    </div>
                    
                </div>
            </div>
       </div>
    );
};

export default ArticleDetail;