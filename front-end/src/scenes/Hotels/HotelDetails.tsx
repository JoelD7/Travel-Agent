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
  const hotel: HotelBooking = useSelector(selectHotelDetail);

  let reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  const { id } = useParams<any>();
  const location = useLocation();

  const query = useQuery();

  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  const roomTitleId = "rooms";
  const roomAnchorEl = useRef(null);

  const dispatch = useDispatch();

  const [viewerOpen, setViewerOpen] = useState(false);

  const firstRender = useRef(true);

  const geolocation: IATALocation = useSelector(selectCurrentCity);

  useEffect(() => {
    initComponent();

    // initComponentTest();
  }, []);

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
    // dispatch(setRoomAccordionExpanded(true));
    //@ts-ignore
    roomAnchorEl.current.click();
    // scrollToBottom();
    // if (allRoomAccordionsExpanded) {
    //   //@ts-ignore
    //   roomAnchorEl.current.click();
    //   scrollToBottom();
    // } else {
    //   setTimeout(() => {
    //     //@ts-ignore
    //     roomAnchorEl.current.click();
    //     scrollToBottom();
    //   }, 525);
    // }
  }

  return (
    <div
      className={style.mainContainer}
      style={viewerOpen ? { filter: "blur(4px)" } : {}}
    >
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

      <Footer />
    </div>
  );
}
