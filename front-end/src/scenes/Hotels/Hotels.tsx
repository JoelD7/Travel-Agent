import DateFnsUtils from "@date-io/date-fns";
import {
  faBed,
  faChild,
  faFilter,
  faMapMarker,
  faMapMarkerAlt,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  Divider,
  Drawer,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Slider,
  ThemeProvider,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { FONT } from "../../assets/fonts";
import {
  CustomButton,
  PriceRange,
  HotelStarSelector,
  IconText,
  Navbar,
  ServicesToolbar,
} from "../../components";
import { HotelAmenitiesSelector } from "../../components/atoms/HotelAmenitiesSelector/HotelAmenitiesSelector";
import { Colors, Shadow } from "../../styles";
import { HotelAmenity, muiDateFormatter } from "../../utils";
import { AmenitiesList, Amenity } from "../../utils/HotelAmenities";
import { Hotel } from "../../utils/types/Hotel";
import { hotelsStyles } from "./hotels-styles";
import { format } from "date-fns";

interface HotelSearch {
  checkIn: MaterialUiPickersDate;
  checkOut: MaterialUiPickersDate;
  adults: unknown;
  children: unknown;
  rooms: unknown;
  priceRange: number[];
  stars: number;
  amenities: Amenity[];
  [key: string]: HotelSearch[keyof HotelSearch];
}

export function Hotels() {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: FONT,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: FONT,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: FONT,
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
        h4: {
          fontFamily: FONT,
        },
        subtitle1: {
          fontFamily: FONT,
        },
        body1: {
          fontFamily: FONT,
        },
        body2: {
          fontFamily: FONT,
        },
        caption: {
          fontFamily: FONT,
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: "10px",
          backgroundColor: "white",

          "&:hover": {
            borderColor: "#cecece",
          },
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
    },
  });

  const style = hotelsStyles();

  const hotelReservationParams = [
    {
      label: "Adults",
      field: "adults",
      icon: faUser,
    },
    {
      label: "Children",
      field: "children",
      icon: faChild,
    },
    {
      label: "Rooms",
      field: "rooms",
      icon: faBed,
    },
  ];

  const [state, setState] = useState<HotelSearch>({
    checkIn: new Date(),
    checkOut: addDays(new Date(), 2),
    adults: "",
    children: "",
    rooms: "",
    priceRange: [0, 100],
    stars: 0,
    amenities: AmenitiesList,
  });

  const hotels: Hotel[] = [
    {
      name: "Sheraton Santo Domingo",
      address: "Calle Fco. Ramirez, #33, Santo Domingo, Rep. Dom.",
      amenities: [
        HotelAmenity.AIR_CONDITIONING,
        HotelAmenity.CASINO,
        HotelAmenity.FITNESS_CENTER,
        HotelAmenity.PARKING,
      ],
      phoneNumber: "809-789-2560",
      pricePerNight: 195,
      stars: 5,
      image: "sheraton.jpg",
    },
  ];

  function renderStars(n: number) {
    return (
      <div style={{ display: "flex" }}>
        {[1, 2, 3, 4, 5].map((star, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            color={star <= n ? Colors.PURPLE : "#cecece"}
          />
        ))}
      </div>
    );
  }

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className={style.mainContainer}>
      <Navbar />
      <ServicesToolbar />

      <div style={{ width: "85%", margin: "20px auto" }}>
        <Grid container spacing={2} className={style.pageTitleContainer}>
          <Grid item xs={12}>
            <h1 style={{ color: "white", marginBottom: "0px" }}>
              Hotels in Paris
            </h1>
          </Grid>

          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item className={style.datepickerItemGrid}>
                <h5 className={style.reservationParamText}>Check-in</h5>
                <KeyboardDatePicker
                  value={state.checkIn}
                  labelFunc={muiDateFormatter}
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => setState({ ...state, checkIn: d })}
                />
              </Grid>

              <Grid item className={style.datepickerItemGrid}>
                <h5 className={style.reservationParamText}>Check-out</h5>
                <KeyboardDatePicker
                  value={state.checkOut}
                  labelFunc={muiDateFormatter}
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => setState({ ...state, checkOut: d })}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            {hotelReservationParams.map((param) => (
              <Grid item className={style.revervationParamsGrid}>
                <h5 className={style.reservationParamText}>{param.label}</h5>

                <FormControl style={{ width: "100%" }}>
                  <Select
                    value={state[param.field]}
                    variant="outlined"
                    className={style.select}
                    startAdornment={
                      <FontAwesomeIcon icon={param.icon} color={Colors.BLUE} />
                    }
                    onChange={(e) =>
                      setState({ ...state, [param.field]: e.target.value })
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <MenuItem value={n}>{n}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}

            <Grid item xs={12} style={{ marginLeft: "auto" }}>
              <Grid container justify="flex-end">
                <CustomButton
                  label="Search"
                  backgroundColor={Colors.GREEN}
                  style={{
                    width: "140px",
                    boxShadow: Shadow.DARK,
                    color: Colors.BLUE,
                  }}
                  onClick={() => {
                    state.amenities.forEach((am) => {
                      if (am.checked) {
                        console.log(am.value);
                      }
                    });
                  }}
                />
              </Grid>
            </Grid>
          </ThemeProvider>
        </Grid>

        <Grid container className={style.pageContentContainer}>
          <Grid item className={style.filtersGrid}>
            <h3>Price range</h3>
            <PriceRange
              value={state.priceRange}
              max={200}
              updateState={(slider) =>
                setState({ ...state, priceRange: slider })
              }
            />

            <Divider style={{ margin: "10px auto" }} />

            <h3 style={{ marginBottom: "10px" }}>Stars</h3>
            <HotelStarSelector
              value={state.stars}
              updateState={(star) => setState({ ...state, stars: star })}
            />

            <Divider style={{ margin: "10px auto" }} />

            <h3>Amenities</h3>
            <HotelAmenitiesSelector
              values={state.amenities}
              updateState={(selected) => {
                setState({ ...state, amenities: selected });
              }}
            />
          </Grid>

          <Grid item className={style.filterButtonGrid}>
            <CustomButton
              label="Filter"
              icon={faFilter}
              backgroundColor={Colors.PURPLE}
              style={{ paddingLeft: "10px", fontSize: "14px" }}
              onClick={() => setOpenDrawer(true)}
            />
          </Grid>

          <Grid item className={style.hotelsGrid}>
            {hotels.map((hotel, i) => (
              <Grid key={i} container id="card" className={style.hotelCard}>
                <Grid
                  item
                  className={style.hotelImageGrid}
                  id="photo"
                  style={{ height: "221px" }}
                >
                  <img src={hotel.image} className={style.hotelImage} />
                </Grid>

                <Grid item className={style.hotelContentGrid} id="content">
                  <Grid item xs={12} id="title">
                    <Grid
                      container
                      alignItems="center"
                      style={{ marginTop: "10px" }}
                    >
                      <h3 style={{ margin: "0px 10px" }}>{hotel.name}</h3>

                      {renderStars(hotel.stars)}
                    </Grid>
                  </Grid>

                  <Grid container className={style.defaultContentContainer}>
                    <Grid item className={style.cardData1}>
                      <div>
                        <h4
                          style={{ textAlign: "center" }}
                        >{`$ ${hotel.pricePerNight}`}</h4>
                        <CustomButton
                          label="View details"
                          backgroundColor={Colors.PURPLE}
                          onClick={() => {}}
                        />
                      </div>
                    </Grid>

                    <Grid item className={style.cardData1}>
                      <div>
                        <p className={style.cardText}>
                          <b>Hotel info</b>
                        </p>

                        <IconText
                          text={hotel.phoneNumber}
                          icon={faPhone}
                          style={{ marginBottom: "5px" }}
                        />

                        <IconText text={hotel.address} icon={faMapMarkerAlt} />
                      </div>
                    </Grid>

                    <Grid item className={style.cardData2}>
                      <div>
                        <p className={style.cardText}>
                          <b>Amenities</b>
                        </p>
                        {hotel.amenities.map((amenity, i) => (
                          <IconText
                            key={i}
                            style={{ marginBottom: "5px" }}
                            text={amenity.value}
                            icon={amenity.icon}
                          />
                        ))}
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container className={style.smContentContainer}>
                    <Grid item xs={12} style={{ padding: "10px" }}>
                      <div>
                        <IconText
                          text={hotel.phoneNumber}
                          icon={faPhone}
                          style={{ marginBottom: "5px" }}
                        />

                        <IconText text={hotel.address} icon={faMapMarkerAlt} />
                      </div>
                    </Grid>

                    <Grid item xs={12} style={{ padding: "0px 10px" }}>
                      <div>
                        <p className={style.cardText}>
                          <b>Amenities</b>
                        </p>
                        {hotel.amenities.map((amenity, i) => (
                          <IconText
                            key={i}
                            style={{ marginBottom: "5px" }}
                            text={amenity.value}
                            icon={amenity.icon}
                          />
                        ))}
                      </div>
                    </Grid>

                    <Grid item xs={12} style={{ padding: "10px" }}>
                      <Grid container>
                        <h2
                          style={{ textAlign: "center", marginRight: "auto" }}
                        >
                          {`$ ${hotel.pricePerNight}`}
                        </h2>
                        <CustomButton
                          label="View details"
                          style={{
                            margin: "auto 0px auto auto",
                            fontSize: "16px",
                          }}
                          backgroundColor={Colors.PURPLE}
                          onClick={() => {}}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>

      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        classes={{ root: style.drawer, paper: style.drawer }}
      >
        <h2>Search filters</h2>

        <h3>Price range</h3>
        <PriceRange
          max={200}
          value={state.priceRange}
          updateState={(slider) => setState({ ...state, priceRange: slider })}
        />

        <Divider style={{ margin: "10px auto" }} />

        <h3 style={{ marginBottom: "10px" }}>Stars</h3>
        <HotelStarSelector
          value={state.stars}
          updateState={(star) => setState({ ...state, stars: star })}
        />

        <Divider style={{ margin: "10px auto" }} />

        <h3>Amenities</h3>
        <HotelAmenitiesSelector
          values={state.amenities}
          buttonColor="white"
          updateState={(selected) => {
            setState({ ...state, amenities: selected });
          }}
        />
      </Drawer>
    </div>
  );
}
