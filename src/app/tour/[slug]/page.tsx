"use client";
import useTourDetail from '@/features/tour/hooks/useDetail';
import StreetViewChecker from '@/lib/checkStreetView';
import { validateAndRedirect } from '@/lib/shouldRedirect';
import { Globe, Info, Landmark, Mail, MapPin } from 'lucide-react';
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
      <div className='flex justify-center'>
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-8 max-w-8xl">
          <div className="box-border w-full flex flex-wrap gap-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-full h-64 md:h-auto overflow-hidden rounded-xl bg-gray-200"></div>
              <div className="flex flex-col justify-start gap-4">
                <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-full w-full flex items-start justify-center">
              <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px] rounded-xl overflow-hidden bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data) {

    return (
      <div className='flex justify-center'>
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-8 max-w-8xl">
          <div className='box-border w-full flex flex-wrap gap-5'>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-full h-64 md:h-auto overflow-hidden">
                <div className={`relative aspect-[3/2]`}>
                  <Image
                    src={data?.thumbnail ?? "/images/placeholder.svg"}
                    alt={data?.title ?? "Judul tidak tersedia"}
                    fill
                    className='object-cover rounded-xl'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start gap-4">
                <div className="flex items-start gap-3">
                  <Landmark className="text-green-700 min-w-6 min-h-6 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{data?.title}</h2>
                  </div>
                </div>

                {
                  data?.address && data?.link.gmap &&
                  <div className="flex items-start gap-3">
                    <MapPin className="text-green-700 min-w-6 min-h-6" />
                    <p className="text-blue-500 hover:underline">
                      <Link href={data?.link.gmap ?? ""} target='_blank'>
                        {data?.address || "Lihat Lokasi"}
                      </Link>
                    </p>
                  </div>
                }

                {
                  data?.description &&
                  <div className="flex items-start gap-3">
                    <Info className="text-green-700 min-w-6 min-h-6" />
                    <p className="text-gray-600">
                      {data?.description}
                    </p>
                  </div>
                }

                {data?.link.email &&
                  <div className="flex items-center gap-3">
                    <Mail className="text-green-700 min-w-6 min-h-6 mt-1" />
                    <p className="text-gray-600">
                      {data?.link.email}
                    </p>
                  </div>
                }

                {
                  data?.link.website &&
                  <div className="flex items-center gap-3">
                    <Globe className="text-green-700 min-w-6 min-h-6 mt-1" />
                    <p className="text-gray-600">
                      <Link href={data?.link.website ?? ""} target='_blank' className="text-blue-500 hover:underline">
                        {data?.link.website}
                      </Link>
                    </p>
                  </div>
                }

              </div>
            </div>

            <div className="h-full w-full flex items-start justify-center">
              <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] rounded-xl overflow-hidden">
                <GoogleMapsEmbed
                  latitude={data?.latitude}
                  longitude={data?.longitude}
                  mode={isStreetAvailable ? "streetview" : "place"}
                  title={`Map of ${data?.title}`}
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (validateAndRedirect([typeof slug === "string" ? slug : "*"])) {
    return redirect('/tour');
  }
  return <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700">
    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
    <Link href="/" className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800">
      Kembali ke Beranda
    </Link>
  </div>
}