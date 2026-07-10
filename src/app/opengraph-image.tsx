import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "88px",
        background: "#0c0c0c",
        color: "#f4f4f5",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          fontWeight: 600,
          color: "#60a5fa",
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        {site.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 104,
          fontWeight: 700,
          marginTop: 28,
        }}
      >
        {site.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 34,
          color: "#a1a1aa",
          marginTop: 28,
          maxWidth: 920,
        }}
      >
        {site.tagline}
      </div>
    </div>,
    { ...size },
  );
}
