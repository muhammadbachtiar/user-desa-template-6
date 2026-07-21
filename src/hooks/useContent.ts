"use client"
import type { HeroSection, AboutSection, CTASection, GalleryItem, InfoCard } from "@/types/Simple"
import useSetting from "./useSettings";
import useStaticPage from "./useStaticPage";
import useFeatureFlags from "./useFeatureFlags";
import { NavItem } from "@/types/Simple";

function filterMenusByFeatures(
  menus: NavItem[],
  features: { tour: boolean; pressRelease: boolean }
): NavItem[] {
  // Helper untuk cek apakah route match (dengan atau tanpa /)
  const isRouteMatch = (route: string | null | undefined, target: string): boolean => {
    if (!route) return false;
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    return normalizedRoute === target;
  };

  return menus
    .map((menu) => {
      if (menu.child && Array.isArray(menu.child) && menu.child.length > 0) {
        const filteredChildren = filterMenusByFeatures(menu.child, features);
        return {
          ...menu,
          child: filteredChildren,
        };
      }
      return menu;
    })
    .filter((menu) => {
      if (isRouteMatch(menu.route, "/tour") && !features.tour) return false;
      if (isRouteMatch(menu.route, "/press-release") && !features.pressRelease) return false;
      if (menu.child && Array.isArray(menu.child) && menu.child.length === 0 && !menu.route) {
        return false;
      }

      return true;
    });
}

function isValidServiceLink(link: string | { text: string; url: string } | null | undefined): boolean {
  if (!link) return false;
  const url = typeof link === 'string' ? link : link.url;
  if (!url || url.trim() === '' || url.trim() === '/') return false;
  return url.startsWith('http') || (url.startsWith('/') && url.length > 1);
}

function isFeatureBlockedService(
  link: string | { text: string; url: string } | null | undefined,
  features: { tour: boolean; pressRelease: boolean }
): boolean {
  if (!link) return false;
  const url = (typeof link === 'string' ? link : link.url)?.toLowerCase() ?? '';
  if ((url === '/tour' || url === 'tour') && !features.tour) return true;
  if ((url === '/press-release' || url === 'press-release') && !features.pressRelease) return true;
  return false;
}

function filterServiceLinks(
  services: InfoCard[],
  features: { tour: boolean; pressRelease: boolean }
): InfoCard[] {
  const result: InfoCard[] = [];

  for (const service of services) {
    if (isFeatureBlockedService(service.link, features)) continue;

    const linkUrl = typeof service.link === 'string' ? service.link : service.link?.url;
    const hasValidLink = isValidServiceLink(service.link);
    const isRootSlash = linkUrl?.trim() === '/' || !linkUrl || linkUrl.trim() === '';

    if (hasValidLink) {
      if (service.child && service.child.length > 0) {
        const filteredChildren = filterServiceLinks(service.child, features);
        result.push({ ...service, child: filteredChildren });
      } else {
        result.push(service);
      }
    } else if (isRootSlash && service.child && service.child.length > 0) {
      const validChildren = filterServiceLinks(service.child, features);
      if (validChildren.length > 0) {
        result.push(...validChildren);
      }
    }
  }

  return result;
}


export function useContent() {
  const { data: logoData, isLoading: isLogoLoading } = useSetting(`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: serviceData, isLoading: isServiceLoading } = useSetting(`service-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: appData, isLoading: isAppLoading } = useSetting(`app-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: welcomeData, isLoading: isWelcomeLoading } = useStaticPage({}, `wellcome-message-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);
  const { data: programData, isLoading: isProgramLoading } = useStaticPage({}, `village-program-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);
  const { data: footerData, isLoading: isFooterLoading } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: menuData, isLoading: isMenuLoading } = useSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: tourData, isLoading: isTourLoading } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: articleData, isLoading: isArticleLoading } = useSetting(`article-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: heroData, isLoading: isHeroLoading } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  // Feature flags untuk filter menu
  const { pressRelease, isSectionEnabled } = useFeatureFlags();

  const email = footerData?.value?.contactUs?.email || "desaku@example.com"
  const subject = encodeURIComponent("Pesan dari pengunjung")
  const body = encodeURIComponent("Halo, saya ingin mengirim pesan kepada Desa.")

  const hero: HeroSection = {
    title: `${heroData?.value?.title ?? ""}`,
    description: `${heroData?.value?.description ?? ""}`,
    image: `${heroData?.value?.videoUrl ?? "/images/placeholder.svg"}`,
    buttons: {
      primary: {
        text: "Berita terbaru",
        url: "/profil",
      },
      secondary: {
        text: "Layanan Publik",
        url: "/layanan",
      },
    },
  }

  const infoCards = serviceData?.value ?? [];

  const about: AboutSection = {
    title: tourData?.value?.title ?? "[Judul wisata belum diatur]",
    subTittle: tourData?.value?.subTitle ?? "[Sub judul wisata belum diatur]",
    description: [tourData?.value?.description ?? "[Deskripsi wisata belum diatur]"],
    image: tourData?.value?.imageUrl ?? "/images/placeholder.svg",
    button: {
      text: "Lihat selengkapnya",
      url: "/tour",
    },
  }

  const service = {
    title: appData?.value?.title ?? "[judul layanan belum diatur]",
    subTittle: appData?.value?.subTitle ?? "[Sub judul layanan belum diatur]"
  }

  const infoWellcome: string = welcomeData?.content ?? "[Kata sambutan tidak tersedia]";
  const infoProgram: string = programData?.content ?? "[Program tidak tersedia]";

  const gallery: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    image: `/images/gallery/galeri${i + 1}.jpeg?height=250&width=250&text=Galeri+${i + 1}`,
    title: `Galeri ${i + 1}`,
  }))

  const cta: CTASection = {
    title: "Hubungi kami",
    description: `Untuk informasi lebih lanjut tentang ${logoData?.value?.regionEntity?.toLowerCase?.() ?? "kami"} atau layanan yang tersedia, silakan hubungi kami melalui kontak di bawah ini.`,
    buttons: {
      primary: {
        text: "hubungi kami",
        url: `https://wa.me/62${footerData?.value?.contactUs?.phone}?text=Halo%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20desa`,
        icon: "phone",
      },
      secondary: {
        text: "kirim pesan",
        url: `mailto:${email}?subject=${subject}&body=${body}`,
        icon: "mail",
      },
    },
  }

  const article = {
    title: articleData?.value?.title ?? "[Judul artikel belum diatur]",
    imageUrl: articleData?.value?.imageUrl ?? "/images/placeholder.svg",
  }

  // Raw menus dari API
  const rawMenus = menuData?.value ?? [];

  // Filtered menus berdasarkan feature flags
  const filteredMenus = filterMenusByFeatures(rawMenus, {
    tour: isSectionEnabled("tour"),
    pressRelease: pressRelease,
  });

  const footer = {
    logo: logoData?.value?.imageUrl ?? "/images/logo/enim.png?height=60&width=60",
    regionEntity: logoData?.value?.regionEntity ?? "[nama belum diatur]",
    regionDescription: logoData?.value?.regionDescription ?? "[keterangan belum diatur]",
    address: footerData?.value?.contactUs?.address ?? "[alamat belum diatur]",
    phone: footerData?.value?.contactUs?.phone ?? "[phone belum diatur]",
    email: footerData?.value?.contactUs?.email ?? "[email belum diatur]",
    latitude: footerData?.value?.contactUs?.latitude ?? null,
    longitude: footerData?.value?.contactUs?.longitude ?? null,
    socialMedia: footerData?.value?.socialMedia ?? [],
    mainNav: filterServiceLinks(serviceData?.value ?? [], {
      tour: isSectionEnabled("tour"),
      pressRelease: pressRelease,
    }),
    quickLinks: filteredMenus, // Filtered menu untuk footer
  }

  const header = {
    logo: logoData?.value?.imageUrl ?? "/images/logo/enim.png",
    regionEntity: logoData?.value?.regionEntity ?? "",
    regionDescription: logoData?.value?.regionDescription ?? "",
    menus: filteredMenus, // Filtered menu untuk header
  }

  return {
    hero,
    infoCards,
    about,
    gallery,
    cta,
    infoWellcome,
    infoProgram,
    footer,
    header,
    article,
    service,
    pressRelease,
    isSectionEnabled,
    isLoading: {
      logo: isLogoLoading,
      menu: isMenuLoading,
      hero: isHeroLoading,
      about: isTourLoading,
      footer: isFooterLoading,
      service: isServiceLoading,
    }
  }
}

