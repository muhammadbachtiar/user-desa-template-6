"use client"

import { useState } from "react"
import { FeatureCard } from "@/components/ui/simple/feature-card"
import type { InfoCard } from "@/types/Simple"
import type { LucideIcon } from "lucide-react"
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

  return (
    <section id="info-layanan" className="py-16 bg-gray-50 flex justify-center">
      <div className="w-full  px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {service.subTittle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
          {displayCards.map((card) => {
              const IconComponent = Icons[card.icon] as LucideIcon
              const hasChildren = card.child && card.child.length > 0;

              return (
                <FeatureCard
                  key={card.id}
                  title={card.title}
                  className="h-full"
                  description={card.description || `Semua informasi tentang ${card.title} dapat kamu lihat disini.`}
                  icon={IconComponent}
                  image={card.image}
                  onClick={hasChildren ? () => handleCardClick(card) : undefined}
                  link={
                    !hasChildren
                      ? (typeof card.link === "string"
                          ? { text: "Selengkapnya", url: card.link }
                          : card.link)
                      : undefined
                  }
                />
              )
          })}
        </div>
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </section>
  )
}
