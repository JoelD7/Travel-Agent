import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  CardFlight,
  CustomButton,
  DashDrawer,
  HotelRsvDetail,
  IconText,
  Navbar,
  NotCreatedMessage,
  ProgressCircle,
  ReservedCars,
  RsvHotels,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  backend,
  Routes,
  CarRsv,
  HotelReservation,
  mapCarDTOToDomainType,
  mapFlightToDomainType,
  selectIsAuthenticated,
  mapHotelDTOToDomainType,
  Person,
  selectPerson,
  selectUserCurrency,
  setCarReservations,
} from "../../utils";
import { reservationStyles } from "./reservation-styles";

export function Reservations() {
  const style = reservationStyles();

  const dispatch = useDispatch();

  const person: Person | undefined = useSelector(selectPerson);
  const userCurrency: string = useSelector(selectUserCurrency);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  const [flights, setFlights] = useState<Flight[]>();
  const [openHotelDialog, setOpenHotelDialog] = useState(false);
  const [hotelReservations, setHotelReservations] = useState<HotelReservation[]>();

  useEffect(() => {
    fetchBookedFlights();
    fetchBookedHotels();
    fetchBookedCarRentals();
  }, [person, isAuthenticated]);

  function fetchBookedFlights() {
    if (person) {
      backend
        .get(`/flight/all?personUuid=${person.uuid}`)
        .then((res) => {
          if (res.data._embedded) {
            let mappedFlights: Flight[] = res.data._embedded.flightList.map(
              (flight: any) => mapFlightToDomainType(flight)
            );
            setFlights(mappedFlights);
          } else {
            setFlights([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function fetchBookedHotels() {
    if (person) {
      backend
        .get(`/hotel/all?personUuid=${person.uuid}`)
        .then((res) => {
          if (res.data._embedded) {
            let mappedHotels: HotelReservation[] =
              res.data._embedded.hotelReservationList.map((hotel: any) =>
                mapHotelDTOToDomainType(hotel)
              );
            setHotelReservations(mappedHotels);
          } else {
            setHotelReservations([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function fetchBookedCarRentals() {
    if (person) {
      backend
        .get(`/car-rental/all?personUuid=${person.uuid}`)
        .then((res) => {
          if (res.data._embedded) {
            let mappedCarReservations: CarRsv[] = res.data._embedded.carRentalList.map(
              (car: any) => mapCarDTOToDomainType(car)
            );
            dispatch(setCarReservations(mappedCarReservations));
          } else {
            dispatch(setCarReservations([]));
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Reservations</title>
      </Helmet>

      <Navbar className={style.navbar} variant="dashboard" position="sticky" />
      <DashDrawer />

      {!isAuthenticated && (
        <div className={style.noReservationContainer}>
          <IconText
            style={{ marginBottom: "20px", marginTop: "10px" }}
            iconStyle={{ padding: "12px" }}
            shadow
            size={35}
            icon={faCalendar}
          >
            <Text bold component="h1">
              Reservations
            </Text>
          </IconText>

          <Grid container className={style.noReservationGrid}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Text color={Colors.GRAY_TEXT}>
                  Here you'll be able to see the reservations made so far.
                </Text>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify="center">
                <CustomButton backgroundColor={Colors.GREEN} onClick={() => Routes.LOGIN}>
                  Login to make reservations
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}

      {/* Page content container */}
      {isAuthenticated && (
        <Grid container>
          <Grid item className={style.pageContentGrid}>
            <IconText
              style={{ marginBottom: "20px", marginTop: "10px" }}
              iconStyle={{ padding: "12px" }}
              shadow
              size={35}
              icon={faCalendar}
            >
              <Text bold component="h1">
                Reservations
              </Text>
            </IconText>

            {/* Flights title */}
            <Grid item xs={12}>
              <Grid id="Flights" container>
                <Text bold color={Colors.BLUE} component="h2">
                  Flights
                </Text>
                <CustomButton
                  style={{ paddingBottom: "0px" }}
                  iconColor="#7e7e7e"
                  backgroundColor="rgba(0,0,0,0)"
                  textColor="#7e7e7e"
                >
                  See all
                </CustomButton>
              </Grid>
            </Grid>

            {/* Flights */}
            <Grid item xs={12}>
              {flights ? (
                <Grid container>
                  {flights.length > 0 ? (
                    <>
                      {flights.map((flight, i) => (
                        <CardFlight
                          className={style.flightCard}
                          key={i}
                          bookedFlight
                          flight={flight}
                          variant="deal"
                        />
                      ))}
                    </>
                  ) : (
                    <NotCreatedMessage
                      type="FLIGHT"
                      message="You have no booked flights."
                    />
                  )}
                </Grid>
              ) : (
                <Grid container>
                  <ProgressCircle />
                </Grid>
              )}
            </Grid>

            {/* Hotels title */}
            <Grid item xs={12} style={{ marginTop: "30px" }}>
              <Grid id="Hotels" container>
                <Text bold color={Colors.BLUE} component="h2">
                  Hotels
                </Text>
                <CustomButton
                  style={{ paddingBottom: "0px" }}
                  iconColor="#7e7e7e"
                  backgroundColor="rgba(0,0,0,0)"
                  textColor="#7e7e7e"
                >
                  See all
                </CustomButton>
              </Grid>
            </Grid>

            {/* Hotels */}
            <Grid item xs={12}>
              {hotelReservations ? (
                <RsvHotels userCurrency={userCurrency} hotels={hotelReservations} />
              ) : (
                <Grid container>
                  <ProgressCircle />
                </Grid>
              )}
            </Grid>

            {/* Cars title */}
            <Grid item xs={12} style={{ marginTop: "30px" }}>
              <Grid id="Cars" container>
                <Text bold color={Colors.BLUE} component="h2">
                  Car rentals
                </Text>
                <CustomButton
                  style={{ paddingBottom: "0px" }}
                  iconColor="#7e7e7e"
                  backgroundColor="rgba(0,0,0,0)"
                  textColor="#7e7e7e"
                >
                  See all
                </CustomButton>
              </Grid>
            </Grid>

            {/* Car rentals */}
            <Grid item xs={12}>
              <ReservedCars />
            </Grid>
          </Grid>
        </Grid>
      )}

      <HotelRsvDetail open={openHotelDialog} onClose={() => setOpenHotelDialog(false)} />
    </div>
  );
}
