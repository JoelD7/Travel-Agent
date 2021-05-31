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
import { FeatureIcons, IconText, IconTP, Text } from "../../atoms";
import { NotCreatedMessage } from "../../molecules";
import { CarRsvDetails } from "../CarRsvDetails";

interface RsvCars {
  showAll?: boolean;
  cars: CarRsv[];
}

export const RsvCars = React.memo(function TripCars({ showAll = true, cars }: RsvCars) {
  const carsCardStyles = makeStyles((theme: Theme) => ({
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
  }));

  const style = carsCardStyles();

  const [carDetail, setCarDetail] = useState<CarRsv>(carRsvPlaceholder[0]);

  const [openDialog, setOpenDialog] = useState(false);

  function getCarsToShow(): CarRsv[] {
    return showAll ? cars : cars.slice(0, 3);
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
          <Card key={car.idCarRental} className={style.card}>
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
      <CarRsvDetails
        carDetail={carDetail}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Grid>
  );
});
