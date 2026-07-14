"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    window.gtag?.("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
