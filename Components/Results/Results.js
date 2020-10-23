/** @jsx jsx */
import React from "react";
import {
  Container,
  Grid,
  Input,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import { jsx, css } from "@emotion/core";
import { StylesProvider } from "@material-ui/core/styles";
import {
  breakpoint780,
  breakpoint640,
  breakpoint500,
  breakpoint400,
  breakpoint300,
} from "../../styles/breakpoints.js";

const Results = ({ reqData }) => {
  const mainContainer = css`
    position: relative;
    top: 0;
    width: 100%;
    margin: 0;


    @media (max-width: ${breakpoint640}px) {
      padding: 0;
    }

    
    }
  `;

  const listContainer = css`
  height: ${reqData ? `500px` : `0px`};
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    padding: 0;
    margin: 0;

    li {
      display: flex;
      flex-direction: column;
      span {
        font-weight: bold;
      }
    }


  `;

  const resultsCss = css`
    width: 100%;
    padding: 0 0 50px 0;
    margin: 0;
    font-size: 4rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;

    p {
      margin: 0;
      width: 250px;
      border-bottom: 3px solid black;
    }
  `;
  const mapContainer = css`
    height: 200px;
    width: 100%;
    border-bottom: 1px solid black;
    margin-bottom: 25px;

    @media (max-width: 900px) {
      height: 400px;
    }

    @media (max-width: ${breakpoint400}px) {
      height: 800px;
    }
  `;

  const mapInnerContainer = css`
    width: 200px;
    height: 100%;
    max-height: 200px;
    padding: 10px 0;

    @media (max-width: 225px) {
      width: auto;
    }
  `;
  let responseText;
  if (reqData !== null) {
    responseText = reqData.map((item, i) => {
      return (
        <Grid
          container={true}
          css={mapContainer}
          direction="row"
          alignItems="center"
          justify="center"
          wrap="wrap"
          alignContent="flex-start"
        >
          <Grid
            css={mapInnerContainer}
            container={true}
            direction="column"
            alignItems="flex-start"
            justify="space-around"
            wrap="wrap"
            alignContent="flex-start"
          >
            <li>
              <span>Borough:</span> {item.borough}
            </li>
            <li>
              <span>Block:</span> {item.block}
            </li>
            <li>
              <span>Lot:</span> {item.lot}
            </li>
          </Grid>
          <Grid
            css={mapInnerContainer}
            container={true}
            direction="column"
            alignItems="flex-start"
            justify="space-around"
            wrap="wrap"
            alignContent="flex-start"
          >
            <li>
              <span>Address:</span> {item.house__} {item.street_name}
            </li>
            <li>
              <span>Neighborhood:</span> {item.gis_nta_name}
            </li>
          </Grid>

          <Grid
            css={mapInnerContainer}
            container={true}
            direction="column"
            alignItems="flex-start"
            justify="space-around"
            wrap="wrap"
            alignContent="flex-start"
          >
            <li>
              <span>Permit Number:</span> {item.permit_si_no}
            </li>
            <li>
              <span>Permit Type:</span> {item.permit_type}
            </li>
            <li>
              <span>Job Type:</span> {item.job_type}
            </li>
            <li>
              <span>Permit Status:</span> {item.permit_status}
            </li>
          </Grid>
          <Grid
            css={mapInnerContainer}
            container={true}
            direction="column"
            alignItems="flex-start"
            justify="space-around"
            wrap="wrap"
            alignContent="flex-start"
          >
            <li>
              <span>Filing Date:</span> {item.filing_date}
            </li>
            <li>
              <span>Issuance Date:</span> {item.issuance_date}
            </li>
            <li>
              <span>Job Start Date:</span> {item.job_start_date}
            </li>
          </Grid>
        </Grid>
      );
    });
  }
  return (
    <StylesProvider injectFirst>
      <div css={mainContainer}>
        <div css={resultsCss}>
          <p>{reqData ? "Results" : null}</p>
        </div>
        <div css={listContainer}>
          <ul style={{ width: "100%", listStyle: "none" }}>{responseText}</ul>
        </div>
      </div>
    </StylesProvider>
  );
};

export default Results;
