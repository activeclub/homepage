import { PortableText } from "@portabletext/react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { QueryParams } from "next-sanity";

import { buttonVariants } from "@/components/ui/button";
import { client, sanityFetch } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { POST_QUERY, POSTS_QUERY } from "@/lib/sanity/queries";
import { POST_QUERYResult, POSTS_QUERYResult } from "@/lib/sanity/types";
import { cn, formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_QUERYResult>(
    POSTS_QUERY,
    {},
    { perspective: "published" }
  );

  return posts.map((post) => ({
    slug: post?.slug?.current,
  }));
}

export default async function BlogContent({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params: await params,
  });

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto">
      <div>
        {post?.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.publishedAt)}
          </time>
        )}

        <h1 className="mt-2 inline-block text-4xl font-bold capitalize leading-tight text-primary lg:text-5xl">
          {post?.title}
        </h1>

        {post?.author && (
          <div className="mt-4 flex space-x-4">
            <Image
              src={urlFor(post.author.image?.asset!)?.url()!}
              alt={post.author.name!}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{post.author.name}</p>
              <p className="text-[12px] text-muted-foreground">
                @{post.author.slug?.current}
              </p>
            </div>
          </div>
        )}

        {post?.mainImage && (
          <Image
            src={urlFor(post.mainImage.asset!)?.url()!}
            alt={post?.title ?? ""}
            width={720}
            height={405}
            priority
            className="my-8 border bg-muted transition-colors"
          />
        )}
        {post?.body && <PortableText value={post.body} />}
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ChevronLeft className="mr-2 size-4" />
            See all Blogs
          </Link>
        </div>
      </div>
    </article>
  );
}
