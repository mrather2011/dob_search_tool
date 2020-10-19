import React from "react";
import { Container, Grid } from "@material-ui/core";

const Toggle = (props) => {
  return (
    <div>
      <Container
        maxWidth="md"
        style={{ height: "50px", border: "1px solid black" }}
      >
        <Grid
          container={true}
          style={{
            padding: "0 100px",
            width: "100%",
            marginBottom: "10px",
          }}
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <div
            style={{
              cursor: "pointer",
              height: "50px",
              width: "100px",
              position: "relative",
              top: "0",
              left: "0px",
              border: "1px solid black",
            }}
          >
            Show Results
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Toggle;
