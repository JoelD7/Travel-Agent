import React from "react";
import { Helmet } from "react-helmet";
import {
  Navbar,
  ServicesToolbar,
  SliderArrow,
  Rating,
  Text,
  IconText,
} from "../../components";
import { hotelDetailsStyles } from "./hotelDetails-styles";
import Slider from "react-slick";
import { getHotelStars, hotelPhotos } from "../../utils";
import { Divider, Grid } from "@material-ui/core";
import { HotelBooking } from "../../utils/types/hotel-types";
import { Colors } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import { hotelPlaceholder } from "../../utils";

interface HotelDetails {
  hotel: HotelBooking;
}

export function HotelDetails({}: HotelDetails) {
  const style = hotelDetailsStyles();
  const hotel = hotelPlaceholder;

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow iconSize="2x" direction="right" />,
    prevArrow: <SliderArrow iconSize="2x" direction="left" />,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1374,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function getPhoneList() {
    return hotel.phones.map((phone) => phone.phoneNumber).join(" | ");
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Hotel George V</title>
      </Helmet>

      <Navbar />

      <ServicesToolbar />

      <div className={style.pageContainer}>
        {/* Images slider */}
        <div style={{ marginBottom: "20px" }}>
          <Slider {...sliderSettings} dots>
            {hotelPhotos.map((photo) => (
              <div key={photo} className={style.photoContainer}>
                <img src={`${photo}`} alt={`${photo}`} className={style.photo} />
              </div>
            ))}
          </Slider>
        </div>

        {/* About hotel and reservation info */}
        <Grid container style={{ marginTop: "40px" }}>
          <Grid item className={style.aboutHotelGrid}>
            <Grid container className={style.aboutHotelContainer}>
              {/* Hotel name */}
              <Grid item xs={12}>
                <Text component="h2" color={Colors.BLUE} bold>
                  {hotel.name.content}
                </Text>
              </Grid>

              {/* Hotel stars */}
              <Grid item xs={12}>
                <Rating type="star" readonly size="2x" score={getHotelStars(hotel)} />
              </Grid>

              {/* Address and contact */}
              <Grid item xs={12} style={{ marginTop: "15px" }}>
                <Grid container>
                  <IconText
                    style={{ marginRight: "20px" }}
                    icon={faMapMarkerAlt}
                    fontSize={16}
                  >
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

              <Grid item xs={12} style={{ marginTop: "15px" }}>
                <Text component="h3" bold color={Colors.BLUE}>
                  About the hotel
                </Text>

                <Text>{hotel.description.content}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
