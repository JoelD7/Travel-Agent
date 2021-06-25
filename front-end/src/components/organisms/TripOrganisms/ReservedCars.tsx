import { faChair, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Grow,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Shadow } from "../../../styles";
import {
  CarRsv,
  convertToUserCurrency,
  formatAsCurrency,
  selectCarReservations,
  setCarRsv,
} from "../../../utils";
import { FeatureIcons, IconText, ProgressCircle, Text } from "../../atoms";
import { NotCreatedMessage } from "../../molecules";
import { CarRsvDetails } from "../CarRsvDetails";

interface RsvCars {
  showAll?: boolean;
}

export const ReservedCars = React.memo(function TripCars({ showAll = true }: RsvCars) {
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

  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const carReservations: CarRsv[] | undefined = useSelector(selectCarReservations);

  function getCarsToShow(): CarRsv[] {
    if (carReservations) {
      return showAll ? carReservations : carReservations.slice(0, 3);
    }

    return [];
  }

  function seeCarRentalDetails(carRsv: CarRsv) {
    dispatch(setCarRsv(carRsv));
    setOpenDialog(true);
  }

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      {carReservations ? (
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
          <CarRsvDetails open={openDialog} onClose={() => setOpenDialog(false)} />
        </Grid>
      ) : (
        <Grid container>
          <ProgressCircle />
        </Grid>
      )}
    </Grow>
  );
});
