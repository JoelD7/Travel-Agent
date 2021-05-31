import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import { faSnowflake, faSmokingBan, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React from "react";
import { CarRsv, CarRsvFeatures } from "../../utils";
import { IconTP } from "./IconTP/IconTP";

interface FeatureIconsProps {
  car: CarRsv;
}

export function FeatureIcons({ car }: FeatureIconsProps) {
  const featureToIcon: { [index in CarRsvFeatures]: IconDefinition } = {
    AIR_CONDITIONED: faSnowflake,
    BLUETOOTH: faBluetooth,
    SMOKE_FREE: faSmokingBan,
    CONNECTED_CAR: faGlobe,
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
