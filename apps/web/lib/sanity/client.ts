import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

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
