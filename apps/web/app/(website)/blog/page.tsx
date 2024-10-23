import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import { POSTS_QUERYResult } from "@/lib/sanity/types";

export default async function Blog() {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY);

  return (
    <div className="container max-w-4xl py-6 lg:py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold leading-3 tracking-tight text-primary lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A blog using velite. Posts are written in MDX
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
                src={post.mainImage?.asset?._ref!}
                alt={post.title!}
                width={804}
                height={452}
                className="border bg-muted transition-colors"
              />
              <h2 className="text-2xl font-extrabold text-primary">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
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
