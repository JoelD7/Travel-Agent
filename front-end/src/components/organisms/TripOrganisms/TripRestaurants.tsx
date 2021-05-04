import {
  faUtensils,
  faCalendar,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  CardActionArea,
  Theme,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { Colors, Shadow } from "../../../styles";
import { rsvRestaurantsPlaceholder } from "../../../utils";
import { IconText, Rating, Text } from "../../atoms";

interface TripRestaurants {
  showAll?: boolean;
}

export function TripRestaurants({ showAll = true }: TripRestaurants) {
  const tripRestaurantStyles = makeStyles((theme: Theme) => ({
    card: {
      borderRadius: "10px",
      width: "25%",
      margin: "10px 5px",
      boxShadow: Shadow.LIGHT3D,

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
  }));

  const style = tripRestaurantStyles();

  const restaurants: RsvRestaurant[] = rsvRestaurantsPlaceholder;

  function getRestaurantsToShow(): RsvRestaurant[] {
    return showAll ? restaurants : restaurants.slice(0, 3);
  }

  return (
    <Grid container>
      {getRestaurantsToShow().map((restaurant) => (
        <Card key={restaurant.id} className={style.card}>
          <CardActionArea>
            <CardMedia component="img" src={restaurant.imageUrl} height="200" />

            <CardContent>
              <Text component="h4" color={Colors.BLUE}>
                {restaurant.name}
              </Text>
              <Rating type="circle" score={restaurant.rating} />

              <IconText style={{ marginTop: "10px" }} icon={faUtensils}>
                {restaurant.cuisines}
              </IconText>

              <IconText icon={faCalendar}>
                {format(restaurant.visitDate, "dd/MM/yyyy 'at' HH:mm")}
              </IconText>

              <IconText icon={faMapMarkerAlt}>{restaurant.displayAddress}</IconText>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
}
