"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./lib/sanity/schema";
import { dataset, projectId } from "./lib/sanity/env";

export default defineConfig({
  name: "default",
  title: "Blog",
  projectId: projectId || "",
  dataset: dataset || "",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
