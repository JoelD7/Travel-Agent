import { Grid } from "@material-ui/core";
import React from "react";
import { CustomButton, IconText, Navbar, ServicesToolbar, Text } from "../../components";
import { poiPlaceholder } from "../../utils";
import { thingsToDoDetailsStyles as thingsToDoDetailsStyles } from "./thingsToDoDetails-styles";
import Ratings from "react-ratings-declarative";
import { Colors, Shadow } from "../../styles";
import {
  faClock,
  faGlobe,
  faMapMarkerAlt,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

export function ThingsToDoDetails() {
  const poi = poiPlaceholder;

  function photoURLBuilder(photo: POIPhotoItems) {
    return `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`;
  }

  function parseAddress(poi: POI) {
    if (poi.location.formattedAddress === undefined) {
      return;
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

  const style = thingsToDoDetailsStyles();
  return (
    <div className={style.mainContainer}>
      <Navbar />
      <ServicesToolbar />

      <Grid container spacing={2} className={style.pageContentContainer}>
        <Grid item key="title" xs={12}>
          <Grid container alignItems="baseline">
            <Grid item xs={8}>
              <Text component="h2">{poi.name}</Text>
              <Ratings
                rating={poi.rating / 2}
                widgetRatedColors={Colors.PURPLE}
                widgetHoverColors={Colors.PURPLE}
                widgetDimensions="25px"
                widgetSpacings="4px"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <Ratings.Widget key={n} />
                ))}
              </Ratings>
            </Grid>
            <CustomButton
              style={{ boxShadow: Shadow.LIGHT, marginLeft: "auto", height: "50px" }}
              onClick={() => {}}
              backgroundColor={Colors.GREEN}
              rounded
            >
              Include in trip
            </CustomButton>
          </Grid>
        </Grid>

        <Grid item className={style.imageGrid}>
          <Grid container style={{ height: "100%" }}>
            <img
              src={photoURLBuilder(poi.bestPhoto)}
              className={style.images}
              alt="restaurant image"
            />
          </Grid>
        </Grid>

        <Grid item className={style.detailsGrid}>
          <div className={style.detailsContainer}>
            <Text component="h3" style={{ marginTop: "5px" }}>
              Details
            </Text>

            <Text component="h4">Contact</Text>
            {poi.contact.formattedPhone && (
              <IconText icon={faPhone} fontSize={15} text={poi.contact.formattedPhone} />
            )}

            {poi.contact.facebookName && (
              <IconText icon={faFacebook} fontSize={15} text={poi.contact.facebookName} />
            )}

            {poi.contact.twitter && (
              <IconText
                style={{ marginBottom: "20px" }}
                icon={faTwitter}
                fontSize={15}
                text={poi.contact.twitter}
              />
            )}

            <Text component="h4">Address</Text>
            {poi.location.formattedAddress && (
              <IconText
                style={{ marginBottom: "20px" }}
                icon={faMapMarkerAlt}
                fontSize={15}
                text={parseAddress(poi)}
              />
            )}

            <Text component="h4">Hours</Text>
            {poi.hours.timeframes && (
              <IconText
                style={{ marginBottom: "20px" }}
                icon={faClock}
                fontSize={15}
                text={parseHours(poi)}
              />
            )}

            <Text component="h4">Website</Text>
            {poi.url && (
              <IconText
                style={{ marginBottom: "20px" }}
                icon={faGlobe}
                fontSize={15}
                text={poi.url}
              />
            )}

            <Text component="h4">Amenities</Text>
            {poi.attributes && (
              <IconText
                style={{ marginBottom: "20px" }}
                icon={faStar}
                fontSize={15}
                text={parseAttributes(poi)}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
