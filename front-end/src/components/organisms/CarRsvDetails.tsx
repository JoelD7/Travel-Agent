import {
  faCalendar,
  faChair,
  faCogs,
  faDollarSign,
  faDoorClosed,
  faGasPump,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { format, parseISO } from "date-fns";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";
import {
  backend,
  capitalizeString,
  CarRsv,
  convertToUserCurrency,
  deleteTripEventFromStore,
  EventTypes,
  formatAsCurrency,
  isCarRsvInTrip,
  selectCarReservations,
  selectCarRsv,
  selectUserTrips,
  setCarReservations,
  Trip,
  TripEvent,
  tripEventPlaceholder,
} from "../../utils";
import { CustomButton, FeatureIcons, IconText, Text } from "../atoms";
import { IncludeInTripPopover } from "./IncludeInTripPopover/IncludeInTripPopover";

interface CarRsvDetailsProps {
  open: boolean;
  onClose: () => void;
}

export function CarRsvDetails({ open, onClose }: CarRsvDetailsProps) {
  const carRsvDetailsStyles = makeStyles((theme: Theme) => ({
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    cardImage: {
      objectFit: "contain",
      width: "100%",
      height: 180,
    },
    closeButton: {
      marginLeft: "auto",
      width: "45px",
      top: 12,
      height: "45px",
      position: "absolute",
      left: "92%",
    },
    paper: {
      maxWidth: 715,
      padding: "30px 40px",
      borderRadius: 10,
    },
    reservationDataGrid: {
      width: "40%",
      marginLeft: "auto",
    },
    vehicleDataGrid: {
      width: "50%",
    },
  }));

  const style = carRsvDetailsStyles();
  const userTrips: Trip[] = useSelector(selectUserTrips);
  const carRsv: CarRsv = useSelector(selectCarRsv);
  const carReservations: CarRsv[] = useSelector(selectCarReservations);

  const [tripAnchor, setTripAnchor] = useState<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [openRemovedSnack, setOpenRemovedSnack] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const dispatch = useDispatch();

  function isCarRsvInAnyTrip(): boolean {
    let included: boolean = false;
    userTrips.forEach((trip) => {
      if (isCarRsvInTrip(carRsv, trip)) {
        included = true;
        return;
      }
    });
    return included;
  }

  function onIncludeInTripOpen(event: MouseEvent<HTMLButtonElement>) {
    setTripAnchor(event.currentTarget);
    setOpenPopover(true);
  }

  function deleteCarRentalFromTrip() {
    setSnackbarText("Deleted from trip");

    let tripEvent: TripEvent = getTripEventOfCarRental();

    if (tripEvent.idEvent) {
      backend
        .delete(`/trip-event/delete/${tripEvent.idEvent}`)
        .then((res) => {
          setOpenRemovedSnack(true);
          deleteTripEventFromStore(tripEvent.idEvent);

          deleteCarRsvFromStore();

          setTimeout(() => {
            onClose();
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  }

  function deleteCarRsvFromStore() {
    const newCarReservations: CarRsv[] = carReservations.filter(
      (carRental) => carRental.idCarRental !== carRsv.idCarRental
    );
    dispatch(setCarReservations(newCarReservations));
  }

  function getTripEventOfCarRental(): TripEvent {
    let tripEvent: TripEvent = tripEventPlaceholder;

    userTrips.forEach((trip) => {
      if (trip.itinerary) {
        trip.itinerary.forEach((event) => {
          if (event.carRental && event.carRental.idCarRental === carRsv.idCarRental) {
            tripEvent = event;
            return;
          }
        });
      }

      if (tripEvent) {
        return;
      }
    });

    return tripEvent;
  }

  function cancelReservation() {
    setSnackbarText("Booking removed");

    backend
      .delete(`/car-rental/${carRsv.idCarRental}`)
      .then((res) => {
        setOpenRemovedSnack(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      BackdropComponent={Backdrop}
      classes={{ paper: style.paper }}
      BackdropProps={{
        timeout: 500,
        classes: { root: style.backdrop },
      }}
    >
      <Grid container>
        {/* Title */}
        <Grid item xs={12}>
          <Text component="h1" color={Colors.BLUE}>
            Car rental details
          </Text>
          <IconButton className={style.closeButton} onClick={() => onClose()}>
            <FontAwesomeIcon icon={faTimes} color={Colors.BLUE} />
          </IconButton>
        </Grid>

        {/* Vehicle data */}
        <Grid item className={style.vehicleDataGrid}>
          <Text component="h2" color={Colors.BLUE}>
            About the vehicle
          </Text>

          <img src={carRsv.image} className={style.cardImage} alt="" />
          <Text component="h4" color={Colors.BLUE}>
            {carRsv.name}
          </Text>

          <FeatureIcons car={carRsv} />

          {/* Detail icons */}
          <Grid container style={{ marginTop: 15 }}>
            <Grid item xs={6}>
              <IconText icon={faChair} fontSize={16}>
                {carRsv.seats > 1 ? `${carRsv.seats} seats` : `1 seat`}
              </IconText>
              <IconText icon={faDoorClosed} fontSize={16}>
                {carRsv.doors > 1 ? `${carRsv.doors} doors` : `1 door`}
              </IconText>
            </Grid>

            <Grid item xs={6}>
              <IconText icon={faGasPump} fontSize={16}>{`${carRsv.mpg} MPG`}</IconText>
              <IconText icon={faCogs} fontSize={16}>{`${capitalizeString(
                carRsv.transmission,
                "full sentence"
              )}`}</IconText>
            </Grid>
          </Grid>
        </Grid>

        {/* Reservation data */}
        <Grid item className={style.reservationDataGrid}>
          <Grid container style={{ height: "100%" }}>
            <div>
              <Text component="h2" color={Colors.BLUE}>
                Reservation data
              </Text>

              <IconText icon={faCalendar} fontSize={16} style={{ marginBottom: 10 }}>
                <b>Pickup: </b>
                {format(parseISO(carRsv.pickupDate), "dd/MM/yyyy")}
              </IconText>

              <IconText icon={faCalendar} fontSize={16} style={{ marginBottom: 10 }}>
                <b>Dropoff: </b>
                {format(parseISO(carRsv.pickupDate), "dd/MM/yyyy")}
              </IconText>

              <IconText icon={faMapMarkerAlt} fontSize={16} style={{ marginBottom: 10 }}>
                <b>Location: </b>
                {carRsv.location}
              </IconText>

              <IconText icon={faDollarSign} fontSize={16} style={{ marginBottom: 10 }}>
                <b>Cost: </b>
                {formatAsCurrency(convertToUserCurrency(carRsv.cost, "USD"))}
              </IconText>
            </div>

            <Grid container justify="flex-end" style={{ marginTop: "auto" }}>
              {!isCarRsvInAnyTrip() && (
                <Grid item xs={12}>
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

              {isCarRsvInAnyTrip() ? (
                <Grid item xs={12}>
                  <CustomButton
                    style={{ boxShadow: Shadow.LIGHT3D, fontSize: 14, marginTop: 10 }}
                    rounded
                    backgroundColor={Colors.RED}
                    onClick={() => deleteCarRentalFromTrip()}
                  >
                    Delete from trip
                  </CustomButton>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <CustomButton
                    style={{ boxShadow: Shadow.LIGHT3D, fontSize: 14, marginTop: 10 }}
                    rounded
                    backgroundColor={Colors.RED}
                    onClick={() => cancelReservation()}
                  >
                    Cancel reservation
                  </CustomButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <IncludeInTripPopover
        place={carRsv}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        eventType={EventTypes.CAR_RENTAL}
        tripAnchor={tripAnchor}
        setTripAnchor={setTripAnchor}
      />

      <Snackbar
        open={openRemovedSnack}
        autoHideDuration={6000}
        onClose={() => setOpenRemovedSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenRemovedSnack(false)}
          severity="error"
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
