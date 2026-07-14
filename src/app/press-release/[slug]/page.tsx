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

export default function Page() {
   const { slug }: { slug: string } = useParams();
  const {data: pressRelease, isLoading} =  usePressReleaseDetail({with: "category,attachments"}, slug);
  try {
    const rawDescription = pressRelease?.content || "";
    const paragraphs = cleanContent(rawDescription);
    const contentImageUrl : { title: string; link: string }[] = [];

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
    })
    
    return (
      <div className="flex justify-center min-h-screen bg-gray-50">
        <div className="w-full py-8 px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <header className="bg-blue-900 text-center items-center min-h-24 text-white p-4 mb-6">
            <h1 className="text-2xl font-bold">SIARAN PERS</h1>
            <p className="text-sm">PEMERINTAH KABUPATEN MUARA ENIM</p>
            <p className="text-sm">(Press Release)</p>
          </header>
         {isLoading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <span className="font-mono text-gray-600 animate-pulse">Loading...</span>
          </div>) : (
              <div className="bg-white p-6 shadow-md rounded-b-lg">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              {pressRelease?.title ?? "Artikel Tidak Ditemukan"}
            </h3>
             <h3 className="text-lg italic font-light text-blue-800 mb-4">
              { moment(pressRelease?.published_at ?? "").locale('id').format('dddd, D MMMM YYYY ')}
            </h3>
            <div className="text-gray-700 font-medium text-justify text-xl leading-relaxed space-y-4">
              {paragraphs.map((para, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
            <div className="mt-6">
              <SliderCard data={contentImageUrl} slideToShow={3} />
            </div>
            <div className="mt-6 text-gray-600">
              <p className='text-xl font-bold'>Dinas Kominfo SP Pemkab Muara Enim</p>
              <p>Website: <a href="https://muaraenimkab.go.id/press-release" className="text-blue-600 hover:underline">https://muaraenimkab.go.id/press-release</a></p>
              <p>Facebook: Pemkab Muara Enim</p>
              <p>Instagram: <a href="https://instagram.com/pemkab_muaraenim" className="text-blue-600 hover:underline">@pemkab_muaraenim</a></p>
            </div>
           <DownloadButton article={pressRelease} paragraphs={paragraphs} contentImageUrl={contentImageUrl} />
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
      <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
        <Link href="/" className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }
}