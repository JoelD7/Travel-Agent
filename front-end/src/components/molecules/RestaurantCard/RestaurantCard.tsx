import {
  faChevronRight,
  faMapMarkerAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { CardActionArea, Grid } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Colors } from "../../../styles";
import { getLinkStyle, Routes } from "../../../utils";
import { getRestaurantCategoriesList } from "../../../utils/functions/restaurant-functions";
import { CustomButton, IconText, Rating, Text } from "../../atoms";
import { restaurantCardStyles } from "./restaurantCard-styles";

interface RestaurantCard {
  restaurant: RestaurantSearch;
}

export function RestaurantCard({ restaurant }: RestaurantCard) {
  const style = restaurantCardStyles();
  const history = useHistory();

  function onRestaurantClick() {
    history.push(`${Routes.RESTAURANTS}/${restaurant.id}`);
  }

  return (
    <Grid container className={style.mainContainer}>
      {/* Photo */}
      <Grid item className={style.photoGrid}>
        <CardActionArea style={{ height: "100%" }} onClick={() => onRestaurantClick()}>
          <img src={restaurant.image_url} className={style.cardImage} />
        </CardActionArea>
      </Grid>

      {/* Content */}
      <Grid item className={style.cardContentGrid}>
        <Grid container style={{ height: "100%", padding: "10px" }}>
          <Grid item xs={12}>
            {/* Name */}
            <Text component="h3" bold color={Colors.BLUE} style={{ marginTop: "5px" }}>
              {restaurant.name}
            </Text>
          </Grid>

          {/* Rating */}
          <Grid item xs={12}>
            <Rating score={restaurant.rating} readonly type="star" />
          </Grid>

          {/* Cuisines */}
          <Grid item xs={12} style={{ marginTop: "15px" }}>
            <IconText
              shadow
              className={style.bodyText}
              icon={faUtensils}
              text={getRestaurantCategoriesList(restaurant)}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <IconText
              shadow
              className={style.bodyText}
              icon={faMapMarkerAlt}
              text={restaurant.location.display_address.join(", ")}
            />
          </Grid>

          {/* Button */}
          <Grid item xs={12}>
            <Grid container style={{ paddingRight: "10px" }}>
              <CustomButton style={{ marginLeft: "auto" }} icon={faChevronRight} rounded>
                <Link
                  style={getLinkStyle("white")}
                  to={`${Routes.RESTAURANTS}/${restaurant.id}`}
                >
                  View details
                </Link>
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
