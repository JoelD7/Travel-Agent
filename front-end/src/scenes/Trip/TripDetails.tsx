import {
  faCalendar,
  faChevronLeft,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Grid, IconButton } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import {
  CustomButton,
  DashDrawer,
  Footer,
  Navbar,
  PhotoAlbumCard,
  SliderArrow,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import { tripPlaceholder } from "../../utils";
import { tripStyles } from "./trip-styles";
import Slider from "react-slick";
import Helmet from "react-helmet";

export function TripDetails() {
  const style = tripStyles();
  const trip = tripPlaceholder;

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
        breakpoint: 973,
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

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{trip.name}</title>
      </Helmet>

      <Navbar position="sticky" />

      <DashDrawer />

      <Grid container className={style.pageContentGrid}>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <CustomButton icon={faChevronLeft} rounded>
            All trips
          </CustomButton>
        </Grid>

        {/* Photo title */}
        <Grid key="photoTitle" item xs={12} className={style.photoTitleContainer}>
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12}>
              <Grid container alignItems="baseline" style={{ marginTop: "20px" }}>
                <Grid item xs={9}>
                  <Text
                    color="white"
                    component="h1"
                    style={{ margin: "0px 10px 0px 0px" }}
                  >
                    {trip.name}
                  </Text>
                </Grid>

                <Grid item xs={3}>
                  <Grid container>
                    <CustomButton className={style.itineraryButton} icon={faCalendar}>
                      Itinerary
                    </CustomButton>

                    <IconButton className={style.itineraryIconButton}>
                      <FontAwesomeIcon icon={faCalendar} color="white" />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Text color="white" component="h4" style={{ fontWeight: "normal" }}>
                    {trip.countries.join(", ")}
                  </Text>
                </Grid>
              </Grid>
            </Grid>

            {/* Trip quick info */}
            <Grid item xs={12} style={{ alignSelf: "center" }}>
              <Grid container>
                <div style={{ width: "105px" }}>
                  <Text
                    color="white"
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Photos
                  </Text>
                  <Text color="white" component="h4" style={{ textAlign: "center" }}>
                    {trip.photos}
                  </Text>
                </div>

                <div style={{ width: "105px" }}>
                  <Text
                    color="white"
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Places
                  </Text>
                  <Text color="white" component="h4" style={{ textAlign: "center" }}>
                    {trip.photos}
                  </Text>
                </div>

                <div style={{ width: "105px" }}>
                  <Text
                    color="white"
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Days
                  </Text>
                  <Text color="white" component="h4" style={{ textAlign: "center" }}>
                    {trip.days}
                  </Text>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Photos */}
        <Grid key="photos" item className={style.photosGrid}>
          <Grid container>
            <Text weight="normal" component="h2">
              Photos
            </Text>
            <CustomButton
              icon={faPlusCircle}
              iconColor="#7e7e7e"
              backgroundColor="rgba(0,0,0,0)"
              textColor="#7e7e7e"
            >
              Upload photo
            </CustomButton>
          </Grid>

          {/* Album cards */}
          <Grid container>
            {trip.albums.length > 3 ? (
              <Slider {...sliderSettings} slidesToShow={getSlidesToShow(3)}>
                {trip.albums.map((album, i) => (
                  <PhotoAlbumCard
                    albumRoute={album.albumRoute}
                    name={album.name}
                    cover={album.cover}
                    photosQant={23}
                  />
                ))}
              </Slider>
            ) : (
              trip.albums.map((album, i) => (
                <PhotoAlbumCard
                  albumRoute={album.albumRoute}
                  name={album.name}
                  cover={album.cover}
                  photosQant={23}
                />
              ))
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

      <div className={style.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
