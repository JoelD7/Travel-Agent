import Helmet from "react-helmet";
import React, { useState } from "react";
import { createTripStyles } from "./createTrip-styles";
import {
  Navbar,
  DashDrawer,
  Text,
  CreateTripTF,
  IconTP,
  ImageUploader,
} from "../../components";
import { Grid } from "@material-ui/core";
import { Colors } from "../../styles";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export function CreateTrip() {
  const style = createTripStyles();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Create a trip</title>
      </Helmet>

      <Navbar position="sticky" />
      <DashDrawer />

      {/* Page container */}
      <Grid container className={style.pageContainer}>
        {/* Create trip */}
        <Grid item xs={12} style={{ marginBottom: 25 }}>
          <Text component="h1" color={Colors.BLUE}>
            Create trip
          </Text>
        </Grid>

        {/* Params container */}
        <Grid item xs={12}>
          <Grid container className={style.paramsContainer}>
            {/* left Pane */}
            <Grid item className={style.leftPane}>
              {/* Trip name */}
              <CreateTripTF value={name} updateState={(value) => setName(value)} />

              {/* Image upload */}
              <div style={{ marginTop: 45 }}>
                <Grid container alignItems="center" style={{ width: 385 }}>
                  <Text component="h2" color={Colors.BLUE}>
                    Add a cover
                  </Text>

                  <IconTP style={{ marginLeft: 10 }} icon={faImage} />
                </Grid>

                <ImageUploader />
              </div>
            </Grid>

            {/* right Pane */}
            <Grid item className={style.rightPane}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
