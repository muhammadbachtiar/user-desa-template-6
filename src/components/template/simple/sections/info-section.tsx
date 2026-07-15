"use client"

import { useState } from "react"
import Link from "next/link"
import type { InfoCard } from "@/types/Simple"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Icons from "@/icons/icons"
import { useContent } from "@/hooks/useContent"
import { ServiceModal } from "./ServiceModal"

interface InfoSectionProps {
  cards: InfoCard[]
}

export function InfoSection({ cards }: InfoSectionProps) {
  const { service, isSectionEnabled, pressRelease } = useContent();
  const [selectedService, setSelectedService] = useState<InfoCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isRouteMatch = (route: string | undefined | null, target: string) => {
    if (!route) return false;
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    return normalizedRoute === target;
  };

  const displayCards = cards.filter((card) => {
    const url = typeof card.link === "string" ? card.link : card.link?.url;
    
    if (isRouteMatch(url, "/tour") && !isSectionEnabled("tour")) return false;
    if ((isRouteMatch(url, "/press-release") || isRouteMatch(url, "/press release")) && !pressRelease) return false;
    
    return true;
  }); 

  const handleCardClick = (card: InfoCard) => {
    setSelectedService(card);
    setIsModalOpen(true);
  };

  // Menyiapkan data kartu untuk marquee etalase premium (duplikasi agar berputar tanpa jeda)
  const marqueeCards = displayCards.length === 0 ? [] : (
    displayCards.length < 5
      ? [...displayCards, ...displayCards, ...displayCards, ...displayCards]
      : [...displayCards, ...displayCards]
  );

  return (
    <section id="info-layanan" className="py-16 md:py-24 bg-neutral-bg-subtle/20 flex justify-center overflow-hidden border-t border-b border-gray-100 dark:border-gray-800">
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-center">
        
        {/* CSS Keyframes & Styles untuk Infinite Marquee / Mobile Touch Scroll */}
        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (min-width: 1024px) {
            .animate-marquee-slow {
              display: flex;
              width: max-content;
              animation: marquee-scroll 35s linear infinite;
            }
            .animate-marquee-slow:hover {
              animation-play-state: paused;
            }
          }
          @media (max-width: 1023px) {
            .animate-marquee-slow {
              display: flex;
              width: 100%;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              -webkit-overflow-scrolling: touch;
              padding-bottom: 8px;
            }
            .animate-marquee-slow::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>

        {/* Title & Subtitle */}
        <div className="text-center mb-12 px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-text mb-4">
            {service?.title || "Layanan & Informasi"}
          </h2>
          <p className="text-sm sm:text-base text-neutral-text-muted max-w-2xl mx-auto leading-relaxed">
            {service?.subTittle || "Akses cepat ke berbagai pusat dokumentasi, regulasi, dan layanan daerah."}
          </p>
        </div>

        {/* PREMIUM ETALASE SHOWCASE (Infinite Marquee / Mobile Touch Scroll) */}
        {marqueeCards.length > 0 ? (
          <div className="relative w-full overflow-hidden py-4 select-none">
            {/* Soft Fading Gradients on Left & Right edges for premium look (Visible only on desktop marquee) */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-neutral-bg via-neutral-bg/60 to-transparent z-10 pointer-events-none" />
            <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-neutral-bg via-neutral-bg/60 to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee-slow flex gap-6 px-4 scroll-smooth">
              {marqueeCards.map((card, idx) => (
                <div key={`${card.id}-${idx}`} className="w-[270px] sm:w-[310px] shrink-0 snap-center">
                  <PremiumInfoCard 
                    card={card} 
                    onClick={() => handleCardClick(card)} 
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-neutral-text-muted text-sm py-8">
            Tidak ada data layanan untuk ditampilkan.
          </div>
        )}
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </section>
  )
}

/* --- PREMIUM CARD COMPONENT IMPLEMENTATION --- */
export interface PremiumInfoCardProps {
  card: InfoCard
  onClick?: () => void
}

export function PremiumInfoCard({ card, onClick }: PremiumInfoCardProps) {
  // Safe icon lookup to prevent system crash
  const IconComponent = card.icon && Icons[card.icon] ? (Icons[card.icon] as LucideIcon) : null;
  const hasChildren = card.child && card.child.length > 0;
  const url = typeof card.link === "string" ? card.link : card.link?.url;
  
  const isExternal = url && (url.startsWith("http://") || url.startsWith("https://"));

  const getButtonText = () => {
    if (hasChildren) return "Lihat Layanan";
    if (card.link && typeof card.link === "object" && card.link.text) {
      return card.link.text;
    }
    return "Selengkapnya";
  };

  const buttonText = getButtonText();

  const cardContent = (
    <div 
      onClick={hasChildren ? onClick : undefined}
      className={`h-[200px] w-full bg-neutral-bg p-5 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group/card ${
        hasChildren || url ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex flex-col min-w-0 flex-1">
        {/* Top-Left Logo / Icon */}
        {card.image ? (
          <div className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-800 shrink-0 select-none">
            <img 
              src={card.image} 
              alt={card.title || "Icon"} 
              className="object-contain w-7 h-7"
              onError={(e) => {
                // Fallback to text initials on image error to prevent broken image icons
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0 select-none">
            {IconComponent ? (
              <IconComponent className="h-5 w-5 text-brand-primary" />
            ) : (
              <Icons.Globe className="h-5 w-5 text-brand-primary" />
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-neutral-text mt-3 line-clamp-1 truncate leading-tight">
          {card.title || "Informasi Layanan"}
        </h3>
        
        {/* Description (Hanya jika ada dari fetch) */}
        {card.description && (
          <p className="text-xs text-neutral-text-muted mt-1.5 line-clamp-2 leading-relaxed">
            {card.description}
          </p>
        )}
      </div>

      {/* Brand New Pill Button */}
      {(hasChildren || url) && (
        <div className="mt-3 inline-flex items-center justify-center px-3.5 py-1.5 bg-brand-primary/10 text-brand-primary group-hover/card:bg-brand-primary group-hover/card:text-white rounded-full text-[11px] font-bold transition-all duration-300 gap-1 self-start select-none shadow-sm">
          <span>{buttonText}</span>
          <ChevronRight className="h-3 w-3 transition-transform group-hover/card:translate-x-0.5 duration-200" />
        </div>
      )}
    </div>
  );

  // If the card opens a modal (has children), handle trigger click
  if (hasChildren) {
    return cardContent;
  }

  // If external link, render pure anchor
  if (isExternal && url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full">
        {cardContent}
      </a>
    );
  }

  // If internal link, render Next.js Link
  if (url) {
    return (
      <Link href={url} className="block w-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
