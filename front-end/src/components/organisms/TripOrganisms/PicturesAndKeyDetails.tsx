import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Divider, Grid, Grow, makeStyles, Theme } from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { Colors } from "../../../styles";
import { Trip } from "../../../utils";
import { CustomButton, Text } from "../../atoms";
import { AlbumCard, NotCreatedMessage } from "../../molecules";
import { TripPictureUploader } from "./TripPictureUploader";

interface PicturesAndKeyDetailsProps {
  trip: Trip;
  showAll?: boolean;
}

export const PicturesAndKeyDetails = React.memo(function Component({
  trip,
  showAll = true,
}: PicturesAndKeyDetailsProps) {
  const photosKeyDetailsStyles = makeStyles((theme: Theme) => ({
    detailsContainer: {
      borderRadius: "10px",
      border: "1px solid #CECECE",
      padding: "10px",
    },
    detailsGrid: {
      padding: "20px",
      width: "25%",
      [theme.breakpoints.down(1155)]: {
        width: "100%",
      },
      [theme.breakpoints.down(973)]: {
        width: "100%",
      },
    },
    photosGrid: {
      marginTop: "20px",
      width: "75%",
      [theme.breakpoints.down(1155)]: {
        width: "100%",
      },
      [theme.breakpoints.down(973)]: {
        width: "100%",
      },
    },
    slider: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  }));

  const style = photosKeyDetailsStyles();
  const [openDialog, setOpenDialog] = useState(false);

  function openPhotoUploader() {
    setOpenDialog(true);
  }

  function closePhotoUploader() {
    setOpenDialog(false);
  }

  function getAlbumsToShow() {
    return showAll ? trip.albums : trip.albums.slice(0, 3);
  }

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <Grid item xs={12}>
        <Grid container>
          {/* Photos */}
          <Grid key="photos" item className={style.photosGrid}>
            <Grid container>
              <Text bold color={Colors.BLUE} component="h2">
                Photos
              </Text>
              <CustomButton
                icon={faPlusCircle}
                iconColor="#7e7e7e"
                backgroundColor="rgba(0,0,0,0)"
                textColor="#7e7e7e"
                onClick={() => openPhotoUploader()}
              >
                Upload photo
              </CustomButton>
            </Grid>

            {/* Album cards */}
            <Grid container>
              {getAlbumsToShow().map((album, i) => (
                <AlbumCard
                  key={album.name}
                  uuid={album.uuid as string}
                  name={album.name}
                  cover={album.cover}
                  picturesQant={album.pictures.length}
                />
              ))}

              {trip.albums.length === 0 && (
                <NotCreatedMessage
                  actionFunction={() => openPhotoUploader()}
                  type="ALBUMS"
                  message="You have no albums created."
                />
              )}
            </Grid>
          </Grid>

          {/* Key details */}
          <Grid key="details" item className={style.detailsGrid}>
            <div className={style.detailsContainer}>
              <Text bold color={Colors.BLUE} component="h3">
                Key details
              </Text>
              <Divider style={{ marginBottom: "10px" }} variant="fullWidth" />

              <Text weight="bold" component="h4">
                Countries
              </Text>
              <Text component="p">{trip.countries.join(", ")}</Text>

              <Text weight="bold" component="h4">
                From
              </Text>
              <Text component="p">{format(trip.startDate, "MMM. dd, yyyy")}</Text>

              <Text weight="bold" component="h4">
                To
              </Text>
              <Text component="p">{format(trip.endDate, "MMM. dd, yyyy")}</Text>
            </div>
          </Grid>
        </Grid>

        <TripPictureUploader
          open={openDialog}
          onClose={() => closePhotoUploader()}
          trip={trip}
        />
      </Grid>
    </Grow>
  );
});
