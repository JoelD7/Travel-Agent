import { Card, CardActionArea, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Colors, Shadow } from "../../../styles";
import { Trip } from "../../../utils";
import { CustomButton, Text } from "../../atoms";

interface PhotoAlbumCard {
  albumRoute: string;
  cover: string;
  name: string;
  photosQant: number;
}

export const PhotoAlbumCard = React.memo(function PhotoAlbumCard({
  cover,
  albumRoute,
  name,
  photosQant,
}: PhotoAlbumCard) {
  const photoAlbumStyles = makeStyles((theme: Theme) => ({
    buttonGrid: {
      width: "50%",
      [theme.breakpoints.down(1140)]: {
        width: "100%",
      },
    },
    card: {
      borderRadius: "10px",
      boxShadow: Shadow.LIGHT3D,
      margin: "10px",
      height: 250,
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('${cover}')`,
      backgroundSize: "cover",

      [theme.breakpoints.down(360)]: {
        height: 200,
      },
    },
    nameGrid: {
      width: "50%",
      [theme.breakpoints.down(1140)]: {
        width: "100%",
      },
    },

    viewButton: {
      marginLeft: "auto",
      display: "block",
      marginTop: "auto",
      fontSize: "14px !important",
      boxShadow: "3px 3px 10px rgb(28 28 28 / 80%), 3px 3px 10px rgb(10 10 10 / 80%)",
    },
  }));

  const style = photoAlbumStyles();

  return (
    <Card className={style.card}>
      <CardActionArea style={{ padding: "10px", height: "100%" }}>
        <Grid container style={{ height: "100%" }} alignContent="flex-end">
          {/* Name */}
          <Grid item className={style.nameGrid}>
            <Text weight="bold" component="h4" style={{ color: "white" }}>
              {name}
            </Text>

            <Text style={{ color: "white" }}>
              {photosQant > 1
                ? `${String(photosQant)} photos`
                : `${String(photosQant)} photo`}
            </Text>
          </Grid>

          {/* Button */}
          <Grid item className={style.buttonGrid}>
            <Grid container style={{ height: "100%" }}>
              <CustomButton
                className={style.viewButton}
                rounded
                backgroundColor={Colors.PURPLE}
              >
                View album
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
});
