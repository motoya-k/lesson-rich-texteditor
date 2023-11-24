"use client";

import { Inter } from "next/font/google";
import { UrqlProvider } from "@urql/next";

import { createGraphQLClient } from "@/context/gql";

import "./globals.css";
import { CurrentUserContext } from "@/context/currentUser";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, ssr] = createGraphQLClient();

  return (
    <html lang="en">
      <UrqlProvider client={client} ssr={ssr}>
        <CurrentUserContext.Provider value={{
          // NOTE: 認証代わり
          id: "0b7c3fe4-9042-4338-86ab-e977d2a83719",
          name: "Motoya Kondo",
          email: "contact@mtyk.me"
        }}>
        <body className={inter.className}>{children}</body>
        </CurrentUserContext.Provider>
      </UrqlProvider>
    </html>
  );
}
