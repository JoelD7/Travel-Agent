import DateFnsUtils from "@date-io/date-fns";
import {
  faMapMarkerAlt,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  FormControl,
  Grid,
  MenuItem,
  Select,
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
import { Colors } from "../../styles";
import { homeStyles } from "../../styles/Home/home-styles";
import { FlightClass } from "../../utils/types";
import { FlightClassType } from "../../utils/types/FlightClassType";
import { CustomButton } from "../atoms";
import { CustomTF } from "../atoms/CustomTF";

interface FlightType {
  departure: MaterialUiPickersDate;
  return: MaterialUiPickersDate;
  from: string;
  to: string;
  passengers: string;
  class: FlightClassType;
  [key: string]: FlightType[keyof FlightType];
}

export default function HomeFlightReservation() {
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

      MuiSelect: {
        select: {
          borderColor: "#cecece",
          "&:focus": {
            borderColor: "#cecece",
          },
        },
      },
    },
  });

  const [flight, setFlight] = useState<FlightType>({
    departure: new Date(),
    return: addDays(new Date(), 2),
    from: "",
    to: "",
    passengers: "",
    class: "",
  });

  const locationParms = [
    {
      label: "From",
      prop: "from",
    },
    {
      label: "To",
      prop: "to",
    },
  ];

  const classes = [
    FlightClass.Economy,
    FlightClass.PremiumEconomy,
    FlightClass.Business,
    FlightClass.First,
  ];

  const style = homeStyles();
  return (
    <div>
      <Grid container className={style.reservationParamsGrid} spacing={2}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6} className={style.datepickerItemGrid}>
              <h5 className={style.reservationParamText}>Departure</h5>
              <KeyboardDatePicker
                value={flight.departure}
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => setFlight({ ...flight, departure: d })}
              />
            </Grid>

            <Grid item xs={6} className={style.datepickerItemGrid}>
              <h5 className={style.reservationParamText}>Return</h5>
              <KeyboardDatePicker
                value={flight.return}
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => setFlight({ ...flight, return: d })}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          {locationParms.map((param) => (
            <Grid item xs={6}>
              <h5 className={style.reservationParamText}>{param.label}</h5>
              <CustomTF
                value={flight[param.prop] as string}
                rounded
                width="100%"
                updateState={(e) =>
                  setFlight({ ...flight, [param.prop]: e.target.value })
                }
                startAdornment={
                  <FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BLUE} />
                }
              />
            </Grid>
          ))}
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <Grid item xs={4} key="passengers">
            <h5 className={style.reservationParamText}>Passengers</h5>

            <FormControl style={{ width: "100%" }}>
              <Select
                value={flight.passengers}
                variant="outlined"
                className={style.select}
                startAdornment={
                  <FontAwesomeIcon icon={faUsers} color={Colors.BLUE} />
                }
                onChange={(e) =>
                  setFlight({ ...flight, passengers: e.target.value as string })
                }
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <MenuItem value={n}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} key="class">
            <h5 className={style.reservationParamText}>Class</h5>

            <FormControl style={{ width: "100%" }}>
              <Select
                value={flight.class}
                variant="outlined"
                className={style.select}
                startAdornment={
                  <FontAwesomeIcon icon={faStar} color={Colors.BLUE} />
                }
                onChange={(e) =>
                  setFlight({
                    ...flight,
                    class: e.target.value as FlightClassType,
                  })
                }
              >
                {classes.map((n, i) => (
                  <MenuItem key={i} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        
          <Grid item xs={12}>
            <Grid container justify="center">
              <CustomButton
                rounded
                label="Search"
                style={{ width: "30%" }}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </div>
  );
}
