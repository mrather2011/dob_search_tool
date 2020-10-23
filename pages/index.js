import React, { useState, useEffect } from "react";
import Head from "next/head";
import Search from "../Components/Search/Search";
import Results from "../Components/Results/Results";
import Toggle from "../Components/Toggle";
import axios from "axios";
import moment from "moment";
import Geocode from "react-geocode";

export default function Home(props) {
  const [reqHeader, setReqHeader] = useState({
    "X-App-Token": process.env.API_TOKEN,
  });
  const [params, setParams] = useState(null);
  const [borough, setBorough] = useState([]);
  const [block, setBlock] = useState([]);
  const [lot, setLot] = useState([]);

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
    address: "",
    street_number: "",
    street_name: "",
    zip_code: "",
    gis_latitude: "",
    gis_longitude: "",
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
    console.log(formInfo.length);

    if (
      (formInfo && searchKey === "gis_latitude") ||
      (formInfo && searchKey === "gis_longitude")
    ) {
      updateHelper = `${searchKey} INCLUDES(':${formInfo}')`;
      whereArray.push(updateHelper);
    } else if (formInfo && searchKey === "issuance_date_start") {
      let dateHelper = [];
      dateHelper = `issuance_date>='${formData.permitIssueDate.start}' `;
      updateHelper = dateHelper;
      whereArray.push(updateHelper);
    } else if (formInfo && searchKey === "issuance_date_end") {
      let dateHelper = [];
      dateHelper = `issuance_date<='${formData.permitIssueDate.end}' `;
      updateHelper = dateHelper;
      whereArray.push(updateHelper);
    } else if (formInfo && searchKey === "filing_date_start") {
      let dateHelper = [];
      dateHelper = `filing_date>='${formData.filingIssueDate.start}' `;
      updateHelper = dateHelper;
      whereArray.push(updateHelper);
    } else if (formInfo && searchKey === "filing_date_end") {
      let dateHelper = [];
      dateHelper = `filing_date<='${formData.filingIssueDate.end}' `;
      updateHelper = dateHelper;
      whereArray.push(updateHelper);
    } else if (
      formInfo &&
      typeof formInfo !== "undefined" &&
      formInfo.length > 0
    ) {
      if (typeof formInfo === "object" || typeof formInfo === "array") {
        updateHelper = formInfo
          .map((item, i) => {
            return `${searchKey}='${item}' `;
          })
          .join(formInfo.length > 1 && "OR ");
      } else {
        updateHelper = `${searchKey}='${formInfo}' `;
      }
      whereArray.push(updateHelper);
    }
  };

  const updateAllWhereCriteria = (formInfo, searchKey) => {
    updateWhereCriteria(formData.borough, "borough");
    updateWhereCriteria(formData.block, "block");
    updateWhereCriteria(formData.lot, "lot");
    updateWhereCriteria(formData.street_name, "street_name");
    updateWhereCriteria(formData.street_number, "house__");
    updateWhereCriteria(formData.zip_code, "zip_code");
    updateWhereCriteria(formData.communityBoard, "community_board");
    updateWhereCriteria(formData.councilDistrict, "gis_council_district");
    updateWhereCriteria(formData.buildingType, "bldg_type");
    updateWhereCriteria(formData.jobType, "job_type");
    updateWhereCriteria(formData.permitStatus, "permit_status");
    updateWhereCriteria(formData.permitIssueDate.start, "issuance_date_start");
    updateWhereCriteria(formData.permitIssueDate.end, "issuance_date_end");
    updateWhereCriteria(formData.filingIssueDate.start, "filing_date_start");
    updateWhereCriteria(formData.filingIssueDate.end, "filing_date_end");

    exportArray = whereArray.map((item, i) => {
      if (item && item.includes("OR")) {
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

  console.log("where array", whereArray);
  console.log("export array", exportArray);
  console.log("formdata", formData);

  let request = {
    params: {
      $where: exportArray.length === 1 ? exportArray.shift() : exportArray,

      $limit: 100,
    },
  };

  const dateFormatHandler = (date) => {
    let dateFormat = moment(date).format("MM/DD/YYYY");
  };

  const getAddressFromGeo = (address) => {
    Geocode.setApiKey(process.env.NEXT_PUBLIC_APIKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("en");

    if (!address) {
      setFormData({
        ...formData,
        address: "",
        gis_longitude: "",
        gis_latitude: "",
      });
    } else if (address && typeof address !== "undefined") {
      Geocode.fromAddress(address)
        .then((res) => {
          console.log(res.results[0]);
          setFormData({
            ...formData,
            address: res.results[0].formatted_address,
            street_name: res.results[0].address_components[1].short_name.toUpperCase(),
            street_number: res.results[0].address_components[0].short_name.toString(),
            zip_code: res.results[0].address_components[7].short_name.toString(),
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            address: "",
            gis_longitude: "",
            gis_latitude: "",
          });
          console.log(err);
        });
    }
  };

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
        setFormData({
          ...formData,
          address: e.target.value,
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
        getAddressFromGeo={getAddressFromGeo}
        commBoard={commBoard}
        council={council}
        buildingType={buildingType}
        jobType={jobType}
        permitStatus={permitStatus}
        block={block}
        lot={lot}
        borough={borough}
        zipCode={zipCode}
        setReqData={setReqData}
        formData={formData}
        getReqData={getReqData}
        updateFormData={updateFormData}
      />
      <Results reqData={reqData} />
    </div>
  );
}
