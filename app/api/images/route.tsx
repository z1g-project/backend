import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");
  const backgroundColor = searchParams.get("color");
  const size = searchParams.get("size");
  if (!imageUrl) {
    return new Response("No image URL provided", { status: 400 });
  }
  return new ImageResponse(
    (
      <div
        tw="h-full w-full flex items-center justify-center flex-col"
        style={{
          backgroundColor: backgroundColor === "white" ? "#e2e8f0" : "#020617",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...{
            width: size ?? 500,
            height: size ?? 500,
          }}
          alt=""
          tw="rounded-3xl"
          src={imageUrl}
        />
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    },
  );
}
export const runtime = "edge";
