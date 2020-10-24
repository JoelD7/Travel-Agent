import {
  faCar,
  faConciergeBell,
  faPlaneDeparture,
  faSearch,
  faSearchLocation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  createMuiTheme,
  Grid,
  IconButton,
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
import "./home.css";

interface ServiceIconType {
  hotel: boolean;
  flight: boolean;
  carRental: boolean;
  [key: string]: ServiceIconType[keyof ServiceIconType];
}

export function Home() {
  const style = homeStyles();

  const theme = createMuiTheme({
    overrides: {
      // MuiIconButton: {
      //   root: {
      //     "&:hover": {
      //       backgroundColor: Colors.PURPLE_HOVER,
      //     },
      //   },
      // },
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
