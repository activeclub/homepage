import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/blog/:slug",
      filter: `_type == "post" && slug.current == $slug`,
    },
  ]),
  locations: {
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        body: "body",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/blog/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
};
