import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "http";
import { prisma } from "./client/prisma";
import { GraphQLJSON, GraphQLUUID } from "graphql-scalars";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const PORT = 4040;

const typeDefs = /* GraphQL */ `
  scalar JSON
  scalar UUID

  type Query {
    ping: String!
    users: [User!]!
    user(id: UUID!): User
    documents: [Document!]!
    document(id: UUID!): Document
    documentsByAuthorId(author_id: UUID!): [Document!]!
    documentTemplates: [DocumentTemplate!]!
    documentTemplate(id: UUID!): DocumentTemplate
  }
  input DocumentInput {
    title: String!
    content: JSON!
    author_id: UUID!
  }
  input UpdateDocumentInput {
    id: UUID!
    title: String!
    content: JSON!
  }
  input RequestFileUploadInput {
    fileName: String!
    filePath: String!
  }
  type Mutation {
    createDocument(variables: DocumentInput): Document!
    updateDocument(variables: UpdateDocumentInput): Document!
    requestFileUpload(variables: RequestFileUploadInput): FileUpload!
  }
  type User {
    id: UUID!
    name: String!
    email: String!
  }
  type Document {
    id: UUID!
    title: String!
    author: User!
    content: JSON!
    created_at: String!
    updated_at: String!
  }
  type DocumentTemplate {
    id: UUID!
    title: String!
    content: JSON!
    created_at: String!
    updated_at: String!
  }
  type FileUpload {
    # id: UUID!
    fileName: String!
    filePath: String!
    contentType: String!
    uploadUrl: String!
  }
`;

function main() {
  const schema = createSchema({
    typeDefs,
    resolvers: {
      Query: {
        async ping() {
          return "pong";
        },
        async users() {
          return prisma.user.findMany();
        },
        async user(_, { id }) {
          return prisma.user.findUnique({ where: { id } });
        },
        async documents() {
          return prisma.document.findMany();
        },
        async documentsByAuthorId(_, { author_id }) {
          return prisma.document.findMany({ where: { author_id } });
        },
        async document(_, { id }) {
          return prisma.document.findUnique({ where: { id } });
        },
        async documentTemplates() {
          return prisma.documentTemplate.findMany();
        },
        async documentTemplate(_, { id }) {
          return prisma.documentTemplate.findUnique({ where: { id } });
        },
      },
      Mutation: {
        async createDocument(_, { variables }) {
          return await prisma.document.create({ data: variables });
        },
        async updateDocument(_, { variables }) {
          return await prisma.document.update({
            where: { id: variables.id },
            data: variables,
          });
        },
        async requestFileUpload(_, { variables }) {
          console.info("requestFileUpload start", { variables });
          const bucket = "demo-bucket";
          const s3Client = new S3Client({
            region: "us-east-1",
            endpoint: "http://127.0.0.1:9000",
            credentials: {
              accessKeyId: "minio",
              secretAccessKey: "minio123",
            },
          });
          // Get signed URL for the file upload from the S3 client
          const contentType = "image/jpeg";
          const filePath = `${variables.filePath}`;
          const command = new PutObjectCommand({
            Bucket: bucket,
            Key: filePath,
            ContentType: contentType,
          });
          const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
          return {
            fileName: variables.fileName,
            filePath,
            contentType,
            uploadUrl: signedUrl,
          };
        },
      },
      Document: {
        async author({ author_id }) {
          return prisma.user.findUnique({ where: { id: author_id } });
        },
      },
      JSON: GraphQLJSON,
      UUID: GraphQLUUID,
    },
  });
  const yoga = createYoga({ schema });
  const server = createServer(yoga);

  server.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

main();
