import { Client, createClient, fetchExchange } from "urql";
import { cacheExchange } from '@urql/exchange-graphcache';


export const createGraphQLClient = (): Client => {
  const client = createClient({
    url: "http://localhost:4040/graphql",
    exchanges: [cacheExchange(({})), fetchExchange],
  });

  return client;
};
