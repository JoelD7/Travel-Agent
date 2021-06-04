import { faCalendar, faFlag } from "@fortawesome/free-solid-svg-icons";
import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@material-ui/core";
import Axios from "axios";
import { compareAsc, differenceInCalendarDays, format, parseISO } from "date-fns";
import React, { CSSProperties, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Slider from "react-slick";
import {
  CustomButton,
  DashDrawer,
  Footer,
  IconText,
  Navbar,
  ProgressCircle,
  SliderArrow,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  getLinkStyle,
  Routes,
  tripPlaceholder,
  tripsPlaceholder,
  responseTripToDomainTrip,
  backend,
  setTripDetail,
  Trip,
} from "../../utils";
import { tripStyles } from "./trip-styles";

export function Trips() {
  const style = tripStyles();

  const [trips, setTrips] = useState<Trip[]>();
  const [loading, setLoading] = useState(true);

  let lastTrip: Trip = getLastTrip();

  const match = useRouteMatch();
  const history = useHistory();

  const tripCoverBackground: CSSProperties = {
    backgroundImage: lastTrip
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${lastTrip.coverPhoto})`
      : "",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
  };

  const dispatch = useDispatch();

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

  useEffect(() => {
    backend
      .get("/trip/all")
      .then((res: any) => {
        let tripsInResponse = res.data._embedded.tripList;
        let tripsBuffer = tripsInResponse.map((resTrip: any) =>
          responseTripToDomainTrip(resTrip)
        );
        setTrips(tripsBuffer);
        setLoading(false);
      })
      .catch((err: any) => console.log(err));
  }, []);

  function onTripClick(trip: Trip) {
    dispatch(setTripDetail(trip));
  }

  function getLastTrip(): Trip {
    if (trips) {
      return trips.sort((a, b) => compareAsc(b.endDate, a.endDate))[0];
    }
    return tripPlaceholder;
  }

  function TripCards() {
    if (trips) {
      return trips.map((trip, i) => (
        <div
          key={i}
          className={
            trips.length > 4 ? style.tripCardContainerSlider : style.tripCardContainer
          }
        >
          <Card className={style.tripCard}>
            <CardActionArea>
              <Link style={getLinkStyle()} to={`${match.url}/${trip.idTrip}`}>
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
  }

  function getSlidesToShow(def: number): number {
    if (trips) {
      return trips.length > def ? def : trips.length;
    }

    return 0;
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Trips</title>
      </Helmet>

      <Navbar className={style.navbar} dashboard position="sticky" />
      <DashDrawer />

      <Grid container>
        <Grid item className={style.pageContentGrid}>
          {loading && (
            <Grid container style={{ height: "85vh" }}>
              <ProgressCircle />
            </Grid>
          )}
          {trips && (
            <>
              {/* Photo title */}
              <Grid
                key="photoTitle"
                item
                xs={12}
                className={style.photoTitleContainer}
                style={tripCoverBackground}
              >
                <Grid container style={{ height: "100%" }}>
                  <Grid item xs={12}>
                    <Text color="white" component="h4" style={{ fontWeight: "normal" }}>
                      Your last trip
                    </Text>

                    {/* Trip name, countries */}
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
                  <Grid item xs={12} style={{ alignSelf: "flex-end" }}>
                    <Grid container>
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
                          {lastTrip.photosQty}
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

                  <Grid
                    item
                    xs={12}
                    style={{ height: "fit-content", alignSelf: "flex-end" }}
                  >
                    <Grid container justify="flex-end">
                      <CustomButton
                        backgroundColor={Colors.GREEN}
                        style={{ boxShadow: Shadow.DARK3D }}
                        onClick={() => history.push(Routes.CREATE_TRIP)}
                      >
                        Create trip
                      </CustomButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Trips */}
              <Grid item xs={12} className={style.tripCardGrid}>
                <Text bold color={Colors.BLUE} component="h2">
                  Trips
                </Text>

                <Grid key="trip cards" container style={{ marginTop: 10 }}>
                  {trips.length > 4 ? (
                    <Slider {...sliderSettings} slidesToShow={getSlidesToShow(4)}>
                      {TripCards()}
                    </Slider>
                  ) : (
                    TripCards()
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      <div className={style.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
