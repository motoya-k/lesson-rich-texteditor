import type { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'http://localhost:4040/graphql',
  documents: ['src/**\/*.tsx'],
  generates: {
    'src/.generate/gql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        avoidOptionals: true
      }
    },
    'src/.generate/introspection.json': {
      plugins: ['introspection'],
      config: {
        minify: true
      },
    },
  },
};
export default config;
