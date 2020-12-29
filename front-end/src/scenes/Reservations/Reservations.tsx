import { faCalendar, faRestroom, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@material-ui/core";
import React from "react";
import Rating from "react-rating";
import {
  CardFlight,
  CustomButton,
  DashDrawer,
  IconText,
  Navbar,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import { currencyFormatter, flightPlaceholder } from "../../utils";
import { reservationStyles } from "./reservation-styles";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import { format } from "date-fns";

export function Reservations() {
  const style = reservationStyles();

  const flights: Flight[] = flightPlaceholder;

  const hotels: HotelReservation[] = [
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

  function getHotelGuests(hotel: HotelReservation) {
    let adultWord = hotel.adults > 1 ? "adults" : "adult";
    let childrenWord = hotel.children > 1 ? "children" : "child";

    return `${hotel.adults} ${adultWord}, ${hotel.children} ${childrenWord}`;
  }

  return (
    <div className={style.mainContainer}>
      <Navbar />

      <Grid container>
        <Grid id="dashboard bar" item xs={2}>
          <DashDrawer />
        </Grid>

        <Grid item xs={9} className={style.pageContentGrid}>
          <Text bold style={{ marginBottom: "20px" }} component="h1">
            Reservations
          </Text>

          {/* Flights title */}
          <Grid item xs={12}>
            <Grid id="Flights" container>
              <Text component="h2">Flights</Text>
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
            <Grid container spacing={2}>
              {flights.map((flight, i) => (
                <CardFlight key={i} flight={flight} variant="deal" />
              ))}
            </Grid>
          </Grid>

          {/* Hotels title */}
          <Grid item xs={12}>
            <Grid id="Hotels" container>
              <Text component="h2">Hotels</Text>
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
            <Grid container>
              {hotels.map((hotel, i) => (
                <Card key={i} className={style.hotelCard}>
                  <CardActionArea>
                    <CardMedia component="img" src={hotel.picture} height="200" />

                    <CardContent>
                      <Text color={Colors.BLUE} component="h4" bold>
                        {hotel.name}
                      </Text>

                      <Rating
                        initialRating={hotel.stars}
                        readonly
                        emptySymbol={
                          <FontAwesomeIcon
                            style={{ margin: "0px 1px" }}
                            icon={faStarReg}
                            color={Colors.PURPLE}
                          />
                        }
                        fullSymbol={
                          <FontAwesomeIcon
                            style={{ margin: "0px 1px" }}
                            icon={faStar}
                            color={Colors.PURPLE}
                          />
                        }
                      />

                      <IconText style={{ marginTop: "10px" }} icon={faRestroom}>
                        {getHotelGuests(hotel)}
                      </IconText>

                      <IconText
                        icon={faCalendar}
                        text={`${format(hotel.checkIn, "dd/MM/yyyy")} - ${format(
                          hotel.checkOut,
                          "dd/MM/yyyy"
                        )}`}
                      />

                      <Grid container>
                        <Text
                          style={{ marginLeft: "auto" }}
                          color={Colors.BLUE}
                          component="h4"
                          bold
                        >
                          {currencyFormatter(hotel.cost)}
                        </Text>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
