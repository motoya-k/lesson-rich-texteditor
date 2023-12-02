"use client";

import { Editor } from "novel";
import { useEffect, useState } from "react";

import { Editor as Editor$1 } from "@tiptap/core";
// onUpdate?: (editor?: Editor$1) => void | Promise<void>;

export default function Home() {
  const [content, setContent] = useState<string | null>(null);
  const onUpdateDebugger = (value?: Editor$1) => {
    console.log("onUpdate");
    console.log({ state: value?.state.toJSON() });

    if (value) setContent(JSON.stringify(value?.state.toJSON(), null, 2));
  };


  return (
    <main>
      <div className="flex justify-center">
        <Editor
          editorProps={{
            editable: () => false,
          }}
          completionApi="http://localhost:3000/api/completion"
          defaultValue="Once upon a time, there was a"
          // NOTE: default values https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/extensions/index.tsx
          extensions={[]}
          // NOTE: default values https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/props.ts
          // NOTE: Argument is typed as `Editor` and it's defined https://github.com/ueberdosis/tiptap/blob/2bea9d1513052a2fce1be69be93d6491f5b8b33d/packages/core/src/Editor.ts#L38
          onUpdate={onUpdateDebugger}
          // NOTE: A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
          onDebouncedUpdate={onUpdateDebugger}
          debounceDuration={500}
          storageKey="novel-editor-key-to-use-for-local-storage"
          disableLocalStorage={false}
        />
      </div>
      <div>
        {content && (
          <>
            <div>state</div>
            <pre>{content}</pre>
          </>
        )}
      </div>
    </main>
  );
}
