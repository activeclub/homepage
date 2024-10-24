import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import { POSTS_QUERYResult } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Blog() {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY);

  return (
    <div className="container max-w-4xl py-6 lg:py-10 mx-auto px-6 lg:px-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight text-primary lg:text-5xl">
            Blog
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            アクティ部の活動記録や技術記事を発信していきます
          </p>
        </div>
      </div>
      <hr className="my-8" />

      {posts.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug?.current!}
              className="group relative flex flex-col space-y-2"
            >
              <Image
                src={urlFor(post.mainImage?.asset!)?.url()!}
                alt={post.title!}
                width={804}
                height={452}
                className="border bg-muted transition-colors"
              />
              <h2 className="text-2xl font-extrabold text-primary">
                {post.title}
              </h2>
              {post.publishedAt && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </p>
              )}
              <Link
                href={`/blog/${post.slug?.current!}`}
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
