import { restaurantDetailsStyles } from "./restaurantDetails-styles";
import React, { MouseEvent, useEffect, useState } from "react";
import {
  CustomButton,
  IconText,
  Navbar,
  ProgressCircle,
  ServicesToolbar,
  SliderArrow,
  Text,
} from "../../components";
import { useParams } from "react-router-dom";
import {
  CardActionArea,
  createMuiTheme,
  Grid,
  Popover,
  ThemeProvider,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import Ratings from "react-ratings-declarative";
import { Colors, Shadow } from "../../styles";
import {
  faMapMarkerAlt,
  faPhone,
  faPlaneDeparture,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Helmet from "react-helmet";
import {
  getRestaurantCategoriesList,
  getRestaurantHours,
  getRestaurantTransactions,
  muiDateFormatter,
  restaurantPlaceholder,
} from "../../utils";
import { fetchRestaurant } from "../../utils/external-apis/yelp-apis";
import Slider from "react-slick";
import { addDays, addHours, parseISO } from "date-fns";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Font } from "../../assets";
import DateFnsUtils from "@date-io/date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DatetimePopover {
  start: Date;
  end: Date;
}

export function RestaurantDetails() {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: Font.Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Font.Family,
          color: Colors.BLUE,
        },
      },
      //@ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiTypography: {
        h3: {
          fontFamily: Font.Family,
        },
        h4: {
          fontFamily: Font.Family,
        },
        subtitle1: {
          fontFamily: Font.Family,
        },
        body1: {
          fontFamily: Font.Family,
        },
        body2: {
          fontFamily: Font.Family,
        },
        caption: {
          fontFamily: Font.Family,
        },
      },
      MuiOutlinedInput: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            borderColor: "#cecece",
          },
        },
      },
      MuiPickerDTTabs: {
        tabs: {
          backgroundColor: Colors.GREEN,
        },
      },
      PrivateTabIndicator: {
        colorSecondary: {
          backgroundColor: "white",
        },
      },
      MuiPickersClock: {
        pin: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiPickersClockPointer: {
        pointer: {
          backgroundColor: Colors.BLUE,
        },
        thumb: {
          border: `14px solid ${Colors.BLUE}`,
        },
        noPoint: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiPickersDay: {
        current: {
          color: Colors.BLUE,
        },
        daySelected: {
          backgroundColor: Colors.BLUE,

          "&:hover": {
            backgroundColor: Colors.BLUE_HOVER,
          },
        },
      },
      MuiInput: {
        underline: {
          "&:hover": {
            "&:not(.Mui-disabled)": {
              "&::before": {
                borderBottom: `2px solid ${Colors.GREEN}`,
              },
            },
          },
          "&::after": {
            borderBottom: `2px solid ${Colors.PURPLE}`,
          },
        },
      },
    },
  });

  const style = restaurantDetailsStyles();
  const { id } = useParams<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const [restaurant, setRestaurant] = useState<Restaurant>(restaurantPlaceholder);
  const amenities: string = getRestaurantTransactions(restaurant);

  const [tripAnchor, setTripAnchor] = useState<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const [trip, setTrip] = useState<string>("Journey Through the Alps");

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToShow: 1,
  };

  useEffect(() => {
    fetchRestaurant(id)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const tripOptions = ["Journey Through the Alps", "Andes Walk", "Europe in the Snow"];

  function onIncludeTripClick(event: MouseEvent<HTMLButtonElement>) {
    setTripAnchor(event.currentTarget);
    setOpenPopover(true);
  }

  function onPopoverClose() {
    setTripAnchor(null);
    setOpenPopover(false);
  }

  const datetimePopoverParams = [
    {
      label: "Start",
      variable: "start",
    },
    {
      label: "End",
      variable: "end",
    },
  ];

  const [datetimePopover, setDatetimePopover] = useState<{ [index: string]: Date }>({
    start: new Date(),
    end: addHours(new Date(), 1),
  });

  function onPopoverDateChange(date: MaterialUiPickersDate, variable: string) {
    if (date === null) {
      setDatetimePopover({
        ...datetimePopover,
        [variable]: new Date(),
      });
    } else {
      setDatetimePopover({
        ...datetimePopover,
        [variable]: parseISO(date.toISOString()),
      });
    }
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Restaurant | ${restaurant.name}`}</title>
      </Helmet>

      <Navbar />
      <ServicesToolbar />

      {loading && (
        <div className={style.progressCircleContainer}>
          <ProgressCircle />
        </div>
      )}

      <Grid
        container
        spacing={2}
        className={style.pageContentContainer}
        style={loading ? { filter: "blur(4px)" } : {}}
      >
        {/* Ratings */}
        <Grid item xs={12}>
          <h1 style={{ marginBottom: "0px" }}>{restaurant.name}</h1>
          <Ratings
            rating={restaurant.rating}
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

        {/* Location, phone, include in trip */}
        <Grid item xs={12}>
          <Grid container>
            <IconText
              text={restaurant.location.display_address.join(", ")}
              icon={faMapMarkerAlt}
            />
            <p style={{ margin: "auto 5px" }}>|</p>
            <IconText text={restaurant.display_phone} icon={faPhone} />

            <Grid item className={style.tripButtonGrid}>
              <CustomButton
                style={{ boxShadow: Shadow.LIGHT }}
                onClick={(e) => onIncludeTripClick(e)}
                backgroundColor={Colors.GREEN}
                rounded
              >
                Include in trip
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Images */}
        <Grid item className={style.imageGrid}>
          <Slider {...sliderSettings}>
            {restaurant.photos.map((photo) => (
              <div key={photo} className={style.photoContainer}>
                <img
                  src={photo}
                  className={style.restaurantImage}
                  alt="restaurant image"
                />
              </div>
            ))}
          </Slider>
        </Grid>

        <Grid item className={style.detailsGrid}>
          <div className={style.detailsContainer}>
            <h2>Details</h2>
            <h4 style={{ marginBottom: "0px" }}>Cuisines</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>
              {getRestaurantCategoriesList(restaurant)}
            </p>

            <h4 style={{ marginBottom: "0px" }}>Timings</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>
              {getRestaurantHours(restaurant)}
            </p>

            <h4 style={{ marginBottom: "0px" }}>Menu</h4>
            <a style={{ color: "white", fontSize: "15px" }} href={restaurant.url}>
              Click here
            </a>

            <h4 style={{ marginBottom: "0px" }}>Website</h4>
            <a style={{ color: "white", fontSize: "15px" }} href={restaurant.url}>
              Click here
            </a>

            {amenities !== "" && (
              <>
                <h4 style={{ marginBottom: "0px" }}>Amenities</h4>
                <p style={{ marginTop: "5px", fontSize: "15px" }}>{amenities}</p>
              </>
            )}
          </div>
        </Grid>
      </Grid>

      <Popover
        open={openPopover}
        anchorEl={tripAnchor}
        onClose={() => onPopoverClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{ paper: style.popoverPaper }}
      >
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              {/* Trip */}
              <Grid item xs={4}>
                <Grid container>
                  <IconText icon={faPlaneDeparture}></IconText>
                  <Text component="h4" bold color={Colors.BLUE}>
                    Trip
                  </Text>
                </Grid>
              </Grid>

              <Grid item xs={8}>
                <FormControl>
                  <Select
                    value={trip}
                    style={{ height: "30px" }}
                    classes={{ icon: style.selectIcon }}
                    variant="outlined"
                    className={style.select}
                    onChange={(e) => setTrip(e.target.value as string)}
                  >
                    {tripOptions.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Datetimes */}
              {datetimePopoverParams.map((param) => (
                <Grid container key={param.label} style={{ marginTop: "10px" }}>
                  {/* label and icon */}
                  <Grid item xs={4}>
                    <Grid container>
                      <IconText icon={faClock}></IconText>
                      <Text component="h4" bold color={Colors.BLUE}>
                        {param.label}
                      </Text>
                    </Grid>
                  </Grid>

                  {/* Select */}
                  <Grid item xs={8}>
                    <KeyboardDateTimePicker
                      value={datetimePopover[param.variable]}
                      labelFunc={(date, invalidLabel) =>
                        muiDateFormatter(date, invalidLabel, "datetime")
                      }
                      className={style.datepicker}
                      minDate={new Date()}
                      format="EEE. d/MMM, yyyy 'at' h:mm"
                      onChange={(date) => onPopoverDateChange(date, param.variable)}
                    />
                  </Grid>
                </Grid>
              ))}

              {/* Add button */}
              <Grid container>
                <IconButton
                  style={{ margin: "10px 0px 0px auto", backgroundColor: Colors.GREEN }}
                >
                  <FontAwesomeIcon icon={faPlus} color="white" />
                </IconButton>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Popover>
    </div>
  );
}
