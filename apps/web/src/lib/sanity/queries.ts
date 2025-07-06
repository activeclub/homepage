import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end]{
  _id,
  title,
  slug,
  mainImage,
  publishedAt
}`);

export const POSTS_COUNT_QUERY = defineQuery(
  `count(*[_type == "post" && defined(slug.current)])`,
);

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

export const ALL_POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  publishedAt
}`);
