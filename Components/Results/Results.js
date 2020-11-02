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

  const columns = [
    { field: "Borough", headerName: "Borough", width: 120, align: "left" },
    { field: "Address", headerName: "Address", width: 70, align: "center" },
    {
      field: "Block",
      headerName: "Block",
      type: "number",
      width: 70,
      align: "center",
    },
    {
      field: "Lot",
      headerName: "Lot",
      type: "number",
      width: 70,
      align: "center",
    },
    {
      field: "Neighborhood",
      headerName: "Neighborhood",
      width: 120,
      align: "center",
    },
    {
      field: "PermitNumber",
      headerName: "Permit Number",
      width: 120,
      align: "center",
    },
    {
      field: "PermitType",
      headerName: "Permit Type",
      width: 120,
      align: "center",
    },
    {
      field: "JobType",
      headerName: "Job Type",
      width: 120,
      align: "center",
    },
    {
      field: "PermitStatus",
      headerName: "Permit Status",
      width: 120,
      align: "center",
    },
    {
      field: "FilingDate",
      headerName: "Filing Date",
      width: 120,
      align: "center",
    },
    {
      field: "IssuanceDate",
      headerName: "Issuance Date",
      width: 120,
      align: "center",
    },
    {
      field: "JobStartDate",
      headerName: "Job Start Date",
      width: 120,
      align: "center",
    },
  ];

  let rows = [
    {
      id: "1",
      Borough: "",
      Address: "",
      Block: "",
      Lot: "",
      Neighborhood: "",
      PermitNumber: "",
      PermitType: "",
      JobType: "",
      PermitStatus: "",
      FilingDate: "",
      IssuanceDate: "",
      JobStartDate: "",
    },
  ];
  if (reqData !== null) {
    rows = [
      reqData.map((item, i) => {
        return {
          id: i,
          Borough: item.borough,
          Address: item.house__ + " " + item.street_name,
          Block: item.block,
          Lot: item.lot,
          Neighborhood: item.gis_nta_name,
          PermitNumber: item.permit_si_no,
          PermitType: item.permit_type,
          JobType: item.job_type,
          PermitStatus: item.permit_status,
          FilingDate: item.filing_date,
          IssuanceDate: item.issuance_date,
          JobStartDate: item.job_start_date,
        };
      }),
    ];
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

  console.log(rows);
  return (
    <StylesProvider injectFirst>
      <div css={mainContainer}>
        <div css={resultsCss}>
          <p>{reqData ? "Results" : null}</p>
        </div>
        <div css={listContainer}>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align}
                        style={{ width: column.width }}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      console.log("row", row);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            console.log(row[row.id][column.field]);
                            const value = row[row.id][column.field];

                            return (
                              <TableCell
                                key={column.field}
                                align={column.align}
                              >
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
