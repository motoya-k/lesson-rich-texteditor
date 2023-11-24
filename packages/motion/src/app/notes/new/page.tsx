"use client";

import { gql } from "@urql/next";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Editor as Editor$1 } from "@tiptap/core";

import { useCreateDocumentMutation } from "@/.generate/gql";
import { Editor } from "novel";
import { useCurrentUser } from "@/context/currentUser";

gql`
  mutation CreateDocument($variables: DocumentInput!) {
    createDocument(variables: $variables) {
      id
      title
    }
  }
`;

export default function Page() {
  const [_, createDocument] = useCreateDocumentMutation();
  const content = useRef<object>({});
  const [title, setTitle] = useState<string>("");
  const currentUser = useCurrentUser();
  const router = useRouter();

  const handleSave = useCallback(async () => {
    if (!currentUser) return;
    const { data } = await createDocument({
      variables: {
        title,
        content: content.current,
        author_id: currentUser.id,
      },
    });
    console.log("data", { data });
    router.push(`/notes`);
  }, [currentUser, createDocument, title, router]);

  const handleUpdate = useCallback(
    async (editor?: Editor$1) => {
      if (!editor) return;
      content.current = editor.getJSON();
    },
    [content]
  );

  return (
    <>
      <button onClick={handleSave}>保存</button>
      <div className="mt-2 mb-2">
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Editor
        completionApi="http://localhost:3000/api/completion"
        defaultValue={content.current}
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
  );
}
