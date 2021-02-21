import {
  faChevronRight,
  faMapMarkerAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { CardActionArea, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getLinkStyle, Routes } from "../../../utils";
import { getRestaurantCategoriesList } from "../../../utils/functions/restaurant";
import { CustomButton, IconText, Rating, Text } from "../../atoms";
import { restaurantCardStyles } from "./restaurantCard-styles";

interface RestaurantCard {
  restaurant: RestaurantSearch;
}

export function RestaurantCard({ restaurant }: RestaurantCard) {
  const style = restaurantCardStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  function onRestaurantClick() {
    history.push(`${Routes.RESTAURANTS}/${restaurant.id}`);
  }

  return (
    <Grid container className={style.mainContainer}>
      <Grid item className={style.photoGrid}>
        <CardActionArea style={{ height: "100%" }} onClick={() => onRestaurantClick()}>
          <img src={restaurant.image_url} className={style.cardImage} />
        </CardActionArea>
      </Grid>

      <Grid item className={style.cardContentGrid}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Text component="h3" weight={500} style={{ margin: "5px 0px" }}>
              {restaurant.name}
            </Text>
          </Grid>

          <Grid item xs={12}>
            <Rating score={restaurant.rating} readonly type="star" />
          </Grid>

          <Grid item xs={12} style={{ marginTop: "15px" }}>
            <IconText
              shadow
              className={style.bodyText}
              icon={faUtensils}
              text={getRestaurantCategoriesList(restaurant)}
            />
          </Grid>

          <Grid item xs={12}>
            <IconText
              shadow
              className={style.bodyText}
              icon={faMapMarkerAlt}
              text={restaurant.location.display_address.join(", ")}
            />
          </Grid>

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
