import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Divider, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  Navbar,
  ProgressCircle,
  RestaurantCard,
  RestaurantCuisinesSelec,
  RestaurantFeature,
  RestaurantFilters,
  RestaurantSlides,
  ServicesToolbar,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  filterByFeature,
  hasAny,
  selectAllRestaurants,
  selectCheckedRestaurantCuisines,
  selectCheckedRestaurantFeatures,
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
  let poiDetail: POI;

  const [openDrawer, setOpenDrawer] = useState(false);

  const currentCity: IATALocation = useSelector(selectCurrentCity);
  const restaurants: RestaurantSearch[] = useSelector(selectRestaurants);
  const allRestaurants: RestaurantSearch[] = useSelector(selectAllRestaurants);

  const cuisines: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);
  const features: RestaurantFilter[] = useSelector(selectRestaurantFeatures);

  const checkedRestaurantFeatures = useSelector(selectCheckedRestaurantFeatures);
  const checkedRestaurantCuisines = useSelector(selectCheckedRestaurantCuisines);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchRestaurants(currentCity.lat, currentCity.lon)
      .then((res) => {
        dispatch(setRestaurants(res.data.businesses));
        dispatch(setAllRestaurants(res.data.businesses));
        dispatch(addRestaurantCuisines(cuisines, res.data.businesses));
        dispatch(addRestaurantFeatures(features, res.data.businesses));

        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

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

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Restaurants in ${state.city}`}</title>
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
                >{`Restaurants in ${state.city}`}</Text>
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
            <RestaurantSlides
              loading={loading}
              restaurants={filterByFeature("delivery", restaurants)}
              title="Delivery Available"
            />

            <RestaurantSlides
              loading={loading}
              restaurants={filterByFeature("pickup", restaurants)}
              title="Pickup"
            />
            <RestaurantSlides
              loading={loading}
              restaurants={filterByFeature("restaurant_reservation", restaurants)}
              title="Reservation"
            />

            <Text
              style={{ margin: "50px 0px 20px 0px" }}
              weight={500}
              component="h2"
              bold
            >{`Top Restaurants in ${state.city}`}</Text>
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
