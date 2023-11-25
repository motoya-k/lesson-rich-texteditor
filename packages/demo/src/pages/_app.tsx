import "@/styles/globals.css";
import App, { AppProps, AppContext } from "next/app";
import { gql, Provider } from "urql";

import { createGraphQLClient, CurrentUserContext } from "@/context";
import { User } from "@/.generate/gql";

import Layout from "@/components/layouts";

const currentUserQuery = gql`
  query GetCurrentUser {
    # NOTE: 認証の代わり
    user(id: "0b7c3fe4-9042-4338-86ab-e977d2a83719") {
      id
      name
    }
  }
`;

export default function MyApp({
  Component,
  pageProps,
  ...ctx
}: AppProps & { currentUser: User }) {
  const { currentUser } = ctx;
  const client = createGraphQLClient();

  return (
    <Provider value={client}>
      <CurrentUserContext.Provider value={currentUser}>
        <Layout currentUser={currentUser}>
          <Component {...pageProps} />
        </Layout>
      </CurrentUserContext.Provider>
    </Provider>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  const client = createGraphQLClient();
  const results = await client.query(currentUserQuery, {}).toPromise();
  const currentUser = results.data?.user;
  return { ...appProps, currentUser };
};
