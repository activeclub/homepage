import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post, Slug } from "./sanity/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function isExternalPost(post: { slug: Slug | null }) {
  return post.slug?.current?.startsWith("link:");
}
