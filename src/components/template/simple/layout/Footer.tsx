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
  let result: NavItem[] = [];

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
    <footer className="bg-slate-950 text-gray-400 pt-20 pb-10 flex justify-center border-t border-slate-900">
      <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {hasBrackets ? (
            <>
              {/* Skeleton Loader Columns */}
              <div className="lg:col-span-4 flex flex-col space-y-6 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-3 w-24 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="h-4 w-40 bg-white/10 rounded" />
              </div>

              <div className="lg:col-span-2 flex flex-col space-y-4 animate-pulse">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-3.5 w-20 bg-white/10 rounded" />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col space-y-4 animate-pulse">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-3.5 w-24 bg-white/10 rounded" />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col space-y-4 animate-pulse">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 w-full bg-white/10 rounded-xl" />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* KOLOM 1: Brand & Media Sosial (Span 4) */}
              <div className="lg:col-span-4 flex flex-col space-y-6 text-left">
                <div className="flex items-center space-x-3.5 select-none">
                  <div className="p-2 bg-white rounded-2xl shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
                    <Image
                      className="max-w-full max-h-full object-contain"
                      src={data?.logo ?? '/images/logo/enim.png'}
                      alt="Logo"
                      width={48}
                      height={48}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/logo/enim.png';
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-base leading-tight uppercase truncate">
                      {data?.regionEntity}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 mt-1 truncate">
                      {data?.regionDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <Sosmed />
                </div>
                {hasCoordinates && (
                  <div className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg relative aspect-[16/9] animate-fade-in select-none">
                    <GoogleMapsEmbed
                      latitude={data?.latitude}
                      longitude={data?.longitude}
                      mode="place"
                      title="Lokasi kami di Google Maps"
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* KOLOM 2: Tautan Cepat (Span 2) */}
              <div className="lg:col-span-2 flex flex-col text-left">
                <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-primary">
                  Tautan Cepat
                </h4>
                <ul className="space-y-3.5 text-sm">
                  {collectStaticPages(data?.quickLinks || []).map((link) => (
                    <li key={link.route}>
                      <a
                        href={link.route}
                        className="text-gray-400 hover:text-brand-primary transition-all duration-200 hover:translate-x-1.5 inline-flex items-center gap-1 group"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-brand-primary text-xs">→</span>
                        <span>{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* KOLOM 3: Layanan (Span 2) */}
              <div className="lg:col-span-2 flex flex-col text-left">
                <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-primary">
                  Layanan
                </h4>
                <ul className="space-y-3.5 text-sm">
                  {data?.mainNav?.map((service: InfoCard) => {
                    const href = typeof service.link === 'string' ? service.link : service.link?.url ?? '#';
                    return (
                      <li key={service.id || service.title}>
                        <a
                          href={href}
                          className="text-gray-400 hover:text-brand-primary transition-all duration-200 hover:translate-x-1.5 inline-flex items-center gap-1 group"
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-brand-primary text-xs">→</span>
                          <span>{service.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* KOLOM 4: Kontak & Google Maps Embed (Span 4) */}
              <div className="lg:col-span-4 flex flex-col text-left space-y-6">
                <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-1 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-primary">
                  Hubungi Kami
                </h4>

                <ul className="space-y-4 text-sm pt-2">
                  {/* Alamat */}
                  {data?.address && (
                    <li className="flex items-start group">
                      <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-brand-primary mr-3.5 shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
                        <MapPin className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] uppercase tracking-wider text-gray-600 font-bold mb-0.5">Alamat</span>
                        {mapsUrl ? (
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white hover:underline transition-colors duration-200 leading-relaxed block"
                            aria-label="Lihat lokasi di Google Maps"
                          >
                            {data?.address}
                          </a>
                        ) : (
                          <span className="text-gray-400 leading-relaxed block">{data?.address}</span>
                        )}
                      </div>
                    </li>
                  )}

                  {/* Telepon */}
                  {data?.phone && (
                    <li className="flex items-center group">
                      <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-brand-primary mr-3.5 shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
                        <Phone className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] uppercase tracking-wider text-gray-600 font-bold mb-0.5">Telepon</span>
                        <a
                          href={`tel:${data?.phone}`}
                          className="text-gray-400 hover:text-white transition-colors duration-200 font-semibold block"
                          aria-label="Hubungi kami via telepon"
                        >
                          {data?.phone}
                        </a>
                      </div>
                    </li>
                  )}

                  {/* Email */}
                  {data?.email && (
                    <li className="flex items-center group">
                      <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-brand-primary mr-3.5 shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
                        <Mail className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] uppercase tracking-wider text-gray-600 font-bold mb-0.5">Email</span>
                        <a
                          href={`mailto:${data?.email}`}
                          className="text-gray-400 hover:text-white transition-colors duration-200 font-semibold block truncate"
                          aria-label="Kirim email kepada kami"
                        >
                          {data?.email}
                        </a>
                      </div>
                    </li>
                  )}
                </ul>

              </div>
            </>
          )}
        </div>

        {/* Hak Cipta */}
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-500 text-xs select-none">
          <p>© {new Date().getFullYear()} {data?.regionEntity || "Portal Daerah"}. Hak Cipta Dilindungi.</p>
        </div>

      </div>
    </footer>
  )
}
