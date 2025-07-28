import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    version: "vNext",
    name: "Claim Your Box",
    image: "https://superclaimreward.vercel.app/zora.png", // pastikan logo tersedia
    buttons: [
      {
        label: "Claim Now",
        action: "post",
      },
    ],
    post_url: "https://superclaimreward.vercel.app/api/claim", // endpoint klaim reward kamu
  });
}
