"use client"

import { CustomButton } from "@/components/ui/simple/CustomButton"
import { ChevronRight } from "lucide-react"
import type { HeroSection as HeroSectionType } from "@/types/Simple"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface HeroSectionProps {
  data: HeroSectionType
}

export function HeroSection({ data }: HeroSectionProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  // Helper function to check if the media is a video
  const isVideo = (url: string | undefined | null): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  // Check if data is loaded (has the required fields)
  const isLoaded = data && 'title' in data;

  // Check if we have valid media to display
  const hasValidMedia = isClient && data?.image;

  // Check if title or description exists (not empty string)
  const hasTextContent = !!(data?.title || data?.description);

  const handleClickProfil = () => {
    router.push('/article');
  };

  const handleClickLayanan = () => {
    router.push('#info-layanan');
  };

  // Mode 1: Has text content (title/description) - use cover background with min-height
  // Mode 2: No text content - show full image/video without cropping
  if (hasTextContent) {
    // MODE 1: Background cover with min-height for text overlay
    return (
      <section className="relative w-full">
        <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh]">
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/75 z-10" />
          
          {/* Media as background cover */}
          {hasValidMedia && (
            <>
              {isVideo(data.image) ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={data.image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.image}
                  alt={data?.title || "Hero Background"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </>
          )}

          {/* Content Overlay - positioned on top of media with top padding for header safety */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pt-28 sm:pt-36 pb-12">
            <div className="px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
              {!isLoaded ? (
                <SkeletonHeroContent />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="max-w-4xl mx-auto text-white">
                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-center text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] leading-tight tracking-tight uppercase"
                    >
                      {data.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 text-center text-white/90 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-relaxed font-normal"
                    >
                      {data.description}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center"
                    >
                      <CustomButton 
                        className="bg-brand-primary text-white hover:bg-brand-gold hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/20 text-xs sm:text-sm md:text-base px-6 py-3 font-bold rounded-lg transition-all duration-300 transform flex items-center gap-1.5 border-none" 
                        onClick={handleClickProfil}
                      >
                        {data.buttons?.primary?.text || "Berita Terbaru"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </CustomButton>
                      <CustomButton 
                        variant="outline" 
                        className="bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base px-6 py-3 font-bold rounded-lg transition-all duration-300 backdrop-blur-sm transform flex items-center gap-1.5" 
                        onClick={handleClickLayanan}
                      >
                        {data.buttons?.secondary?.text || "Layanan Publik"}
                      </CustomButton>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // MODE 2: No text content - show full image/video without cropping, keeping it fully visible below the fixed header
  return (
    <section className="relative w-full pt-[52px] md:pt-[56px] lg:pt-[105px] transition-all duration-300">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-black/30 z-10" />
        {/* Media - width full, height auto adjusts to content (no cropping) */}
        {hasValidMedia && (
          <>
            {isVideo(data.image) ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              >
                <source src={data.image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.image}
                alt="Hero Image"
                className="w-full h-auto block"
              />
            )}
          </>
        )}

        {/* Fallback when no media */}
        {!hasValidMedia && (
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]" />
        )}
      </div>
    </section>
  );
}

function SkeletonHeroContent() {
  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        {/* Title skeleton */}
        <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-3/4 mx-auto mb-3 sm:mb-4 bg-white/20" />
        
        {/* Description skeleton */}
        <Skeleton className="h-4 sm:h-5 md:h-6 w-full max-w-2xl mx-auto mb-2 bg-white/20" />
        <Skeleton className="h-4 sm:h-5 md:h-6 w-5/6 max-w-xl mx-auto mb-4 sm:mb-6 bg-white/20" />

        {/* Buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center">
          <Skeleton className="h-10 sm:h-11 w-36 sm:w-40 bg-white/30 rounded-md" />
          <Skeleton className="h-10 sm:h-11 w-36 sm:w-40 bg-white/30 rounded-md" />
        </div>
      </div>
    </div>
  )
}

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded ${className}`} />
)



