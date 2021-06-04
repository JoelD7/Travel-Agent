import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Colors } from "../../../styles";
import { FavoriteTypes, getHotelStars, HotelBooking } from "../../../utils";
import { CustomButton, IconText, Rating, Text } from "../../atoms";
import { AddFavoritesButton } from "../AddFavoritesButton";
import { aboutHotelStyles } from "./aboutHotel-styles";

interface AboutHotel {
  hotel: HotelBooking;
}

export function AboutHotel({ hotel }: AboutHotel) {
  const [limitedAbout, setLimitedAbout] = useState(true);

  const style = aboutHotelStyles();

  function getPhoneList() {
    return hotel.phones.map((phone) => phone.phoneNumber).join(" | ");
  }

  return (
    <Grid container className={style.aboutHotelContainer}>
      {/* Hotel name */}
      <Grid item xs={12}>
        <Grid container>
          <Text component="h2" color={Colors.BLUE} bold>
            {hotel.name.content}
          </Text>

          <AddFavoritesButton
            style={{ margin: "auto 0px auto auto" }}
            type={FavoriteTypes.HOTEL}
            hotel={hotel}
          />
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
    </Grid>
  );
}
