import {
  faBed,
  faCar,
  faChild,
  faConciergeBell,
  faPlaneDeparture,
  faSearch,
  faSearchLocation,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  createMuiTheme,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  CreateCSSProperties,
  CSSProperties,
  ThemeProvider,
} from "@material-ui/styles";
import React, { useState } from "react";
import { Component } from "react";
import { carlos } from "../../assets";
import { CustomButton } from "../../components";
import { ButtonIcon } from "../../components/atoms/ButtonIcon";
import { Navbar } from "../../components/molecules";
import { Colors } from "../../styles";
import { homeStyles, home_explore_button } from "../../styles/Home/home-styles";
import DateFnsUtils from "@date-io/date-fns";
import "./home.css";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, format } from "date-fns";
import { FONT } from "../../assets/fonts";
import { CustomTF } from "../../components/atoms/CustomTF";

interface ServiceIconType {
  hotel: boolean;
  flight: boolean;
  carRental: boolean;
  [key: string]: ServiceIconType[keyof ServiceIconType];
}

interface HotelType {
  arrival: MaterialUiPickersDate;
  departure: MaterialUiPickersDate;
  adults: unknown;
  children: unknown;
  rooms: unknown;
  [key: string]: HotelType[keyof HotelType];
}

export function Home() {
  const style = homeStyles();

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

  const buttonStyle: CreateCSSProperties<{}> = {
    margin: "0 5px 0 5px",
  };

  const services = [
    {
      name: "Hotel",
      route: "",
      icon: faConciergeBell,
    },
    {
      name: "Flight",
      route: "",
      icon: faPlaneDeparture,
    },
    {
      name: "Car rental",
      route: "",
      icon: faCar,
    },
  ];

  const [locationQuery, setLocationQuery] = useState<string>();

  const [selectedService, setSelectedService] = useState<ServiceIconType>({
    hotel: false,
    flight: false,
    carRental: false,
  });

  const [hotel, setHotel] = useState<HotelType>({
    arrival: new Date(),
    departure: addDays(new Date(), 2),
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

  function onServicePressed(service: string) {
    setSelectedService({
      hotel: false,
      flight: false,
      carRental: false,
      [service]: true,
    });
  }

  function getIconClassname(service: string) {
    return selectedService[service]
      ? style.serviceIconPurple
      : style.serviceIcon;
  }

  return (
    <div className="mainContainer">
      <Navbar>
        <CustomButton style={buttonStyle} label="Login" color={Colors.BLUE} />
        <CustomButton style={buttonStyle} label="Sign up" color={Colors.BLUE} />
        <CustomButton
          style={buttonStyle}
          label="Make a trip"
          color={Colors.PURPLE}
        />

        <IconButton style={{ marginLeft: "10px" }}>
          <Avatar src={carlos} />
        </IconButton>
      </Navbar>

      <Grid container>
        <Grid item className={style.reservationGrid}>
          <h3 style={{ textAlign: "center", color: Colors.BLUE }}>
            What are you looking for?
          </h3>

          <div className={style.servicesContainer}>
            {services.map((service) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ButtonIcon
                    primary={Colors.PURPLE}
                    secondary={"white"}
                    selectable={true}
                    selected={selectedService[service.name]}
                    onClick={() => onServicePressed(service.name)}
                    size="medium"
                    className={getIconClassname(service.name)}
                    icon={service.icon}
                  />
                </div>
                <p className={style.serviceName}>{service.name}</p>
              </div>
            ))}
          </div>

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
                <Grid item xs={6} className={style.datepickerItemGrid}>
                  <h5 className={style.reservationParamText}>Check-in</h5>
                  <KeyboardDatePicker
                    value={hotel.arrival}
                    className={style.datepicker}
                    minDate={new Date()}
                    format="dd MMM., yyyy"
                    onChange={(d) => setHotel({ ...hotel, arrival: d })}
                  />
                </Grid>

                <Grid item xs={6} className={style.datepickerItemGrid}>
                  <h5 className={style.reservationParamText}>Check-out</h5>
                  <KeyboardDatePicker
                    value={hotel.departure}
                    className={style.datepicker}
                    minDate={new Date()}
                    format="dd MMM., yyyy"
                    onChange={(d) => setHotel({ ...hotel, departure: d })}
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
                        <FontAwesomeIcon
                          icon={param.icon}
                          color={Colors.BLUE}
                        />
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
            </ThemeProvider>
          </Grid>
        </Grid>

        <Grid item className={style.mainPhotoGrid}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={style.homeImageDiv}
          >
            <div>
              <h1 className={style.homeImageText}>
                Hey, where you're off to next?
              </h1>
              <div className={style.exploreButtonContainer}>
                <CustomButton
                  style={home_explore_button}
                  label="Explore places"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
