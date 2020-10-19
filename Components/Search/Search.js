/** @jsx jsx */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Results from "../Results/Results";
import Toggle from "../Toggle";
import { jsx, css } from "@emotion/core";
import {
  allNYCZipCodes,
  NYCCommunityBoards,
  NYCCouncilDistricts,
} from "./criteria";

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
import { StylesProvider } from "@material-ui/core/styles";
import axios from "axios";

export default function Search({
  updateFormData,
  formData,
  getReqData,
  setReqData,
}) {
  const [expandedView, setExpandedView] = useState(true);
  let hideStyle;
  let containerHeight = "500px";
  if (!expandedView) {
    hideStyle = "none";
    containerHeight = "200px";
  }

  const dateCss = css`
    margin: 0 20px;
  `;
  return (
    <StylesProvider injectFirst>
      <div>
        <Container
          maxWidth="md"
          style={{ height: containerHeight, border: "1px solid black" }}
        >
          <p>Search DOB Records</p>
          <form>
            <Grid
              container={true}
              style={{
                position: "relative",
                padding: "0 100px",
                width: "100%",
                marginBottom: "10px",
              }}
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Button
                onClick={() => setExpandedView(!expandedView)}
                style={{ position: "absolute", left: "0" }}
                color={expandedView ? "primary" : "secondary"}
              >
                {expandedView ? "CONTRACT" : "EXPAND"}
              </Button>
              <Select
                onChange={(e) => updateFormData(e, "Borough")}
                multiple
                label="Borough"
                value={formData.borough}
              >
                <MenuItem value="Manhattan">Manhattan</MenuItem>
                <MenuItem value="Brooklyn">Brooklyn</MenuItem>
                <MenuItem value="Queens">Queens</MenuItem>
                <MenuItem value="Bronx">Bronx</MenuItem>
                <MenuItem value="Staten Island">Staten Island</MenuItem>
              </Select>

              <Input
                value={formData.block}
                onChange={(e) => updateFormData(e, "Block")}
                type="number"
                placeholder="Block"
                color="secondary"
              />
              <Input
                value={formData.lot}
                onChange={(e) => updateFormData(e, "Lot")}
                type="number"
                placeholder="Lot"
                color="secondary"
              />
            </Grid>
            <div style={{ display: hideStyle }}>
              <Grid
                container={true}
                style={{
                  padding: "0 100px",
                  width: "100%",
                  marginBottom: "10px",
                }}
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Input
                  style={{ maxWidth: "100px", textAlign: "center" }}
                  value={formData.address.streetNumber}
                  onChange={(e) => updateFormData(e, "StreetNumber")}
                  type="number"
                  placeholder="Street Number"
                  color="secondary"
                />
                <Input
                  value={formData.address.street}
                  onChange={(e) => updateFormData(e, "Street")}
                  type="text"
                  placeholder="Street Name"
                  color="secondary"
                />

                <Input
                  style={{ maxWidth: "150px", textAlign: "center" }}
                  value={formData.address.zip}
                  onChange={(e) => updateFormData(e, "Zip")}
                  type="number"
                  placeholder="Zip Code"
                  color="secondary"
                />
              </Grid>
              <Grid
                container={true}
                style={{
                  padding: "0 100px",
                  width: "100%",
                  marginBottom: "10px",
                }}
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <div>
                  <InputLabel>Community Board</InputLabel>
                  <Select
                    label="Community Board"
                    onChange={(e) => updateFormData(e, "CommunityBoard")}
                    multiple
                    label="Community Board"
                    value={formData.communityBoard}
                  >
                    <ListSubheader>Manhattan</ListSubheader>
                    {NYCCommunityBoards.map((comm, i) => {
                      if (comm.toString().slice(0, 1) === "1") {
                        return (
                          <MenuItem key={comm} value={comm}>
                            {comm}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Bronx</ListSubheader>
                    {NYCCommunityBoards.map((comm, i) => {
                      if (comm.toString().slice(0, 1) === "2") {
                        return (
                          <MenuItem key={comm} value={comm}>
                            {comm}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Brooklyn</ListSubheader>
                    {NYCCommunityBoards.map((comm, i) => {
                      if (comm.toString().slice(0, 1) === "3") {
                        return (
                          <MenuItem key={comm} value={comm}>
                            {comm}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Queens</ListSubheader>
                    {NYCCommunityBoards.map((comm, i) => {
                      if (comm.toString().slice(0, 1) === "4") {
                        return (
                          <MenuItem key={comm} value={comm}>
                            {comm}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Staten Island</ListSubheader>
                    {NYCCommunityBoards.map((comm, i) => {
                      if (comm.toString().slice(0, 1) === "5") {
                        return (
                          <MenuItem key={comm} value={formData.communityBoard}>
                            {comm}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </div>

                {/* <div>
                  <InputLabel>Census Tract</InputLabel>
                  <Select
                    onChange={(e) => updateFormData(e, "CensusTract")}
                    multiple
                    label="Census Tract"
                    value={formData.censusTract}
                  >
                    <MenuItem value={301}>CT1</MenuItem>
                    <MenuItem value={401}>CT2</MenuItem>
                    <MenuItem value={501}>CT3</MenuItem>
                    <MenuItem value={601}>CT4</MenuItem>
                    <MenuItem value={701}>CT5</MenuItem>
                  </Select>
                </div> */}

                <div>
                  <InputLabel>Council District</InputLabel>
                  <Select
                    onChange={(e) => updateFormData(e, "CouncilDistrict")}
                    multiple
                    label="Council District"
                    value={formData.councilDistrict}
                  >
                    <ListSubheader>Manhattan</ListSubheader>

                    {NYCCouncilDistricts.sort((a, b) =>
                      a.District > b.District ? 1 : -1
                    ).map((coun, i) => {
                      if (coun.Borough === "Manhattan") {
                        return (
                          <MenuItem key={coun.District} value={coun.District}>
                            {coun.District}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Bronx</ListSubheader>

                    {NYCCouncilDistricts.sort((a, b) =>
                      a.District > b.District ? 1 : -1
                    ).map((coun, i) => {
                      if (coun.Borough === "Bronx") {
                        return (
                          <MenuItem key={coun.District} value={coun.District}>
                            {coun.District}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Queens</ListSubheader>

                    {NYCCouncilDistricts.sort((a, b) =>
                      a.District > b.District ? 1 : -1
                    ).map((coun, i) => {
                      if (coun.Borough === "Queens") {
                        return (
                          <MenuItem key={coun.District} value={coun.District}>
                            {coun.District}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Brooklyn</ListSubheader>

                    {NYCCouncilDistricts.sort((a, b) =>
                      a.District > b.District ? 1 : -1
                    ).map((coun, i) => {
                      if (coun.Borough === "Brooklyn") {
                        return (
                          <MenuItem key={coun.District} value={coun.District}>
                            {coun.District}
                          </MenuItem>
                        );
                      }
                    })}

                    <ListSubheader>Staten Island</ListSubheader>

                    {NYCCouncilDistricts.sort((a, b) =>
                      a.District > b.District ? 1 : -1
                    ).map((coun, i) => {
                      if (coun.Borough === "Staten Island") {
                        return (
                          <MenuItem key={coun.District} value={coun.District}>
                            {coun.District}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </div>
              </Grid>
              <Grid
                container={true}
                style={{
                  padding: "0 100px",
                  width: "100%",
                  marginBottom: "10px",
                }}
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <div>
                  <InputLabel>Building Type</InputLabel>
                  <Select
                    onChange={(e) => updateFormData(e, "BuildingType")}
                    multiple
                    label="Building Type"
                    value={formData.buildingType}
                  >
                    <MenuItem value={47}>House</MenuItem>
                    <MenuItem value={57}>MultiFam</MenuItem>
                    <MenuItem value={67}>Warehouse</MenuItem>
                    <MenuItem value={77}>Garage</MenuItem>
                    <MenuItem value={87}>Office</MenuItem>
                  </Select>
                </div>

                <div>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    onChange={(e) => updateFormData(e, "JobType")}
                    multiple
                    label="Job Type"
                    value={formData.jobType}
                  >
                    <MenuItem value={47}>New Build</MenuItem>
                    <MenuItem value={57}>A2</MenuItem>
                    <MenuItem value={67}>Light Work</MenuItem>
                    <MenuItem value={77}>Demo</MenuItem>
                    <MenuItem value={87}>No Work</MenuItem>
                  </Select>
                </div>

                <div>
                  <InputLabel>Permit Status</InputLabel>
                  <Select
                    onChange={(e) => updateFormData(e, "PermitStatus")}
                    multiple
                    label="Permit Status"
                    value={formData.permitStatus}
                  >
                    <MenuItem value={47}>ISSUED</MenuItem>
                    <MenuItem value={57}>DENIED</MenuItem>
                    <MenuItem value={67}>UNDER REVIEW</MenuItem>
                    <MenuItem value={77}>OTHER</MenuItem>
                    <MenuItem value={87}>NO IDEA</MenuItem>
                  </Select>
                </div>
              </Grid>
              <Grid
                container={true}
                style={{
                  padding: "0 100px",
                  width: "100%",
                  marginBottom: "10px",
                }}
                direction="row"
                alignItems="center"
                justify="center"
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
                style={{
                  padding: "0 100px",
                  width: "100%",
                  marginBottom: "10px",
                }}
                direction="row"
                alignItems="center"
                justify="center"
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
            <Grid
              container={true}
              style={{
                padding: "0 100px",
                width: "100%",
                marginBottom: "10px",
              }}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Button
                style={{ margin: "0 50px" }}
                onClick={(e) => getReqData(e)}
                variant="outlined"
                color="primary"
              >
                Submit
              </Button>
              <Button onClick={setReqData} variant="outlined" color="secondary">
                Clear Results
              </Button>
            </Grid>
          </form>
          <Grid
            container={true}
            style={{
              padding: "0 100px",
              width: "100%",
              marginBottom: "10px",
            }}
            direction="row"
            alignItems="center"
            justify="center"
          ></Grid>
        </Container>
      </div>
    </StylesProvider>
  );
}
