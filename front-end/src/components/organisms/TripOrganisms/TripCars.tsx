import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import {
  faSnowflake,
  faSmokingBan,
  faDoorClosed,
  faGlobe,
  faChair,
  faTimes,
  faGasPump,
  faCogs,
  faCalendar,
  faMapMarkerAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { Colors, Shadow } from "../../../styles";
import {
  CarRsv,
  carRsvPlaceholder,
  CarRsvFeatures,
  convertToUserCurrency,
  formatAsCurrency,
} from "../../../utils";
import { IconText, IconTP, Text } from "../../atoms";
import { NotCreatedMessage } from "../../molecules";

interface TripCars {
  showAll?: boolean;
  cars: CarRsv[];
}

interface FeatureIconsProps {
  car: CarRsv;
}

export const TripCars = React.memo(function TripCars({ showAll = true, cars }: TripCars) {
  const carsCardStyles = makeStyles((theme: Theme) => ({
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    card: {
      borderRadius: "10px",
      margin: "10px 5px",
      boxShadow: Shadow.LIGHT3D,
      width: "25%",

      [theme.breakpoints.only("md")]: {
        width: "35%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "48%",
      },
      [theme.breakpoints.down(686)]: {
        width: "90%",
      },
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

  const style = carsCardStyles();

  const [carDetail, setCarDetail] = useState<CarRsv>(carRsvPlaceholder[0]);

  const [openDialog, setOpenDialog] = useState(false);

  function getCarsToShow(): CarRsv[] {
    return showAll ? cars : cars.slice(0, 3);
  }

  function FeatureIcons({ car }: FeatureIconsProps) {
    const featureToIcon: { [index in CarRsvFeatures]: IconDefinition } = {
      airConditioned: faSnowflake,
      bluetooth: faBluetooth,
      smokeFree: faSmokingBan,
      connectedCar: faGlobe,
    };

    return (
      <Grid container>
        {car.features.map((feature) => (
          <IconTP
            key={feature}
            icon={featureToIcon[feature]}
            style={{ margin: "0px 2px" }}
          />
        ))}
      </Grid>
    );
  }

  function seeCarRentalDetails(car: CarRsv) {
    setCarDetail(car);
    setOpenDialog(true);
  }

  return (
    <Grid container>
      {/* Card */}
      {getCarsToShow().length > 0 ? (
        getCarsToShow().map((car) => (
          <Card key={car.id} className={style.card}>
            <CardActionArea onClick={() => seeCarRentalDetails(car)}>
              <img src={car.image} className={style.cardImage} alt="" />

              <CardContent>
                <Text component="h4" color={Colors.BLUE}>
                  {car.name}
                </Text>

                <FeatureIcons car={car} />

                <IconText style={{ marginTop: 15 }} icon={faChair}>
                  {car.seats > 1 ? `${car.seats} seats` : `1 seat`}
                </IconText>
                <IconText icon={faDoorClosed}>
                  {car.doors > 1 ? `${car.doors} doors` : `1 door`}
                </IconText>

                <Text component="h3" style={{ marginTop: 20 }} color={Colors.BLUE}>
                  {formatAsCurrency(convertToUserCurrency(car.cost, "USD"))}
                </Text>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <NotCreatedMessage
          type="CAR_RENTAL"
          message="This trip does not include any car rentals"
        />
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
            <IconButton
              className={style.closeButton}
              onClick={() => setOpenDialog(false)}
            >
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
                <IconText
                  icon={faGasPump}
                  fontSize={16}
                >{`${carDetail.mpg} MPG`}</IconText>
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
    </Grid>
  );
});
