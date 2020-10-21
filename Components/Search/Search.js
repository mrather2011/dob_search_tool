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
import { Autocomplete } from "@material-ui/lab";
import { StylesProvider } from "@material-ui/core/styles";
import axios from "axios";

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
  streetName,
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
                {borough.sort().map((item, i) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
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
                <Autocomplete
                  onSelect={(e) => updateFormData(e, "Street")}
                  autoSelect
                  freeSolo
                  style={{ width: "200px" }}
                  value={formData.address.street}
                  options={streetName}
                  getOptionLabel={(option) => (option ? option : "")}
                  id="flat-demo"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Street Name"
                      margin="normal"
                    />
                  )}
                />

                <Autocomplete
                  onSelect={(e) => updateFormData(e, "Zip")}
                  freeSolo
                  autoSelect
                  style={{ width: "200px" }}
                  value={formData.address.zip}
                  options={zipCode}
                  getOptionLabel={(option) => (option ? option : "")}
                  id="zip"
                  renderInput={(params) => (
                    <TextField {...params} label="Zip Code" margin="normal" />
                  )}
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

                <div>
                  <InputLabel>Council District</InputLabel>
                  <Select
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

                <div>
                  <InputLabel>Job Type</InputLabel>
                  <Select
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

                <div>
                  <InputLabel>Permit Status</InputLabel>
                  <Select
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
