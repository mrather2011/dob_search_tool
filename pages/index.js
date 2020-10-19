import React, { useState, useEffect } from "react";
import Head from "next/head";
import Search from "../Components/Search/Search";
import Results from "../Components/Results/Results";
import Toggle from "../Components/Toggle";
import axios from "axios";
import moment from "moment";

export default function Home(props) {
  const [reqHeader, setReqHeader] = useState({
    "X-App-Token": process.env.API_TOKEN,
  });
  const [params, setParams] = useState(null);
  const [validator, setValidator] = useState([]);
  const [formData, setFormData] = useState({
    borough: ["Manhattan"],
    address: {
      streetNumber: "",
      street: "",
      zip: "",
    },
    communityBoard: [],
    censusTract: [],
    councilDistrict: [],
    buildingType: [],
    jobType: [],
    permitStatus: [],
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

  const clearResultsHandler = () => {
    setReqData();
  };

  let boroughSearchParam = new URLSearchParams();
  boroughSearchParam.append(
    "$where",
    "borough='MANHATTAN' OR borough='BROOKLYN'"
  );

  let request = {
    params: {
      $where: "borough='MANHATTAN' OR borough='BROOKLYN'",
      $limit: 100,
    },
  };

  const setParamsHandler = () => {
    setParams({
      boroughSearchParam,
    });
  };

  const dateFormatHandler = (date) => {
    let dateFormat = moment(date).format("MM/DD/YYYY");
  };

  useEffect(() => {
    setParamsHandler();
  }, [reqData]);

  const getReqData = (e) => {
    e.preventDefault();
    axios
      .get("https://data.cityofnewyork.us/resource/ipu4-2q9a.json", request)
      .then((res) => {
        setReqData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getValidationData = (select, limit) => {
    let buildingsRequest = {
      params: {
        $select: select,
        $group: select,
        $limit: limit,
      },
    };

    axios
      .get(
        "https://data.cityofnewyork.us/resource/ipu4-2q9a.json",
        buildingsRequest
      )
      .then((res) => {
        console.log(buildingsRequest.params.$select);
        setValidator({
          ...validator,
          borough: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getValidationData("borough", 10);
  }, []);

  console.log(validator);

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

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toggle />
      <Search
        setReqData={setReqData}
        formData={formData}
        getReqData={getReqData}
        updateFormData={updateFormData}
      />
      <Results reqData={reqData} />
    </div>
  );
}
