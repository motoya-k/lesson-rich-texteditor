"use client";

import {useState} from 'react'
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

export default function Home() {
  const [content, setContent] = useState<string | null>(null);
  const editor: BlockNoteEditor = useBlockNote({
    onEditorContentChange: (editor) => {
      console.log(editor._tiptapEditor.getJSON());
    }
  });

  return (
    <main>
      <div>
        <BlockNoteView editor={editor} />
      </div>
    </main>
  );
}
