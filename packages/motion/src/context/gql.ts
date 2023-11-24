"use client";

import {
  cacheExchange,
  Client,
  createClient,
  fetchExchange,
  SSRExchange,
  ssrExchange,
} from "@urql/next";

export const createGraphQLClient = (): [Client, SSRExchange] => {
  const ssr = ssrExchange();

  const client = createClient({
    url: "http://localhost:4040/graphql",
    exchanges: [cacheExchange, ssr, fetchExchange],
    suspense: true,
  });

  return [client, ssr];
};
