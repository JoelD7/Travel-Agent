import {
  faBed,
  faCalendar,
  faChevronDown,
  faChild,
  faMapMarkerAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CardActionArea,
  Dialog,
  Divider,
  Grid,
} from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  CustomButton,
  IconText,
  Navbar,
  Rating,
  ServicesToolbar,
  SliderArrow,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  capitalizeString,
  currencyFormatter,
  getHotelImages,
  getHotelStars,
  scrollToBottom,
  selectHotelDetail,
  selectHotelReservationParams,
} from "../../utils";
import { HotelBooking } from "../../utils/types/hotel-types";
import { hotelDetailsStyles } from "./hotelDetails-styles";

interface RoomAccordion {
  [x: string]: { expanded: boolean };
}

export function HotelDetails() {
  const style = hotelDetailsStyles();
  const hotel: HotelBooking = useSelector(selectHotelDetail);
  const hotelPhotos = getHotelImages(hotel);

  const roomTitleId = "rooms";
  const roomAnchorEl = useRef(null);

  const reservationParams = useSelector(selectHotelReservationParams);

  const [limitedAbout, setLimitedAbout] = useState(true);
  const [roomsExpanded, setRoomsExpanded] = useState<{
    [x: string]: { expanded: boolean };
  }>(constructRoomsExpanded());

  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialImageSlide, setInitialImageSlide] = useState(0);

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow iconSize="2x" direction="right" />,
    prevArrow: <SliderArrow iconSize="2x" direction="left" />,
    slidesToShow: 3,
    slidesToScroll: 3,
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

  const imageSliderSettings = {
    className: style.imageSlider,
    nextArrow: <SliderArrow onTop iconSize="2x" direction="right" />,
    prevArrow: <SliderArrow onTop iconSize="2x" direction="left" />,
    slidesToShow: 1,
    initialSlide: initialImageSlide,
  };

  function constructRoomsExpanded() {
    let buffer = {};
    hotel.rooms.forEach((room) => {
      buffer = { ...buffer, [room.code]: { expanded: false } };
    });
    return buffer;
  }

  function expandAllRoomAccordions() {
    let buffer = {};
    hotel.rooms.forEach((room) => {
      buffer = { ...buffer, [room.code]: { expanded: true } };
    });

    setRoomsExpanded(buffer);
  }

  function getPhoneList() {
    return hotel.phones.map((phone) => phone.phoneNumber).join(" | ");
  }

  function getOccupancyText(param: "room" | "adult") {
    let roomQty = reservationParams.rooms > 1 ? "rooms" : "room";
    let adultQty = reservationParams.adults > 1 ? "adults" : "adult";

    return param === "room"
      ? `${reservationParams.rooms} ${roomQty}`
      : `${reservationParams.adults} ${adultQty}`;
  }

  function seeRoomOptions() {
    expandAllRoomAccordions();
    if (roomsExpanded) {
      //@ts-ignore
      roomAnchorEl.current.click();
      scrollToBottom();
    } else {
      setTimeout(() => {
        //@ts-ignore
        roomAnchorEl.current.click();
        scrollToBottom();
      }, 525);
    }
  }

  function openFullScreenImageSlider(initialSlide: number) {
    setInitialImageSlide(initialSlide);
    setViewerOpen(true);
  }

  function onAccordionChange(accordion: string, isExpanded: boolean) {
    let buffer = {};
    for (const room in roomsExpanded) {
      if (Object.prototype.hasOwnProperty.call(roomsExpanded, room)) {
        const element = roomsExpanded[room];
        if (accordion === room) {
          buffer = {
            ...buffer,
            [room]: { expanded: isExpanded },
          };
        } else {
          buffer = {
            ...buffer,
            [room]: { expanded: roomsExpanded[room].expanded },
          };
        }
      }
    }

    setRoomsExpanded(buffer);
  }

  return (
    <div className={style.mainContainer}>
      <a href={`#${roomTitleId}`} ref={roomAnchorEl} hidden></a>

      <Helmet>
        <title>{hotel.name.content}</title>
      </Helmet>

      <Navbar />

      <ServicesToolbar />

      <div className={style.pageContainer}>
        {/* Images slider */}
        <div style={{ marginBottom: "20px" }}>
          <Slider {...sliderSettings} dots>
            {hotelPhotos.map((photo, i) => (
              <CardActionArea
                key={photo}
                className={style.photoContainer}
                onClick={() => openFullScreenImageSlider(i)}
              >
                <img src={`${photo}`} alt={`${photo}`} className={style.photo} />
              </CardActionArea>
            ))}
          </Slider>
        </div>

        {/* About hotel / Reservation info */}
        <Grid container style={{ marginTop: "40px" }}>
          {/* About hotel */}
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
          </Grid>

          {/* Reservation info */}
          <Grid item className={style.reservationInfoGrid}>
            <Grid container className={style.reservationInfoContainer}>
              <Grid item xs={12}>
                <Text color={Colors.BLUE} component="h4">
                  Rates starting at
                </Text>
              </Grid>

              <Grid item xs={12}>
                <Text color={Colors.BLUE} component="h2" bold>
                  {currencyFormatter(hotel.minRate)}
                </Text>
              </Grid>

              {/* Dates */}
              {hotel.checkIn && hotel.checkOut && (
                <>
                  <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <IconText icon={faCalendar} fontSize={16}>
                      <p style={{ margin: "0" }}>
                        <b>Check in: </b>
                        {format(parseISO(hotel.checkIn), "dd MMM., yyyy")}
                      </p>
                    </IconText>
                  </Grid>
                  <Grid item xs={12}>
                    <IconText icon={faCalendar} fontSize={16}>
                      <p style={{ margin: "0" }}>
                        <b>Check in: </b>
                        {format(parseISO(hotel.checkOut), "dd MMM., yyyy")}
                      </p>
                    </IconText>
                  </Grid>
                </>
              )}

              {/* Occupancy params */}
              <Grid item xs={12}>
                <IconText icon={faBed} fontSize={16}>
                  {getOccupancyText("room")}
                </IconText>
              </Grid>
              <Grid item xs={12}>
                <IconText icon={faUser} fontSize={16}>
                  {getOccupancyText("adult")}
                </IconText>
              </Grid>

              {reservationParams.children > 0 && (
                <Grid item xs={12}>
                  <IconText
                    icon={faChild}
                    fontSize={16}
                  >{`${reservationParams.children} children`}</IconText>
                </Grid>
              )}

              <Grid item xs={12}>
                <Grid container>
                  <CustomButton
                    type="text"
                    style={{ marginLeft: "auto" }}
                    textColor={Colors.BLUE}
                    onClick={() => seeRoomOptions()}
                  >
                    See room options
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Rooms */}
        <Grid container style={{ marginTop: "40px" }}>
          <Grid item className={style.roomsGrid}>
            <Text id={`${roomTitleId}`} component="h2" bold color={Colors.BLUE}>
              Rooms
            </Text>

            {hotel.rooms.map((room) => (
              <Accordion
                key={room.code}
                onChange={(e, expanded) => onAccordionChange(room.code, expanded)}
                expanded={roomsExpanded[room.code].expanded}
                classes={{ root: style.accordionRoot, rounded: style.accordionRounded }}
              >
                <AccordionSummary expandIcon={<IconText icon={faChevronDown}></IconText>}>
                  <Text component="h3" color="white" bold>
                    {capitalizeString(room.name, "full sentence")}
                  </Text>
                </AccordionSummary>

                <AccordionDetails style={{ background: "white" }}>
                  <Grid container>
                    {room.rates.map((rate, i) => (
                      <>
                        <Grid item xs={12}>
                          <Grid container alignItems="center">
                            <Text bold>Board name: </Text>
                            <Text style={{ marginLeft: "3px" }}>
                              {capitalizeString(rate.boardName, "each word")}
                            </Text>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container alignItems="center">
                            <Text bold>Total: </Text>
                            <Text style={{ marginLeft: "3px" }}>
                              {currencyFormatter(Number(rate.net))}
                            </Text>

                            <CustomButton
                              style={{ marginLeft: "auto" }}
                              backgroundColor={Colors.PURPLE}
                            >
                              Book room
                            </CustomButton>
                          </Grid>
                        </Grid>

                        {i < room.rates.length - 1 && (
                          <Grid item xs={12} style={{ margin: "15px" }}>
                            <Divider style={{ backgroundColor: "#cecece" }} />
                          </Grid>
                        )}
                      </>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </div>

      <Dialog
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        BackdropComponent={Backdrop}
        classes={{ paper: style.paperImage }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slider {...imageSliderSettings}>
          {hotelPhotos.map((photo) => (
            <div key={photo} className={style.photoContainerImage}>
              <img src={`${photo}`} alt={`${photo}`} className={style.photoInSlider} />
            </div>
          ))}
        </Slider>
      </Dialog>
    </div>
  );
}
