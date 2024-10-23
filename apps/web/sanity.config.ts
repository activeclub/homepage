"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "@/lib/sanity/schema";
import { dataset, projectId } from "@/lib/sanity/env";
import { resolve } from "@/lib/sanity/presentation/resolve";

export default defineConfig({
  name: "default",
  title: "Blog",
  projectId: projectId || "",
  dataset: dataset || "",
  plugins: [
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
        praviewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
