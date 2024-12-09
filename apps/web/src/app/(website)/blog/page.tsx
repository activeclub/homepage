import { PageHeader } from "@/components/base/page-header";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import type { POSTS_QUERYResult } from "@/lib/sanity/types";
import { formatDate, isExternalPost } from "@/lib/utils";
import { dayjs } from "@/lib/dayjs";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Blog() {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY);

  return (
    <div className="container max-w-4xl py-6 lg:py-10 mx-auto px-6 lg:px-10">
      <PageHeader
        title="Blog"
        description="アクティ部の活動記録や技術記事を発信していきます"
      />

      {posts.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts
            .sort((a, b) =>
              dayjs(a.publishedAt).isAfter(dayjs(b.publishedAt)) ? -1 : 1
            )
            .map((post) => (
              <article
                key={post.slug?.current ?? ""}
                className="group relative flex flex-col space-y-2"
              >
                {post.mainImage?.asset && (
                  <Image
                    src={urlFor(post.mainImage?.asset)?.url() ?? ""}
                    alt={post.title ?? ""}
                    width={804}
                    height={452}
                    className="border bg-muted transition-colors"
                  />
                )}
                <h2 className="text-2xl font-extrabold text-primary">
                  {post.title}
                </h2>
                {post.publishedAt && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
                <Link
                  href={
                    isExternalPost(post)
                      ? (post.slug?.current?.slice(5) ?? "/")
                      : `/blog/${post.slug?.current}`
                  }
                  target={isExternalPost(post) ? "_blank" : undefined}
                  rel={isExternalPost(post) ? "noopener noreferrer" : undefined}
                  className="absolute inset-0"
                >
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
        </div>
      ) : (
        <p>No Blogs found</p>
      )}
    </div>
  );
}
