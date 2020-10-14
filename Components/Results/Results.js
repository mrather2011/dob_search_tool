import React from "react";
import {
  Container,
  Grid,
  Input,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";

const Results = ({ reqData }) => {
  return (
    <div>
      <ul style={{ width: "100%", listStyle: "none" }}>
        {reqData &&
          reqData.map((item, i) => {
            return (
              <Grid
                container={true}
                style={{
                  height: "150px",
                  width: "100%",
                  border: "1px solid red",
                }}
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <li>Borough: {item.borough}</li>
                <li>Block: {item.block}</li>
                <li>Lot: {item.lot}</li>
                <li>
                  Address: {item.house__} {item.street_name}
                </li>
              </Grid>
            );
          })}
      </ul>
    </div>
  );
};

export default Results;
