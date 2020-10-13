import React from "react";
import Head from "next/head";
import Search from "../Components/Search/Search";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
    </div>
  );
}
