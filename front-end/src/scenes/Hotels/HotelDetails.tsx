import {
  faBed,
  faCalendar,
  faChild,
  faMapMarkerAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Backdrop, CardActionArea, Dialog, Divider, Grid } from "@material-ui/core";
import Axios from "axios";
import { format, parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  CustomButton,
  IconText,
  Navbar,
  ProgressCircle,
  Rating,
  RoomAccordion,
  ServicesToolbar,
  SliderArrow,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  convertReservationParamsToURLParams,
  convertURLToReservationParams,
  formatAsCurrency,
  getHotelImages,
  getHotelStars,
  getMinRate,
  HotelBedAPI,
  proxyUrl,
  Routes,
  scrollToBottom,
  selectHotelDetail,
  selectHotelReservationParams,
  selectRoomAccordionExpanded,
} from "../../utils";
import {
  getHotelBedHeaders,
  getHotelDetails,
} from "../../utils/external-apis/hotelbeds-apis";
import {
  setHotelDetail,
  setOpenRedirecDialog,
  setRoomAccordionExpanded,
  updateReservationParams,
} from "../../utils/store/hotel-slice";
import { HotelBooking, HotelBookingParams } from "../../utils/types/hotel-types";
import { hotelDetailsStyles } from "./hotelDetails-styles";

interface RoomAccordion {
  [x: string]: { expanded: boolean };
}

export function HotelDetails() {
  const style = hotelDetailsStyles();
  const hotel: HotelBooking = useSelector(selectHotelDetail);

  const hotelPhotos = getHotelImages(hotel);

  let reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  const { id } = useParams<any>();
  const location = useLocation();

  const query = useQuery();

  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  const roomTitleId = "rooms";
  const roomAnchorEl = useRef(null);

  const dispatch = useDispatch();

  const [limitedAbout, setLimitedAbout] = useState(true);

  const allRoomAccordionsExpanded = useSelector(selectRoomAccordionExpanded);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialImageSlide, setInitialImageSlide] = useState(0);

  const firstRender = useRef(true);

  const [urlParams, setURLParams] = useState<{ [index: string]: string }>(
    getURLParamsAsKVP()
  );

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

  useEffect(() => {
    reservationParams = convertURLToReservationParams(location.search, "hotel");

    dispatch(updateReservationParams(reservationParams));

    setURLParamsAsKVP();

    if (!isHotelnStore()) {
      fetchHotelAvailability().then((availabilityRes) => {
        getHotelDetails(id)
          .then((res) => {
            let availableHotels: number = availabilityRes.data.hotels.total;

            if (availableHotels === 0) {
              redirectToHotels();
              dispatch(setOpenRedirecDialog(true));
            } else {
              let checkIn = availabilityRes.data.hotels.checkIn;
              let checkOut = availabilityRes.data.hotels.checkOut;

              let hotelForBooking = {
                ...availabilityRes.data.hotels.hotels[0],
                checkIn,
                checkOut,
              };
              let hotelDetails = res.data.hotels[0];

              dispatch(
                setHotelDetail(mergeHotelResponses(hotelForBooking, hotelDetails))
              );
              setLoading(false);
            }
          })
          .catch((error) => console.log("Error while fetching hotel details | ", error));
      });
    } else {
      setLoading(false);
    }
  }, []);

  function isHotelnStore(): boolean {
    return String(hotel.code) === String(id);
  }

  function fetchHotelAvailability() {
    /**
     * Search by hotel code is a filter. The API only allows
     * the use of single type of filter for fetching data
     * (the available filters are: destination, geolocation, filter).
     */
    let { filter, geolocation, ...bookingParams } = {
      ...reservationParams,
      hotels: {
        hotel: [Number(id)],
      },
    };

    return Axios.post(proxyUrl + HotelBedAPI.hotelAvailabilityURL, bookingParams, {
      headers: getHotelBedHeaders(),
    });
  }

  function mergeHotelResponses(hotelForBooking: any, hotelDetails: any) {
    //To prevent the overriding of the "rooms" prop in hotelForBooking
    let { rooms, ...hotelDetail } = hotelDetails;
    return { ...hotelForBooking, ...hotelDetail };
  }

  function redirectToHotels() {
    history.push(Routes.HOTELS);
  }

  function getUrlParamsArray() {
    let kvp: string[][] = [[]];

    for (const pair of Array.from(query.entries())) {
      kvp.push(pair);
    }
    return kvp;
  }

  function setURLParamsAsKVP() {
    //To avoid setting the urlParams variable twice on the first render.
    if (!isFirstRender()) {
      setURLParams(getURLParamsAsKVP());
    }
  }

  function isURLWithParams(): boolean {
    return location.search !== "";
  }

  function isFirstRender() {
    return firstRender.current;
  }

  function getURLParamsAsKVP() {
    let kvpObject: { [key: string]: string } = {};
    let kvpArray: string[][] = getUrlParamsArray();

    kvpArray.forEach((kvp) => {
      let key = kvp[0];
      let value = kvp[1];

      kvpObject = { ...kvpObject, [key]: value };
    });

    return kvpObject;
  }

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  function getPhoneList() {
    return hotel.phones.map((phone) => phone.phoneNumber).join(" | ");
  }

  function getOccupancyText(param: "room" | "adult") {
    let roomQty = reservationParams.occupancies[0].rooms > 1 ? "rooms" : "room";
    let adultQty = reservationParams.occupancies[0].adults > 1 ? "adults" : "adult";

    return param === "room"
      ? `${reservationParams.occupancies[0].rooms} ${roomQty}`
      : `${reservationParams.occupancies[0].adults} ${adultQty}`;
  }

  function goToRoomOptions() {
    dispatch(setRoomAccordionExpanded(true));
    if (allRoomAccordionsExpanded) {
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

  return (
    <div className={style.mainContainer}>
      <a href={`#${roomTitleId}`} ref={roomAnchorEl} hidden></a>

      <Helmet>
        <title>{hotel.name.content}</title>
      </Helmet>

      <Navbar />

      <ServicesToolbar />

      {loading && (
        <div className={style.progressCircleContainer}>
          <ProgressCircle />
        </div>
      )}

      <div className={style.pageContainer} style={loading ? { filter: "blur(4px)" } : {}}>
        {/* Images slider */}
        <div style={{ marginBottom: "20px" }}>
          <Slider {...sliderSettings} dots lazyLoad="ondemand">
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
                  {formatAsCurrency(getMinRate(hotel.rooms))}
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
                        <b>Check out: </b>
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

              {reservationParams.occupancies[0].children > 0 && (
                <Grid item xs={12}>
                  <IconText
                    icon={faChild}
                    fontSize={16}
                  >{`${reservationParams.occupancies[0].children} children`}</IconText>
                </Grid>
              )}

              <Grid item xs={12}>
                <Grid container>
                  <CustomButton
                    type="text"
                    style={{ marginLeft: "auto" }}
                    textColor={Colors.BLUE}
                    onClick={() => goToRoomOptions()}
                  >
                    See room options
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Rooms */}
        <Grid container className={style.roomsContainer}>
          <Grid item className={style.roomsGrid}>
            <Text id={`${roomTitleId}`} component="h2" bold color={Colors.BLUE}>
              Rooms
            </Text>

            {hotel.rooms.map((room) => (
              <RoomAccordion hotel={hotel} key={room.code} room={room} />
            ))}
          </Grid>
        </Grid>
      </div>

      {/* Fullscreen images */}
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
