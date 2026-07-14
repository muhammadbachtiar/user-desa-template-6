"use client"

import React from 'react'
import ArtikelPopuler from './artikelPopuler';
import { ArticleType } from '../types/article.type';
import SliderCard from '@/features/infografis/component/sliderInfografis';
import Image from 'next/image';
import { Calendar, Eye } from 'lucide-react';
import RichTextContent from '@/components/common/RichTextContent';
import moment from 'moment';

interface ArticleDetailProps {
    slug: string;
    article: ArticleType;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    return (        
       <div className='flex justify-center'>
            <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-8 max-w-8xl">
                <div className='box-border grid grid-cols-12 gap-4 xl:gap-12 justify-between'>
                    <div className='w-full col-span-12 md:col-span-7 lg:col-span-8 gap-y-8'>
                        <h3 className={`font-normal text-4xl text-gray-800 transition-colors`}>{article?.title ?? "Artikel Tidak Ditemukan"} </h3>
                        <div className="flex items-center text-sm text-gray-500 my-4">
                            <span className="font-semibold text-red-500 text-xs">[{article?.category?.name || 'Umum'}]</span>
                            <span className="mx-2">•</span>
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{moment(article?.published_at ?? "").locale('id').format('dddd, D MMMM YYYY')}</span>
                            <span className="mx-2">•</span>
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{article?.views?.toString() ?? "0"}</span>
                        </div>
                       <div className="relative w-full mb-4 aspect-[16/9]">
                            <Image
                                src={article?.thumbnail ?? "/images/placeholder.svg"}
                                alt={article?.title ?? "Artikel Tidak Ditemukan"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                         </div>
                        <RichTextContent content={article?.content || ''}/>
                        <p className="self-start align-baseline text-base font-semibold text-black my-5">({article?.user?.name || 'Admin'})</p>
                    </div>
                    <div className='md:sticky md:top-24 md:self-start h-fit flex flex-col col-span-12 md:col-span-5 lg:col-span-4 gap-6 w-full'>    
                        <ArtikelPopuler />
                        <SliderCard slideToShow={1} />
                    </div>
                </div>
            </div>
       </div>
    );
};

export default ArticleDetail;