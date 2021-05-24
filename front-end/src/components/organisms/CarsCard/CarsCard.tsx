import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import {
  faChair,
  faCogs,
  faDoorClosed,
  faGasPump,
  faGlobe,
  faSmokingBan,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React from "react";
import { Colors } from "../../../styles";
import { Car, convertToUserCurrency, formatAsCurrency } from "../../../utils";
import { CustomButton, IconText, IconTP, Text } from "../../atoms";
import { carsCardStyles } from "./carsCard-styles";

interface CarsCard {
  car: Car;
}

export function CarsCard({ car }: CarsCard) {
  const style = carsCardStyles();

  function getCarName() {
    return `${car.category.make} ${car.category.model}`;
  }

  function getFeatureIcons() {
    let icons: IconDefinition[] = [];
    for (const key in car.features) {
      if (Object.prototype.hasOwnProperty.call(car.features, key)) {
        const checked = car.features[key];

        switch (key) {
          case "bluetooth_equipped":
            if (checked) {
              icons.push(faBluetooth);
            }
            break;
          case "smoke_free":
            if (checked) {
              icons.push(faSmokingBan);
            }
            break;
          case "air_conditioned":
            if (checked) {
              icons.push(faSnowflake);
            }
            break;
          case "connected_car":
            if (checked) {
              icons.push(faGlobe);
            }
            break;
        }
      }
    }

    return icons;
  }

  return (
    <Grid container className={style.card}>
      {/* Image */}
      <Grid item xs={12}>
        <img className={style.image} src={car.category.image_url} alt="" />
      </Grid>

      {/* Name */}
      <Grid item xs={12}>
        <Text
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          color={Colors.BLUE}
          component="h3"
        >
          {getCarName()}
        </Text>
      </Grid>

      {/* Feature icons */}
      <Grid item xs={12}>
        <Grid container>
          {getFeatureIcons().map((icon, i) => (
            <IconTP style={{ marginRight: "5px" }} key={i} icon={icon} />
          ))}
        </Grid>
      </Grid>

      {/* Car details*/}
      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Grid container>
          <Grid item xs={6}>
            <IconText icon={faChair}>{`${car.capacity.seats} Seats`}</IconText>
            <IconText icon={faDoorClosed}>{`${car.capacity.doors} Doors`}</IconText>
          </Grid>

          <Grid item xs={6}>
            <Grid container>
              {car.category.mpg && (
                <IconText icon={faGasPump}>{`${car.category.mpg} MPG`}</IconText>
              )}

              <IconText icon={faCogs}>{`${car.category.vehicle_transmission}`}</IconText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Price and button */}
      <Grid item xs={12} style={{ marginTop: "10px" }}>
        <Grid container alignItems="center">
          <Text component="h3" color={Colors.BLUE}>
            {formatAsCurrency(
              convertToUserCurrency(
                car.rate_totals.pay_later.reservation_total,
                car.rate_totals.rate.currency
              )
            )}
          </Text>

          <CustomButton style={{ marginLeft: "auto" }} backgroundColor={Colors.GREEN}>
            Reserve
          </CustomButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
