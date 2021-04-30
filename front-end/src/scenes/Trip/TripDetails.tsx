import {
  faCalendar,
  faChevronLeft,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  createMuiTheme,
  Direction,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { ReactNode, useState } from "react";
import {
  CustomButton,
  DashDrawer,
  Footer,
  Navbar,
  PhotoAlbumCard,
  SliderArrow,
  Text,
  TripFlights,
  RsvHotels,
  TripRestaurants,
  TripPOIs,
} from "../../components";
import { Colors } from "../../styles";
import { tripPlaceholder } from "../../utils";
import { tripStyles } from "./trip-styles";
import Slider from "react-slick";
import Helmet from "react-helmet";
import SwipeableViews from "react-swipeable-views";

interface TabPanel {
  children: ReactNode;
  index: number;
  value: number;
  dir: Direction;
}

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

  const [tabIndex, setTabIndex] = useState(0);
  const MUtheme = useTheme();

  const tabOptions = [
    "All",
    "Photos",
    "Flights",
    "Hotels",
    "Restaurants",
    "Things to do",
    "Car rental",
  ];

  function getSlidesToShow(def: number) {
    return trip.albums.length > def ? def : trip.albums.length;
  }

  function TabPanel({ children, index, value, dir }: TabPanel) {
    return (
      <div dir={dir} hidden={value !== index}>
        {children}
      </div>
    );
  }

  function onTabIndexChange(index: number) {
    setTabIndex(index);
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
                    {trip.photosQty}
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
                    {trip.photosQty}
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

        {/* Tab bar */}
        <Grid item xs={12}>
          <Toolbar className={style.toolbar}>
            {tabOptions.map((option, i) => (
              <MenuItem
                onClick={() => onTabIndexChange(i)}
                key={option}
                selected={tabIndex === i}
                classes={{ root: style.menuItemRoot }}
              >
                {option}
              </MenuItem>
            ))}
          </Toolbar>
        </Grid>

        <SwipeableViews
          axis={MUtheme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabIndex}
          onChangeIndex={onTabIndexChange}
        >
          {/* All */}
          <TabPanel value={tabIndex} index={0} dir={MUtheme.direction}>
            {/* Photos, details grid */}
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
            </Grid>

            {/* Flights */}
            <Grid item xs={12} style={{ marginTop: 20 }}>
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
            <Grid item xs={12} style={{ marginTop: 20 }}>
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
            <Grid item xs={12} style={{ marginTop: 20 }}>
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
            <Grid item xs={12} style={{ marginTop: 20 }}>
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
          </TabPanel>
        </SwipeableViews>
      </Grid>

      <div className={style.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
