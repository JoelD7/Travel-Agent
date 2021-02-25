import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  Navbar,
  NotAvailableCard,
  ProgressCircle,
  RestaurantCard,
  RestaurantFilters,
  RestaurantSlides,
  ServicesToolbar,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  filterByFeature,
  selectAllRestaurants,
  selectCurrentCity,
  selectRestaurantCuisines,
  selectRestaurantFeatures,
  selectRestaurants,
} from "../../utils";
import { fetchRestaurants } from "../../utils/external-apis/yelp-apis";
import {
  addRestaurantCuisines,
  addRestaurantFeatures,
  setAllRestaurants,
  setRestaurants,
} from "../../utils/store/restaurant-slice";
import { IATALocation } from "../../utils/types/location-types";
import { restaurantListStyles } from "./restaurantList-styles";

interface Restaurant_List {
  city: string;
  establishments: RestaurantFilter[];
  cuisines: RestaurantFilter[];
  features: RestaurantFilter[];
}

export function Restaurant_List() {
  const style = restaurantListStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const currentCity: IATALocation = useSelector(selectCurrentCity);
  const restaurants: RestaurantSearch[] = useSelector(selectRestaurants);
  const allRestaurants: RestaurantSearch[] = useSelector(selectAllRestaurants);

  const [deliveryRestaurants, setDeliveryRestaurants] = useState<RestaurantSearch[]>(
    filterByFeature("delivery", restaurants)
  );
  const [pickupRestaurants, setPickupRestaurants] = useState<RestaurantSearch[]>(
    filterByFeature("pickup", restaurants)
  );
  const [reservationRestaurants, setReservationRestaurants] = useState<
    RestaurantSearch[]
  >(filterByFeature("restaurant_reservation", restaurants));

  const cuisines: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);
  const features: RestaurantFilter[] = useSelector(selectRestaurantFeatures);

  const [loading, setLoading] = useState(false);
  const [noRestaurants, setNoRestaurants] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!areRestaurantsAlreadyFetched(currentCity.city)) {
      if (!loading) {
        setLoading(true);
      }

      fetchRestaurants(currentCity.lat, currentCity.lon)
        .then((res) => {
          let restaurantsRes: RestaurantSearch[] = res.data.businesses;

          dispatch(setRestaurants(restaurantsRes));
          dispatch(setAllRestaurants(restaurantsRes));
          dispatch(addRestaurantCuisines(cuisines, restaurantsRes));
          dispatch(addRestaurantFeatures(features, restaurantsRes));

          if (restaurantsRes.length === 0) {
            setNoRestaurants(true);
          } else if (noRestaurants) {
            setNoRestaurants(false);
          }

          setDeliveryRestaurants(filterByFeature("delivery", restaurantsRes));
          setPickupRestaurants(filterByFeature("pickup", restaurantsRes));
          setReservationRestaurants(
            filterByFeature("restaurant_reservation", restaurantsRes)
          );

          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [currentCity]);

  function areRestaurantsAlreadyFetched(city: string) {
    if (allRestaurants.length === 0) {
      return false;
    }

    let fetchedCity: string = restaurants[0].location.city;
    if (fetchedCity === city) {
      console.log("true");
      return true;
    }
  }

  const [state, setState] = useState<Restaurant_List>({
    city: "Santo Domingo",
    establishments: [
      { name: "Bakery", checked: false },
      { name: "Bar", checked: false },
      { name: "Bistro", checked: false },
      { name: "Brewery", checked: false },
      { name: "Café", checked: false },
      { name: "Casual Dining", checked: false },
      { name: "Club", checked: false },
      { name: "Coffee Shop", checked: false },
      { name: "Deli", checked: false },
      { name: "Dessert Parlour", checked: false },
      { name: "Diner", checked: false },
      { name: "Fast Casual", checked: false },
      { name: "Fast Food", checked: false },
      { name: "Fine Dining", checked: false },
      { name: "Lounge", checked: false },
      { name: "Pizzeria", checked: false },
      { name: "Pub", checked: false },
      { name: "Quick Bites", checked: false },
      { name: "Sandwich Shop", checked: false },
      { name: "Wine Bar", checked: false },
    ],
    cuisines: [
      {
        name: "Afghan",
        checked: false,
      },
      {
        name: "Afghani",
        checked: false,
      },
      {
        name: "African",
        checked: false,
      },
      {
        name: "American",
        checked: false,
      },
      {
        name: "Amish",
        checked: false,
      },
      {
        name: "Argentine",
        checked: false,
      },
      {
        name: "Armenian",
        checked: false,
      },
      {
        name: "Asian",
        checked: false,
      },
      {
        name: "Australian",
        checked: false,
      },
      {
        name: "Austrian",
        checked: false,
      },
      {
        name: "Bubble Tea",
        checked: false,
      },
      {
        name: "Burger",
        checked: false,
      },
      {
        name: "Burmese",
        checked: false,
      },
      {
        name: "California",
        checked: false,
      },
      {
        name: "Cambodian",
        checked: false,
      },
      {
        name: "Mughlai",
        checked: false,
      },
      {
        name: "Nepalese",
        checked: false,
      },
    ],
    features: [
      {
        name: "Delivery",
        checked: false,
      },
      {
        name: "Dine-out",
        checked: false,
      },
      {
        name: "Nightlife",
        checked: false,
      },
      {
        name: "Catching-up",
        checked: false,
      },
      {
        name: "Takeaway",
        checked: false,
      },
      {
        name: "Cafes",
        checked: false,
      },
      {
        name: "Daily Menus",
        checked: false,
      },
      {
        name: "Breakfast",
        checked: false,
      },
      {
        name: "Lunch",
        checked: false,
      },
      {
        name: "Dinner",
        checked: false,
      },
      {
        name: "Pubs & Bars",
        checked: false,
      },
      {
        name: "Pocket Friendly Delivery",
        checked: false,
      },
      {
        name: "Clubs & Lounges",
        checked: false,
      },
    ],
  });

  /**
   * Returns 'white' if none of the restaurant slides
   * has any restaurants. This is because it's the only
   * ocassion on which this title will have the top
   * image as background.
   */
  function getTitleColor() {
    return deliveryRestaurants.length === 0 &&
      pickupRestaurants.length === 0 &&
      reservationRestaurants.length === 0
      ? "white"
      : "black";
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Restaurants in ${currentCity.city}`}</title>
      </Helmet>

      <Navbar />

      <div>
        <Grid container className={style.pageTitleContainer}>
          {/* Services toolbar and title */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <ServicesToolbar style={{ boxShadow: Shadow.MEDIUM }} />
              </Grid>

              <Grid item xs={10} style={{ margin: "0px auto" }}>
                <Text
                  component="hm"
                  weight="bold"
                  color="white"
                  style={{ marginBottom: "20px" }}
                >{`Restaurants in ${currentCity.city}`}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={style.pageContentContainer}>
          {/* Filters */}
          <Grid item className={style.filterGrid}>
            <RestaurantFilters setLoading={(value) => setLoading(value)} />
          </Grid>

          {/* Filter button */}
          <Grid item className={style.filterButtonGrid}>
            <CustomButton
              icon={faFilter}
              backgroundColor={Colors.PURPLE}
              style={{ paddingLeft: "10px", fontSize: "14px" }}
              onClick={() => setOpenDrawer(true)}
            >
              Filters
            </CustomButton>
          </Grid>

          {/* Restaurants */}
          <Grid item className={style.restaurantsGrid}>
            {noRestaurants ? (
              <NotAvailableCard title="Oops...">
                Sorry! Our database seems to have no restaurants in this city.
              </NotAvailableCard>
            ) : (
              <>
                {deliveryRestaurants.length > 0 && (
                  <RestaurantSlides
                    loading={loading}
                    restaurants={deliveryRestaurants}
                    title="Delivery Available"
                  />
                )}

                {pickupRestaurants.length > 0 && (
                  <RestaurantSlides
                    loading={loading}
                    restaurants={filterByFeature("pickup", restaurants)}
                    title="Pickup"
                  />
                )}

                {reservationRestaurants.length > 0 && (
                  <RestaurantSlides
                    loading={loading}
                    restaurants={filterByFeature("restaurant_reservation", restaurants)}
                    title="Reservation"
                  />
                )}

                <Text
                  style={{ margin: "50px 0px 20px 0px" }}
                  weight={500}
                  component="h2"
                  bold
                  color={getTitleColor()}
                >{`Top Restaurants in ${currentCity.city}`}</Text>
                <div className={style.restaurantCardContainer}>
                  {loading && (
                    <Grid
                      container
                      justify="center"
                      style={{ position: "absolute", left: "150px" }}
                    >
                      <ProgressCircle />
                    </Grid>
                  )}
                  <div style={loading ? { filter: "blur(4px)" } : {}}>
                    {restaurants.map((restaurant, i) => (
                      <RestaurantCard key={i} restaurant={restaurant} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
