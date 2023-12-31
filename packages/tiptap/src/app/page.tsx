"use client";

import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
// NOTE: starter kit: https://github.com/ueberdosis/tiptap/blob/develop/packages/starter-kit/src/starter-kit.ts
import StarterKit from "@tiptap/starter-kit";

export default function Home() {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: "<p>Hello World! 🌎️</p>",
  });
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {editor && (
          <BubbleMenu
            className="bubble-menu"
            tippyOptions={{ duration: 100 }}
            editor={editor}
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </button>
          </BubbleMenu>
        )}

        {editor && (
          <FloatingMenu
            className="floating-menu"
            tippyOptions={{ duration: 100 }}
            editor={editor}
          >
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              Bullet List
            </button>
          </FloatingMenu>
        )}

        <EditorContent editor={editor} />
      </div>
    </main>
  );
}
