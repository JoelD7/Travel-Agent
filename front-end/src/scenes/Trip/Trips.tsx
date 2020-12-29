import { faCalendar, faFlag, faHeart, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DashDrawer, IconText, Navbar, SliderArrow, Text } from "../../components";
import { Colors } from "../../styles";
import { getLinkStyle, Routes, tripPlaceholder, tripsPlaceholder } from "../../utils";
import { DrawerOptions } from "../../utils/types/DrawerOptionsType";
import { tripStyles } from "./trip-styles";
import Slider from "react-slick";

export function Trips() {
  const style = tripStyles();

  const [trips, setTrips] = useState(tripsPlaceholder);
  const lastTrip = tripPlaceholder;

  const history = useHistory();

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
  };

  function TripCards() {
    return trips.map((trip, i) => (
      <div key={i} style={{ width: "25%" }}>
        <Card className={style.tripCard}>
          <CardActionArea>
            <Link style={getLinkStyle()} to={`${Routes.TRIPS}/${trip.id}`}>
              <CardMedia component="img" height="150" src={`${trip.coverPhoto}`} />

              <CardContent>
                <Text weight="bold" component="h4" style={{ color: Colors.BLUE }}>
                  {trip.name}
                </Text>
                <IconText
                  icon={faCalendar}
                  text={`${format(trip.startDate, "dd/MM/yyyy")} - ${format(
                    trip.endDate,
                    "dd/MM/yyyy"
                  )}`}
                />
                <IconText icon={faFlag} text={trip.countries.join(", ")} />
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </div>
    ));
  }

  return (
    <div className={style.mainContainer}>
      <Navbar position="sticky" />

      <DashDrawer />

      <Grid container className={style.pageContentGrid}>
        <Grid key="photoTitle" item xs={12}>
          <div
            className={style.photoTitleContainer}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("journey.jpg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50%",
            }}
          >
            <Text color="white" component="h4" style={{ fontWeight: "normal" }}>
              Your last trip
            </Text>

            <Grid container alignItems="baseline">
              <Text color="white" component="h1" style={{ margin: "0px 10px 0px 0px" }}>
                {lastTrip.name}
              </Text>
              <Text color="white" component="h4" style={{ fontWeight: "normal" }}>
                {lastTrip.countries.join(", ")}
              </Text>
            </Grid>

            <div style={{ marginTop: "auto" }}>
              <Grid container className={style.lastTripDataContainer}>
                <Grid item xs={1}>
                  <Text
                    color="white"
                    component="h2"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Photos
                  </Text>
                  <Text
                    color="white"
                    component="h3"
                    weight={500}
                    style={{ textAlign: "center" }}
                  >
                    {lastTrip.photos}
                  </Text>
                </Grid>
                <Grid item xs={1}>
                  <Text
                    color="white"
                    component="h2"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Places
                  </Text>
                  <Text
                    color="white"
                    component="h3"
                    weight={500}
                    style={{ textAlign: "center" }}
                  >
                    {lastTrip.places}
                  </Text>
                </Grid>
                <Grid item xs={1}>
                  <Text
                    color="white"
                    component="h2"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Days
                  </Text>
                  <Text
                    color="white"
                    component="h3"
                    weight={500}
                    style={{ textAlign: "center" }}
                  >
                    {lastTrip.days}
                  </Text>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} className={style.tripCardGrid}>
          <Text component="h2">Trips</Text>

          <Grid key="trip cards" container>
            {trips.length > 4 ? (
              <Slider {...sliderSettings} slidesToShow={4}>
                {TripCards()}
              </Slider>
            ) : (
              TripCards()
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
