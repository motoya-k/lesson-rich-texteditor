import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: JSON; output: JSON; }
  UUID: { input: string; output: string; }
};

export type Document = {
  __typename?: 'Document';
  author: User;
  content: Scalars['JSON']['output'];
  created_at: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
};

export type DocumentInput = {
  author_id: Scalars['UUID']['input'];
  content: Scalars['JSON']['input'];
  title: Scalars['String']['input'];
};

export type DocumentTemplate = {
  __typename?: 'DocumentTemplate';
  content: Scalars['JSON']['output'];
  created_at: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
};

export type FileUpload = {
  __typename?: 'FileUpload';
  contentType: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDocument: Document;
  requestFileUpload: FileUpload;
  updateDocument: Document;
};


export type MutationCreateDocumentArgs = {
  variables: InputMaybe<DocumentInput>;
};


export type MutationRequestFileUploadArgs = {
  variables: InputMaybe<RequestFileUploadInput>;
};


export type MutationUpdateDocumentArgs = {
  variables: InputMaybe<UpdateDocumentInput>;
};

export type Query = {
  __typename?: 'Query';
  document: Maybe<Document>;
  documentTemplate: Maybe<DocumentTemplate>;
  documentTemplates: Array<DocumentTemplate>;
  documents: Array<Document>;
  documentsByAuthorId: Array<Document>;
  ping: Scalars['String']['output'];
  user: Maybe<User>;
  users: Array<User>;
};


export type QueryDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryDocumentTemplateArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryDocumentsByAuthorIdArgs = {
  author_id: Scalars['UUID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};

export type RequestFileUploadInput = {
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
};

export type UpdateDocumentInput = {
  content: Scalars['JSON']['input'];
  id: Scalars['UUID']['input'];
  title: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string } | null };

export type RequestFileUploadMutationVariables = Exact<{
  fileUpload: RequestFileUploadInput;
}>;


export type RequestFileUploadMutation = { __typename?: 'Mutation', requestFileUpload: { __typename?: 'FileUpload', fileName: string, filePath: string, contentType: string, uploadUrl: string } };

export type GetNoteQueryVariables = Exact<{
  noteId: Scalars['UUID']['input'];
}>;


export type GetNoteQuery = { __typename?: 'Query', note: { __typename?: 'Document', id: string, title: string, content: JSON, created_at: string, updated_at: string, author: { __typename?: 'User', id: string, name: string } } | null };

export type GetNoteTemplateQueryVariables = Exact<{
  noteTemplateId: Scalars['UUID']['input'];
}>;


export type GetNoteTemplateQuery = { __typename?: 'Query', noteTemplate: { __typename?: 'DocumentTemplate', title: string, content: JSON } | null };

export type UpdateNoteMutationVariables = Exact<{
  document: UpdateDocumentInput;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateDocument: { __typename?: 'Document', id: string } };

export type NoteTemplateFieldFragment = { __typename?: 'DocumentTemplate', id: string, title: string };

export type GetNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Document', id: string, title: string, created_at: string, updated_at: string, author: { __typename?: 'User', id: string, name: string } }>, noteTemplates: Array<{ __typename?: 'DocumentTemplate', id: string, title: string }> };

export type CreateNoteMutationVariables = Exact<{
  document: DocumentInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createDocument: { __typename?: 'Document', id: string } };

export const NoteTemplateFieldFragmentDoc = gql`
    fragment NoteTemplateField on DocumentTemplate {
  id
  title
}
    `;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  user(id: "0b7c3fe4-9042-4338-86ab-e977d2a83719") {
    id
    name
  }
}
    `;

export function useGetCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>({ query: GetCurrentUserDocument, ...options });
};
export const RequestFileUploadDocument = gql`
    mutation RequestFileUpload($fileUpload: RequestFileUploadInput!) {
  requestFileUpload(variables: $fileUpload) {
    fileName
    filePath
    contentType
    uploadUrl
  }
}
    `;

export function useRequestFileUploadMutation() {
  return Urql.useMutation<RequestFileUploadMutation, RequestFileUploadMutationVariables>(RequestFileUploadDocument);
};
export const GetNoteDocument = gql`
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
    `;

export function useGetNoteQuery(options: Omit<Urql.UseQueryArgs<GetNoteQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNoteQuery, GetNoteQueryVariables>({ query: GetNoteDocument, ...options });
};
export const GetNoteTemplateDocument = gql`
    query GetNoteTemplate($noteTemplateId: UUID!) {
  noteTemplate: documentTemplate(id: $noteTemplateId) {
    title
    content
  }
}
    `;

export function useGetNoteTemplateQuery(options: Omit<Urql.UseQueryArgs<GetNoteTemplateQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNoteTemplateQuery, GetNoteTemplateQueryVariables>({ query: GetNoteTemplateDocument, ...options });
};
export const UpdateNoteDocument = gql`
    mutation UpdateNote($document: UpdateDocumentInput!) {
  updateDocument(variables: $document) {
    id
  }
}
    `;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const GetNotesDocument = gql`
    query GetNotes {
  notes: documents {
    id
    title
    author {
      id
      name
    }
    created_at
    updated_at
  }
  noteTemplates: documentTemplates {
    ...NoteTemplateField
  }
}
    ${NoteTemplateFieldFragmentDoc}`;

export function useGetNotesQuery(options?: Omit<Urql.UseQueryArgs<GetNotesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNotesQuery, GetNotesQueryVariables>({ query: GetNotesDocument, ...options });
};
export const CreateNoteDocument = gql`
    mutation CreateNote($document: DocumentInput!) {
  createDocument(variables: $document) {
    id
  }
}
    `;

export function useCreateNoteMutation() {
  return Urql.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument);
};