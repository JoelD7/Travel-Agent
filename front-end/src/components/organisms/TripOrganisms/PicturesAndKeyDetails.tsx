import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Divider, Grid, Grow, makeStyles, Theme } from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import Slider from "react-slick";
import { Colors } from "../../../styles";
import { Trip } from "../../../utils";
import { CustomButton, SliderArrow, Text } from "../../atoms";
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
      [theme.breakpoints.down(1036)]: {
        width: "30%",
      },
      [theme.breakpoints.down(973)]: {
        width: "100%",
      },
    },
    photosGrid: {
      marginTop: "20px",
      width: "75%",
      [theme.breakpoints.down(1036)]: {
        width: "70%",
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

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1244,
        settings: {
          slidesToShow: getSlidesToShow(2),
          slidesToScroll: getSlidesToShow(2),
        },
      },
      {
        breakpoint: 1010,
        settings: {
          slidesToShow: getSlidesToShow(1),
          slidesToScroll: getSlidesToShow(1),
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: getSlidesToShow(3),
          slidesToScroll: getSlidesToShow(3),
        },
      },
      {
        breakpoint: 826,
        settings: {
          slidesToShow: getSlidesToShow(2),
          slidesToScroll: getSlidesToShow(2),
        },
      },
      {
        breakpoint: 608,
        settings: {
          slidesToShow: getSlidesToShow(1),
          slidesToScroll: getSlidesToShow(1),
        },
      },
    ],
  };

  function getSlidesToShow(def: number) {
    return trip.albums.length > def ? def : trip.albums.length;
  }

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
                  id={album.idAlbum as string}
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
