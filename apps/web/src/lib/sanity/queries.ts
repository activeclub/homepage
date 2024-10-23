import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  slug,
  mainImage{
    asset->{url}
  },
  publishedAt
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  mainImage{
    asset->{url}
  },
  body,
  publishedAt,
  author->{
    slug,
    name,
    image{
      asset->{url}
    }
  }
}`);
