"use client";

import { gql, useQuery } from "@urql/next";
import Link from "next/link";
import { useMemo } from "react";

import { useGetDocumentsQuery } from "@/.generate/gql";

gql`
  query GetDocuments {
    documents {
      id
      title
    }
  }
`;

export default function Page() {
  const [{ data }] = useGetDocumentsQuery();
  // const notes = useMemo(() => data?.documents ?? [], [data]);
  return (
    <>
      <h2>Documents</h2>
      {/* <ul>
        {notes.map((note) => (
          <li key={note.id} className="flex">
            <div>{note.title}</div>
            <Link href={`/notes/${note.id}`}>see</Link>
          </li>
        ))}
      </ul> */}
    </>
  );
}
