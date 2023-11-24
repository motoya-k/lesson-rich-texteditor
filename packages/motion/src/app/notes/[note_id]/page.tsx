"use client";

import { gql } from "@urql/next";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { useGetDocumentQuery } from "@/.generate/gql";
import { Editor } from "novel";
import { useCallback, useState } from "react";
import { Editor as Editor$1 } from "@tiptap/core";

gql`
  query GetDocument($id: UUID!) {
    document(id: $id) {
      id
      title
      content
    }
  }
`;

type Props = {
  params: {
    note_id: string;
  };
};
export default function Page(props: Props) {
  const {
    params: { note_id },
  } = props;

  const [{ data }] = useGetDocumentQuery({
    variables: {
      id: note_id,
    },
  });
  const { title, content } = data?.document ?? {};
  const [localContent, setLocalContent] = useState<object>(content);

  const handleUpdate = useCallback(
    async (editor?: Editor$1) => {
      if (!editor) return;
      content.current = editor.getJSON();
    },
    [content]
  );

  return (
    <>
      <h2>Documents</h2>
      {localContent ? (
        <>
          <Editor
            completionApi="http://localhost:3000/api/completion"
            defaultValue={{
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [{ text: "あいうえおかき", type: "text" }],
                },
                {
                  type: "paragraph",
                  content: [{ text: "でおい女知恵", type: "text" }],
                },
                { type: "paragraph" },
                {
                  type: "paragraph",
                  content: [{ text: "デジおinstallで", type: "text" }],
                },
                {
                  type: "heading",
                  attrs: { level: 1 },
                  content: [{ text: "Heading1", type: "text" }],
                },
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ text: "Heading2", type: "text" }],
                },
                { type: "paragraph" },
                {
                  type: "paragraph",
                  content: [{ text: "deoijodieji", type: "text" }],
                },
                { type: "paragraph" },
                {
                  type: "heading",
                  attrs: { level: 3 },
                  content: [{ text: "Heading3", type: "text" }],
                },
                {
                  type: "paragraph",
                  content: [
                    { text: "bold", type: "text", marks: [{ type: "bold" }] },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    { text: "body", type: "text", marks: [{ type: "italic" }] },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "underline",
                      type: "text",
                      marks: [{ type: "underline" }],
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "code.snipet",
                      type: "text",
                      marks: [{ type: "code" }],
                    },
                  ],
                },
                { type: "paragraph", content: [{ text: "de", type: "text" }] },
                {
                  type: "codeBlock",
                  attrs: { language: "typescript" },
                  content: [
                    {
                      text: 'python code\ndef function(arg):\n    return "helllo world"\ndedede\n',
                      type: "text",
                    },
                  ],
                },
                { type: "paragraph" },
              ],
            }}
            // NOTE: default values https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/extensions/index.tsx
            extensions={[]}
            // NOTE: default values https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/props.ts
            // NOTE: Argument is typed as `Editor` and it's defined https://github.com/ueberdosis/tiptap/blob/2bea9d1513052a2fce1be69be93d6491f5b8b33d/packages/core/src/Editor.ts#L38
            onUpdate={handleUpdate}
            // NOTE: A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
            onDebouncedUpdate={handleUpdate}
            debounceDuration={500}
            storageKey="novel-editor-key-to-use-for-local-storage"
            disableLocalStorage={false}
          />
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
