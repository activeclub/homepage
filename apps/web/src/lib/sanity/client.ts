import { type QueryOptions, type QueryParams, createClient } from "next-sanity";
import { draftMode } from "next/headers";

import { apiVersion, dataset, projectId, token } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  resultSourceMap: "withKeyArraySelector",
  stega: {
    enabled: true,
    studioUrl: `${process.env.NEXT_PUBLIC_TEST_BASE_PATH || ""}/studio#`,
    // logger: console,
  },
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode && !token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  const queryOptions: QueryOptions = {};
  let maybeRevalidate = revalidate;

  if (isDraftMode) {
    queryOptions.token = token;
    queryOptions.perspective = "previewDrafts";
    queryOptions.stega = true;

    maybeRevalidate = 0; // Do not cache in Draft Mode
  } else if (tags.length) {
    maybeRevalidate = false; // Cache indefinitely if tags supplied
  }

  return client.fetch<QueryResponse>(query, params, {
    ...queryOptions,
    next: {
      revalidate: maybeRevalidate,
      tags,
    },
  });
}
