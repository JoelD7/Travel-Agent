import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import { faCalendar, faRestroom, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import Helmet from "react-helmet";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import {
  CardFlight,
  CustomButton,
  DashDrawer,
  Footer,
  HotelRsvDetail,
  IconText,
  Navbar,
  Text,
  RsvHotels,
} from "../../components";
import { Colors } from "../../styles";
import {
  convertToUserCurrency,
  flightsPlaceholder,
  HotelReservation,
  hotelRsvPlaceholder,
  setHotelRsv,
} from "../../utils";
import { reservationStyles } from "./reservation-styles";

export function Reservations() {
  const style = reservationStyles();

  const flights: Flight[] = flightsPlaceholder;

  const dispatch = useDispatch();
  const [openHotelDialog, setOpenHotelDialog] = useState(false);

  const hotelRsv: HotelReservation = hotelRsvPlaceholder;

  const hotels: HotelReservationTemp[] = [
    {
      name: "Sheraton Santo Domingo",
      adults: 2,
      children: 1,
      checkIn: new Date(2020, 5, 15),
      checkOut: new Date(2020, 5, 22),
      rooms: 1,
      stars: 4,
      cost: 1325,
      picture: "/Travel-Agent/sheraton.jpg",
      id: "465as32654",
    },
    {
      name: "Hilton Capibara",
      adults: 4,
      children: 4,
      checkIn: new Date(2020, 5, 15),
      checkOut: new Date(2020, 5, 22),
      rooms: 3,
      stars: 5,
      cost: 755,
      picture: "/Travel-Agent/h1.jpg",
      id: "7ka1265as54",
    },
    {
      name: "Riu Naiboa",
      adults: 2,
      children: 1,
      checkIn: new Date(2020, 5, 15),
      checkOut: new Date(2020, 5, 22),
      rooms: 1,
      stars: 4,
      cost: 1325,
      picture: "/Travel-Agent/h2.jpg",
      id: "a872kj123",
    },
  ];

  function getHotelGuests(hotel: HotelReservationTemp) {
    let adultWord = hotel.adults > 1 ? "adults" : "adult";
    let childrenWord = hotel.children > 1 ? "children" : "child";

    return `${hotel.adults} ${adultWord}, ${hotel.children} ${childrenWord}`;
  }

  function seeHotelReservationDetails() {
    setOpenHotelDialog(true);
    dispatch(setHotelRsv(hotelRsv));
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Reservations</title>
      </Helmet>

      <Navbar className={style.navbar} dashboard position="sticky" />
      <DashDrawer />

      <Grid container>
        <Grid item className={style.pageContentGrid}>
          <IconText
            style={{ marginBottom: "20px", marginTop: "10px" }}
            iconStyle={{ padding: "12px" }}
            shadow
            size={35}
            icon={faCalendar}
          >
            <Text bold component="h1">
              Reservations
            </Text>
          </IconText>

          {/* Flights title */}
          <Grid item xs={12}>
            <Grid id="Flights" container>
              <Text bold color={Colors.BLUE} component="h2">
                Flights
              </Text>
              <CustomButton
                style={{ paddingBottom: "0px" }}
                iconColor="#7e7e7e"
                backgroundColor="rgba(0,0,0,0)"
                textColor="#7e7e7e"
              >
                See all
              </CustomButton>
            </Grid>
          </Grid>

          {/* Flights */}
          <Grid item xs={12}>
            <Grid container>
              {flights.map((flight, i) => (
                <CardFlight
                  className={style.flightCard}
                  key={i}
                  flight={flight}
                  variant="deal"
                />
              ))}
            </Grid>
          </Grid>

          {/* Hotels title */}
          <Grid item xs={12} style={{ marginTop: "30px" }}>
            <Grid id="Hotels" container>
              <Text bold color={Colors.BLUE} component="h2">
                Hotels
              </Text>
              <CustomButton
                style={{ paddingBottom: "0px" }}
                iconColor="#7e7e7e"
                backgroundColor="rgba(0,0,0,0)"
                textColor="#7e7e7e"
              >
                See all
              </CustomButton>
            </Grid>
          </Grid>

          {/* Hotels */}
          <Grid item xs={12}>
            <RsvHotels />
          </Grid>
        </Grid>
      </Grid>

      <HotelRsvDetail open={openHotelDialog} onClose={() => setOpenHotelDialog(false)} />

      <div className={style.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
