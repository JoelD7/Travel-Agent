import {
  faCalendar,
  faTimes,
  faChair,
  faDoorClosed,
  faGasPump,
  faMapMarkerAlt,
  faDollarSign,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Dialog, Grid, IconButton, makeStyles, Theme } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { Colors } from "../../styles";
import {
  CarRsv,
  convertToUserCurrency,
  formatAsCurrency,
  Trip,
  selectUserTrips,
  isCarRsvInTrip,
} from "../../utils";
import { FeatureIcons, IconText, Text } from "../atoms";

interface CarRsvDetailsProps {
  carDetail: CarRsv;
  open: boolean;
  onClose: () => void;
}

export function CarRsvDetails({ carDetail, open, onClose }: CarRsvDetailsProps) {
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

  function isCarRsvInAnyTrip(): boolean {
    let included: boolean = false;
    userTrips.forEach((trip) => {
      if (isCarRsvInTrip(carDetail, trip)) {
        included = true;
        return;
      }
    });
    return included;
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

          <img src={carDetail.image} className={style.cardImage} alt="" />
          <Text component="h4" color={Colors.BLUE}>
            {carDetail.name}
          </Text>

          <FeatureIcons car={carDetail} />

          {/* Detail icons */}
          <Grid container style={{ marginTop: 15 }}>
            <Grid item xs={6}>
              <IconText icon={faChair} fontSize={16}>
                {carDetail.seats > 1 ? `${carDetail.seats} seats` : `1 seat`}
              </IconText>
              <IconText icon={faDoorClosed} fontSize={16}>
                {carDetail.doors > 1 ? `${carDetail.doors} doors` : `1 door`}
              </IconText>
            </Grid>

            <Grid item xs={6}>
              <IconText icon={faGasPump} fontSize={16}>{`${carDetail.mpg} MPG`}</IconText>
              <IconText
                icon={faCogs}
                fontSize={16}
              >{`${carDetail.transmission}`}</IconText>
            </Grid>
          </Grid>
        </Grid>

        {/* Reservation data */}
        <Grid item className={style.reservationDataGrid}>
          <Text component="h2" color={Colors.BLUE}>
            Reservation data
          </Text>

          <IconText icon={faCalendar} fontSize={16} style={{ marginBottom: 10 }}>
            <b>Pickup: </b>
            {format(carDetail.pickupDate, "dd/MM/yyyy")}
          </IconText>

          <IconText icon={faCalendar} fontSize={16} style={{ marginBottom: 10 }}>
            <b>Dropoff: </b>
            {format(carDetail.pickupDate, "dd/MM/yyyy")}
          </IconText>

          <IconText icon={faMapMarkerAlt} fontSize={16} style={{ marginBottom: 10 }}>
            <b>Location: </b>
            {carDetail.location}
          </IconText>

          <IconText icon={faDollarSign} fontSize={16} style={{ marginBottom: 10 }}>
            <b>Cost: </b>
            {formatAsCurrency(convertToUserCurrency(carDetail.cost, "USD"))}
          </IconText>
        </Grid>
      </Grid>
    </Dialog>
  );
}
