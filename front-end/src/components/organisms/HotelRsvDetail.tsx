import {
  faBed,
  faCalendar,
  faChild,
  faMapMarkerAlt,
  faPhone,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  Dialog,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { format } from "date-fns";
import React, { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";
import {
  backend,
  capitalizeString,
  convertReservationParamsToURLParams,
  convertToUserCurrency,
  deleteTripEventFromStore,
  EventTypes,
  formatAsCurrency,
  getHotelReservationCost,
  HotelBookingParams,
  HotelReservation,
  HotelRoomReservation,
  isHotelRsvInTrip,
  Routes,
  selectHotelReservationParams,
  selectHotelRsv,
  selectUserTrips,
  Trip,
  TripEvent,
  tripEventPlaceholder,
} from "../../utils";
import { CustomButton, IconText, Rating, Text } from "../atoms";
import { IncludeInTripPopover } from "./IncludeInTripPopover/IncludeInTripPopover";

interface HotelRsvDetail {
  open: boolean;
  onClose: () => void;
}

interface RoomCard {
  room: HotelRoomReservation;
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
      maxWidth: 745,
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
  const reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  const userTrips: Trip[] | undefined = useSelector(selectUserTrips);
  const hotelRsv: HotelReservation = useSelector(selectHotelRsv);
  const [tripAnchor, setTripAnchor] = useState<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const is363OrLess = useMediaQuery("(max-width:363px)");
  const [openRsvDeletedSnack, setOpenRsvDeletedSnack] = useState(false);

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

  function isHotelRsvInAnyTrip(): boolean {
    let included: boolean = false;

    if (userTrips) {
      userTrips.forEach((trip) => {
        if (isHotelRsvInTrip(hotelRsv, trip)) {
          included = true;
          return;
        }
      });
    }

    return included;
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
          {room.totalAmount && (
            <Grid container alignItems="flex-end" style={{ height: "100%" }}>
              <Grid item>
                <Text color={Colors.GRAY_TEXT} style={{ marginBottom: 2 }}>
                  Total for room
                </Text>
                <Text component="h4" color={Colors.BLUE}>
                  {formatAsCurrency(convertToUserCurrency(room.totalAmount, "USD"))}
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

  function seeHotel() {
    history.push(
      `${Routes.HOTELS}/${hotelRsv.hotelCode}${convertReservationParamsToURLParams(
        reservationParams,
        "hotelDetails"
      )}`
    );
  }

  function deleteHotelRsvFromTrip() {
    let tripEventOfHotel: TripEvent = getTripEventOfHotel();

    if (tripEventOfHotel.uuid) {
      backend
        .delete(`/trip-event/delete/${tripEventOfHotel.uuid}`)
        .then((res) => {
          setOpenRsvDeletedSnack(true);

          deleteTripEventFromStore(tripEventOfHotel.uuid);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  }

  function getTripEventOfHotel() {
    let tripEvent: TripEvent = tripEventPlaceholder;

    if (userTrips) {
      userTrips.forEach((trip) => {
        if (trip.itinerary) {
          trip.itinerary.forEach((event) => {
            if (
              event.hotelReservation &&
              event.hotelReservation.idHotelReservation === hotelRsv.idHotelReservation
            ) {
              tripEvent = event;
              return;
            }
          });
        }

        if (tripEvent) {
          return;
        }
      });
    }

    return tripEvent;
  }

  function cancelReservation() {
    backend
      .delete(`/hotel/${hotelRsv.idHotelReservation}`)
      .then((res) => {
        setOpenRsvDeletedSnack(true);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function onIncludeInTripOpen(event: MouseEvent<HTMLButtonElement>) {
    setTripAnchor(event.currentTarget);
    setOpenPopover(true);
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

                {/* Buttons */}
                <Grid container style={{ marginTop: 20 }}>
                  <Grid item xs={12}>
                    <CustomButton
                      style={{ boxShadow: Shadow.LIGHT3D, fontSize: 14 }}
                      backgroundColor={Colors.GREEN}
                      onClick={() => seeHotel()}
                    >
                      See hotel
                    </CustomButton>
                  </Grid>

                  <Grid container style={{ marginTop: 10 }}>
                    {isHotelRsvInAnyTrip() ? (
                      <CustomButton
                        style={{ boxShadow: Shadow.LIGHT3D, fontSize: 14 }}
                        backgroundColor={Colors.RED}
                        onClick={() => deleteHotelRsvFromTrip()}
                      >
                        Delete from trip
                      </CustomButton>
                    ) : (
                      <CustomButton
                        style={{ boxShadow: Shadow.LIGHT3D, fontSize: 14 }}
                        backgroundColor={Colors.RED}
                        onClick={() => cancelReservation()}
                      >
                        Cancel reservation
                      </CustomButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* Reservation info */}
              <Grid item className={style.reservationInfoGrid}>
                {!isHotelRsvInAnyTrip() && (
                  <Grid container style={{ marginTop: 10, width: "100%" }}>
                    <CustomButton
                      style={{
                        boxShadow: Shadow.LIGHT3D,
                        marginLeft: "auto",
                        fontSize: 14,
                      }}
                      backgroundColor={Colors.GREEN}
                      onClick={(e) => onIncludeInTripOpen(e)}
                      rounded
                    >
                      Include in trip
                    </CustomButton>
                  </Grid>
                )}

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

      <IncludeInTripPopover
        place={hotelRsv}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        eventType={EventTypes.HOTEL}
        tripAnchor={tripAnchor}
        setTripAnchor={setTripAnchor}
      />

      <Snackbar
        open={openRsvDeletedSnack}
        autoHideDuration={6000}
        onClose={() => setOpenRsvDeletedSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenRsvDeletedSnack(false)}
          severity="error"
        >
          Reservation canceled.
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
