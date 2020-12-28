import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronRight,
  faMapMarkerAlt,
  faUtensils,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardActionArea, Grid } from "@material-ui/core";
import React from "react";
import Rating from "react-rating";
import { useHistory } from "react-router-dom";
import { Colors } from "../../../styles";
import { Routes } from "../../../utils";
import { CustomButton, IconText, StarRating, Text } from "../../atoms";
import { restaurantCardStyles } from "./restaurantCard-styles";

interface RestaurantCard {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCard) {
  const style = restaurantCardStyles();
  const history = useHistory();

  return (
    <Grid container className={style.mainContainer}>
      <Grid item className={style.photoGrid}>
        <CardActionArea
          style={{ height: "100%" }}
          onClick={() => history.push(`${Routes.RESTAURANTS}/${restaurant.id}`)}
        >
          <img src={restaurant.featuredImage} className={style.cardImage} />
        </CardActionArea>
      </Grid>

      <Grid item className={style.cardContentGrid}>
        <Grid container>
          <Grid item xs={12}>
            <Text component="h3" weight={500} style={{ margin: "5px 0px" }}>
              {restaurant.name}
            </Text>
          </Grid>

          <Grid item xs={12}>
            <Rating
              initialRating={restaurant.rating}
              readonly
              emptySymbol={
                <FontAwesomeIcon
                  style={{ margin: "0px 1px" }}
                  icon={faStarReg}
                  color={Colors.PURPLE}
                />
              }
              fullSymbol={
                <FontAwesomeIcon
                  style={{ margin: "0px 1px" }}
                  icon={faStar}
                  color={Colors.PURPLE}
                />
              }
            />
          </Grid>

          <Grid item xs={12} style={{ marginTop: "5px" }}>
            <IconText
              shadow
              style={{ marginBottom: "0px" }}
              className={style.bodyText}
              icon={faUtensils}
              text={restaurant.cuisines}
            />
          </Grid>

          <Grid item xs={12}>
            <IconText
              shadow
              style={{ marginBottom: "0px" }}
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
                onClick={() => history.push(`${Routes.RESTAURANTS}/${restaurant.id}`)}
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
