import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import {
  faClock,
  faGlobe,
  faHeart,
  faMapMarkerAlt,
  faPhone,
  faStar,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { MouseEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { Font } from "../../assets";
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
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  EventTypes,
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

  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackRemoved, setOpenSnackRemoved] = useState(false);

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

  function addToFavorites() {
    if (restaurant) {
      if (!restaurant.favorite) {
        setRestaurant({ ...restaurant, favorite: true });
        setOpenSnack(true);
      } else {
        setRestaurant({ ...restaurant, favorite: false });
        setOpenSnackRemoved(true);
      }
    }
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
              <Grid container>
                <CustomButton
                  style={{ boxShadow: Shadow.LIGHT }}
                  onClick={(e) => onIncludeTripClick(e)}
                  backgroundColor={Colors.GREEN}
                  rounded
                >
                  Include in trip
                </CustomButton>

                <IconButton
                  style={{ margin: "auto 0px auto 10px" }}
                  onClick={() => addToFavorites()}
                >
                  <FontAwesomeIcon
                    icon={restaurant.favorite ? faHeart : faHeartReg}
                    color={Colors.PURPLE}
                  />
                </IconButton>
              </Grid>
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

            {/* Cuisines */}
            <div>
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
            </div>

            {/* Timings */}
            <div>
              <Text bold style={{ marginBottom: "7px" }} color="white" component="h4">
                Timings
              </Text>
              {getRestaurantHours(restaurant).map((timing) => (
                <IconText
                  key={timing}
                  textColor="white"
                  fontSize={15}
                  icon={faClock}
                  style={{ marginBottom: "5px" }}
                >
                  {timing}
                </IconText>
              ))}
            </div>

            {/* Menu */}
            <div>
              <Text
                bold
                style={{ margin: "20px 0px 7px 0px" }}
                color="white"
                component="h4"
              >
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
            </div>

            {/* Website */}
            <div>
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
            </div>

            {/* Amenities */}
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
        eventType={EventTypes.RESTAURANT}
        setTripAnchor={setTripAnchor}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      />

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnack(false)}
          severity="success"
        >
          {"Added to favorites."}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackRemoved}
        autoHideDuration={6000}
        onClose={() => setOpenSnackRemoved(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnackRemoved(false)}
          severity="error"
        >
          {"Removed from favorites."}
        </Alert>
      </Snackbar>
    </div>
  );
}
