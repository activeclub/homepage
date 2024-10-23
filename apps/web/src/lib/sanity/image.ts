import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export function urlFor(source: Image) {
  return builder.image(source);
}
