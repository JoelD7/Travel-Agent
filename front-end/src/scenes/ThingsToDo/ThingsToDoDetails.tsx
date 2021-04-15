import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import {
  faClock,
  faGlobe,
  faHeart,
  faMapMarkerAlt,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Grid, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router";
import { Font } from "../../assets";
import {
  CustomButton,
  Footer,
  IconText,
  IncludeInTripPopover,
  Navbar,
  NotAvailableCard,
  ProgressCircle,
  Rating,
  ServicesToolbar,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import { thingsToDoDetailsStyles as thingsToDoDetailsStyles } from "./thingsToDoDetails-styles";

export function ThingsToDoDetails() {
  const [poi, setPOI] = useState<POI>();

  const { id } = useParams<any>();

  const [tripAnchor, setTripAnchor] = useState<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const [loading, setLoading] = useState(true);

  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackRemoved, setOpenSnackRemoved] = useState(false);

  useEffect(() => {
    fetchPOIDetail()
      .then((res) => {
        setPOI(res.data.response.venue);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  function fetchPOIDetail() {
    return Axios.get(`https://api.foursquare.com/v2/venues/${id}`, {
      headers: {
        "Accept-Language": "en",
      },
      params: {
        client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
        client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
        v: "20210104",
      },
    });
  }

  function photoURLBuilder(photo: POIPhotoItems) {
    if (photo) {
      return `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`;
    }
    return " ";
  }

  function parseAddress(poi: POI) {
    if (poi.location.formattedAddress === undefined) {
      return;
    }

    if (poi.location.formattedAddress.length === 1) {
      return `${poi.location.formattedAddress[0]}`;
    }

    return `${poi.location.formattedAddress[0]}, ${
      poi.location.formattedAddress[1].split(",")[0]
    }`;
  }

  function parseHours(poi: POI) {
    let hours = "";
    let timeframes = poi.hours.timeframes;

    for (let i = 0; i < timeframes.length; i++) {
      const e = timeframes[i];
      hours += e.days + ", ";

      for (let j = 0; j < e.open.length; j++) {
        const time = e.open[j];
        hours += time.renderedTime;
        if (j < e.open.length - 1) {
          hours += ",";
        }
      }

      if (i < timeframes.length - 1) {
        hours += " | ";
      }
    }
    return hours;
  }

  function parseAttributes(poi: POI) {
    let attributes = "";
    for (let i = 0; i < poi.attributes.groups.length; i++) {
      const e = poi.attributes.groups[i];
      attributes += e.name;
      if (i < poi.attributes.groups.length - 1) {
        attributes += ", ";
      }
    }
    return attributes;
  }

  function onIncludeTripClick(event: MouseEvent<HTMLButtonElement>) {
    setTripAnchor(event.currentTarget);
    setOpenPopover(true);
  }

  function hasContactInfo(): boolean {
    if (!poi) {
      return false;
    }

    return (
      poi.contact.formattedPhone !== undefined ||
      poi.contact.facebookName !== undefined ||
      poi.contact.twitter !== undefined
    );
  }

  function addToFavorites() {
    if (poi) {
      if (!poi.favorite) {
        setPOI({ ...poi, favorite: true });
        setOpenSnack(true);
      } else {
        setPOI({ ...poi, favorite: false });
        setOpenSnackRemoved(true);
      }
    }
  }

  const style = thingsToDoDetailsStyles();
  return (
    <div className={style.mainContainer}>
      <Navbar />
      <ServicesToolbar />

      {poi && (
        <Helmet>
          <title>{poi.name}</title>
        </Helmet>
      )}

      {loading && (
        <div className={style.progressCircleContainer}>
          <ProgressCircle />
        </div>
      )}

      {/* Page content */}
      <Grid
        container
        spacing={2}
        style={loading ? { filter: "blur(4px)" } : {}}
        className={style.pageContentContainer}
      >
        {poi && (
          <>
            <Grid item key="title" xs={12}>
              {/* Title and include in trip */}
              <Grid container alignItems="center">
                <Grid item className={style.titleRatingGrid}>
                  <Text component="h1" bold color={Colors.BLUE}>
                    {poi.name}
                  </Text>

                  {/* Rating */}
                  {poi.rating && (
                    <Rating size={30} type="star" readonly score={poi.rating} />
                  )}
                </Grid>

                <CustomButton
                  style={{ boxShadow: Shadow.LIGHT, marginLeft: "auto" }}
                  onClick={(e) => onIncludeTripClick(e)}
                  backgroundColor={Colors.GREEN}
                  rounded
                >
                  Include in trip
                </CustomButton>

                <IconButton
                  style={{ margin: "auto 0px auto 10px" }}
                  onClick={() => addToFavorites()}
                >
                  <FontAwesomeIcon
                    icon={poi.favorite ? faHeart : faHeartReg}
                    color={Colors.PURPLE}
                  />
                </IconButton>
              </Grid>
            </Grid>

            {/* Image */}
            <Grid
              item
              className={poi.bestPhoto ? style.imageGrid : style.imageGridNoImage}
            >
              <Grid container style={{ height: "100%" }}>
                {poi.bestPhoto ? (
                  <img
                    src={photoURLBuilder(poi.bestPhoto)}
                    className={style.images}
                    alt="restaurant image"
                  />
                ) : (
                  <NotAvailableCard variant="vertical" title="Sorry">
                    This place has no photos available.
                  </NotAvailableCard>
                )}
              </Grid>
            </Grid>

            {/* Details */}
            <Grid item className={style.detailsGrid}>
              <div className={style.detailsContainer}>
                <Text bold style={{ marginBottom: "15px" }} color="white" component="h3">
                  Details
                </Text>

                {hasContactInfo() && (
                  <Text bold style={{ marginBottom: "7px" }} color="white" component="h4">
                    Contact
                  </Text>
                )}

                {poi.contact.formattedPhone && (
                  <IconText
                    textColor="white"
                    icon={faPhone}
                    fontSize={15}
                    text={poi.contact.formattedPhone}
                  />
                )}

                {poi.contact.facebookName && (
                  <IconText
                    textColor="white"
                    icon={faFacebook}
                    fontSize={15}
                    text={poi.contact.facebookName}
                  />
                )}

                {poi.contact.twitter && (
                  <IconText
                    textColor="white"
                    style={{ marginBottom: "20px" }}
                    icon={faTwitter}
                    fontSize={15}
                    text={poi.contact.twitter}
                  />
                )}

                {poi.location.formattedAddress && (
                  <div>
                    <Text
                      bold
                      style={{ marginBottom: "7px" }}
                      color="white"
                      component="h4"
                    >
                      Address
                    </Text>
                    <IconText
                      textColor="white"
                      style={{ marginBottom: "20px" }}
                      icon={faMapMarkerAlt}
                      fontSize={15}
                      text={parseAddress(poi)}
                    />
                  </div>
                )}

                {poi.hours && poi.hours.timeframes && (
                  <div>
                    <Text
                      bold
                      style={{ marginBottom: "7px" }}
                      color="white"
                      component="h4"
                    >
                      Hours
                    </Text>
                    <IconText
                      textColor="white"
                      style={{ marginBottom: "20px" }}
                      icon={faClock}
                      fontSize={15}
                      text={parseHours(poi)}
                    />
                  </div>
                )}

                {poi.url && (
                  <div>
                    <Text
                      bold
                      style={{ marginBottom: "7px" }}
                      color="white"
                      component="h4"
                    >
                      Website
                    </Text>
                    <IconText
                      textColor="white"
                      style={{ marginBottom: "20px" }}
                      icon={faGlobe}
                      fontSize={15}
                      text={poi.url}
                    />
                  </div>
                )}

                {poi.attributes.groups.length > 0 && (
                  <div>
                    <Text
                      bold
                      style={{ marginBottom: "7px" }}
                      color="white"
                      component="h4"
                    >
                      Amenities
                    </Text>
                    <IconText
                      textColor="white"
                      style={{ marginBottom: "20px" }}
                      icon={faStar}
                      fontSize={15}
                      text={parseAttributes(poi)}
                    />
                  </div>
                )}
              </div>
            </Grid>

            {poi.description && (
              <Grid item className={style.aboutGrid}>
                <div className={style.aboutContainer}>
                  <Text component="h2" bold color={Colors.BLUE}>
                    About
                  </Text>
                  <Divider className={style.divider} />
                  <Text>{poi.description}</Text>
                </div>
              </Grid>
            )}
          </>
        )}
      </Grid>

      {poi && (
        <IncludeInTripPopover
          place={poi}
          tripAnchor={tripAnchor}
          setTripAnchor={setTripAnchor}
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        />
      )}

      {poi && (
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={() => setOpenSnack(false)}
        >
          <Alert
            style={{ fontFamily: Font.Family }}
            variant="filled"
            elevation={6}
            onClose={() => setOpenSnack(false)}
            severity="success"
          >
            {"Added to favorites."}
          </Alert>
        </Snackbar>
      )}

      {poi && (
        <Snackbar
          open={openSnackRemoved}
          autoHideDuration={6000}
          onClose={() => setOpenSnackRemoved(false)}
        >
          <Alert
            style={{ fontFamily: Font.Family }}
            variant="filled"
            elevation={6}
            onClose={() => setOpenSnackRemoved(false)}
            severity="error"
          >
            {"Removed from favorites."}
          </Alert>
        </Snackbar>
      )}

      <Footer />
    </div>
  );
}
