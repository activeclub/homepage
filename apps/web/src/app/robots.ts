import { BASE_URL } from "@/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/"],
    },
    sitemap: `${BASE_URL}/sitemap/_index.xml`,
  };
}
