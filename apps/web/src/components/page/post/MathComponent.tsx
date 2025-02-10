import katex from "katex";

export function MathComponent({ math }: { math: string }) {
  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(math, { displayMode: true }),
      }}
    />
  );
}
