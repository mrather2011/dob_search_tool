import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Container, Grid, Input } from "@material-ui/core";
import axios from "axios";

export default function Home() {
  const [reqHeader, setReqHeader] = useState({
    "X-App-Token": process.env.API_TOKEN,
  });
  const [params, setParams] = useState(null);
  const [formData, setFormData] = useState({
    borough: "",
  });
  const [reqData, setReqData] = useState(null);

  const getReqData = () => {
    axios({
      method: "get",
      url: "https://data.cityofnewyork.us/resource/ipu4-2q9a.json",
      params: { borough: "BROOKLYN" },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getReqData();
  // }, []);

  const updateFormData = (e, id) => {
    e.preventDefault();
    switch (id) {
      case "Borough":
        setFormData({
          ...formData,
          borough: e.target.value,
        });
        break;
      default:
        return null;
    }
  };

  console.log(formData.borough);

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
        <p>Search DOB Records</p>
        <Grid
          container={true}
          style={{
            height: "calc(100%-100px)",
            width: "100%",
            border: "1px solid red",
          }}
          alignItems="flex-start"
          justify="center"
        >
          <form>
            <Input
              value={formData.borough}
              onChange={(e) => updateFormData(e, "Borough")}
              type="text"
              placeholder="Borough"
              color="secondary"
            >
              Field
            </Input>
          </form>
        </Grid>
      </Container>
    </div>
  );
}
