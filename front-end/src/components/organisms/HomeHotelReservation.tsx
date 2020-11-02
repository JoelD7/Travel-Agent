import DateFnsUtils from "@date-io/date-fns";
import {
  faBed,
  faChild,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
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
import { Colors, Shadow } from "../../styles";
import {
  homeStyles,
  style_createTripButton,
} from "../../styles/Home/home-styles";
import { CustomButton } from "../atoms";

interface HotelType {
  checkIn: MaterialUiPickersDate;
  checkOut: MaterialUiPickersDate;
  adults: unknown;
  children: unknown;
  rooms: unknown;
  [key: string]: HotelType[keyof HotelType];
}

export default function HomeHotelReservation() {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: FONT,
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

  const [locationQuery, setLocationQuery] = useState<string>();
  const [hotel, setHotel] = useState<HotelType>({
    checkIn: new Date(),
    checkOut: addDays(new Date(), 2),
    adults: "",
    children: "",
    rooms: "",
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
  return (
    <div>
      <div className={style.searchLocationContainer}>
        <IconButton style={{ boxShadow: "5px 5px 5px #cecece" }}>
          <FontAwesomeIcon icon={faSearch} color={Colors.BLUE} />
        </IconButton>

        <TextField
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          className={style.locationQueryTF}
          placeholder="Where?"
          variant="outlined"
          size="small"
          InputProps={{
            className: style.locationQueryText,
          }}
        />
      </div>

      <Grid container className={style.reservationParamsGrid} spacing={2}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item className={style.datepickerItemGrid}>
              <h5 className={style.reservationParamText}>Check-in</h5>
              <KeyboardDatePicker
                value={hotel.checkIn}
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => setHotel({ ...hotel, checkIn: d })}
              />
            </Grid>

            <Grid item className={style.datepickerItemGrid}>
              <h5 className={style.reservationParamText}>Check-out</h5>
              <KeyboardDatePicker
                value={hotel.checkOut}
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => setHotel({ ...hotel, checkOut: d })}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          {hotelReservationParams.map((param) => (
            <Grid item xs={4}>
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
                    setHotel({ ...hotel, [param.field]: e.target.value })
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <MenuItem value={n}>{n}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Grid container justify="center">
              <CustomButton
                rounded
                label="Search"
                style={{ width: "90%", boxShadow: Shadow.LIGHT }}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </div>
  );
}
