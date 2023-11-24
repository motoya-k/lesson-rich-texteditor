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
  JSON: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Document = {
  __typename?: 'Document';
  author: User;
  content: Scalars['JSON']['output'];
  id: Scalars['UUID']['output'];
  title: Scalars['String']['output'];
};

export type DocumentInput = {
  author_id: Scalars['UUID']['input'];
  content: Scalars['JSON']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDocument: Document;
};


export type MutationCreateDocumentArgs = {
  variables: InputMaybe<DocumentInput>;
};

export type Query = {
  __typename?: 'Query';
  document: Maybe<Document>;
  documents: Array<Document>;
  documentsByAuthorId: Array<Document>;
  ping: Scalars['String']['output'];
  user: Maybe<User>;
  users: Array<User>;
};


export type QueryDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryDocumentsByAuthorIdArgs = {
  author_id: Scalars['UUID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type GetDocumentQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetDocumentQuery = { __typename?: 'Query', document: { __typename?: 'Document', id: any, title: string, content: any } | null };

export type CreateDocumentMutationVariables = Exact<{
  variables: DocumentInput;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument: { __typename?: 'Document', id: any, title: string } };

export type GetDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentsQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'Document', id: any, title: string }> };


export const GetDocumentDocument = gql`
    query GetDocument($id: UUID!) {
  document(id: $id) {
    id
    title
    content
  }
}
    `;

export function useGetDocumentQuery(options: Omit<Urql.UseQueryArgs<GetDocumentQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDocumentQuery, GetDocumentQueryVariables>({ query: GetDocumentDocument, ...options });
};
export const CreateDocumentDocument = gql`
    mutation CreateDocument($variables: DocumentInput!) {
  createDocument(variables: $variables) {
    id
    title
  }
}
    `;

export function useCreateDocumentMutation() {
  return Urql.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument);
};
export const GetDocumentsDocument = gql`
    query GetDocuments {
  documents {
    id
    title
  }
}
    `;

export function useGetDocumentsQuery(options?: Omit<Urql.UseQueryArgs<GetDocumentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDocumentsQuery, GetDocumentsQueryVariables>({ query: GetDocumentsDocument, ...options });
};