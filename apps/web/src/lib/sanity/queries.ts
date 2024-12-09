import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  slug,
  mainImage,
  publishedAt
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  author->{
    slug,
    name,
    image
  },
  categories[]->{
    title
  }
}`);

export const SITEMAP_POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{
  _updatedAt,
  slug
}`);
