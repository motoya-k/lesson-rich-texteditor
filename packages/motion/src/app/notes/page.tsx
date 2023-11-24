"use client";

import { gql } from "@urql/next";
import Link from 'next/link'

import { useRouter } from "next/navigation";

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
  const notes = data?.documents ?? [];
  const router = useRouter();
  return (
    <>
      <h2>Documents</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="flex">
            <div>{note.title}</div>
            <Link href={`/notes/${note.id}`}>see</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
