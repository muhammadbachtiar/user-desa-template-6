import RichTextContent from '@/components/common/RichTextContent';
import ArtikelPopuler from '@/features/article/components/artikelPopuler';
import React from 'react';
import { MenuWithContent } from '@/types/menu';
import SliderCard from '@/features/infografis/component/sliderInfografis';
import { formatMetadata } from '@/lib/generate-seo';
import SettingService from '@/shared/services/setting.service';
import { Metadata } from 'next';
import Link from 'next/link';
import { validateAndRedirect } from '@/lib/shouldRedirect';
import { redirect } from 'next/navigation';

function findMenuItemByPath(
  items: MenuWithContent,
  path: string[],
  currentPath = ""
): MenuWithContent[0] | null {
  for (const item of items) {
    const itemPath = item.route ? `${currentPath}${item.route}` : currentPath;

    if (itemPath === `/${path.join("/")}`) {
      return item;
    }

    if (item.child && item.child.length > 0) {
      const found = findMenuItemByPath(item.child, path, itemPath);
      if (found) return found;
    }
  }

  return null;
}

// Gunakan tipe yang sama untuk keduanya: params adalah Promise
type PageProps = {
  params: Promise<{ slug?: string[] }>; // slug bisa array karena catch-all route [...slug]
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params; // default ke array kosong

  const [{ data: menu }, logoResponse] = await Promise.all([
    SettingService.getSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {}),
    SettingService.getSetting(`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
  ]);

  const menuItem = Array.isArray(menu?.value) ? findMenuItemByPath(menu.value, slug) : null;

  try {
    const menuData = await SettingService.getStaticPage(menuItem?.staticPage || "");
    return formatMetadata({ ...menuData.data, type: "article" }, { siteName: logoResponse?.data?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim", defaultImage: logoResponse?.data?.value?.imageUrl });
  } catch {
    return {
      title: `Halaman | Pemerintah Kabupaten Muara Enim`,
    };
  }
}

export default async function PageStatic({ params }: PageProps) {
  const { slug = [] } = await params; // await params di sini juga

  try {
    const { data: menu } = await SettingService.getSetting(
      `menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`,
      {}
    );

    const menuItem = Array.isArray(menu?.value)
      ? findMenuItemByPath(menu.value, slug)
      : null;

    if (!menuItem?.staticPage) {
      throw new Error("Static page not found");
    }

    const { data } = await SettingService.getStaticPage(menuItem.staticPage);

    const pageTitle = data?.title || menuItem?.title || "Halaman Informasi";

    return (
      <div className="flex justify-center pt-[80px] md:pt-[100px] lg:pt-[135px] pb-16 min-h-screen bg-neutral-bg">
        <div className="w-full px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="box-border grid grid-cols-12 gap-6 xl:gap-12 justify-between">

            {/* Kolom Kiri: Konten Halaman Dinamis (8 Kolom) */}
            <div className="w-full col-span-12 lg:col-span-8 flex flex-col text-left">

              {/* Isi Konten */}
              <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-text leading-relaxed">
                <RichTextContent content={data?.content || ''} />
              </div>
            </div>

            {/* Kolom Kanan: Sidebar Sticky (4 Kolom) */}
            <div className="lg:sticky lg:top-[120px] lg:self-start h-fit flex flex-col col-span-12 lg:col-span-4 gap-8 w-full mt-8 lg:mt-0">
              <ArtikelPopuler />
              <SliderCard slideToShow={1} />
            </div>

          </div>
        </div>
      </div>
    );
  } catch {
    if (validateAndRedirect(slug)) {
      const redirects: Record<string, string> = {
        tour: '/tour',
        article: '/article',
      };
      return redirect(redirects[slug[0]] || '/');
    }

    return (
      <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
        <Link href="/" className="mt-4 px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }
}