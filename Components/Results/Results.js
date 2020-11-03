/** @jsx jsx */
import React, { useState } from "react";
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
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

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
  position: relative;
  top: 50px;
  left: 10%;
  height: ${reqData ? `500px` : `0px`};
  width: 80%;
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

  const columns = [
    { id: "Borough", label: "Borough", minWidth: 170, align: "left" },
    {
      id: "Address",
      label: "Address",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Block",
      label: "Block",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Lot",
      label: "Lot",
      minWidth: 170,
      align: "center",
      format: (value) => value.toFixed(2),
    },
    {
      id: "Neighborhood",
      label: "Neighborhood",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "PermitNumber",
      label: "Permit Number",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "PermitType",
      label: "Permit Type",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "JobType",
      label: "Job Type",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "PermitStatus",
      label: "Permit Status",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "FilingDate",
      label: "Filing Date",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "IssuanceDate",
      label: "Issuance Date",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "JobStartDate",
      label: "Job Start Date",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(
    Borough,
    Address,
    Block,
    Lot,
    Neighborhood,
    PermitNumber,
    PermitType,
    JobType,
    PermitStatus,
    FilingDate,
    IssuanceDate,
    JobStartDate
  ) {
    return {
      Borough,
      Address,
      Block,
      Lot,
      Neighborhood,
      PermitNumber,
      PermitType,
      JobType,
      PermitStatus,
      FilingDate,
      IssuanceDate,
      JobStartDate,
    };
  }

  const rows = [];

  if (reqData) {
    reqData.forEach((item, i) =>
      rows.push(
        createData(
          item.borough,
          item.house__ + " " + item.street_name,
          item.block,
          item.lot,
          item.gis_nta_name,
          item.permit_si_no,
          item.permit_type,
          item.permit_status,
          item.filing_date,
          item.issuance_date,
          item.job_start_date
        )
      )
    );
  }

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <StylesProvider injectFirst>
      <div css={mainContainer}>
        {/* <div css={resultsCss}>
          <p>{reqData ? "Results" : null}</p>
        </div> */}
        <div css={listContainer}>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </StylesProvider>
  );
};

export default Results;
