import {
  faBed,
  faCalendar,
  faCamera,
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
  Theme,
} from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Colors, Shadow } from "../../../styles";
import {
  capitalizeString,
  convertToUserCurrency,
  formatAsCurrency,
  getRoomTotalPrice,
  HotelBedAPI,
  HotelBooking,
  HotelBookingParams,
  HotelImage,
  HotelRoom,
  HotelRoomRate,
  selectHotelDetail,
  selectHotelReservationParams,
} from "../../../utils";
import { IconText, Text } from "../../atoms";

interface RoomAccordionTitle {
  room: HotelRoom;
}

export function RoomAccordionTitle({ room }: RoomAccordionTitle) {
  const hotel: HotelBooking | undefined = useSelector(selectHotelDetail);
  const reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  let image: string = getRoomImage();

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

  useEffect(() => {
    image = getRoomImage();
  }, [room]);

  /**
   * Returns the highest rated image of a hotel room.
   */
  function getRoomImage(): string {
    if (!hotel) {
      return "";
    }

    let roomCode: string = room.code.split("-")[0];

    let roomImages: HotelImage[] = hotel.images
      .filter((image) => image.roomCode === roomCode)
      .sort((a, b) => a.visualOrder - b.visualOrder);

    return roomImages.length > 0 ? HotelBedAPI.imageURL.bigger + roomImages[0].path : "";
  }

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
