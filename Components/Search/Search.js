/** @jsx jsx */
import React, { useState, useEffect } from "react";

import { jsx, css } from "@emotion/core";
import {
  breakpoint780,
  breakpoint640,
  breakpoint500,
  breakpoint400,
  breakpoint300,
} from "../../styles/breakpoints.js";
import {
  Container,
  Grid,
  Input,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Select,
  ListSubheader,
  InputLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { StylesProvider } from "@material-ui/core/styles";

export default function Search({
  updateFormData,
  formData,
  getReqData,
  setReqData,
  commBoard,
  council,
  buildingType,
  jobType,
  permitStatus,
  block,
  lot,
  borough,
  zipCode,
  getAddressFromGeo,
  disableButtonHandler,
  disableButton,
  clearGetAddress,
  clearResultsHandler,
}) {
  const [expandedView, setExpandedView] = useState(false);
  let hideHeight = "auto";
  let hideStyle;
  let containerHeight = "600px";
  let innerGridHeight = "50px";
  let innerGridOpacity = "1";
  if (!expandedView) {
    hideStyle = "none";
    hideHeight = "0px";
    containerHeight = "225px";
    innerGridHeight = "1px";
    innerGridOpacity = "0";
  }

  const containerCss = css`
    height: ${containerHeight};
    border: 1px solid black;
    transition: all 0.3s ease-in-out;

    @media (max-width: 560px) {
      height: ${expandedView ? `750px` : containerHeight};
    }

    @media (max-width: 400px) {
      height: ${expandedView ? `775px` : containerHeight};
    }

    @media (max-width: 305px) {
      height: ${expandedView ? `775px` : `275px`};
    }

    p {
      text-align: center;
      font-size: 1.5rem;
      padding: 0;
      margin: 0;
    }
  `;

  const expandButton = css`
    position: relative;
    left: 0;

    @media (max-width: ${breakpoint640}) {
      right: 0;
    }
  `;

  const hideContainer = css`
    display: ${hideStyle};
    height: ${hideHeight};
    opacity: ${innerGridOpacity};
    transition: all 0.3s ease-in-out;
  `;
  const dateCss = css`
    margin: 0 20px;
  `;

  const innerGridCss = css`
    position: relative;
    padding: 0 100px;
    width: 100%;
    margin-bottom: 25px;

    transition: all 0.8s ease-in-out;

    @media (max-width: ${breakpoint780}px) {
      padding: 0 50px;
    }

    @media (max-width: ${breakpoint500}px) {
      padding: 0px;
    }
  `;

  const addressCss = css`
    width: 80%;
    textalign: center;

    @media (max-width: ${breakpoint500}px) {
      width: 100%;
    }
  `;

  const buttonContainerCss = css`
    height: 100px;
    padding: 0 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: flex-start;

    @media (max-width: ${breakpoint780}px) {
      padding: 0 50px;
    }

    @media (max-width: ${breakpoint500}px) {
      justify-content: space-around;
      padding: 0;
    }

    button {
      margin: 0 50px;

      @media (max-width: ${breakpoint780}px) {
        margin: 0 25px;
      }

      @media (max-width: 560px) {
        margin: 25px;
      }

      @media (max-width: 460px) {
        margin: 10px;
      }
    }
  `;

  return (
    <StylesProvider injectFirst>
      <div>
        <Container maxWidth="md" css={containerCss}>
          <p>Search DOB Records</p>
          <Button
            onClick={() => setExpandedView(!expandedView)}
            css={expandButton}
            color={expandedView ? "primary" : "secondary"}
          >
            {expandedView ? "CONTRACT" : "EXPAND"}
          </Button>
          <form>
            <Grid
              container={true}
              css={innerGridCss}
              direction="row"
              alignItems="center"
              justify="center"
              wrap="wrap"
              alignContent="flex-start"
            >
              <Input
                css={addressCss}
                value={formData.address}
                onChange={(e) => updateFormData(e, "StreetNumber")}
                onBlur={() => getAddressFromGeo(formData.address)}
                onFocus={clearGetAddress}
                type="text"
                placeholder="Address"
                color="secondary"
              />
            </Grid>

            <div css={hideContainer}>
              <Grid
                container={true}
                css={innerGridCss}
                direction="row"
                alignItems="center"
                justify="space-between"
                wrap="wrap"
                alignContent="flex-start"
              >
                <Select
                  style={{ width: "30%" }}
                  onChange={(e) => updateFormData(e, "Borough")}
                  multiple
                  label="Borough"
                  value={formData.borough}
                >
                  {borough.sort().map((item, i) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>

                <Input
                  style={{ width: "30%" }}
                  value={formData.block}
                  onChange={(e) => updateFormData(e, "Block")}
                  type="number"
                  placeholder="Block"
                  color="secondary"
                />
                <Input
                  style={{ width: "30%" }}
                  value={formData.lot}
                  onChange={(e) => updateFormData(e, "Lot")}
                  type="number"
                  placeholder="Lot"
                  color="secondary"
                />
              </Grid>
              <Grid
                container={true}
                css={innerGridCss}
                direction="row"
                alignItems="center"
                justify="space-between"
                wrap="wrap"
                alignContent="flex-start"
              >
                <div style={{ width: "25%" }}>
                  <InputLabel>Community Board</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    label="Community Board"
                    onChange={(e) => updateFormData(e, "CommunityBoard")}
                    multiple
                    label="Community Board"
                    value={formData.communityBoard}
                  >
                    <ListSubheader>Manhattan</ListSubheader>
                    {commBoard
                      .sort((a, b) => a.community_board - b.community_board)
                      .map((comm, i) => {
                        if (comm.borough.toLowerCase() === "manhattan") {
                          return (
                            <MenuItem
                              key={comm.community_board}
                              value={comm.community_board}
                            >
                              {comm.community_board}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Bronx</ListSubheader>
                    {commBoard
                      .sort((a, b) => a.community_board - b.community_board)
                      .map((comm, i) => {
                        if (comm.borough.toLowerCase() === "bronx") {
                          return (
                            <MenuItem
                              key={comm.community_board}
                              value={comm.community_board}
                            >
                              {comm.community_board}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Brooklyn</ListSubheader>
                    {commBoard
                      .sort((a, b) => a.community_board - b.community_board)
                      .map((comm, i) => {
                        if (comm.borough.toLowerCase() === "brooklyn") {
                          return (
                            <MenuItem
                              key={comm.community_board}
                              value={comm.community_board}
                            >
                              {comm.community_board}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Queens</ListSubheader>
                    {commBoard
                      .sort((a, b) => a.community_board - b.community_board)
                      .map((comm, i) => {
                        if (comm.borough.toLowerCase() === "queens") {
                          return (
                            <MenuItem
                              key={comm.community_board}
                              value={comm.community_board}
                            >
                              {comm.community_board}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Staten Island</ListSubheader>
                    {commBoard
                      .sort((a, b) => a.community_board - b.community_board)
                      .map((comm, i) => {
                        if (comm.borough.toLowerCase() === "staten island") {
                          return (
                            <MenuItem
                              key={comm.community_board}
                              value={comm.community_board}
                            >
                              {comm.community_board}
                            </MenuItem>
                          );
                        }
                      })}
                  </Select>
                </div>

                <div style={{ width: "25%" }}>
                  <InputLabel>Council District</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(e) => updateFormData(e, "CouncilDistrict")}
                    multiple
                    label="Council District"
                    value={formData.councilDistrict}
                  >
                    <ListSubheader>Manhattan</ListSubheader>
                    {council
                      .sort(
                        (a, b) =>
                          a.gis_council_district - b.gis_council_district
                      )
                      .map((coun, i) => {
                        if (coun.borough.toLowerCase() === "manhattan") {
                          return (
                            <MenuItem
                              key={coun.gis_council_district}
                              value={coun.gis_council_district}
                            >
                              {coun.gis_council_district}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Bronx</ListSubheader>
                    {council
                      .sort(
                        (a, b) =>
                          a.gis_council_district - b.gis_council_district
                      )
                      .map((coun, i) => {
                        if (coun.borough.toLowerCase() === "bronx") {
                          return (
                            <MenuItem
                              key={coun.gis_council_district}
                              value={coun.gis_council_district}
                            >
                              {coun.gis_council_district}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Brooklyn</ListSubheader>
                    {council
                      .sort(
                        (a, b) =>
                          a.gis_council_district - b.gis_council_district
                      )
                      .map((coun, i) => {
                        if (coun.borough.toLowerCase() === "brooklyn") {
                          return (
                            <MenuItem
                              key={coun.gis_council_district}
                              value={coun.gis_council_district}
                            >
                              {coun.gis_council_district}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Queens</ListSubheader>
                    {council
                      .sort(
                        (a, b) =>
                          a.gis_council_district - b.gis_council_district
                      )
                      .map((coun, i) => {
                        if (coun.borough.toLowerCase() === "queens") {
                          return (
                            <MenuItem
                              key={coun.gis_council_district}
                              value={coun.gis_council_district}
                            >
                              {coun.gis_council_district}
                            </MenuItem>
                          );
                        }
                      })}

                    <ListSubheader>Staten Island</ListSubheader>
                    {council
                      .sort(
                        (a, b) =>
                          a.gis_council_district - b.gis_council_district
                      )
                      .map((coun, i) => {
                        if (coun.borough.toLowerCase() === "staten island") {
                          return (
                            <MenuItem
                              key={coun.gis_council_district}
                              value={coun.gis_council_district}
                            >
                              {coun.gis_council_district}
                            </MenuItem>
                          );
                        }
                      })}
                  </Select>
                </div>
              </Grid>
              <Grid
                container={true}
                css={innerGridCss}
                direction="row"
                alignItems="center"
                justify="space-between"
                wrap="wrap"
                alignContent="flex-start"
              >
                <div style={{ width: "25%" }}>
                  <InputLabel>Building Type</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(e) => updateFormData(e, "BuildingType")}
                    multiple
                    label="Building Type"
                    value={formData.buildingType}
                  >
                    {buildingType
                      .sort((a, b) => a - b)
                      .map((item, i) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>

                <div style={{ width: "25%" }}>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(e) => updateFormData(e, "JobType")}
                    multiple
                    label="Job Type"
                    value={formData.jobType}
                  >
                    {jobType.sort().map((item, i) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>

                <div style={{ width: "25%" }}>
                  <InputLabel>Permit Status</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(e) => updateFormData(e, "PermitStatus")}
                    multiple
                    label="Permit Status"
                    value={formData.permitStatus}
                  >
                    {permitStatus.sort().map((item, i) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </Grid>
              <Grid
                container={true}
                css={innerGridCss}
                direction="row"
                alignItems="center"
                justify="space-between"
                wrap="wrap"
                alignContent="flex-start"
              >
                <TextField
                  css={dateCss}
                  onChange={(e) => updateFormData(e, "FilingDateStart")}
                  value={formData.filingIssueDate.start}
                  label="Filing Issue Date Start"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  css={dateCss}
                  onChange={(e) => updateFormData(e, "FilingDateEnd")}
                  value={formData.filingIssueDate.end}
                  label="Filing Issue Date End"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid
                container={true}
                css={innerGridCss}
                direction="row"
                alignItems="center"
                justify="space-between"
                wrap="wrap"
                alignContent="flex-start"
              >
                <TextField
                  css={dateCss}
                  onChange={(e) => updateFormData(e, "PermitIssueStart")}
                  value={formData.permitIssueDate.start}
                  label="Permit Issue Date Start"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  css={dateCss}
                  onChange={(e) => updateFormData(e, "PermitIssueEnd")}
                  value={formData.permitIssueDate.end}
                  label="Permit Issue Date End"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </div>
            <div
              container={true}
              css={buttonContainerCss}
              direction="row"
              alignItems="center"
              justify="center"
              wrap="wrap"
              alignContent="flex-start"
            >
              <Button
                disabled={disableButton ? true : false}
                onClick={(e) => getReqData(e)}
                variant="outlined"
                color="primary"
              >
                Submit
              </Button>
              <Button
                onClick={clearResultsHandler}
                variant="outlined"
                color="secondary"
              >
                Clear Results
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </StylesProvider>
  );
}
