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
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: getSlidesToShow(3),
          slidesToScroll: getSlidesToShow(3),
        },
      },
      {
        breakpoint: 1175,
        settings: {
          slidesToShow: getSlidesToShow(2),
          slidesToScroll: getSlidesToShow(2),
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: getSlidesToShow(1),
          slidesToScroll: getSlidesToShow(1),
        },
      },
    ],
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

  function getSlidesToShow(def: number) {
    return trips.length > def ? def : trips.length;
  }

  return (
    <div className={style.mainContainer}>
      <Navbar position="sticky" />
      <DashDrawer />

      <Grid container>
        <Grid item className={style.pageContentGrid}>
          {/* Photo title */}
          <Grid
            key="photoTitle"
            item
            xs={12}
            className={style.photoTitleContainer}
            style={
              {
                // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("journey.jpg")`,
                // backgroundSize: "cover",
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "50%",
              }
            }
          >
            <Grid container style={{ height: "100%" }}>
              <Grid item xs={12}>
                <Text color="white" component="h4" style={{ fontWeight: "normal" }}>
                  Your last trip
                </Text>

                <Grid container alignItems="baseline">
                  <Text
                    color="white"
                    component="h1"
                    style={{ margin: "0px 10px 0px 0px" }}
                  >
                    {lastTrip.name}
                  </Text>
                  <Text color="white" component="h4" style={{ fontWeight: "normal" }}>
                    {lastTrip.countries.join(", ")}
                  </Text>
                </Grid>
              </Grid>

              {/* Trip quick info */}
              <Grid item xs={12} style={{ alignSelf: "center" }}>
                <Grid container className={style.lastTripDataContainer}>
                  <div style={{ width: "105px" }}>
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
                  </div>

                  <div style={{ width: "105px" }}>
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
                  </div>

                  <div style={{ width: "105px" }}>
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
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Trips */}
          <Grid item xs={12} className={style.tripCardGrid}>
            <Text component="h2">Trips</Text>

            <Grid key="trip cards" container>
              <Slider {...sliderSettings} slidesToShow={getSlidesToShow(4)}>
                {TripCards()}
              </Slider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
