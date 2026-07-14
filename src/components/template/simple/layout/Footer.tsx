"use client";
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { NavItem, InfoCard } from "@/types/Simple";
import Sosmed from "@/features/header/components/sosmed";
import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";

interface FooterProps {
  data?: {
    logo: string,
    regionEntity: string,
    regionDescription: string,
    address: string,
    phone: string,
    email: string,
    latitude?: string | number | null,
    longitude?: string | number | null,
    socialMedia: unknown[],
    mainNav: InfoCard[],
    quickLinks: NavItem[]
  }
}

function collectStaticPages(links: NavItem[]): NavItem[] {
  let result : NavItem[] = [];

  for (const link of links) {
    if (!link.staticPage && !link.child) {
      result.push(link);
    }

    if (link.child && Array.isArray(link.child)) {
      result = result.concat(collectStaticPages(link.child));
    }
  }

  return result;
}

// Generate Google Maps URL from coordinates
function getGoogleMapsUrl(latitude: string | number | null | undefined, longitude: string | number | null | undefined): string | null {
  if (!latitude || !longitude) return null;
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}



export function Footer({ data }: FooterProps) {

  const hasBrackets = /[\[\]]/.test(data?.regionEntity ?? '');
  const hasCoordinates = data?.latitude && data?.longitude;
  const mapsUrl = getGoogleMapsUrl(data?.latitude, data?.longitude);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 flex justify-center">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-2">

          {
            hasBrackets ? (
              <div className="animate-pulse">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-[38px] h-[38px] bg-gray-200 rounded-md" /> 
                  <div>
                    <div className="h-5 w-40 bg-gray-200 rounded-md mb-2" />
                    <div className="h-3 w-32 bg-gray-100 rounded-md" /> 
                  </div>
                </div>
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                   <Image
                      className="w-[38px] object-contain aspect-square"
                      src={data?.logo ?? '/images/logo/enim.png'}
                      alt="Logo"
                      width={500}
                      height={500}
                    />
                  <div>
                    <h3 className="font-bold text-lg leading-5">{data?.regionEntity}</h3>
                    <p className="text-xs font-semibold text-white">{data?.regionDescription}</p>
                  </div>
                </div>
                <div className="flex space-x-4 mb-6">
                 <Sosmed/>
                </div>

                {/* Google Maps Embed - Dibawah logo dengan ukuran terbatas */}
                {hasCoordinates && (
                  <div className="max-w-xs">
                    <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '75%' }}>
                      <GoogleMapsEmbed
                        latitude={data?.latitude}
                        longitude={data?.longitude}
                        mode="place"
                        title="Lokasi kami di Google Maps"
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          }
            <div className="flex flex-row gap-8 w-full justify-baseline xl:justify-evenly">
              {
                hasBrackets ? (
                  <div className="animate-pulse">
                    <div className="h-5 w-32 bg-gray-300 rounded mb-4" />
                    <ul className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <li key={i}>
                          <div className="h-4 w-32 bg-gray-200 rounded" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
                    <ul className="space-y-2">
                      {collectStaticPages(data?.quickLinks || []).map((link) => (
                        <li key={link.route}>
                          <a href={link.route} className="text-green-100 hover:text-white">
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
              {
                hasBrackets ? (
                  <div className="animate-pulse">
                    <div className="h-5 w-32 bg-gray-300 rounded mb-4" />
                    <ul className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <li key={i}>
                          <div className="h-4 w-32 bg-gray-200 rounded" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-lg mb-4">Layanan</h3>
                    <ul className="space-y-2">
                      {data?.mainNav?.map((service: InfoCard) => {
                        const href = typeof service.link === 'string' ? service.link : service.link?.url ?? '#';
                        return (
                          <li key={service.id || service.title}>
                            <a href={href} className="text-green-100 hover:text-white">
                              {service.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )
              }
            </div>
          {
            hasBrackets ? (
              <div className=" col-span-1 xl:col-span-2 animate-pulse">
                <div className="h-5 w-32 bg-gray-300 rounded mb-4" />
                <ul className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <div className="h-4 w-64 bg-gray-200 rounded" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="col-span-1 xl:col-span-2">
                <h3 className="font-bold text-lg mb-4">Kontak</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="min-h-6 min-w-6 mr-3 mt-0.5 text-green-100" />
                    {mapsUrl ? (
                      <a 
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-100 hover:text-white hover:underline transition-colors duration-200"
                        aria-label="Lihat lokasi di Google Maps"
                      >
                        {data?.address}
                      </a>
                    ) : (
                      <span className="text-green-100">{data?.address}</span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <Phone className="min-h-6 min-w-6 mr-3 text-green-100" />
                    <a 
                      href={`tel:${data?.phone}`}
                      className="text-green-100 hover:text-white hover:underline transition-colors duration-200"
                      aria-label="Hubungi kami via telepon"
                    >
                      {data?.phone}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="min-h-6 min-w-6 mr-3 text-green-100" />
                    <a 
                      href={`mailto:${data?.email}`}
                      className="text-green-100 hover:text-white hover:underline transition-colors duration-200"
                      aria-label="Kirim email kepada kami"
                    >
                      {data?.email}
                    </a>
                  </li>
                </ul>
              </div>
            )
          }

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} {data?.regionEntity}. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}

