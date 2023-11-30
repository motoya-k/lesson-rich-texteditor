import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  console.log('req', {req})

  const file = req.body || "";
  const filename = req.headers.get("x-vercel-filename") || "file.txt";
  const contentType = req.headers.get("content-type") || "text/plain";
  const fileType = `.${contentType.split("/")[1]}`;

  // upload file to S3 or other storage mechanism

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? filename
    : `${filename}${fileType}`;
  console.log({ finalName });

  return NextResponse.json({});
}
