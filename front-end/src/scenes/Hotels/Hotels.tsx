import DateFnsUtils from "@date-io/date-fns";
import {
  faBed,
  faChild,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  Divider,
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
import React, { ChangeEvent, useState } from "react";
import { FONT } from "../../assets/fonts";
import {
  CustomButton,
  HotelPriceRange,
  HotelStarSelector,
  Navbar,
  ServicesToolbar,
} from "../../components";
import { HotelAmenitiesSelector } from "../../components/atoms/HotelAmenitiesSelector/HotelAmenitiesSelector";
import { Colors, Shadow } from "../../styles";
import { Amenities, AmenitiesType } from "../../utils/HotelAmenities";
import { hotelsStyles } from "./hotels-styles";

interface HotelsType {
  checkIn: MaterialUiPickersDate;
  checkOut: MaterialUiPickersDate;
  adults: unknown;
  children: unknown;
  rooms: unknown;
  priceRange: number[];
  stars: number;
  amenities: AmenitiesType[];
  [key: string]: HotelsType[keyof HotelsType];
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

  const [state, setState] = useState<HotelsType>({
    checkIn: new Date(),
    checkOut: addDays(new Date(), 2),
    adults: "",
    children: "",
    rooms: "",
    priceRange: [0, 100],
    stars: 0,
    amenities: Amenities,
  });

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

            <Grid item xs={2} style={{ marginLeft: "auto" }}>
              <Grid container justify="center">
                <CustomButton
                  label="Search"
                  backgroundColor={Colors.GREEN}
                  style={{
                    width: "90%",
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
          <Grid item xs={3} className={style.filtersGrid}>
            <h3>Price range</h3>
            <HotelPriceRange
              value={state.priceRange}
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

          <Grid item xs={9} id="hotel list">
            <Grid item xs={12} id="card" className={style.hotelCard}>
              <Grid item xs={4} id="photo" style={{ height: "100%" }}>
                <img src={"sheraton.jpg"} className={style.hotelImage} />
              </Grid>

              <Grid item xs={8} id="content">
                <Grid item xs={12} id="title">
                  <h3>Sheraton Santo Domingo</h3>
                </Grid>

                <Grid container>
                  <Grid item xs={4} className={style.cardData1}>
                    <div>
                      <h4 style={{ textAlign: "center" }}>$ 145</h4>
                      <CustomButton
                        label="View details"
                        backgroundColor={Colors.PURPLE}
                        onClick={() => {}}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={4} className={style.cardData1}>
                    <div>
                      <p style={{fontSize: '14px'}}>
                        <b>Hotel info</b>
                      </p>
                      <p style={{fontSize: '14px'}}>809-798-5680</p>
                      <p style={{fontSize: '14px'}}>Calle Fco. Ramirez, #33, Santo Domingo, Rep. Dom.</p>
                    </div>
                  </Grid>

                  <Grid item xs={4} className={style.cardData2}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={9}></Grid>
        </Grid>
      </div>
    </div>
  );
}
