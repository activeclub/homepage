import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/base/page-header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { POSTS_COUNT_QUERY, POSTS_QUERY } from "@/lib/sanity/queries";
import type {
  POSTS_COUNT_QUERYResult,
  POSTS_QUERYResult,
} from "@/lib/sanity/types";
import { formatDate, isExternalPost } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
};

const POSTS_PER_PAGE = 10;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Blog({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalCount] = await Promise.all([
    client.fetch<POSTS_QUERYResult>(POSTS_QUERY, { start, end }),
    client.fetch<POSTS_COUNT_QUERYResult>(POSTS_COUNT_QUERY),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div className="container max-w-4xl py-6 lg:py-10 mx-auto px-6 lg:px-10">
      <PageHeader
        title="Blog"
        description="アクティ部の活動記録や技術記事を発信していきます"
      />

      {posts.length ? (
        <>
          <div className="grid gap-10 sm:grid-cols-2">
            {posts.map((post) => (
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

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/blog?page=${currentPage - 1}`}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href={`/blog?page=${page}`}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return null;
                  },
                )}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/blog?page=${currentPage + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <p>No Blogs found</p>
      )}
    </div>
  );
}
