import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { CreateCSSProperties, CSSProperties } from "@material-ui/styles";
import * as React from "react";
import { Component } from "react";
import { carlos } from "../../assets";
import { CustomButton } from "../../components";
import { Navbar } from "../../components/molecules";
import { Colors } from "../../styles";
import { homeStyles, home_explore_button } from "../../styles/Home/home-styles";
import "./home.css";

export function Home() {
  const style = homeStyles();

  const buttonStyle: CreateCSSProperties<{}> = {
    margin: "0 5px 0 5px",
  };

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
        <Grid item className="reservationGrid">
          reservation
        </Grid>
        <Grid item className="mainPhotoGrid">
          <div className="homeImageDiv">
            <div>
              <h1 className="homeImageText">Hey, where are you off to next?</h1>
              <CustomButton
                style={home_explore_button}
                label="Explore places"
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
