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
  const [borough, setBorough] = useState([]);
  const [block, setBlock] = useState([]);
  const [lot, setLot] = useState([]);
  const [streetName, setStreetName] = useState([]);
  const [zipCode, setZipCode] = useState([]);
  const [commBoard, setCommBoard] = useState([]);
  const [council, setCouncil] = useState([]);
  const [buildingType, setBuildingType] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [permitStatus, setPermitStatus] = useState([]);
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
      $limit: 10,
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
        switch (select) {
          case "borough":
            console.log(res.data);
            setBorough(res.data);
            break;
          case "block":
            console.log(res.data);
            setBlock(res.data);
            break;
          case "lot":
            console.log(res.data);
            setLot(res.data);
            break;
          case "street_name":
            console.log(res.data);
            setStreetName(res.data);
            break;
          case "zip_code":
            console.log(res.data);
            setZipCode(res.data);
            break;
          case "community_board":
            console.log(res.data);
            setCommBoard(res.data);
            break;
          case "gis_council_district":
            console.log(res.data);
            setCouncil(res.data);
            break;
          case "bldg_type":
            console.log(res.data);
            setBuildingType(res.data);
            break;
          case "job_type":
            console.log(res.data);
            setJobType(res.data);
            break;
          case "permit_status":
            console.log(res.data);
            setPermitStatus(res.data);
            break;
          default:
            return null;
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getValidationData("block", 10);
    getValidationData("lot", 10);
    getValidationData("borough", 10);
    getValidationData("street_name", 10);
    getValidationData("zip_code", 10);
    getValidationData("community_board", 10);
    getValidationData("gis_council_district", 10);
    getValidationData("bldg_type", 10);
    getValidationData("job_type", 10);
    getValidationData("permit_status", 10);
  }, []);

  // console.log("borough", borough);
  // console.log("block", block);
  // console.log("lot", lot);
  // console.log("permitStatus", permitStatus);
  // console.log("job type", jobType);

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
