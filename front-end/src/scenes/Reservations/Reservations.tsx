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
  ReservedCars,
  RsvHotels,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  backend,
  CarRsv,
  HotelReservation,
  hotelRsvPlaceholder,
  mapCarDTOToDomainType,
  mapFlightToDomainType,
  mapHotelDTOToDomainType,
  selectIdPerson,
  selectUserCurrency,
  setCarReservations,
} from "../../utils";
import { reservationStyles } from "./reservation-styles";

export function Reservations() {
  const style = reservationStyles();

  const [flights, setFlights] = useState<Flight[]>([]);

  const dispatch = useDispatch();

  const idPerson: number = useSelector(selectIdPerson);
  const [openHotelDialog, setOpenHotelDialog] = useState(false);

  const hotelRsv: HotelReservation = hotelRsvPlaceholder;

  const userCurrency: string = useSelector(selectUserCurrency);

  const [hotelReservations, setHotelReservations] = useState<HotelReservation[]>([]);
  const [carRentalReservations, setCarRentalReservations] = useState<CarRsv[]>([]);

  useEffect(() => {
    fetchBookedFlights();
    fetchBookedHotels();
    fetchBookedCarRentals();
  }, []);

  function fetchBookedFlights() {
    backend
      .get(`/flight/all?idPerson=${idPerson}`)
      .then((res) => {
        let mappedFlights: Flight[] = res.data._embedded.flightList.map((flight: any) =>
          mapFlightToDomainType(flight)
        );
        setFlights(mappedFlights);
      })
      .catch((err) => console.log(err));
  }

  function fetchBookedHotels() {
    backend
      .get(`/hotel/all?idPerson=${idPerson}`)
      .then((res) => {
        let mappedHotels: HotelReservation[] =
          res.data._embedded.hotelReservationList.map((hotel: any) =>
            mapHotelDTOToDomainType(hotel)
          );
        setHotelReservations(mappedHotels);
      })
      .catch((err) => console.log(err));
  }

  function fetchBookedCarRentals() {
    backend
      .get(`/car-rental/all?idPerson=${idPerson}`)
      .then((res) => {
        let mappedCarReservations: CarRsv[] = res.data._embedded.carRentalList.map(
          (car: any) => mapCarDTOToDomainType(car)
        );
        dispatch(setCarReservations(mappedCarReservations));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Reservations</title>
      </Helmet>

      <Navbar className={style.navbar} dashboard position="sticky" />
      <DashDrawer />

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
            <Grid container>
              {flights.map((flight, i) => (
                <CardFlight
                  className={style.flightCard}
                  key={i}
                  bookedFlight
                  flight={flight}
                  variant="deal"
                />
              ))}
            </Grid>
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
            <RsvHotels userCurrency={userCurrency} hotels={hotelReservations} />
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

      <HotelRsvDetail open={openHotelDialog} onClose={() => setOpenHotelDialog(false)} />
    </div>
  );
}
