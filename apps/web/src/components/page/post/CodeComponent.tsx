"use client";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, useLayoutEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki";

async function highlight(code: string, language: string) {
  const out = await codeToHast(code, {
    lang: language,
    theme: "github-dark",
  });

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return toJsxRuntime(out as any, {
    Fragment,
    jsx,
    jsxs,
  });
}

export function CodeComponent({
  code,
  language,
}: { code: string; language: string }) {
  const [nodes, setNodes] = useState<JSX.Element>();

  useLayoutEffect(() => {
    void highlight(code, language).then(setNodes);
  }, [code, language]);

  return nodes ?? <p>Loading...</p>;
}
