import { faBed, faCalendar, faChild, faUser } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import { format, parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  AboutHotel,
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
  convertURLToReservationParams,
  formatAsCurrency,
  getMinRate,
  HotelBedAPI,
  isValueInRange,
  proxyUrl,
  Routes,
  selectCurrentCity,
  selectHotelDetail,
  selectHotelReservationParams,
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

  const query = useQuery();

  const [loading, setLoading] = useState<boolean>(hotel ? false : true);

  const history = useHistory();

  const roomTitleId = "rooms";
  const roomAnchorEl = useRef(null);

  const dispatch = useDispatch();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [renderedHeights, setRenderedHeights] = useState<number[]>([0]);

  const [cardsToRender, setCardsToRender] = useState<number>(3);

  const geolocation: IATALocation = useSelector(selectCurrentCity);

  useEffect(() => {
    if (!hotel) {
      initComponent();
    }

    window.addEventListener("scroll", roomAccordionRenderController, { passive: true });

    return () => window.removeEventListener("scroll", roomAccordionRenderController);
  }, [renderedHeights, cardsToRender]);

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

  function initComponent() {
    reservationParams = convertURLToReservationParams(
      location.search,
      geolocation,
      "hotel"
    );

    dispatch(updateReservationParams(reservationParams));

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

            dispatch(setHotelDetail(mergeHotelResponses(hotelForBooking, hotelDetails)));
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

  function mergeHotelResponses(hotelForBooking: any, hotelDetails: any) {
    //To prevent the overriding of the "rooms" prop in hotelForBooking
    let { rooms, ...hotelDetail } = hotelDetails;
    return { ...hotelForBooking, ...hotelDetail };
  }

  function redirectToHotels() {
    history.push(Routes.HOTELS);
  }

  function useQuery() {
    return new URLSearchParams(location.search);
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
              <Grid item className={style.aboutHotelGrid}>
                <AboutHotel hotel={hotel} />
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

          <Footer />
        </>
      )}
    </div>
  );
}
