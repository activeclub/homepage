import type { MetadataRoute } from "next";

import { BASE_URL } from "@/constants";
import { client } from "@/lib/sanity/client";
import { SITEMAP_POSTS_QUERY } from "@/lib/sanity/queries";
import { SITEMAP_POSTS_QUERYResult } from "@/lib/sanity/types";
import { isExternalPost } from "@/lib/utils";

export async function generateSitemaps() {
  return [{ id: "_index" }, { id: "static" }, { id: "post" }];
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  if (id === "_index") {
    return [
      {
        url: `${BASE_URL}/sitemaps/static.xml`,
      },
      {
        url: `${BASE_URL}/sitemaps/post.xml`,
      },
    ];
  } else if (id === "static") {
    return [
      {
        url: `${BASE_URL}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
      },
    ];
  } else if (id === "post") {
    const posts =
      await client.fetch<SITEMAP_POSTS_QUERYResult>(SITEMAP_POSTS_QUERY);

    return posts
      .filter((post) => !isExternalPost(post))
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug?.current}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "always",
      }));
  }

  return [];
}
