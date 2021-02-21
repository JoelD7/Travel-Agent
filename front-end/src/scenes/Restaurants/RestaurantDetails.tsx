import { restaurantDetailsStyles } from "./restaurantDetails-styles";
import React, { useEffect, useState } from "react";
import { CustomButton, IconText, Navbar, ServicesToolbar } from "../../components";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Ratings from "react-ratings-declarative";
import { Colors, Shadow } from "../../styles";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import Helmet from "react-helmet";
import {
  getRestaurantCategoriesList,
  getRestaurantHours,
  getRestaurantTransactions,
  restaurantPlaceholder,
} from "../../utils";
import { fetchRestaurant } from "../../utils/external-apis/yelp-apis";

export function RestaurantDetails() {
  const style = restaurantDetailsStyles();
  const { id } = useParams<any>();

  const [restaurant, setRestaurant] = useState<Restaurant>(restaurantPlaceholder);

  useEffect(() => {
    fetchRestaurant(id)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Restaurant | ${restaurant.name}`}</title>
      </Helmet>

      <Navbar />
      <ServicesToolbar />

      <Grid container spacing={2} className={style.pageContentContainer}>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: "0px" }}>{restaurant.name}</h1>
          <Ratings
            rating={restaurant.rating}
            widgetRatedColors={Colors.PURPLE}
            widgetHoverColors={Colors.PURPLE}
            widgetDimensions="25px"
            widgetSpacings="4px"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <Ratings.Widget key={n} />
            ))}
          </Ratings>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <IconText
              text={restaurant.location.display_address.join(", ")}
              icon={faMapMarkerAlt}
            />
            <p style={{ margin: "auto 5px" }}>|</p>
            <IconText text={restaurant.display_phone} icon={faPhone} />

            <Grid item className={style.tripButtonGrid}>
              <CustomButton
                style={{ boxShadow: Shadow.LIGHT }}
                onClick={() => {}}
                backgroundColor={Colors.GREEN}
                rounded
              >
                Include in trip
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={style.imageGrid}>
          <Grid container style={{ height: "100%" }}>
            <img
              src={restaurant.image_url}
              className={style.restaurantImage}
              alt="restaurant image"
            />
          </Grid>
        </Grid>

        <Grid item className={style.detailsGrid}>
          <div className={style.detailsContainer}>
            <h2>Details</h2>
            <h4 style={{ marginBottom: "0px" }}>Cuisines</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>
              {getRestaurantCategoriesList(restaurant)}
            </p>

            <h4 style={{ marginBottom: "0px" }}>Timings</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>
              {getRestaurantHours(restaurant)}
            </p>

            <h4 style={{ marginBottom: "0px" }}>Menu</h4>
            <a style={{ color: "white", fontSize: "15px" }} href={restaurant.url}>
              Click here
            </a>

            <h4 style={{ marginBottom: "0px" }}>Website</h4>
            <a style={{ color: "white", fontSize: "15px" }} href={restaurant.url}>
              Click here
            </a>

            <h4 style={{ marginBottom: "0px" }}>Amenities</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>
              {getRestaurantTransactions(restaurant)}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
