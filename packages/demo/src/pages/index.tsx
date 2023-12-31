import Head from "next/head";
import { Inter } from "next/font/google";
import Button from "@mui/material/Button";

import { useCurrentUser } from "@/context";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
