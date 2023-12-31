import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Editor } from "novel";
// import {Editor} from "@/components/Editor"
import { gql } from "urql";
import Skeleton from "@mui/material/Skeleton";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";

import { useNote } from "./hooks/useNote";
import { useGetNoteTemplateQuery } from "@/.generate/gql";
import { Selection, NodeSelection, SelectionRange } from "prosemirror-state";
import MySlashCommand from '@/extensions/slash-command'

// class EmptySelection extends Selection {
//   constructor($anchor: any, $head: any, ranges: SelectionRange[] = []) {
//     super($anchor, $head, ranges);
//   }

//   eq(selection: Selection): boolean {
//     return selection instanceof EmptySelection;
//   }

//   map(doc: any, mapping: any): Selection {
//     return new EmptySelection(
//       doc.resolve(mapping.map(this.anchor)),
//       doc.resolve(mapping.map(this.head))
//     );
//   }

//   content(): any {
//     return null;
//   }

//   toJSON() {
//     return { type: "empty" };
//   }
// }

gql`
  query GetNote($noteId: UUID!) {
    note: document(id: $noteId) {
      id
      title
      content
      author {
        id
        name
      }
      created_at
      updated_at
    }
  }

  query GetNoteTemplate($noteTemplateId: UUID!) {
    noteTemplate: documentTemplate(id: $noteTemplateId) {
      title
      content
    }
  }

  mutation UpdateNote($document: UpdateDocumentInput!) {
    updateDocument(variables: $document) {
      id
    }
  }
`;

export default function NotesPage() {
  const router = useRouter();
  const { noteId, template } = router.query;

  const { content, title, setTitle, isLoading, handleSave, handleUpdate } =
    useNote({
      noteId: noteId as string,
      templateId: template as string,
    });

  return (
    <>
      <Head>
        <title>Document</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content ? (
        <>
          <Stack my={2} direction="row-reverse">
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              onClick={handleSave}
            >
              save
            </LoadingButton>
          </Stack>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            id="outlined-basic"
            label={title ? "" : "タイトルを入力"}
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Editor
            className="width-full"
            editorProps={{
              // editable: (state) => {
              //   if (state.selection instanceof Selection) {
              //     state.selection.ranges = state.selection.ranges.map(
              //       (range) => {
              //         return new SelectionRange(range.$from, range.$from);
              //       }
              //     );
              //   }
              //   return false;
              // },
            }}
            // completionApi="http://localhost:3000/api/completion"
            defaultValue={content}
            // NOTE: default values https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/extensions/index.tsx
            extensions={[
              // MySlashCommand,
            ]}
            // NOTE: default values https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/props.ts
            // NOTE: Argument is typed as `Editor` and it's defined https://github.com/ueberdosis/tiptap/blob/2bea9d1513052a2fce1be69be93d6491f5b8b33d/packages/core/src/Editor.ts#L38
            // onUpdate={handleUpdate}
            // NOTE: A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
            onDebouncedUpdate={handleUpdate}
            debounceDuration={1000}
            // storageKey={noteId as string}
            disableLocalStorage={true}
          />
          {/* <Editor
            defaultValue={JSON.stringify(content)}
            onUpdate={handleUpdate}
          /> */}
        </>
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={60} />
      )}
    </>
  );
}
