import React, { useState, useEffect } from "react";
import Head from "next/head";

import { Container, Grid, Input, TextField, MenuItem } from "@material-ui/core";
import axios from "axios";

export default function Search() {
  const [reqHeader, setReqHeader] = useState({
    "X-App-Token": process.env.API_TOKEN,
  });
  const [params, setParams] = useState(null);
  const [formData, setFormData] = useState({
    borough: "Manhattan",
    address: {
      streetNumber: "",
      street: "",
      zip: "",
    },
    communityBoard: 301,
    censusTract: 301,
    councilDistrict: 47,
    buildingType: 57,
    jobType: 57,
    permitStatus: 67,
    permitIssueDate: {
      start: "",
      end: "",
    },
    filingIssueDate: {
      start: "",
      end: "",
    },
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
      case "Block":
        setFormData({
          ...formData,
          block: e.target.value,
        });
        break;
      case "Lot":
        setFormData({
          ...formData,
          lot: e.target.value,
        });
        break;
      case "StreetNumber":
        let newAddress = {
          ...formData.address,
          streetNumber: e.target.value,
        };
        setFormData({
          ...formData,
          address: newAddress,
        });
        break;
      case "Street":
        newAddress = {
          ...formData.address,
          street: e.target.value,
        };
        setFormData({
          ...formData,
          address: newAddress,
        });
        break;
      case "Zip":
        newAddress = {
          ...formData.address,
          zip: e.target.value,
        };
        setFormData({
          ...formData,
          address: newAddress,
        });
        break;
      case "CommunityBoard":
        setFormData({
          ...formData,
          communityBoard: e.target.value,
        });
        break;
      case "CensusTract":
        setFormData({
          ...formData,
          censusTract: e.target.value,
        });
        break;
      case "CouncilDistrict":
        setFormData({
          ...formData,
          councilDistrict: e.target.value,
        });
        break;
      case "BuildingType":
        setFormData({
          ...formData,
          buildingType: e.target.value,
        });
        break;
      case "JobType":
        setFormData({
          ...formData,
          jobType: e.target.value,
        });
        break;
      case "PermitStatus":
        setFormData({
          ...formData,
          permitStatus: e.target.value,
        });
        break;
      case "PermitIssueStart":
        let permitIssue = {
          ...formData.permitIssueDate,
          start: e.target.value,
        };
        setFormData({
          ...formData,
          permitIssueDate: permitIssue,
        });
        break;
      case "PermitIssueEnd":
        permitIssue = {
          ...formData.permitIssueDate,
          end: e.target.value,
        };
        setFormData({
          ...formData,
          permitIssueDate: permitIssue,
        });
        break;
      case "FilingDateStart":
        let filingIssue = {
          ...formData.filingIssueDate,
          start: e.target.value,
        };
        setFormData({
          ...formData,
          filingIssueDate: filingIssue,
        });
        break;
      case "FilingDateEnd":
        filingIssue = {
          ...formData.filingIssueDate,
          end: e.target.value,
        };
        setFormData({
          ...formData,
          filingIssueDate: filingIssue,
        });
        break;
      default:
        return null;
    }
  };

  console.log(JSON.stringify(formData));

  return (
    <div>
      <Container
        maxWidth="md"
        style={{ height: "500px", border: "1px solid black" }}
      >
        <p>Search DOB Records</p>
        <Grid
          container={true}
          style={{
            padding: "0 100px",
            width: "100%",
            border: "1px solid red",
          }}
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <TextField
            onChange={(e) => updateFormData(e, "Borough")}
            select
            label="Borough"
            value={formData.borough}
          >
            <MenuItem value="Manhattan">Manhattan</MenuItem>
            <MenuItem value="Brooklyn">Brooklyn</MenuItem>
            <MenuItem value="Queens">Queens</MenuItem>
            <MenuItem value="Bronx">Bronx</MenuItem>
            <MenuItem value="Staten Island">Staten Island</MenuItem>
          </TextField>

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
        <Grid
          container={true}
          style={{
            padding: "0 100px",
            width: "100%",
            border: "1px solid red",
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
            border: "1px solid red",
          }}
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <TextField
            onChange={(e) => updateFormData(e, "CommunityBoard")}
            select
            label="Community Board"
            value={formData.communityBoard}
          >
            <MenuItem value={301}>CB1</MenuItem>
            <MenuItem value={401}>CB2</MenuItem>
            <MenuItem value={501}>CB3</MenuItem>
            <MenuItem value={601}>CB4</MenuItem>
            <MenuItem value={701}>CB5</MenuItem>
          </TextField>
          <TextField
            onChange={(e) => updateFormData(e, "CensusTract")}
            select
            label="Census Tract"
            value={formData.censusTract}
          >
            <MenuItem value={301}>CT1</MenuItem>
            <MenuItem value={401}>CT2</MenuItem>
            <MenuItem value={501}>CT3</MenuItem>
            <MenuItem value={601}>CT4</MenuItem>
            <MenuItem value={701}>CT5</MenuItem>
          </TextField>
          <TextField
            onChange={(e) => updateFormData(e, "CouncilDistrict")}
            select
            label="Council District"
            value={formData.councilDistrict}
          >
            <MenuItem value={47}>CD1</MenuItem>
            <MenuItem value={57}>CD2</MenuItem>
            <MenuItem value={67}>CD3</MenuItem>
            <MenuItem value={77}>CD4</MenuItem>
            <MenuItem value={87}>CD5</MenuItem>
          </TextField>
        </Grid>
        <Grid
          container={true}
          style={{
            padding: "0 100px",
            width: "100%",
            border: "1px solid red",
          }}
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <TextField
            onChange={(e) => updateFormData(e, "BuildingType")}
            select
            label="Building Type"
            value={formData.buildingType}
          >
            <MenuItem value={47}>House</MenuItem>
            <MenuItem value={57}>MultiFam</MenuItem>
            <MenuItem value={67}>Warehouse</MenuItem>
            <MenuItem value={77}>Garage</MenuItem>
            <MenuItem value={87}>Office</MenuItem>
          </TextField>
          <TextField
            onChange={(e) => updateFormData(e, "JobType")}
            select
            label="Job Type"
            value={formData.jobType}
          >
            <MenuItem value={47}>New Build</MenuItem>
            <MenuItem value={57}>A2</MenuItem>
            <MenuItem value={67}>Light Work</MenuItem>
            <MenuItem value={77}>Demo</MenuItem>
            <MenuItem value={87}>No Work</MenuItem>
          </TextField>
          <TextField
            onChange={(e) => updateFormData(e, "PermitStatus")}
            select
            label="Permit Status"
            value={formData.permitStatus}
          >
            <MenuItem value={47}>ISSUED</MenuItem>
            <MenuItem value={57}>DENIED</MenuItem>
            <MenuItem value={67}>UNDER REVIEW</MenuItem>
            <MenuItem value={77}>OTHER</MenuItem>
            <MenuItem value={87}>NO IDEA</MenuItem>
          </TextField>
        </Grid>
        <Grid
          container={true}
          style={{
            padding: "0 100px",
            width: "100%",
            border: "1px solid red",
          }}
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <TextField
            onChange={(e) => updateFormData(e, "FilingDateStart")}
            value={formData.filingIssueDate.start}
            label="Filing Issue Date Start"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
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
            border: "1px solid red",
          }}
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <TextField
            onChange={(e) => updateFormData(e, "PermitIssueStart")}
            value={formData.permitIssueDate.start}
            label="Permit Issue Date Start"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            onChange={(e) => updateFormData(e, "PermitIssueEnd")}
            value={formData.permitIssueDate.end}
            label="Permit Issue Date End"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Container>
    </div>
  );
}
