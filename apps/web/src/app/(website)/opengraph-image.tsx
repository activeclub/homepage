import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Active Club";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoSrc = await fetch(
    new URL("../../../public/images/logo.png", import.meta.url),
  ).then((res) => res.arrayBuffer());

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
      <img src={logoSrc as never as string} height="140" alt="" />
    </div>,
    {
      ...size,
    },
  );
}
