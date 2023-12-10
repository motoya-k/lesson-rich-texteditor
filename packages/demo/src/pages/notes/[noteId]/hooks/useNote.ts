import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAsync } from "react-use";
import { Editor as Editor$1 } from "@tiptap/core";

import {
  useGetNoteQuery,
  useGetNoteTemplateQuery,
  useUpdateNoteMutation,
} from "@/.generate/gql";

export const useNote = ({
  noteId,
  templateId,
}: {
  noteId: string;
  templateId?: string;
}) => {
  const [content, setContent] = useState<JSON | null>(null);
  const [title, setTitle] = useState<string>("");
  const [, updateNote] = useUpdateNoteMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [{ data: noteData }] = useGetNoteQuery({
    requestPolicy: "network-only",
    variables: {
      noteId: noteId as string,
    },
    pause: !noteId,
  });
  useEffect(() => {
    if (!noteData) return;
    setContent(() => noteData.note?.content ?? null);
    setTitle(() => noteData.note?.title ?? "");
  }, [noteData]);

  const [{ data: noteTemplateData }] = useGetNoteTemplateQuery({
    variables: {
      noteTemplateId: templateId as string,
    },
    pause: !templateId,
  });
  useAsync(async () => {
    if (!noteTemplateData?.noteTemplate) return;
    setContent(() => noteTemplateData.noteTemplate?.content ?? JSON.parse("{}"));
    setTitle(() => noteTemplateData.noteTemplate?.title ?? "");
    await updateNote({
      document: {
        id: noteId as string,
        title: noteTemplateData.noteTemplate.title,
        content: noteTemplateData.noteTemplate.content,
      },
    });
    await router.push(`/notes/${noteId}`);
  }, [noteTemplateData]);

  const handleUpdate = useCallback(
    async (editor?: Editor$1) => {
      console.log('handleUpdate')
      setIsLoading(true);
      if (!editor) return;
      const _content = editor.getJSON();
      setContent(_content as JSON);
      await updateNote({
        document: {
          id: noteId as string,
          title,
          content: _content as JSON,
        },
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    },
    [noteId, title, updateNote]
  );

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    await updateNote({
      document: {
        id: noteId as string,
        title,
        content: content ?? JSON.parse("{}"),
      },
    });
    setTimeout(() => {
      setIsLoading(false);
      router.push('/notes')
    }, 1000);
  }, [content, noteId, router, title, updateNote]);

  return {
    content,
    setContent,
    title,
    setTitle,
    handleUpdate,
    handleSave,
    isLoading,
  };
};
