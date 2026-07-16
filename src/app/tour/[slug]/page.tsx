"use client";

import useTourDetail from '@/features/tour/hooks/useDetail';
import StreetViewChecker from '@/lib/checkStreetView';
import { validateAndRedirect } from '@/lib/shouldRedirect';
import { Globe, Info, Landmark, Mail, MapPin, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { GoogleMapsEmbed } from '@/components/ui/GoogleMapsEmbed';

export default function Page() {
  const { slug } = useParams();
  const { data, isLoading } = useTourDetail({}, String(slug));
  const isStreetAvailable = StreetViewChecker({ lat: Number(data?.latitude), lng: Number(data?.longitude) });

  if (isLoading) {
    return (
      <div className="flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen bg-neutral-bg animate-pulse select-none">
        <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-8">
          {/* Info Card Skeleton */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-3xl">
            <div className="w-full aspect-[16/10] bg-gray-100 dark:bg-gray-850 rounded-2xl" />
            <div className="space-y-4 flex flex-col justify-center">
              <div className="h-4 bg-gray-100 dark:bg-gray-850 rounded w-1/4" />
              <div className="h-8 bg-gray-100 dark:bg-gray-850 rounded w-3/4" />
              <div className="h-4 bg-gray-100 dark:bg-gray-850 rounded w-5/6" />
              <div className="h-4 bg-gray-100 dark:bg-gray-850 rounded w-1/2" />
            </div>
          </div>
          {/* Map Skeleton */}
          <div className="w-full aspect-[21/9] bg-gray-100 dark:bg-gray-850 rounded-3xl min-h-[300px]" />
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen bg-neutral-bg">
        <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-8">

          {/* Baris Atas: Tombol Kembali & Breadcrumb */}
          <div className="w-full text-left select-none">
            <Link href="/tour" className="text-brand-primary hover:text-brand-gold text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Kembali
            </Link>
          </div>

          {/* Bagian 1: Card Detail Informasi Wisata */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 bg-neutral-bg border border-gray-100 dark:border-gray-800/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.01)] text-left">
            {/* Thumbnail Foto */}
            <div className="w-full h-fit select-none">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800/50 shadow-sm">
                <Image
                  src={data?.thumbnail ?? "/images/placeholder.svg"}
                  alt={data?.title ?? "Judul tidak tersedia"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder.svg";
                  }}
                />
              </div>
            </div>

            {/* Kumpulan Informasi Wisata */}
            <div className="flex flex-col justify-center min-w-0">

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-text leading-tight tracking-tight mb-6 uppercase">
                {data?.title}
              </h1>

              {/* Baris-Baris Data Detail */}
              <div className="space-y-4">
                {/* Alamat Fisik */}
                {data?.address && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary shrink-0 select-none">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-text-muted font-bold mb-0.5">Alamat</span>
                      {data?.link.gmap ? (
                        <Link href={data.link.gmap} target="_blank" className="text-sm font-semibold text-neutral-text hover:text-brand-primary hover:underline leading-relaxed block transition-colors">
                          {data.address}
                        </Link>
                      ) : (
                        <span className="text-sm font-semibold text-neutral-text leading-relaxed block">{data.address}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Deskripsi */}
                {data?.description && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary shrink-0 select-none">
                      <Info className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-neutral-text-muted leading-relaxed">
                        {data.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Kontak Email */}
                {data?.link.email && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary shrink-0 select-none">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-text-muted font-bold mb-0.5">Kontak Email</span>
                      <a href={`mailto:${data.link.email}`} className="text-sm font-semibold text-neutral-text hover:text-brand-primary block transition-colors">
                        {data.link.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Website Resmi */}
                {data?.link.website && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary shrink-0 select-none">
                      <Globe className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-text-muted font-bold mb-0.5">Website Resmi</span>
                      <Link href={data.link.website} target="_blank" className="text-sm font-semibold text-brand-primary hover:text-brand-gold hover:underline block transition-colors">
                        {data.link.website}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Bagian 2: Google Maps Embed Lebar 21:9 */}
          <div className="w-full overflow-hidden rounded-3xl border border-gray-150 dark:border-gray-800/80 shadow-[0_4px_25px_rgba(0,0,0,0.01)] relative aspect-[16/9] sm:aspect-[21/9] min-h-[300px] sm:min-h-[400px]">
            <GoogleMapsEmbed
              latitude={data?.latitude}
              longitude={data?.longitude}
              mode={isStreetAvailable ? "streetview" : "place"}
              title={`Map of ${data?.title}`}
              className="absolute inset-0 w-full h-full"
            />
          </div>

        </div>
      </div>
    );
  }

  if (validateAndRedirect([typeof slug === "string" ? slug : "*"])) {
    return redirect('/tour');
  }

  return (
    <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700 bg-neutral-bg">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
      <Link href="/" className="mt-4 px-6 py-2 bg-brand-primary hover:bg-brand-gold text-white rounded-xl transition-colors font-bold shadow-sm">
        Kembali ke Beranda
      </Link>
    </div>
  );
}