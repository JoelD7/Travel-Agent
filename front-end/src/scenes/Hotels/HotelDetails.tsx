import {
  faBed,
  faCalendar,
  faChild,
  faDollarSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Divider, Grid, Grow, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import { format, parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Font } from "../../assets";
import {
  AboutHotel,
  ConfirmRsvDialog,
  CustomButton,
  Footer,
  HotelDetailsSlider,
  IconText,
  Navbar,
  ProgressCircle,
  RoomAccordion,
  ServicesToolbar,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  areAllRoomsToBookBooked,
  backend,
  capitalizeString,
  convertToUserCurrency,
  convertURLToReservationParams,
  formatAsCurrency,
  getHotelReservation,
  getHotelReservationCost,
  getMinRate,
  HotelBedAPI,
  HotelReservation,
  isHotelRsvInTrip,
  isValueInRange,
  proxyUrl,
  Routes,
  selectDestinationCity,
  selectHotelDetail,
  selectHotelReservationParams,
  selectHotelReservations,
  selectHotelRsv,
  setHotelReservations,
  selectUserTrips,
  selectIdPerson,
  setHotelRsv,
  store,
  Trip,
} from "../../utils";
import {
  getHotelBedHeaders,
  getHotelDetails,
} from "../../utils/external-apis/hotelbeds-apis";
import {
  setHotelDetail,
  setOpenRedirecDialog,
  updateReservationParams,
} from "../../utils/store/hotel-slice";
import { HotelBooking, HotelBookingParams } from "../../utils/types/hotel-types";
import { IATALocation } from "../../utils/types/location-types";
import { hotelDetailsStyles } from "./hotelDetails-styles";

interface RoomAccordion {
  [x: string]: { expanded: boolean };
}

export function HotelDetails() {
  const style = hotelDetailsStyles();
  const hotel: HotelBooking | undefined = useSelector(selectHotelDetail);

  let reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  const { id } = useParams<any>();
  const location = useLocation();

  const hotelRsv: HotelReservation = useSelector(selectHotelRsv);
  const hotelReservations: HotelReservation[] = useSelector(selectHotelReservations);

  const [loading, setLoading] = useState<boolean>(hotel ? false : true);

  const history = useHistory();

  const roomTitleId = "rooms";
  const roomAnchorEl = useRef(null);

  const dispatch = useDispatch();

  const [renderedHeights, setRenderedHeights] = useState<number[]>([0]);

  const [cardsToRender, setCardsToRender] = useState<number>(3);

  const geolocation: IATALocation = useSelector(selectDestinationCity);

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const userTrips: Trip[] | undefined = useSelector(selectUserTrips);
  const idPerson: number = useSelector(selectIdPerson);

  useEffect(() => {
    if (!areAnyReservations()) {
      fetchReservations();
    }
  }, []);

  function areAnyReservations(): boolean {
    return hotelReservations.length > 0;
  }

  function fetchReservations() {
    backend
      .get(`/hotel/all?idPerson=${idPerson}`)
      .then((res) => {
        let hotels: HotelReservation[] = res.data._embedded.hotelReservationList;
        dispatch(setHotelReservations(hotels));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!isHotelDefined()) {
      setReservationParams();
      fetchHotel();
    }

    window.addEventListener("scroll", roomAccordionRenderController, { passive: true });

    return () => window.removeEventListener("scroll", roomAccordionRenderController);
  }, [renderedHeights, cardsToRender]);

  function isHotelDefined(): boolean {
    return hotel !== undefined;
  }

  function setReservationParams() {
    reservationParams = convertURLToReservationParams(
      location.search,
      geolocation,
      "hotel"
    );

    dispatch(updateReservationParams(reservationParams));
  }

  /**
   * Controls how many RoomAccordion cards are rendered using the
   * current scroll position in order to improve performance. When
   * the scroll hits the bottom of the page, this function enables
   * that more cards are rendered.
   */
  function roomAccordionRenderController() {
    /**
     * The difference between the maximum value for scoll in
     * y-axis and the height of the page(this being the greater
     * value).
     */
    const PAGE_HEIGHT_TO_SCROLL_DIF = window.innerHeight;
    let scrollY = window.pageYOffset + PAGE_HEIGHT_TO_SCROLL_DIF;
    let windowHeight = document.documentElement.offsetHeight;

    let heightRange: number[] = [windowHeight - 100, windowHeight];
    if (isValueInRange(scrollY, heightRange)) {
      let lastRegisteredHeight: number = renderedHeights[renderedHeights.length - 1];
      if (windowHeight > lastRegisteredHeight) {
        let cardsToRenderBuffer: number = cardsToRender + 10;

        setRenderedHeights([...renderedHeights, windowHeight]);
        setCardsToRender(cardsToRenderBuffer);
      }
    }
  }

  function fetchHotel() {
    fetchHotelAvailability().then((availabilityRes) => {
      getHotelDetails(id)
        .then((hotelDetailRes) => {
          let availableHotels: number = availabilityRes.data.hotels.total;

          if (availableHotels === 0) {
            redirectToHotels();
            dispatch(setOpenRedirecDialog(true));
          } else {
            setHotelDetails(availabilityRes, hotelDetailRes);
            setLoading(false);
          }
        })
        .catch((error) => console.log("Error while fetching hotel details | ", error));
    });
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

  function setHotelDetails(availabilityRes: any, hotelDetailRes: any) {
    let checkIn = availabilityRes.data.hotels.checkIn;
    let checkOut = availabilityRes.data.hotels.checkOut;

    let hotelForBooking = {
      ...availabilityRes.data.hotels.hotels[0],
      checkIn,
      checkOut,
    };

    let hotelDetails = hotelDetailRes.data.hotels[0];

    dispatch(setHotelDetail(mergeHotelResponses(hotelForBooking, hotelDetails)));

    setHotelReservation();
  }

  function mergeHotelResponses(hotelForBooking: any, hotelDetails: any) {
    //To prevent the overriding of the "rooms" prop in hotelForBooking
    let { rooms, ...hotelDetail } = hotelDetails;
    return { ...hotelForBooking, ...hotelDetail };
  }

  /**
   * Determines if this hotel has already been booked, if
   * so, sets the store's current hotelReservation to the one
   * obtained from the backend, otherwise sets its to its
   * default value.
   */
  function setHotelReservation() {
    let hotelDetail: HotelBooking | undefined = store.getState().hotelReducer.hotelDetail;

    if (hotelDetail) {
      dispatch(setHotelRsv(getHotelReservation(hotelDetail)));
    }
  }

  function redirectToHotels() {
    history.push(Routes.HOTELS);
  }

  function getOccupancyText(param: "room" | "adult") {
    let roomQty = reservationParams.occupancies[0].rooms > 1 ? "rooms" : "room";
    let adultQty = reservationParams.occupancies[0].adults > 1 ? "adults" : "adult";

    return param === "room"
      ? `${reservationParams.occupancies[0].rooms} ${roomQty}`
      : `${reservationParams.occupancies[0].adults} ${adultQty}`;
  }

  function goToRoomOptions() {
    //@ts-ignore
    roomAnchorEl.current.click();
  }

  function areAllRoomsRendered(): boolean {
    if (!hotel) {
      return true;
    }

    return cardsToRender >= hotel.rooms.length;
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

  function isHotelBooked(): boolean {
    return (
      hotelReservations.filter((hotel) => hotel.hotelCode === hotelRsv.hotelCode).length >
      0
    );
  }

  return (
    <div className={style.mainContainer}>
      <a href={`#${roomTitleId}`} ref={roomAnchorEl} hidden></a>

      {hotel && (
        <Helmet>
          <title>{hotel.name.content}</title>
        </Helmet>
      )}

      <Navbar />

      <ServicesToolbar />

      {loading && (
        <div className={style.progressCircleContainer}>
          <ProgressCircle />
        </div>
      )}

      {hotel && (
        <>
          <div
            className={style.pageContainer}
            style={loading ? { filter: "blur(4px)" } : {}}
          >
            {/* Images slider */}
            <HotelDetailsSlider hotel={hotel} />

            {/* About hotel / Reservation info */}
            <Grid container style={{ marginTop: "40px" }}>
              {/* About hotel */}
              <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
                <Grid item className={style.aboutHotelGrid}>
                  <AboutHotel hotel={hotel} />
                </Grid>
              </Grow>

              {/* Reservation info and status */}
              <Grid item className={style.reservationInfoGrid}>
                <Grid container>
                  {/* Reservation info */}
                  <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
                    <Grid container className={style.reservationInfoContainer}>
                      <Grid item xs={12}>
                        <Text color={Colors.BLUE} component="h4">
                          Rates starting at
                        </Text>
                      </Grid>

                      <Grid item xs={12}>
                        <Text color={Colors.BLUE} component="h2" bold>
                          {formatAsCurrency(
                            convertToUserCurrency(getMinRate(hotel.rooms), "USD")
                          )}
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
                          >{`${reservationParams.occupancies[0]["children"]} children`}</IconText>
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
                  </Grow>

                  {/* Reservation status */}
                  <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
                    <Grid className={style.reservationStatusContainer}>
                      <Text component="h2" color={Colors.BLUE}>
                        Reservation status
                      </Text>

                      {/* Room and total  */}
                      {hotelRsv.rooms.map((room) => (
                        <div key={room.code} style={{ marginBottom: 10 }}>
                          <IconText fontSize={16} icon={faBed}>
                            {capitalizeString(room.name, "full sentence")}
                          </IconText>

                          <IconText fontSize={16} icon={faDollarSign}>
                            {formatAsCurrency(
                              convertToUserCurrency(room.totalAmount, "USD")
                            )}
                          </IconText>
                        </div>
                      ))}

                      {/* Total of reservation */}
                      <Grid container style={{ marginTop: 25 }}>
                        <Text component="h4" color={Colors.BLUE}>
                          Total
                        </Text>

                        <Text
                          component="h4"
                          color={Colors.BLUE}
                          style={{ marginLeft: "auto" }}
                        >
                          {formatAsCurrency(
                            convertToUserCurrency(
                              getHotelReservationCost(hotelRsv),
                              "USD"
                            )
                          )}
                        </Text>
                      </Grid>

                      <Grid container style={{ marginTop: 15 }}>
                        {!isHotelRsvInAnyTrip() && !isHotelBooked() && (
                          <CustomButton
                            backgroundColor={Colors.GREEN}
                            disabled={!areAllRoomsToBookBooked()}
                            style={{ marginLeft: "auto" }}
                            onClick={() => setOpenConfirmation(true)}
                          >
                            Confirm Reservation
                          </CustomButton>
                        )}

                        {isHotelRsvInAnyTrip() && (
                          <CustomButton
                            backgroundColor={Colors.RED}
                            style={{ marginLeft: "auto" }}
                            onClick={() => setOpenConfirmation(true)}
                          >
                            Delete from trip
                          </CustomButton>
                        )}

                        {isHotelBooked() && !isHotelRsvInAnyTrip() && (
                          <div style={{ width: "100%" }}>
                            <Divider className={style.reservationLinkDivider} />
                            <Text color={Colors.GRAY_TEXT} style={{ marginBottom: 0 }}>
                              You have a reservation on this hotel
                            </Text>
                            <CustomButton
                              type="text"
                              textColor={Colors.BLUE}
                              style={{ padding: "10px 0px", fontWeight: "bold" }}
                              onClick={() => history.push(Routes.RESERVATIONS)}
                            >
                              Wanna see it?
                            </CustomButton>
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Grow>
                </Grid>
              </Grid>
            </Grid>

            {/* Rooms */}
            <Grid container className={style.roomsContainer}>
              {/* RoomAccordion cards */}
              <Grid item className={style.roomsGrid}>
                <Text id={`${roomTitleId}`} component="h2" bold color={Colors.BLUE}>
                  Rooms
                </Text>

                {hotel.rooms.slice(0, cardsToRender).map((room) => (
                  <RoomAccordion hotel={hotel} key={room.code} room={room} />
                ))}
              </Grid>

              {/* Loading cards */}
              {!areAllRoomsRendered() && (
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <Grid container justify="center">
                    <Text component="p" color="#9e9e9e">
                      Loading more rooms...
                    </Text>
                    <ProgressCircle
                      color="#9e9e9e"
                      style={{ margin: "0px 0px 0px 15px" }}
                      size={20}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </div>

          <ConfirmRsvDialog
            open={openConfirmation}
            type="Hotel"
            onClose={() => setOpenConfirmation(false)}
          />

          <Footer />
        </>
      )}
    </div>
  );
}
