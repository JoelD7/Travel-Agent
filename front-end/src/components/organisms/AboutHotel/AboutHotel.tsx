import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Grid, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import { getHotelStars, HotelBooking } from "../../../utils";
import { CustomButton, IconText, Rating, Text } from "../../atoms";
import { aboutHotelStyles } from "./aboutHotel-styles";

interface AboutHotel {
  hotel: HotelBooking;
}

export function AboutHotel({ hotel }: AboutHotel) {
  const [limitedAbout, setLimitedAbout] = useState(true);

  const style = aboutHotelStyles();
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackRemoved, setOpenSnackRemoved] = useState(false);
  const [favorite, setFavorite] = useState(false);

  function getPhoneList() {
    return hotel.phones.map((phone) => phone.phoneNumber).join(" | ");
  }

  function addToFavorites() {
    if (!favorite) {
      setFavorite(true);
      setOpenSnack(true);
    } else {
      setFavorite(false);
      setOpenSnackRemoved(true);
    }
  }

  return (
    <Grid container className={style.aboutHotelContainer}>
      {/* Hotel name */}
      <Grid item xs={12}>
        <Grid container>
          <Text component="h2" color={Colors.BLUE} bold>
            {hotel.name.content}
          </Text>

          <IconButton
            style={{ margin: "auto 0px auto auto" }}
            onClick={() => addToFavorites()}
          >
            <FontAwesomeIcon
              icon={favorite ? faHeart : faHeartReg}
              color={Colors.PURPLE}
            />
          </IconButton>
        </Grid>
      </Grid>

      {/* Hotel stars */}
      <Grid item xs={12}>
        <Rating type="star" readonly size={30} score={getHotelStars(hotel)} />
      </Grid>

      {/* Address and contact */}
      <Grid item xs={12} style={{ marginTop: "15px" }}>
        <Grid container>
          <IconText style={{ marginRight: "20px" }} icon={faMapMarkerAlt} fontSize={16}>
            {hotel.address.content}
          </IconText>
          <IconText icon={faPhone} fontSize={16}>
            {getPhoneList()}
          </IconText>
        </Grid>
      </Grid>

      {/* Divider */}
      <Grid item xs={12}>
        <Divider style={{ backgroundColor: "#cecece", margin: "10px auto" }} />
      </Grid>

      {/* About the hotel */}
      <Grid item xs={12} style={{ marginTop: "15px" }}>
        <Text component="h3" bold color={Colors.BLUE}>
          About the hotel
        </Text>

        <Text
          style={{ whiteSpace: "pre-line" }}
          className={limitedAbout ? style.limitedAboutText : ""}
        >
          {hotel.description.content}
        </Text>

        {/* See more text button */}
        <Grid container>
          {limitedAbout ? (
            <CustomButton
              style={{ marginLeft: "auto" }}
              type="text"
              textColor={Colors.BLUE}
              onClick={() => setLimitedAbout(false)}
            >
              See more
            </CustomButton>
          ) : (
            <CustomButton
              style={{ marginLeft: "auto" }}
              type="text"
              textColor={Colors.BLUE}
              onClick={() => setLimitedAbout(true)}
            >
              See less
            </CustomButton>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnack(false)}
          severity="success"
        >
          {"Added to favorites."}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackRemoved}
        autoHideDuration={6000}
        onClose={() => setOpenSnackRemoved(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnackRemoved(false)}
          severity="error"
        >
          {"Removed from favorites."}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
