import DateFnsUtils from "@date-io/date-fns";
import { faBed, faChild, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, parseISO } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";
import { homeStyles } from "../../styles/Home/home-styles";
import {
  getHotelSearchURL,
  HotelBookingParams,
  isDateAfterOrEqual,
  muiDateFormatter,
  selectDestinationCity,
  selectHotelReservationParams,
  AutocompleteType,
  IATALocation,
  updateReservationParams,
} from "../../utils";
import { CustomButton } from "../atoms";
import { IataAutocomplete } from "./IataAutocomplete/IataAutocomplete";

interface HotelType {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
  [key: string]: HotelType[keyof HotelType];
}

export default function HomeHotelReservation() {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Family,
        },
      },
      MuiButton: {
        root: {
          fontFamily: Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Family,
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
          fontFamily: Family,
        },
        subtitle1: {
          fontFamily: Family,
        },
        body1: {
          fontFamily: Family,
        },
        body2: {
          fontFamily: Family,
        },
        caption: {
          fontFamily: Family,
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

  const history = useHistory();

  const [hotel, setHotel] = useState<HotelType>({
    checkIn: new Date(),
    checkOut: addDays(new Date(), 2),
    adults: 0,
    children: 0,
    rooms: 0,
  });

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

  const style = homeStyles();

  const dispatch = useDispatch();

  const reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);
  const destinationCity: IATALocation = useSelector(selectDestinationCity);

  function onDateChange(date: MaterialUiPickersDate, param: "checkIn" | "checkOut") {
    let newDate: Date = date === null ? new Date() : parseISO(date.toISOString());

    let checkOut: Date =
      hotel.checkOut === null ? new Date() : parseISO(hotel.checkOut.toISOString());

    let newHotel = { ...hotel, [param]: newDate };

    if (param === "checkIn" && isDateAfterOrEqual(newDate, checkOut)) {
      newHotel = { ...newHotel, ["checkOut"]: addDays(newDate, 2) };
    }

    setHotel(newHotel);
  }

  function onSearchClick() {
    let occupancies = [
      {
        adults: hotel.adults,
        children: hotel.children,
        rooms: hotel.rooms,
        paxes: [],
      },
    ];

    let stay = {
      checkIn: hotel.checkIn,
      checkOut: hotel.checkOut,
    };

    let geolocation = {
      longitude: Number(destinationCity.lon),
      latitude: Number(destinationCity.lat),
      radius: 15,
      unit: "km",
    };

    dispatch(
      updateReservationParams({ ...reservationParams, occupancies, stay, geolocation })
    );

    history.push(getHotelSearchURL());
  }

  return (
    <div>
      <div className={style.searchLocationContainer}>
        <IataAutocomplete type={AutocompleteType.CITY} placeholder="Where?" />
      </div>

      <Grid container className={style.reservationParamsGrid} spacing={2}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item className={style.datepickerItemGrid}>
              <h5 className={style.reservationParamText}>Check-in</h5>
              <KeyboardDatePicker
                value={hotel.checkIn}
                labelFunc={(date, invalidLabel) =>
                  muiDateFormatter(date, invalidLabel, "date")
                }
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => onDateChange(d, "checkIn")}
              />
            </Grid>

            <Grid item className={style.datepickerItemGrid}>
              <h5 className={style.reservationParamText}>Check-out</h5>
              <KeyboardDatePicker
                value={hotel.checkOut}
                labelFunc={(date, invalidLabel) =>
                  muiDateFormatter(date, invalidLabel, "date")
                }
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => onDateChange(d, "checkOut")}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          {hotelReservationParams.map((param) => (
            <Grid item xs={4} key={param.field}>
              <h5 className={style.reservationParamText}>{param.label}</h5>

              <FormControl style={{ width: "100%" }}>
                <Select
                  value={hotel[param.field]}
                  variant="outlined"
                  className={style.select}
                  startAdornment={
                    <FontAwesomeIcon icon={param.icon} color={Colors.BLUE} />
                  }
                  onChange={(e) =>
                    setHotel({ ...hotel, [param.field]: e.target.value as number })
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Grid container justify="center">
              <CustomButton
                rounded
                style={{ width: "90%", boxShadow: Shadow.MEDIUM }}
                onClick={() => onSearchClick()}
              >
                Search
              </CustomButton>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </div>
  );
}
