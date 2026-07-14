"use client"
import Image from "next/image"
import { MainNav } from "@/components/navigation/main-nav"
import { NavItem } from "@/types/Simple"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Phone, MapPin } from "lucide-react"
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaThreads, FaTiktok, FaYoutube, FaQuestion } from "react-icons/fa6"
import useSetting from "@/hooks/useSettings"
import { MobileSidebar } from "@/components/navigation/mobile-sidebar"

interface HeaderProps {
  data?: {
    logo: string,
    regionEntity: string,
    regionDescription: string,
    menus: NavItem[],
  }
}

export function Header({ data }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { data: footerData } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {})
  const contact = footerData?.value?.contactUs
  const phone = contact?.phone
  const address = contact?.address
  const socialMedia = footerData?.value?.socialMedia

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNav = data?.menus ?? []
  const hasBrackets = /[\[\]]/.test(data?.regionEntity ?? '');

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebook className="h-3.5 w-3.5" />
      case "x":
      case "twitter":
        return <FaXTwitter className="h-3.5 w-3.5" />
      case "instagram":
        return <FaInstagram className="h-3.5 w-3.5" />
      case "youtube":
        return <FaYoutube className="h-3.5 w-3.5" />
      case "linkedin":
        return <FaLinkedin className="h-3.5 w-3.5" />
      case "threads":
        return <FaThreads className="h-3.5 w-3.5" />
      case "tiktok":
        return <FaTiktok className="h-3.5 w-3.5" />
      default:
        return <FaQuestion className="h-3.5 w-3.5" />
    }
  }

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "shadow-md" 
            : "shadow-sm"
        }`}
      >
        {/* Row 1: Logo & Info (atau Logo & Menu jika di-scroll) - Background PUTIH */}
        <div className="w-full flex justify-center bg-neutral-bg border-b border-gray-100 dark:border-gray-800 transition-all duration-300 py-1.5 md:py-2">
          <div className="px-6 w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex justify-between items-center gap-4">
            
            {/* Logo (Kiri) */}
            <div className="flex items-center space-x-3">
              {!data?.regionEntity || hasBrackets ? (
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 bg-gray-300/30 animate-pulse rounded"></div>
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-24 bg-gray-300/30 animate-pulse rounded"></div>
                    <div className="h-2.5 w-16 bg-gray-300/30 animate-pulse rounded"></div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/"
                  className="flex flex-row py-1 space-x-3 rtl:space-x-reverse rounded-md transition transform duration-300 ease-in-out hover:scale-95 shrink-0"
                >
                  <Image
                    className="w-[34px] h-[34px] md:w-[38px] md:h-[38px] object-contain aspect-square transition-all duration-300"
                    src={data?.logo ?? "/images/logo/enim.png"}
                    alt="Logo"
                    width={100}
                    height={100}
                    priority
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="font-bold text-sm md:text-base leading-tight text-brand-primary">
                      {data?.regionEntity}
                    </h1>
                    <p className="text-[10px] md:text-xs font-semibold leading-tight text-neutral-text-muted">
                      {data?.regionDescription}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            {/* Kanan Row 1 */}
            {!isScrolled ? (
              /* Jika BELUM scroll: Info Kontak & Sosmed (Desktop) */
              <div className="hidden lg:flex items-center space-x-8">
                {/* Kontak */}
                <div className="flex items-center space-x-6 text-xs font-semibold text-neutral-text">
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center space-x-2 hover:text-brand-primary transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                      <span>{phone}</span>
                    </a>
                  )}
                  {address && (
                    <div className="flex items-center space-x-2 max-w-[200px] xl:max-w-[300px]">
                      <MapPin className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                      <span className="truncate" title={address}>
                        {address}
                      </span>
                    </div>
                  )}
                </div>

                {/* Sosmed */}
                <div className="flex items-center space-x-4 text-neutral-text-muted">
                  {socialMedia &&
                    Object.entries(socialMedia).map(([platform, info]) => {
                      const url =
                        info && typeof info === "object" && "profileUrl" in info
                          ? (info as { profileUrl: string }).profileUrl
                          : "#"
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-primary hover:scale-110 transition-all duration-200"
                          title={platform}
                        >
                          {renderSocialIcon(platform)}
                        </a>
                      )
                    })}
                </div>
              </div>
            ) : (
              /* Jika SUDAH scroll: Menu Navigasi Utama (Desktop) */
              <div className="hidden lg:flex items-center transition-all duration-300">
                {mainNav.length > 0 && (
                  <MainNav 
                    menuData={mainNav} 
                    isScrolled={isScrolled} 
                    logo={data?.logo}
                    regionEntity={data?.regionEntity}
                    regionDescription={data?.regionDescription}
                  />
                )}
              </div>
            )}

            {/* Mobile Hamburger (Selalu ada di Mobile, Tersembunyi di Desktop) */}
            <div className="flex lg:hidden items-center">
              <MobileSidebar 
                menuData={mainNav} 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                isScrolled={true}
                logo={data?.logo}
                regionEntity={data?.regionEntity}
                regionDescription={data?.regionDescription}
              />
            </div>

          </div>
        </div>

        {/* Row 2: Menu Utama (jika belum scroll) ATAU Info Kontak (jika sudah scroll) - Background BIRU SOLID */}
        <div className="w-full flex justify-center bg-brand-primary text-white transition-all duration-300 shadow-inner">
          <div className="px-6 w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex items-center justify-between">
            <div className="w-full flex items-center justify-between">
              
              {!isScrolled ? (
                /* Jika BELUM scroll: Render Menu Navigasi di Row 2 (Hanya Desktop) */
                mainNav.length === 0 || mainNav.length <= 3 ? (
                  <div className="hidden lg:flex space-x-6 py-2.5">
                    <div className="h-3.5 w-16 bg-white/20 animate-pulse rounded"></div>
                    <div className="h-3.5 w-20 bg-white/20 animate-pulse rounded"></div>
                    <div className="h-3.5 w-12 bg-white/20 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <div className="hidden lg:block w-full">
                    <MainNav 
                      menuData={mainNav} 
                      isScrolled={isScrolled} 
                      logo={data?.logo}
                      regionEntity={data?.regionEntity}
                      regionDescription={data?.regionDescription}
                    />
                  </div>
                )
              ) : (
                /* Jika SUDAH scroll: Render Alamat dan Sosmed di Row 2 (Tampil di Desktop & Mobile, Sangat Pendek) */
                <div className="w-full flex justify-between items-center py-0.5 md:py-1 text-[11px] font-semibold text-white/90 animate-fade-in transition-all duration-300">
                  {/* Kontak */}
                  <div className="flex items-center space-x-6">
                    {phone && (
                      <a href={`tel:${phone}`} className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors">
                        <Phone className={`${isScrolled ? "h-3 w-3" : "h-3.5 w-3.5"} text-brand-gold shrink-0 transition-all duration-300`} />
                        <span>{phone}</span>
                      </a>
                    )}
                    {address && (
                      <div className="flex items-center space-x-1.5 max-w-[200px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[750px]">
                        <MapPin className={`${isScrolled ? "h-3 w-3" : "h-3.5 w-3.5"} text-brand-gold shrink-0 transition-all duration-300`} />
                        <span className="truncate" title={address}>{address}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Sosmed */}
                  <div className="flex items-center space-x-3 shrink-0">
                    {socialMedia &&
                      Object.entries(socialMedia).map(([platform, info]) => {
                        const url =
                          info && typeof info === "object" && "profileUrl" in info
                            ? (info as { profileUrl: string }).profileUrl
                            : "#"
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand-gold hover:scale-110 transition-all duration-200"
                            title={platform}
                          >
                            {renderSocialIcon(platform)}
                          </a>
                        )
                      })}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </header>
    </>
  )
}
