import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React, { MouseEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import Ratings from "react-ratings-declarative";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  CustomButton,
  IconText,
  IncludeInTripPopover,
  Navbar,
  ProgressCircle,
  RestaurantDetailsSlider,
  ServicesToolbar,
  SliderArrow,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  getRestaurantCategoriesList,
  getRestaurantHours,
  getRestaurantTransactions,
  restaurantPlaceholder,
} from "../../utils";
import { fetchRestaurant } from "../../utils/external-apis/yelp-apis";
import { restaurantDetailsStyles } from "./restaurantDetails-styles";

export function RestaurantDetails() {
  const style = restaurantDetailsStyles();
  const { id } = useParams<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const [restaurant, setRestaurant] = useState<Restaurant>(restaurantPlaceholder);
  const amenities: string = getRestaurantTransactions(restaurant);

  const [tripAnchor, setTripAnchor] = useState<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToShow: 1,
  };

  useEffect(() => {
    fetchRestaurant(id)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  function onIncludeTripClick(event: MouseEvent<HTMLButtonElement>) {
    setTripAnchor(event.currentTarget);
    setOpenPopover(true);
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Restaurant | ${restaurant.name}`}</title>
      </Helmet>

      <Navbar />
      <ServicesToolbar />

      {loading && (
        <div className={style.progressCircleContainer}>
          <ProgressCircle />
        </div>
      )}

      <Grid
        container
        spacing={2}
        className={style.pageContentContainer}
        style={loading ? { filter: "blur(4px)" } : {}}
      >
        {/* Ratings */}
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

        {/* Location, phone, include in trip */}
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
                onClick={(e) => onIncludeTripClick(e)}
                backgroundColor={Colors.GREEN}
                rounded
              >
                Include in trip
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Images */}
        <Grid item className={style.imageGrid}>
          <RestaurantDetailsSlider photos={restaurant.photos} />
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

            {amenities !== "" && (
              <>
                <h4 style={{ marginBottom: "0px" }}>Amenities</h4>
                <p style={{ marginTop: "5px", fontSize: "15px" }}>{amenities}</p>
              </>
            )}
          </div>
        </Grid>
      </Grid>

      <IncludeInTripPopover
        place={restaurant}
        tripAnchor={tripAnchor}
        setTripAnchor={setTripAnchor}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      />
    </div>
  );
}
