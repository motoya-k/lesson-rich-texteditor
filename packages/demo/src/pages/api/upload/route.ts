import { NextResponse } from "next/server";
import { gql } from "urql";

import { useRequestFileUploadMutation } from "@/.generate/gql";

export const runtime = "edge"; // TODO: 必要か後で検証

gql`
  mutation RequestFileUpload($fileUpload: RequestFileUploadInput!) {
    requestFileUpload(variables: $fileUpload) {
      fileName
      filePath
      contentType
      uploadUrl
    }
  }
`;

export async function POST(req: Request) {
  const file = req.body || "";
  const filename = req.headers.get("x-vercel-filename") || "file.txt";
  const contentType = req.headers.get("content-type") || "text/plain";
  const fileType = `.${contentType.split("/")[1]}`;

  console.log("file", { file, filename, contentType, fileType });

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? filename
    : `${filename}${fileType}`;

  // getPresignedUrl
  const [_, requestFileUpload] = useRequestFileUploadMutation();
  const { data, error } = await requestFileUpload({
    fileUpload: {
      fileName: finalName,
      filePath: "uploads",
    },
  });
  if (error || !data) {
    console.error(error);
    return NextResponse.error();
  }

  // upload
  const uploadUrl = data.requestFileUpload.uploadUrl;
  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": contentType,
    },
  });
  console.log("upload", { res });

  if (!res.ok) {
    return NextResponse.error();
  }

  return NextResponse.json(res);
}
