/** @jsxImportSource react */
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default async function Icon() {
  // For edge runtime, we'll create a simple branded icon
  // If you need the actual logo.png, consider using a static favicon.ico instead
  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#800000",
        fontWeight: "bold",
        borderRadius: "50%",
      }}
    >
      GS
    </div>,
    {
      ...size,
    },
  );
}
