import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleRight,
  faMapMarkerAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React from "react";
import { Colors, Shadow } from "../../../styles";
import { Restaurant } from "../../../utils/types/Restaurant";
import { CustomButton, IconText, StarRating } from "../../atoms";
import { restaurantCardStyles } from "./restaurantCard-styles";

interface RestaurantCard {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCard) {
  const style = restaurantCardStyles();

  return (
    <Grid container className={style.mainContainer}>
      <Grid item className={style.photoGrid}>
        <img src={restaurant.thumb} className={style.cardImage} />
      </Grid>

      <Grid item className={style.cardContentGrid}>
        <Grid container>
          <Grid item xs={12}>
            <h3 style={{ marginBottom: "5px" }}>{restaurant.name}</h3>
          </Grid>

          <Grid item xs={12}>
            <StarRating stars={Number(restaurant.rating)} />
          </Grid>

          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <IconText
              shadow
              className={style.bodyText}
              icon={faUtensils}
              text={restaurant.cuisines}
            />
          </Grid>

          <Grid item xs={12}>
            <IconText
              shadow
              className={style.bodyText}
              icon={faMapMarkerAlt}
              text={restaurant.location.address}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <CustomButton
                style={{ marginLeft: "auto" }}
                label="Check details"
                iconColor={Colors.PURPLE}
                icon={faChevronCircleRight}
                rounded
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
