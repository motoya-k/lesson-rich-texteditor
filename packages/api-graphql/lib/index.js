"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const http_1 = require("http");
const prisma_1 = require("./client/prisma");
const graphql_scalars_1 = require("graphql-scalars");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
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
  input UpdateFileUploadInput {
    fileName: String!
    filePath: String!
  }
  type Mutation {
    createDocument(variables: DocumentInput): Document!
    updateDocument(variables: UpdateDocumentInput): Document!
    requestFileUpload(variables: UpdateFileUploadInput): FileUpload!
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
    const schema = (0, graphql_yoga_1.createSchema)({
        typeDefs,
        resolvers: {
            Query: {
                async ping() {
                    return "pong";
                },
                async users() {
                    return prisma_1.prisma.user.findMany();
                },
                async user(_, { id }) {
                    return prisma_1.prisma.user.findUnique({ where: { id } });
                },
                async documents() {
                    return prisma_1.prisma.document.findMany();
                },
                async documentsByAuthorId(_, { author_id }) {
                    return prisma_1.prisma.document.findMany({ where: { author_id } });
                },
                async document(_, { id }) {
                    return prisma_1.prisma.document.findUnique({ where: { id } });
                },
                async documentTemplates() {
                    return prisma_1.prisma.documentTemplate.findMany();
                },
                async documentTemplate(_, { id }) {
                    return prisma_1.prisma.documentTemplate.findUnique({ where: { id } });
                },
            },
            Mutation: {
                async createDocument(_, { variables }) {
                    return await prisma_1.prisma.document.create({ data: variables });
                },
                async updateDocument(_, { variables }) {
                    return await prisma_1.prisma.document.update({
                        where: { id: variables.id },
                        data: variables,
                    });
                },
                async requestFileUpload(_, { variables }) {
                    const s3Client = new client_s3_1.S3Client({
                        region: 'us-east-1',
                        endpoint: 'http://localhost:9000',
                        credentials: {
                            accessKeyId: 'minio',
                            secretAccessKey: 'minio123'
                        },
                    });
                    // Get signed URL for the file upload from the S3 client
                    const contentType = 'image/jpeg';
                    const command = new client_s3_1.PutObjectCommand({
                        Bucket: 'demo-bucket',
                        Key: 'demo-bucket/demo-key',
                        ContentType: contentType,
                    });
                    const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
                        expiresIn: 3600,
                    });
                    return {
                        fileName: variables.fileName,
                        filePath: variables.filePath,
                        contentType,
                        uploadUrl: signedUrl,
                    };
                },
            },
            Document: {
                async author({ author_id }) {
                    return prisma_1.prisma.user.findUnique({ where: { id: author_id } });
                },
            },
            JSON: graphql_scalars_1.GraphQLJSON,
            UUID: graphql_scalars_1.GraphQLUUID,
        },
    });
    const yoga = (0, graphql_yoga_1.createYoga)({ schema });
    const server = (0, http_1.createServer)(yoga);
    server.listen(PORT, () => {
        console.info(`Server is running on http://localhost:${PORT}/graphql`);
    });
}
main();
//# sourceMappingURL=index.js.map