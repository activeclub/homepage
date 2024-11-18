import { PortableText } from "@portabletext/react";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QueryParams } from "next-sanity";

import { buttonVariants } from "@/components/ui/button";
import { client, sanityFetch } from "@/lib/sanity/client";
import { getImageDimensions, urlFor } from "@/lib/sanity/image";
import { POST_QUERY, POSTS_QUERY } from "@/lib/sanity/queries";
import { POST_QUERYResult, POSTS_QUERYResult } from "@/lib/sanity/types";
import { cn, formatDate, isExternalPost } from "@/lib/utils";
import { YouTubePlayer } from "@/components/page/post";

type Props = {
  params: Promise<QueryParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params: await params,
  });

  return {
    title: post?.title,
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_QUERYResult>(
    POSTS_QUERY,
    {},
    { perspective: "published" }
  );

  return posts
    .filter((post) => !isExternalPost(post))
    .map((post) => ({
      slug: post?.slug?.current,
    }));
}

export default async function BlogContent({ params }: Props) {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params: await params,
  });

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto px-6 lg:px-10">
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

        <div className="mt-4 flex space-x-4">
          {post?.author?.image?.asset && (
            <Image
              src={urlFor(post.author.image?.asset!)?.url()!}
              alt={post.author.name ?? ""}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
          )}
          <div className="flex-1 text-left leading-tight">
            {post?.author?.name && (
              <p className="font-medium">{post.author.name}</p>
            )}
            {post?.author?.slug?.current && (
              <p className="text-[12px] text-muted-foreground">
                @{post.author.slug?.current}
              </p>
            )}
          </div>
        </div>

        {post?.mainImage?.asset && (
          <Image
            src={urlFor(post.mainImage.asset)?.url()!}
            alt={post?.title ?? ""}
            width={720}
            height={405}
            priority
            className="my-8 border bg-muted transition-colors"
          />
        )}
        {post?.body && (
          <div className="prose-base lg:prose-lg">
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ImageComponent,
                  youtube: YouTubeComponent,
                },
                marks: {
                  link: LinkComponent,
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal">{children}</ol>
                  ),
                },
                block: {
                  blockquote: ({ children }) => (
                    <blockquote className="border-s-4 border-gray-300 dark:border-gray-500">
                      <p>{children}</p>
                    </blockquote>
                  ),
                },
              }}
            />
          </div>
        )}
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

function ImageComponent({ value }: any) {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={urlFor(value).url()}
      alt={value.altText || " "}
      loading="lazy"
      width={width}
      height={height}
    />
  );
}

function LinkComponent({ value, children }: any) {
  const isExternal = value?.href?.startsWith("http");
  return (
    <Link
      href={value?.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noindex nofollow" : undefined}
      className={cn({ underline: isExternal })}
    >
      {children}
    </Link>
  );
}

function YouTubeComponent({ value }: any) {
  const { url } = value;
  return (
    <div className="relative pt-[56.25%]">
      <YouTubePlayer
        url={url}
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
      />
    </div>
  );
}
