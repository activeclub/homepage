import { buttonVariants } from "@/components/ui/button";
import { client } from "@/lib/sanity/client";
import { POST_QUERY } from "@/lib/sanity/queries";
import { POST_QUERYResult } from "@/lib/sanity/types";
import { cn, formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default async function BlogContent({ params }: { params: Params }) {
  const post = await client.fetch<POST_QUERYResult>(POST_QUERY, {
    slug: (await params).slug,
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
              src={post.author.image?.asset?.url ?? ""}
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
            src={post.mainImage.asset?._ref!}
            alt={post?.title ?? ""}
            width={720}
            height={405}
            priority
            className="my-8 border bg-muted transition-colors"
          />
        )}
        {/* <Mdx code={blog.body} /> */}
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
