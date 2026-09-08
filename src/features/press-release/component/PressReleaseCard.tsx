import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/id';
import { truncateWords } from '@/lib/utils';

interface PressReleaseCardProps {
  id: number
  title: string
  description: string
  date: string
  image: string
  slug: string
  author?: string
  category?: string
}

export const PressReleaseCard: React.FC<PressReleaseCardProps> = ({
  id,
  title,
  description,
  date,
  image,
  slug,
  author,
  category,
}) => {
  const formattedDate = moment(date ?? "").locale('id').format('dddd, D MMMM YYYY')
  const rawCategory = category || "Siaran Pers";

  return (
    <div key={id} className="group flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full text-left">
      <Link href={`/press-release/${slug}`} className="flex flex-col h-full">
        {/* Gambar Thumbnail Pers */}
        <div className="relative w-full h-44 sm:h-48 overflow-hidden shrink-0 select-none border-b border-gray-50 dark:border-gray-800/20">
          <Image
            src={image || "/images/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.svg";
            }}
          />
          <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm uppercase tracking-wider select-none max-w-[140px] truncate" title={rawCategory}>
            {truncateWords(rawCategory, 2)}
          </span>
        </div>

        {/* Detail Konten Teks */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            {/* Judul Siaran Pers */}
            <h3 className="text-sm sm:text-base font-bold text-neutral-text group-hover:text-brand-primary transition-colors leading-snug line-clamp-2 mt-1" title={title}>
              {title}
            </h3>
            
            {/* Deskripsi/Ringkasan Singkat */}
            {description && (
              <p className="text-xs text-neutral-text-muted mt-2.5 line-clamp-3 leading-relaxed" title={description}>
                {description}
              </p>
            )}
          </div>

          {/* Footer Metadata Kartu */}
          <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1 mt-4 pt-3 border-t border-gray-50 dark:border-gray-800/50 text-[10px] text-neutral-text-muted font-bold uppercase tracking-wider select-none min-w-0">
            <span className="shrink-0">{formattedDate}</span>
            {author && (
              <span className="truncate max-w-[100px]" title={author}>
                By {author}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}