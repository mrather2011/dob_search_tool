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
    borough: ["MANHATTAN"],
    block: "",
    lot: "",
    address: {
      streetNumber: [],
      street: [],
      zip: [],
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

  let whereArray = [];
  let exportArray = [];

  const updateWhereCriteria = (formInfo, searchKey) => {
    let updateHelper;

    if (formInfo && searchKey === "issuance_date") {
      let dateHelper = [];
      dateHelper = Object.values(formData.permitIssueDate);
      if (dateHelper.length > 1) {
        if (dateHelper[0]) {
          updateHelper = `${searchKey}>='${formInfo}' `;
        } else if (dateHelper[1]) {
          updateHelper = `${searchKey}<='${formInfo}' `;
        }
      } else if (formInfo) {
        updateHelper = `${searchKey}='${formInfo}' `;
      }
      console.log(dateHelper);
    }
    if (formInfo && typeof formInfo !== "undefined" && formInfo.length > 0) {
      if (typeof formInfo === "object" || typeof formInfo === "array") {
        updateHelper = formInfo
          .map((item, i) => {
            return `${searchKey}='${item}' `;
          })
          .join(formInfo.length > 1 && "OR ");
      } else if (formInfo) {
        updateHelper = `${searchKey}='${formInfo}' `;
      }
      whereArray.push(updateHelper);
    }
  };

  const updateAllWhereCriteria = (formInfo, searchKey) => {
    updateWhereCriteria(formData.borough, "borough");
    updateWhereCriteria(formData.block, "block");
    updateWhereCriteria(formData.lot, "lot");
    updateWhereCriteria(formData.address.streetNumber, "house__");
    updateWhereCriteria(formData.address.street, "street_name");
    updateWhereCriteria(formData.address.zip, "zip_code");
    updateWhereCriteria(formData.communityBoard, "community_board");
    updateWhereCriteria(formData.councilDistrict, "gis_council_district");
    updateWhereCriteria(formData.buildingType, "bldg_type");
    updateWhereCriteria(formData.jobType, "job_type");
    updateWhereCriteria(formData.permitStatus, "permit_status");
    updateWhereCriteria(formData.permitIssueDate.start, "issuance_date");
    updateWhereCriteria(formData.permitIssueDate.end, "issuance_date");
    updateWhereCriteria(formData.filingIssueDate.start, "filing_date");
    updateWhereCriteria(formData.filingIssueDate.end, "filing_date");

    exportArray = whereArray.map((item, i) => {
      if (item.includes("OR")) {
        return `(${item})`;
      } else {
        return item;
      }
    });

    if (exportArray.length > 1) {
      exportArray = exportArray.join(" AND ");
    }
  };

  updateAllWhereCriteria();

  console.log("export array", exportArray);
  console.log("typeof export", typeof exportArray);
  console.log("formData", formData);

  let request = {
    params: {
      $where: exportArray.length === 1 ? exportArray.shift() : exportArray,

      $limit: 100,
    },
  };

  const dateFormatHandler = (date) => {
    let dateFormat = moment(date).format("MM/DD/YYYY");
  };

  // useEffect(() => {
  //   setParamsHandler();
  // }, [reqData]);

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

  const getValidationData = (select, limit, subLoc) => {
    let selectCriteria = subLoc ? `${select},${subLoc}` : select;
    let groupCriteria = subLoc ? `${select},${subLoc}` : select;
    let buildingsRequest = {
      params: {
        $select: selectCriteria,
        $group: groupCriteria,

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
            let dataTransform = res.data
              .map((item, i) => item.borough)
              .sort((a, b) => (a < b ? 1 : -1));

            setBorough(dataTransform);
            break;
          case "block":
            dataTransform = res.data
              .map((item, i) => item.block)
              .sort((a, b) => (a < b ? 1 : -1));

            setBlock(dataTransform);
            break;
          case "lot":
            dataTransform = res.data
              .map((item, i) => item.lot)
              .sort((a, b) => (a < b ? 1 : -1));

            setLot(dataTransform);
            break;
          case "street_name":
            dataTransform = res.data
              .map((item, i) => item.street_name)
              .sort((a, b) => a - b);

            setStreetName(dataTransform);
            break;
          case "zip_code":
            dataTransform = res.data
              .map((item, i) => item.zip_code)
              .sort((a, b) => a - b);
            setZipCode(dataTransform);
            break;
          case "community_board":
            setCommBoard(res.data);
            break;
          case "gis_council_district":
            setCouncil(res.data);
            break;
          case "bldg_type":
            dataTransform = res.data
              .map((item, i) => item.bldg_type)
              .sort((a, b) => (a < b ? 1 : -1));
            setBuildingType(dataTransform);
            break;
          case "job_type":
            dataTransform = res.data
              .map((item, i) => item.job_type)
              .sort((a, b) => (a < b ? 1 : -1));

            setJobType(dataTransform);
            break;
          case "permit_status":
            dataTransform = res.data
              .map((item, i) => item.permit_status)
              .sort((a, b) => (a < b ? 1 : -1));

            setPermitStatus(dataTransform);
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
    getValidationData("zip_code", 300, "borough");
    getValidationData("community_board", 200, "borough");
    getValidationData("gis_council_district", 10000, "borough");
    getValidationData("bldg_type", 50);
    getValidationData("job_type", 50);
    getValidationData("permit_status", 50);
  }, []);

  // console.log(formData);
  // console.log("zip", zipCode);
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
        commBoard={commBoard}
        council={council}
        buildingType={buildingType}
        jobType={jobType}
        permitStatus={permitStatus}
        block={block}
        lot={lot}
        borough={borough}
        zipCode={zipCode}
        streetName={streetName}
        setReqData={setReqData}
        formData={formData}
        getReqData={getReqData}
        updateFormData={updateFormData}
      />
      <Results reqData={reqData} />
    </div>
  );
}
