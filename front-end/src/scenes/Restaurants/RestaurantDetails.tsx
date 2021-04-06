import {
  faClock,
  faGlobe,
  faMapMarkerAlt,
  faPhone,
  faStar,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React, { MouseEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import Ratings from "react-ratings-declarative";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  CustomButton,
  Footer,
  IconText,
  IncludeInTripPopover,
  Navbar,
  ProgressCircle,
  Rating,
  RestaurantDetailsSlider,
  ServicesToolbar,
  SliderArrow,
  Text,
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
        {/* Name and Ratings */}
        <Grid item xs={12}>
          <Text component="h1" bold color={Colors.BLUE}>
            {restaurant.name}
          </Text>
          <Rating size={30} type="star" readonly score={restaurant.rating} />
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

        {/* Details */}
        <Grid item className={style.detailsGrid}>
          <div className={style.detailsContainer}>
            <Text bold color="white" component="h3" style={{ marginBottom: "15px" }}>
              Details
            </Text>

            <Text bold style={{ marginBottom: "7px" }} color="white" component="h4">
              Cuisines
            </Text>
            <IconText
              textColor="white"
              fontSize={15}
              icon={faUtensils}
              style={{ marginBottom: "20px" }}
            >
              {getRestaurantCategoriesList(restaurant)}
            </IconText>

            <Text bold style={{ marginBottom: "7px" }} color="white" component="h4">
              Timings
            </Text>
            <IconText
              textColor="white"
              fontSize={15}
              icon={faClock}
              style={{ marginBottom: "20px" }}
            >
              {getRestaurantHours(restaurant)}
            </IconText>

            <Text bold style={{ marginBottom: "7px" }} color="white" component="h4">
              Menu
            </Text>
            <IconText
              textColor="white"
              fontSize={15}
              icon={faUtensils}
              style={{ marginBottom: "20px" }}
            >
              <a style={{ color: "white", fontSize: "15px" }} href={restaurant.url}>
                Click here
              </a>
            </IconText>

            <Text bold style={{ marginBottom: "7px" }} color="white" component="h4">
              Website
            </Text>
            <IconText
              textColor="white"
              fontSize={15}
              icon={faGlobe}
              style={{ marginBottom: "20px" }}
            >
              <a style={{ color: "white", fontSize: "15px" }} href={restaurant.url}>
                Click here
              </a>
            </IconText>

            {amenities !== "" && (
              <>
                <Text bold style={{ marginBottom: "7px" }} color="white" component="h4">
                  Amenities
                </Text>
                <IconText
                  textColor="white"
                  fontSize={15}
                  icon={faStar}
                  style={{ marginBottom: "20px" }}
                >
                  {amenities}
                </IconText>
              </>
            )}
          </div>
        </Grid>
      </Grid>

      <Footer />

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
