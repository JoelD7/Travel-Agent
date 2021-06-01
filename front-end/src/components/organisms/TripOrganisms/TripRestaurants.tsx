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
import { format, parseISO } from "date-fns";
import React from "react";
import { Colors, Shadow } from "../../../styles";
import { rsvRestaurantsPlaceholder } from "../../../utils";
import { IconText, Rating, Text } from "../../atoms";
import { NotCreatedMessage } from "../../molecules";

interface TripRestaurants {
  showAll?: boolean;
  restaurants: RsvRestaurant[];
}

export const TripRestaurants = React.memo(function TripRestaurants({
  showAll = true,
  restaurants,
}: TripRestaurants) {
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

  function getRestaurantsToShow(): RsvRestaurant[] {
    return showAll ? restaurants : restaurants.slice(0, 3);
  }

  return (
    <Grid container>
      {getRestaurantsToShow().length > 0 ? (
        getRestaurantsToShow().map((restaurant) => (
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
                  {format(parseISO(restaurant.visitDate), "dd/MM/yyyy 'at' HH:mm")}
                </IconText>

                <IconText icon={faMapMarkerAlt}>{restaurant.displayAddress}</IconText>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <NotCreatedMessage
          type="RESTAURANT"
          message="This trip has no restaurants added."
        />
      )}
    </Grid>
  );
});
