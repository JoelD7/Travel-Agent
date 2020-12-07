import {
  faChevronRight,
  faMapMarkerAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../utils";
import { CustomButton, IconText, StarRating } from "../../atoms";
import { restaurantCardStyles } from "./restaurantCard-styles";

interface RestaurantCard {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCard) {
  const style = restaurantCardStyles();
  const history = useHistory()

  return (
    <Grid container className={style.mainContainer}>
      <Grid item className={style.photoGrid}>
        <img src={restaurant.featuredImage} className={style.cardImage} />
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
                onClick={()=> history.push(`${Routes.RESTAURANTS}/${restaurant.id}`) }
                icon={faChevronRight}
                rounded
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
