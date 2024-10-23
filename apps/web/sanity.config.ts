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
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
