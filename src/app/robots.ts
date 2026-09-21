import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/get-runtime-env";

const domainUrl = getEnv("NEXT_PUBLIC_DOMAIN_URL");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ['/*?*'],
    },
    sitemap: `${domainUrl}/sitemap.xml`,
  }
}