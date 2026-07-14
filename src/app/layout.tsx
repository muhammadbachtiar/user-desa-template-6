import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import RootLayoutClient from "./rootLayout";
import SettingService from "@/shared/services/setting.service";
import HolyLoader from "holy-loader";
import Script from "next/script";

export const metadata = await generateMetadata(); 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
  try {
    const villageId = process.env.NEXT_PUBLIC_VILLAGE_ID;
    const response = await SettingService.getSetting(`google-analytics-id-${villageId}`);
    if (response?.data?.value?.id) {
      gaId = response.data.value.id;
    }
  } catch (error) {
    console.error("Failed to fetch GA ID in RootLayout:", error);
  }

  return (
    <html lang="en">
      <HolyLoader/>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootLayoutClient gaId={gaId}>{children}</RootLayoutClient>
         <Script
            src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
            strategy="afterInteractive"
          />
      </body>
    </html>
  );
}
async function generateMetadata()  {
  try {
    const logoResponse = await SettingService.getSetting (`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    const heroResponse = await SettingService.getSetting (`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    return {
      title: logoResponse?.data?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim",
      description: heroResponse?.data?.value?.title + heroResponse?.data?.value?.description || "Pemerintah Kabupaten Muara Enim",
      icons: {
        icon: [
          new URL(logoResponse?.data?.value?.imageUrl)
        ]
      },
    }
  } catch {
     return {
      title: process.env.NEXT_PUBLIC_VILLAGE_NAME || "Pemerintah Kabupaten Muara Enim",
      description: "Pemerintah Kabupaten Muara Enim",
    }
  }
}
