"use client"

import Link from 'next/link';
import { validateAndRedirect } from '@/lib/shouldRedirect';
import { redirect, useParams } from 'next/navigation';
import SliderCard from '@/features/press-release/component/sliderImage';
import moment from 'moment';
import 'moment/locale/id';
import DownloadButton from '@/features/press-release/component/DownloadButton';
import usePressReleaseDetail from '@/features/press-release/hooks/useDetail';
import { cleanContent } from '@/lib/cleanContent';
import { ArrowLeft, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  const { slug }: { slug: string } = useParams();
  const { data: pressRelease, isLoading } = usePressReleaseDetail({ with: "category,attachments" }, slug);

  try {
    const rawDescription = pressRelease?.content || "";
    const paragraphs = cleanContent(rawDescription);
    const contentImageUrl: { title: string; link: string }[] = [];

    if (pressRelease?.thumbnail) {
      contentImageUrl.push({
        title: "Thumbnail",
        link: pressRelease.thumbnail
      });
    }

    const imgTagMatches = pressRelease?.content?.match(/<img[^>]+src="([^">]+)"/gi) || [];

    imgTagMatches.forEach((imgTag, index) => {
      const srcMatch = imgTag.match(/src="([^">]+)"/i);
      if (srcMatch && srcMatch[1]) {
        contentImageUrl.push({
          title: `Image ${index + 1} from content`,
          link: srcMatch[1]
        });
      }
    });

    pressRelease?.attachments?.forEach((attachment, index) => {
      contentImageUrl.push({
        title: attachment?.original_name || `Attachment ${index + 1} from content`,
        link: attachment.url
      });
    });

    return (
      <div className="flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen bg-neutral-bg">
        <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-6">

          {/* Baris Navigasi Kembali */}
          <div className="w-full text-left select-none animate-fade-in">
            <Link href="/press-release" className="text-brand-primary hover:text-brand-gold text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Kembali
            </Link>
          </div>

          {isLoading ? (
            <div className="w-full flex justify-center items-center py-20 select-none animate-pulse">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
            </div>
          ) : (
            <div className="bg-neutral-bg border border-gray-100 dark:border-gray-800/80 p-6 sm:p-8 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.01)] text-left animate-fade-in">
              {/* Judul Siaran Pers */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-text leading-tight tracking-tight mb-4 uppercase">
                {pressRelease?.title ?? "Siaran Pers Tidak Ditemukan"}
              </h1>

              {/* Metadata Siaran Pers */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-text-muted font-medium mb-6 pb-6 border-b border-gray-100 dark:border-gray-800/80">
                <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider select-none">
                  {pressRelease?.category?.name || 'Siaran Pers'}
                </span>
                <span className="flex items-center text-neutral-text-muted">
                  <Calendar className="h-4 w-4 mr-1.5 text-neutral-text-muted/70" />
                  {moment(pressRelease?.published_at ?? "").locale('id').format('dddd, D MMMM YYYY')}
                </span>
              </div>

              {/* Gambar Utama Siaran Pers */}
              {pressRelease?.thumbnail && (
                <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-800/80 aspect-[16/9] mb-8 select-none">
                  <Image
                    src={pressRelease.thumbnail}
                    alt={pressRelease.title || "Detail Siaran Pers"}
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/placeholder.svg";
                    }}
                  />
                </div>
              )}

              {/* Isi Konten Teks Siaran Pers */}
              <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-text text-sm sm:text-base leading-relaxed space-y-4.5 text-justify">
                {paragraphs.map((para, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>

              {/* Slider Gambar / Lampiran */}
              {contentImageUrl.length > 0 && (
                <div className="mt-8 select-none">
                  <SliderCard data={contentImageUrl} slideToShow={contentImageUrl.length < 3 ? contentImageUrl.length : 3} />
                </div>
              )}

              {/* Footer Keterangan Instansi & Tombol Unduh PDF */}
              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 text-xs sm:text-sm text-neutral-text-muted font-bold">
                <div className="shrink-0 select-none">
                  <DownloadButton article={pressRelease} paragraphs={paragraphs} contentImageUrl={contentImageUrl} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch {
    if (validateAndRedirect([slug])) {
      return redirect('/press-release');
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
}