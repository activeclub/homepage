import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Active Club";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        height: "100%",
        width: "100%",
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: ... */}
      <img src={logoSrc} height={140} alt="" />
    </div>,
    {
      ...size,
    },
  );
}
