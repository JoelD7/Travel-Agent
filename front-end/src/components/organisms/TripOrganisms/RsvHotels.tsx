import { faRestroom, faCalendar, faBed } from "@fortawesome/free-solid-svg-icons";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Colors, Shadow } from "../../../styles";
import {
  convertToUserCurrency,
  getHotelReservationCost,
  HotelReservation,
  hotelRsvPlaceholder,
  setHotelRsv,
} from "../../../utils";
import { IconText, Rating, Text } from "../../atoms";
import { HotelRsvDetail } from "../HotelRsvDetail";

interface RsvHotels {
  showAll?: boolean;
}

export const RsvHotels = React.memo(function RsvHotels({ showAll = true }: RsvHotels) {
  const rsvHotelsStyles = makeStyles((theme: Theme) => ({
    hotelCard: {
      borderRadius: "10px",
      width: "25%",
      margin: "10px 5px",
      boxShadow: Shadow.LIGHT3D,

      [theme.breakpoints.only("md")]: {
        width: "35%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "48%",
      },
      [theme.breakpoints.down(686)]: {
        width: "90%",
      },
    },
  }));

  const style = rsvHotelsStyles();

  const dispatch = useDispatch();
  const [openHotelDialog, setOpenHotelDialog] = useState(false);

  const hotelRsv: HotelReservation = hotelRsvPlaceholder;
  const hotels: HotelReservation[] = [
    hotelRsvPlaceholder,
    hotelRsvPlaceholder,
    hotelRsvPlaceholder,
  ];

  function seeHotelReservationDetails() {
    setOpenHotelDialog(true);
    dispatch(setHotelRsv(hotelRsv));
  }

  function getHotelGuests(hotel: HotelReservation) {
    let adultWord = hotel.adults > 1 ? "adults" : "adult";
    let childrenWord = hotel.children > 1 ? "children" : "child";

    return `${hotel.adults} ${adultWord}, ${hotel.children} ${childrenWord}`;
  }

  function getHotels() {
    return showAll ? hotels : hotels.slice(0, 3);
  }

  return (
    <Grid container>
      {getHotels().map((hotel, i) => (
        <Card key={i} className={style.hotelCard}>
          <CardActionArea onClick={() => seeHotelReservationDetails()}>
            <CardMedia component="img" src={hotel.hotelImage} height="200" />

            <CardContent>
              <Text color={Colors.BLUE} component="h4" bold>
                {hotel.name}
              </Text>

              <Rating type="star" score={hotel.stars} />

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

              <IconText icon={faBed}>
                {hotel.rooms.length > 1 ? `${hotel.rooms.length} rooms` : `1 room`}
              </IconText>

              <Grid container>
                <Text
                  style={{ marginLeft: "auto" }}
                  color={Colors.BLUE}
                  component="h4"
                  bold
                >
                  {convertToUserCurrency(getHotelReservationCost(hotel), "USD")}
                </Text>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      <HotelRsvDetail open={openHotelDialog} onClose={() => setOpenHotelDialog(false)} />
    </Grid>
  );
});
