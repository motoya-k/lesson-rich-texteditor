import type { NextApiRequest, NextApiResponse } from "next";
import { PutBlobResult } from "@vercel/blob";
import { v4 as uuid } from "uuid";
// import { NextResponse } from "next/server";
import { gql } from "urql";

import { RequestFileUploadDocument } from "@/.generate/gql";
import { NextResponse } from "next/server";

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

type ResponseData = {
  message: string;
};

export default async function POST(req: Request) {
  const readableStream = req.body;
  console.log("req.headers", {
    file: req.headers.get("x-vercel-filename"),
    contentType: req.headers.get("content-type"),
  });
  const fileName = req.headers.get("x-vercel-filename") || "file.txt";
  const contentType = req.headers.get("content-type") ?? "text/plain";

  // getPresignedUrl
  const response = await fetch("http://localhost:4040/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers if needed
    },
    body: JSON.stringify({
      operationName: "RequestFileUpload",
      query: RequestFileUploadDocument.loc?.source.body,
      variables: {
        fileUpload: {
          fileName,
          filePath: fileName,
        },
      },
    }),
  });
  const resSignedUrl = await response.json();
  const uploadUrl = resSignedUrl.data.requestFileUpload.uploadUrl;

  // upload
  try {
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: readableStream,
      headers: {
        "Content-Type": contentType,
        "Content-Length": req.headers.get("content-length") ?? "",
      },
    });
    console.log("uploadRes", {
      ok: uploadRes.ok,
      status: uploadRes.status,
      errorMessage: uploadRes.statusText,
    });
  } catch (error) {
    console.log("upload error", { error });
    return NextResponse.error();
  }

  const blobResults: PutBlobResult = {
    url: `http://localhost:9000/demo-bucket/${fileName}`,
    pathname: fileName as string,
    contentType: contentType,
    contentDisposition: "",
  };

  console.log("blobResults", { blobResults });
  return NextResponse.json(blobResults);
}
