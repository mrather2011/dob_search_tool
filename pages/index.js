import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Container, Grid } from "@material-ui/core";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        maxWidth="md"
        style={{ height: "500px", border: "1px solid black" }}
      >
        <Grid
          container="true"
          style={{ height: "100%", width: "100%", border: "1px solid red" }}
          alignItems="center"
          justify="center"
        >
          <p>Search DOB Records</p>
        </Grid>
      </Container>
    </div>
  );
}
