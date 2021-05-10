import { faCalendar, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Direction, Grid, IconButton, useTheme } from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import Helmet from "react-helmet";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import {
  CustomButton,
  DashDrawer,
  Footer,
  Navbar,
  PicturesAndKeyDetails,
  RsvHotels,
  Text,
  TripCars,
  TripFlights,
  TripPOIs,
  TripRestaurants,
  TripTabBar,
} from "../../components";
import { Colors } from "../../styles";
import { Trip, tripPlaceholder } from "../../utils";
import { tripStyles } from "./trip-styles";

interface TabPanel {
  children: ReactNode;
  index: number;
  value: number;
  dir: Direction;
}

export function TripDetails() {
  const style = tripStyles();
  const trip: Trip = tripPlaceholder;

  const [tabIndex, setTabIndex] = useState(0);
  const MUtheme = useTheme();

  const VirtualizeSwipeableViews = virtualize(SwipeableViews);

  function TabPanel({ children, index, value, dir }: TabPanel) {
    return (
      <div dir={dir} hidden={value !== index}>
        {value === index && children}
      </div>
    );
  }

  function TabViews(index: number, key: number) {
    switch (index) {
      case 0:
        return (
          <div key={key}>
            <TabPanel value={tabIndex} index={0} dir={MUtheme.direction}>
              {/* Photos, details grid */}
              <PicturesAndKeyDetails trip={trip} />

              {/* Flights */}
              <Grid item xs={12} style={{ marginTop: 30 }}>
                <Grid container>
                  <Text bold color={Colors.BLUE} component="h2">
                    Flights
                  </Text>
                  <CustomButton
                    iconColor="#7e7e7e"
                    backgroundColor="rgba(0,0,0,0)"
                    textColor="#7e7e7e"
                    onClick={() => setTabIndex(2)}
                  >
                    See all
                  </CustomButton>
                </Grid>

                <TripFlights showAll={false} />
              </Grid>

              {/* Hotels */}
              <Grid item xs={12} style={{ marginTop: 30 }}>
                <Grid container>
                  <Text bold color={Colors.BLUE} component="h2">
                    Hotels
                  </Text>
                  <CustomButton
                    iconColor="#7e7e7e"
                    backgroundColor="rgba(0,0,0,0)"
                    textColor="#7e7e7e"
                    onClick={() => setTabIndex(3)}
                  >
                    See all
                  </CustomButton>
                </Grid>

                <RsvHotels showAll={false} />
              </Grid>

              {/* Restaurants */}
              <Grid item xs={12} style={{ marginTop: 30 }}>
                <Grid container>
                  <Text bold color={Colors.BLUE} component="h2">
                    Restaurants
                  </Text>
                  <CustomButton
                    iconColor="#7e7e7e"
                    backgroundColor="rgba(0,0,0,0)"
                    textColor="#7e7e7e"
                    onClick={() => setTabIndex(4)}
                  >
                    See all
                  </CustomButton>
                </Grid>

                <TripRestaurants showAll={false} />
              </Grid>

              {/* Things to do */}
              <Grid item xs={12} style={{ marginTop: 30 }}>
                <Grid container>
                  <Text bold color={Colors.BLUE} component="h2">
                    Things to do
                  </Text>
                  <CustomButton
                    iconColor="#7e7e7e"
                    backgroundColor="rgba(0,0,0,0)"
                    textColor="#7e7e7e"
                    onClick={() => setTabIndex(4)}
                  >
                    See all
                  </CustomButton>
                </Grid>

                <TripPOIs showAll={false} />
              </Grid>

              {/* Car rental */}
              <Grid item xs={12} style={{ marginTop: 30 }}>
                <Grid container>
                  <Text bold color={Colors.BLUE} component="h2">
                    Car rental
                  </Text>
                  <CustomButton
                    iconColor="#7e7e7e"
                    backgroundColor="rgba(0,0,0,0)"
                    textColor="#7e7e7e"
                    onClick={() => setTabIndex(5)}
                  >
                    See all
                  </CustomButton>
                </Grid>

                <TripCars showAll={false} />
              </Grid>
            </TabPanel>
          </div>
        );
      case 1:
        return (
          <div key={key}>
            <TabPanel value={tabIndex} index={1} dir={MUtheme.direction}>
              <PicturesAndKeyDetails trip={trip} />
            </TabPanel>
          </div>
        );
      case 2:
        return (
          <div key={key}>
            <TabPanel value={tabIndex} index={2} dir={MUtheme.direction}>
              <Text
                bold
                color={Colors.BLUE}
                component="h2"
                style={{ margin: "20px 0px" }}
              >
                Flights
              </Text>
              <TripFlights />
            </TabPanel>
          </div>
        );
      case 3:
        return (
          <div key={key}>
            <TabPanel value={tabIndex} index={3} dir={MUtheme.direction}>
              <Text
                bold
                color={Colors.BLUE}
                component="h2"
                style={{ margin: "20px 0px" }}
              >
                Hotels
              </Text>
              <RsvHotels />
            </TabPanel>
          </div>
        );
      case 4:
        return (
          <div key={key}>
            <TabPanel value={tabIndex} index={4} dir={MUtheme.direction}>
              <Text
                bold
                color={Colors.BLUE}
                component="h2"
                style={{ margin: "20px 0px" }}
              >
                Restaurants
              </Text>
              <TripRestaurants />
            </TabPanel>
          </div>
        );
      case 5:
        return (
          <div key={key}>
            <TabPanel value={tabIndex} index={5} dir={MUtheme.direction}>
              <Text
                bold
                color={Colors.BLUE}
                component="h2"
                style={{ margin: "20px 0px" }}
              >
                Things to do
              </Text>
              <TripPOIs />
            </TabPanel>
          </div>
        );
      case 6:
        return (
          <div key={key}>
            <TabPanel value={tabIndex} index={6} dir={MUtheme.direction}>
              <Text
                bold
                color={Colors.BLUE}
                component="h2"
                style={{ margin: "20px 0px" }}
              >
                Car rental
              </Text>
              <TripCars />
            </TabPanel>
          </div>
        );
      default:
        return <div key={key}></div>;
    }
  }

  function onTabIndexChange(index: number) {
    setTabIndex(index);
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{trip.name}</title>
      </Helmet>

      <Navbar className={style.navbar} dashboard position="sticky" />

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

                <Grid item className={style.countryListGrid}>
                  <Text color="white" component="h4" style={{ fontWeight: "normal" }}>
                    {trip.countries.join(", ")}
                  </Text>
                </Grid>
              </Grid>
            </Grid>

            {/* Trip quick info */}
            <Grid item xs={12} style={{ alignSelf: "flex-end" }}>
              <Grid container>
                <div className={style.photosPlacesDaysContainer}>
                  <Text
                    color="white"
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Photos
                  </Text>
                  <Text color="white" component="h4" style={{ textAlign: "center" }}>
                    {trip.photosQty}
                  </Text>
                </div>

                <div className={style.photosPlacesDaysContainer}>
                  <Text
                    color="white"
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Places
                  </Text>
                  <Text color="white" component="h4" style={{ textAlign: "center" }}>
                    {trip.photosQty}
                  </Text>
                </div>

                <div className={style.photosPlacesDaysContainer}>
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

        {/* Tab bar */}
        <Grid item xs={12}>
          <TripTabBar tabIndex={tabIndex} onTabIndexChange={onTabIndexChange} />
        </Grid>

        {/* Tabs */}
        <Grid item xs={12}>
          <VirtualizeSwipeableViews
            slideRenderer={({ index, key }) => TabViews(index, key)}
            axis={MUtheme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabIndex}
            slideClassName={style.tabSlide}
            onChangeIndex={onTabIndexChange}
          />
        </Grid>
      </Grid>

      <div className={style.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
