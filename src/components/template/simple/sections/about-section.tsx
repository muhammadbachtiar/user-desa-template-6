"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"
import type { AboutSection as AboutSectionType } from "@/types/Simple"
import { useRouter } from "next/navigation"

interface AboutSectionProps {
  data: AboutSectionType
}

export function AboutSection({ data }: AboutSectionProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/tour');
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-bg flex justify-center border-t border-b border-gray-100 dark:border-gray-800">
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">

        {/* Style Animasi Kilau (Shine) untuk Tombol */}
        <style>{`
          @keyframes btn-shine {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(300%) skewX(-15deg); }
          }
          .animate-shine-hover:hover .shine-effect {
            animation: btn-shine 0.8s ease-in-out;
          }
        `}</style>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Kolom Kiri: Informasi Pariwisata (Tour Data) */}
          <div className="lg:col-span-6 flex flex-col text-left">
            {/* Kategori / Label Tour */}
            <div>
              <span className="text-xs sm:text-sm font-bold text-brand-primary tracking-wider bg-brand-primary/10 px-4 py-1.5 rounded-full inline-block mb-4 select-none">
                {data.title || "Wisata & Destinasi"}
              </span>
            </div>

            {/* Judul Utama Tour */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-text leading-tight tracking-tight mb-6">
              {data.subTittle || "Jelajahi Keindahan Daerah"}
            </h2>

            {/* Deskripsi Paragraf Tour */}
            <div className="space-y-4 mb-8">
              {data.description.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base text-neutral-text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tombol Aksi Premium Brand New */}
            <div>
              <button
                onClick={handleClick}
                className="animate-shine-hover group relative inline-flex items-center gap-2 px-7 py-3.5 bg-brand-primary text-white font-bold rounded-2xl transition-all duration-300 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 hover:bg-brand-gold overflow-hidden select-none"
              >
                {/* Efek Kilau Putih saat Hover */}
                <div className="shine-effect absolute top-0 left-0 w-1/3 h-full bg-white/20 -translate-x-full" />

                <span className="relative z-10">{data.button?.text || "Selengkapnya"}</span>
                <ChevronRight className="h-4.5 w-4.5 relative z-10 transition-transform group-hover:translate-x-1 duration-200" />
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Frame Banner Gambar Premium (Aspect 16:11) */}
          <div className="lg:col-span-6 relative w-full bg-neutral-bg border border-gray-100 dark:border-gray-800/80 p-4 sm:p-5 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center select-none group">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src={data.image || "/images/placeholder.svg"}
                alt={data.title || "Wisata Daerah"}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/placeholder.svg";
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}