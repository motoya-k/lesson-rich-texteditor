import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {

  const file = req.body || "";
  const filename = req.headers.get("x-vercel-filename") || "file.txt";
  const contentType = req.headers.get("content-type") || "text/plain";
  const fileType = `.${contentType.split("/")[1]}`;

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? filename
    : `${filename}${fileType}`;
  console.log({ finalName });

  return NextResponse.json({});
}
