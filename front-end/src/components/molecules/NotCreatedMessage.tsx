import { Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Colors, Shadow } from "../../styles";
import {
  getHotelSearchURL,
  Routes,
  getRestaurantsDefaultRoute,
  getCarRentalDefaultURL,
} from "../../utils";
import { CustomButton } from "../atoms";

interface NotCreatedMessageProps {
  message: string;
  type: "FLIGHT" | "HOTEL" | "RESTAURANT" | "POI" | "CAR_RENTAL" | "ALBUMS";
  actionFunction?: () => void;
}

export function NotCreatedMessage({
  message,
  type,
  actionFunction,
}: NotCreatedMessageProps) {
  const history = useHistory();

  function getRedirectAction() {
    switch (type) {
      case "FLIGHT":
        history.push(Routes.FLIGHTS);
        break;

      case "HOTEL":
        history.push(getHotelSearchURL());
        break;

      case "RESTAURANT":
        history.push(getRestaurantsDefaultRoute());
        break;

      case "POI":
        history.push(Routes.THINGS_TODO);
        break;

      case "CAR_RENTAL":
        history.push(getCarRentalDefaultURL());
        break;

      case "ALBUMS":
        if (actionFunction) {
          actionFunction();
        }
        break;
    }
  }

  function getButtonLabel() {
    switch (type) {
      case "FLIGHT":
        return "Book flights";

      case "HOTEL":
        return "Book hotels";

      case "RESTAURANT":
        return "Check out restaurants";

      case "POI":
        return "See interesting places";

      case "CAR_RENTAL":
        return "Rent cars";

      case "ALBUMS":
        return "Create albums";
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {message}
      </Grid>
      <Grid item xs={12} style={{ marginTop: 20 }}>
        <Grid container>
          <CustomButton
            onClick={() => getRedirectAction()}
            rounded
            style={{ boxShadow: Shadow.LIGHT3D }}
            backgroundColor={Colors.GREEN}
          >
            {getButtonLabel()}
          </CustomButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
