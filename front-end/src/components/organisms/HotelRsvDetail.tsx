import React from "react";
import {
  Backdrop,
  Dialog,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { Font } from "../../assets";
import { CustomButton, IconText, IconTP, Rating, Text } from "../atoms";
import { Colors, Shadow } from "../../styles";
import {
  faCalendar,
  faMapMarkerAlt,
  faPhone,
  faTimes,
  faBed,
  faUser,
  faChild,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  capitalizeString,
  convertToUserCurrency,
  formatAsCurrency,
  getHotelReservationCost,
  HotelReservation,
  HotelRoom,
  hotelRsvPlaceholder,
  Routes,
  selectHotelRsv,
} from "../../utils";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { format } from "date-fns";

interface HotelRsvDetail {
  open: boolean;
  onClose: () => void;
}

interface RoomCard {
  room: HotelRoom;
}

export function HotelRsvDetail({ open, onClose }: HotelRsvDetail) {
  const hotelRsvStyles = makeStyles((theme: Theme) => ({
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    contentContainer: {
      backgroundColor: "white",
      fontFamily: Font.Family,
      width: "90%",
      margin: "auto",
      [theme.breakpoints.down(363)]: {
        marginTop: 25,
      },
    },
    closeButton: {
      marginLeft: "auto",
      width: "45px",
      top: 12,
      height: "45px",
      position: "absolute",
      left: "92%",
      [theme.breakpoints.down(500)]: {
        left: "89%",
      },
      [theme.breakpoints.down(420)]: {
        left: "84%",
      },
    },
    hotelInfoGrid: {
      width: "50%",
      [theme.breakpoints.down(685)]: {
        width: "100%",
      },
    },
    paper: {
      maxWidth: 715,
      padding: "20px 0px",
    },
    reservationContainer: {
      backgroundColor: Colors.BLUE,
      boxShadow: Shadow.MEDIUM3D,
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
    },
    reservationInfoGrid: {
      width: "50%",
      [theme.breakpoints.down(685)]: {
        width: "100%",
        marginTop: 10,
      },
    },
    roomImage: {
      maxWidth: 290,
      borderRadius: 10,
      [theme.breakpoints.down(383)]: {
        maxWidth: "100%",
      },
    },
    roomPhotoGrid: {
      width: "80%",
      [theme.breakpoints.down(500)]: {
        width: "100%",
      },
    },
    roomPriceGrid: {
      width: "20%",
      [theme.breakpoints.down(500)]: {
        width: "100%",
        marginTop: 10,
      },
    },
  }));

  const style = hotelRsvStyles();
  const history = useHistory();

  const hotelRsv: HotelReservation | undefined = useSelector(selectHotelRsv);

  const is363OrLess = useMediaQuery("(max-width:363px)");

  function getOccupancyText(param: "room" | "adult") {
    if (hotelRsv) {
      let roomQty = hotelRsv.rooms.length > 1 ? "rooms" : "room";
      let adultQty = hotelRsv.adults > 1 ? "adults" : "adult";

      return param === "room"
        ? `${hotelRsv.rooms.length} ${roomQty}`
        : `${hotelRsv.adults} ${adultQty}`;
    }

    return "";
  }

  function RoomCard({ room }: RoomCard) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Text component="h3" color={Colors.BLUE}>
            {capitalizeString(room.name, "each word")}
          </Text>
        </Grid>

        {/* Photo */}
        <Grid item className={style.roomPhotoGrid}>
          {room.image && <img src={room.image} className={style.roomImage} alt="" />}
        </Grid>

        {/* Price */}
        <Grid item className={style.roomPriceGrid}>
          {room.cost && (
            <Grid container alignItems="flex-end" style={{ height: "100%" }}>
              <Grid item>
                <Text color={Colors.GRAY_TEXT} style={{ marginBottom: 2 }}>
                  Total for room
                </Text>
                <Text component="h4" color={Colors.BLUE}>
                  {formatAsCurrency(convertToUserCurrency(room.cost, "USD"))}
                </Text>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} style={{ margin: "20px auto 10px auto" }}>
          <Divider />
        </Grid>
      </Grid>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      fullScreen={is363OrLess}
      classes={{ paper: style.paper }}
      BackdropProps={{
        timeout: 500,
        classes: { root: style.backdrop },
      }}
    >
      {hotelRsv && (
        <Grid container className={style.contentContainer}>
          {/* Title */}
          <Grid style={{ marginBottom: 20 }} item xs={12}>
            <Text component="h1" color={Colors.BLUE} style={{ marginRight: 20 }}>
              Reservation Details
            </Text>
            <IconButton className={style.closeButton} onClick={() => onClose()}>
              <FontAwesomeIcon icon={faTimes} color={Colors.BLUE} />
            </IconButton>
          </Grid>

          {/* Hotel and reservation info */}
          <Grid item xs={12}>
            <Grid container>
              {/* Hotel name */}
              <Grid item xs={12}>
                <Text component="h2" color={Colors.BLUE}>
                  {hotelRsv.name}
                </Text>
              </Grid>

              {/* Hotel info */}
              <Grid item className={style.hotelInfoGrid}>
                <Rating type="star" readonly size={25} score={hotelRsv.stars} />

                <IconText style={{ marginTop: 15 }} icon={faMapMarkerAlt} fontSize={16}>
                  {hotelRsv.address}
                </IconText>
                <IconText icon={faPhone} fontSize={16}>
                  {hotelRsv.phoneNumber}
                </IconText>

                <CustomButton
                  style={{ marginTop: 20, boxShadow: Shadow.LIGHT3D }}
                  backgroundColor={Colors.GREEN}
                  onClick={() => history.push(`${Routes.HOTELS}/${hotelRsv.hotelCode}`)}
                >
                  See hotel
                </CustomButton>
              </Grid>

              {/* Reservation info */}
              <Grid item className={style.reservationInfoGrid}>
                <div className={style.reservationContainer}>
                  {/* Dates */}
                  <>
                    <IconText textColor="white" icon={faCalendar} fontSize={16}>
                      <p style={{ margin: "0" }}>
                        <b>Check in: </b>
                        {format(hotelRsv.checkIn, "dd MMM., yyyy")}
                      </p>
                    </IconText>

                    <IconText textColor="white" icon={faCalendar} fontSize={16}>
                      <p style={{ margin: "0" }}>
                        <b>Check out: </b>
                        {format(hotelRsv.checkOut, "dd MMM., yyyy")}
                      </p>
                    </IconText>
                  </>

                  {/* Occupancy params */}
                  <>
                    <IconText textColor="white" icon={faBed} fontSize={16}>
                      {getOccupancyText("room")}
                    </IconText>

                    <IconText textColor="white" icon={faUser} fontSize={16}>
                      {getOccupancyText("adult")}
                    </IconText>

                    <IconText
                      textColor="white"
                      icon={faChild}
                      fontSize={16}
                    >{`${hotelRsv.children} children`}</IconText>
                  </>
                </div>
              </Grid>
            </Grid>
          </Grid>

          {/* Rooms */}
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Text component="h2" color={Colors.BLUE}>
              Rooms
            </Text>
            {hotelRsv.rooms.map((room) => (
              <RoomCard key={room.code} room={room} />
            ))}
          </Grid>

          {/* Total */}
          <Grid item xs={12} style={{ marginBottom: 30 }}>
            <Divider />

            <Grid container alignItems="center">
              <Text color={Colors.GRAY_TEXT} component="h4">
                Total
              </Text>

              <Text style={{ marginLeft: "auto" }} color={Colors.BLUE} component="h3">
                {formatAsCurrency(
                  convertToUserCurrency(getHotelReservationCost(hotelRsv), "USD")
                )}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}
