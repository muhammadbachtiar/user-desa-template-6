"use client"

import { HeroSection } from "@/components/template/simple/sections/hero-section"
import { InfoSection } from "@/components/template/simple/sections/info-section"
import { AboutSection } from "@/components/template/simple/sections/about-section"
import { NewsSection } from "@/components/template/simple/sections/news-section"
import { useContent } from "@/hooks/useContent"
import { SambutanSection } from "@/components/template/simple/sections/sambutan-section"
import { InfografisSection } from "@/components/template/simple/sections/infografis-section"
import DynamicInstagramFeed from "@/components/instagram/DynamicInstagramFeed"
import useDynamicSections from "@/hooks/useDynamicSections"
import useFeatureFlags, { SectionKey } from "@/hooks/useFeatureFlags"

export default function Home() {
  const { hero, infoCards, about, isLoading } = useContent();
  const { sections, isLoading: isSectionsLoading } = useDynamicSections();
  const { sectionsOrder, isSectionEnabled } = useFeatureFlags();

  const renderSection = (key: SectionKey) => {
    if (!isSectionEnabled(key)) return null;

    switch (key) {
      case "dynamic_section":
        return <SambutanSection key={key} sections={sections} isLoading={isSectionsLoading} />;
      case "service":
        return <InfoSection key={key} cards={infoCards} />;
      case "news":
        return <NewsSection key={key} />;
      case "instagram":
        return <DynamicInstagramFeed key={key} />;
      case "infografis":
        return <InfografisSection key={key} />;
      case "tour":
        return <AboutSection key={key} data={about} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main>
        <HeroSection data={hero} isLoading={isLoading?.hero} />
        {sectionsOrder.map((section) => section.enabled && renderSection(section.key))}
      </main>
    </div>
  )
}
