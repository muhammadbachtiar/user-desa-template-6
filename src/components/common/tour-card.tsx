import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowRight } from "lucide-react"

export interface TourCardProps {
  id?: number
  title?: string
  excerpt?: string
  image?: string
  slug?: string
  address?: string
  gmap?: string
  className?: string
}

export function TourCard({ title, image, slug, className, excerpt, address }: TourCardProps) {
  return (
    <Link
      href={`/tour/${slug}`}
      className="group flex flex-col bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full text-left"
    >
      {/* Thumbnail Gambar Wisata */}
      <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0 select-none">
        <Image
          src={image || "/images/placeholder.svg"}
          alt={title || "Destinasi Wisata"}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder.svg";
          }}
        />
      </div>

      {/* Konten Detail Kartu */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Judul Destinasi */}
          <h3 className="text-sm sm:text-base font-bold text-neutral-text group-hover:text-brand-primary transition-colors leading-tight line-clamp-1 truncate">
            {title || "Destinasi Wisata"}
          </h3>

          {/* Alamat Fisik Wisata (MapPin) */}
          {address && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-text-muted mt-2 select-none min-w-0 font-medium">
              <MapPin className="h-3.5 w-3.5 text-brand-primary shrink-0" />
              <span className="truncate">{address}</span>
            </div>
          )}

          {/* Deskripsi Singkat */}
          {excerpt && (
            <p className="text-xs text-neutral-text-muted mt-2.5 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
