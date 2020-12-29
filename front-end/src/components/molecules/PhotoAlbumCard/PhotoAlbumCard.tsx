import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Card, CardActionArea, CardContent, CardMedia } from "@material-ui/core";
import React from "react";
import { Colors } from "../../../styles";
import { CustomButton, IconText, Text } from "../../atoms";
import { photoAlbumStyles } from "./photoAlbumCard-styles";

interface PhotoAlbumCard {
  albumRoute: string;
  cover: string;
  name: string;
  photosQant: number;
}

export function PhotoAlbumCard({ cover, albumRoute, name, photosQant }: PhotoAlbumCard) {
  const styles = photoAlbumStyles();

  return (
    <Card className={styles.card}>
      <CardMedia component="img" height="150" src={cover} />
      <CardContent>
        <Text weight="bold" component="h4" style={{ color: Colors.BLUE }}>
          {name}
        </Text>
        <IconText
          icon={faCamera}
          text={
            photosQant > 1
              ? `${String(photosQant)} photos`
              : `${String(photosQant)} photo`
          }
        />
        <div>
          <CustomButton
            style={{ marginLeft: "auto", display: "block" }}
            backgroundColor={Colors.PURPLE}
          >
            View album
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  );
}
