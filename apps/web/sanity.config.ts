"use client";

import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { latexInput } from "sanity-plugin-latex-input";
import { muxInput } from "sanity-plugin-mux-input";

import { dataset, projectId } from "@/lib/sanity/env";
import { resolve } from "@/lib/sanity/presentation/resolve";
import { schemaTypes } from "@/lib/sanity/schema";

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
    codeInput(),
    latexInput(),
    muxInput(),
  ],
  schema: {
    types: schemaTypes,
  },
});
