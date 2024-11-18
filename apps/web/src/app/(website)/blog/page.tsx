import { formatDate, isExternalPost } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import { POSTS_QUERYResult } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { Metadata } from "next";
import { PageHeader } from "@/components/base/page-header";

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
          {posts.map((post) => (
            <article
              key={post.slug?.current!}
              className="group relative flex flex-col space-y-2"
            >
              {/* TODO: デフォルトのヘッダー画像を用意する */}
              {post.mainImage?.asset && (
                <Image
                  src={urlFor(post.mainImage?.asset!)?.url()!}
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
                    ? post.slug?.current?.slice(5)!
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
