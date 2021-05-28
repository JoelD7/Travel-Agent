import {
  faBed,
  faCalendar,
  faCamera,
  faCheck,
  faChild,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  CardActionArea,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";
import {
  areAllRoomsToBookBooked,
  capitalizeString,
  convertToUserCurrency,
  formatAsCurrency,
  getRoomImage,
  getRoomTotalPrice,
  HotelBooking,
  HotelBookingParams,
  HotelReservation,
  HotelRoom,
  HotelRoomRate,
  HotelRoomReservation,
  selectHotelDetail,
  selectHotelReservationParams,
  selectHotelRsv,
  setHotelRsv,
} from "../../../utils";
import { CustomButton, IconText, Text } from "../../atoms";

interface RoomAccordionTitle {
  room: HotelRoom;
  totalRoomCost: number;
}

export function RoomAccordionTitle({ room, totalRoomCost }: RoomAccordionTitle) {
  const hotel: HotelBooking | undefined = useSelector(selectHotelDetail);
  const reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  const hotelRsv: HotelReservation = useSelector(selectHotelRsv);

  let image: string = getRoomImage(room);

  const accordionTitleStyles = makeStyles((theme: Theme) => ({
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    cardArea: {
      width: "auto",
      height: "100%",
    },
    contentContainer: {
      width: "49%",
      marginLeft: "10px",
      [theme.breakpoints.down(837)]: {
        width: "75%",
        marginLeft: "0px",
      },
      [theme.breakpoints.down(500)]: {
        width: "100%",
      },
    },
    image: {
      objectFit: "cover",
      borderRadius: "5px",
      width: "100%",
    },
    imageContainer: {
      width: "49%",
      height: "fit-content",
      [theme.breakpoints.down(1027)]: {
        height: "23vw",
      },
      [theme.breakpoints.down(837)]: {
        display: "none",
      },
    },
    infoBoxGridItem: {
      width: "80%",
      padding: "5px",
      [theme.breakpoints.down(837)]: {
        width: "93%",
      },
    },
    paper: {
      borderRadius: "10px",
    },
    paperWidth: {
      maxWidth: "90vw",
    },
    photoPopupContainer: {
      backgroundColor: Colors.PURPLE,
      "&:hover": {
        backgroundColor: Colors.PURPLE_HOVER,
      },
      display: "flex",
      alignItems: "center",
      width: `100px`,
      height: `100px`,
      borderRadius: "50%",
      padding: "10px",
      boxShadow: Shadow.MEDIUM,
    },
    photoPopupContainerXS: {
      backgroundColor: Colors.PURPLE,
      "&:hover": {
        backgroundColor: Colors.PURPLE_HOVER,
      },
      alignItems: "center",
      width: `43px`,
      height: `43px`,
      borderRadius: "50%",
      padding: "10px",
      boxShadow: Shadow.MEDIUM,
      marginLeft: "auto",

      display: "none",
      [theme.breakpoints.down(500)]: {
        display: "flex",
      },
    },
    photoPopupGrid: {
      display: "none",
      width: "25%",
      [theme.breakpoints.down(837)]: {
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down(500)]: {
        display: "none",
      },
    },
    reservationInfoContainer: {
      marginLeft: "auto",
      borderRadius: "10px",
      backgroundColor: Colors.BLUE,
      boxShadow: Shadow.MEDIUM,
      padding: "10px",
    },
  }));

  const style = accordionTitleStyles();
  const [openDialog, setOpenDialog] = useState(false);

  // const [totalRoomCost, setTotalRoomCost] = useState<number>(0);

  const [roomsToBookLabel, setRoomsToBookLabel] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    image = getRoomImage(room);
  }, [room]);

  function getOccupancyText(param: "room" | "adult") {
    let roomQty = reservationParams.occupancies[0].rooms > 1 ? "rooms" : "room";
    let adultQty = reservationParams.occupancies[0].adults > 1 ? "adults" : "adult";

    return param === "room"
      ? `${reservationParams.occupancies[0].rooms} ${roomQty}`
      : `${reservationParams.occupancies[0].adults} ${adultQty}`;
  }

  function getMinRateForRoom(): number {
    let rates: HotelRoomRate[] = room.rates;

    let minRate = rates.reduce((prev: HotelRoomRate, cur: HotelRoomRate) => {
      let totalPrev = getRoomTotalPrice(prev);
      let totalCur = getRoomTotalPrice(cur);

      return totalPrev < totalCur ? prev : cur;
    }, rates[0]);

    return getRoomTotalPrice(minRate);
  }

  function onImageClicked(e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.stopPropagation();
    setOpenDialog(true);
  }

  function addRoomToReservation() {
    let newRoom = mapRoomToRoomReservation(room);
    let updatedRooms: HotelRoomReservation[] = [...hotelRsv.rooms, newRoom];
    let newHotelRsv: HotelReservation = { ...hotelRsv, rooms: updatedRooms };

    setRoomsToBookCounterLabel(updatedRooms);

    dispatch(setHotelRsv(newHotelRsv));
  }

  function mapRoomToRoomReservation(room: HotelRoom): HotelRoomReservation {
    return {
      code: room.code,
      image: getRoomImage(room),
      name: room.name,
      totalAmount: totalRoomCost,
    };
  }

  function setRoomsToBookCounterLabel(bookedRooms: HotelRoomReservation[]) {
    let bookedSoFar: number = bookedRooms.length;
    let toBook: number = reservationParams.occupancies[0].rooms as number;

    setRoomsToBookLabel(`${bookedSoFar} of ${toBook} rooms booked.`);
    setOpenSnackbar(true);
  }

  function removeRoomFromReservation() {
    let updatedRooms: HotelRoomReservation[] = hotelRsv.rooms.filter(
      (r) => r.code !== room.code
    );
    let newHotelRsv: HotelReservation = { ...hotelRsv, rooms: updatedRooms };

    dispatch(setHotelRsv(newHotelRsv));
  }

  function isRoomBooked(): boolean {
    return hotelRsv.rooms.filter((r) => r.code === room.code).length > 0;
  }

  return (
    <div onClick={(e) => e.stopPropagation()} onFocus={(e) => e.stopPropagation()}>
      {hotel && (
        <Grid container alignItems="center">
          {/* Image */}
          {image !== "" && (
            <Grid item className={style.imageContainer}>
              <CardActionArea
                onClick={(e) => onImageClicked(e)}
                onFocus={(e) => e.stopPropagation()}
                style={{ height: "fit-content" }}
              >
                <img src={`${image}`} className={style.image} alt={`${room.name}`} />
              </CardActionArea>
            </Grid>
          )}

          {/* Reservation info */}
          <Grid item className={style.contentContainer}>
            {/* Room Name */}
            <Text component="h3" color={Colors.BLUE} bold>
              {capitalizeString(room.name, "full sentence")}
            </Text>

            {/* Info box */}
            <Grid item className={style.infoBoxGridItem}>
              <Grid container className={style.reservationInfoContainer}>
                {/* Title */}
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Text color="white" component="h5">
                        Rates starting at
                      </Text>
                      {/* Min Price */}
                      <Text color="white" component="h3" bold>
                        {formatAsCurrency(
                          convertToUserCurrency(getMinRateForRoom(), "USD")
                        )}
                      </Text>
                    </Grid>

                    <Grid item xs={4}>
                      <IconButton
                        className={style.photoPopupContainerXS}
                        onClick={(e) => onImageClicked(e)}
                        onFocus={(e) => e.stopPropagation()}
                      >
                        <FontAwesomeIcon icon={faCamera} color="white" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Dates */}
                {hotel.checkIn && hotel.checkOut && (
                  <>
                    <Grid item xs={12} style={{ marginTop: "20px" }}>
                      <IconText textColor="white" icon={faCalendar} fontSize={16}>
                        <p style={{ margin: "0" }}>
                          <b>Check in: </b>
                          {format(parseISO(hotel.checkIn), "dd MMM., yyyy")}
                        </p>
                      </IconText>
                    </Grid>

                    <Grid item xs={12}>
                      <IconText textColor="white" icon={faCalendar} fontSize={16}>
                        <p style={{ margin: "0" }}>
                          <b>Check out: </b>
                          {format(parseISO(hotel.checkOut), "dd MMM., yyyy")}
                        </p>
                      </IconText>
                    </Grid>
                  </>
                )}

                {/* Occupancy params */}
                <Grid item xs={12}>
                  <IconText textColor="white" icon={faBed} fontSize={16}>
                    {getOccupancyText("room")}
                  </IconText>
                </Grid>
                <Grid item xs={12}>
                  <IconText textColor="white" icon={faUser} fontSize={16}>
                    {getOccupancyText("adult")}
                  </IconText>
                </Grid>

                {reservationParams.occupancies[0].children > 0 && (
                  <Grid item xs={12}>
                    <IconText
                      textColor="white"
                      icon={faChild}
                      fontSize={16}
                    >{`${reservationParams.occupancies[0].children} children`}</IconText>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Booked button */}
            {isRoomBooked() ? (
              <>
                <IconText
                  icon={faCheck}
                  backgroundColor={Colors.GREEN}
                  iconColor={"white"}
                >
                  Room booked
                </IconText>
                <CustomButton
                  rounded
                  style={{ marginLeft: "5px", boxShadow: Shadow.LIGHT3D }}
                  onClick={() => removeRoomFromReservation()}
                  backgroundColor={Colors.ORANGE}
                >
                  Change board
                </CustomButton>
              </>
            ) : (
              <>
                {!areAllRoomsToBookBooked() && (
                  <CustomButton
                    rounded
                    style={{ marginLeft: "5px", boxShadow: Shadow.LIGHT3D }}
                    onClick={() => addRoomToReservation()}
                    backgroundColor={Colors.PURPLE}
                  >
                    Book room
                  </CustomButton>
                )}
              </>
            )}
          </Grid>

          {/* Photo popup icon */}
          <Grid item className={style.photoPopupGrid}>
            <IconButton
              className={style.photoPopupContainer}
              onClick={(e) => onImageClicked(e)}
              onFocus={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon size="2x" icon={faCamera} color="white" />
            </IconButton>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          {roomsToBookLabel}
        </Alert>
      </Snackbar>

      {/* Fullimage Dialog */}
      <Dialog
        open={openDialog}
        classes={{ paperWidthSm: style.paperWidth, paper: style.paper }}
        onClose={() => setOpenDialog(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: { root: style.backdrop },
        }}
      >
        <img src={`${image}`} alt="" />
      </Dialog>
    </div>
  );
}
