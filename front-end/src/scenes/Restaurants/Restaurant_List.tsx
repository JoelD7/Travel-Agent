import { faCircle, faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  Navbar,
  RestaurantCard,
  RestaurantCuisinesSelec,
  RestaurantEstablishments,
  RestaurantFeature,
  RestaurantSlides,
  ServicesToolbar,
  SliderArrow,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import { restaurantListStyles } from "./restaurantList-styles";
import { restaurantsPlaceholder } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import Axios from "axios";
import Helmet from "react-helmet";

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

  useEffect(() => {
    // test();
  }, []);

  const [state, setState] = useState<Restaurant_List>({
    city: "Santo Domingo",
    establishments: [
      { id: 31, name: "Bakery", checked: false },
      { id: 7, name: "Bar", checked: false },
      { id: 91, name: "Bistro", checked: false },
      { id: 283, name: "Brewery", checked: false },
      { id: 1, name: "Café", checked: false },
      { id: 16, name: "Casual Dining", checked: false },
      { id: 8, name: "Club", checked: false },
      { id: 286, name: "Coffee Shop", checked: false },
      { id: 24, name: "Deli", checked: false },
      { id: 23, name: "Dessert Parlour", checked: false },
      { id: 101, name: "Diner", checked: false },
      { id: 285, name: "Fast Casual", checked: false },
      { id: 281, name: "Fast Food", checked: false },
      { id: 18, name: "Fine Dining", checked: false },
      { id: 5, name: "Lounge", checked: false },
      { id: 275, name: "Pizzeria", checked: false },
      { id: 6, name: "Pub", checked: false },
      { id: 21, name: "Quick Bites", checked: false },
      { id: 271, name: "Sandwich Shop", checked: false },
      { id: 278, name: "Wine Bar", checked: false },
    ],
    cuisines: [
      {
        id: 1035,
        name: "Afghan",
        checked: false,
      },
      {
        id: 6,
        name: "Afghani",
        checked: false,
      },
      {
        id: 152,
        name: "African",
        checked: false,
      },
      {
        id: 1,
        name: "American",
        checked: false,
      },
      {
        id: 954,
        name: "Amish",
        checked: false,
      },
      {
        id: 151,
        name: "Argentine",
        checked: false,
      },
      {
        id: 175,
        name: "Armenian",
        checked: false,
      },
      {
        id: 3,
        name: "Asian",
        checked: false,
      },
      {
        id: 131,
        name: "Australian",
        checked: false,
      },
      {
        id: 201,
        name: "Austrian",
        checked: false,
      },
      {
        id: 247,
        name: "Bubble Tea",
        checked: false,
      },
      {
        id: 168,
        name: "Burger",
        checked: false,
      },
      {
        id: 22,
        name: "Burmese",
        checked: false,
      },
      {
        id: 956,
        name: "California",
        checked: false,
      },
      {
        id: 111,
        name: "Cambodian",
        checked: false,
      },
      {
        id: 75,
        name: "Mughlai",
        checked: false,
      },
      {
        id: 117,
        name: "Nepalese",
        checked: false,
      },
    ],
    features: [
      {
        id: 1,
        name: "Delivery",
        checked: false,
      },
      {
        id: 2,
        name: "Dine-out",
        checked: false,
      },
      {
        id: 3,
        name: "Nightlife",
        checked: false,
      },
      {
        id: 4,
        name: "Catching-up",
        checked: false,
      },
      {
        id: 5,
        name: "Takeaway",
        checked: false,
      },
      {
        id: 6,
        name: "Cafes",
        checked: false,
      },
      {
        id: 7,
        name: "Daily Menus",
        checked: false,
      },
      {
        id: 8,
        name: "Breakfast",
        checked: false,
      },
      {
        id: 9,
        name: "Lunch",
        checked: false,
      },
      {
        id: 10,
        name: "Dinner",
        checked: false,
      },
      {
        id: 11,
        name: "Pubs & Bars",
        checked: false,
      },
      {
        id: 13,
        name: "Pocket Friendly Delivery",
        checked: false,
      },
      {
        id: 14,
        name: "Clubs & Lounges",
        checked: false,
      },
    ],
  });

  const restaurants: Restaurant[] = restaurantsPlaceholder;

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
            <div className={style.filterContainer}>
              <Text
                color={Colors.BLUE}
                className={style.filterTitle}
                component="h4"
                weight="bold"
              >
                Establishment
              </Text>
              <RestaurantEstablishments
                values={state.establishments}
                updateState={(values) => setState({ ...state, establishments: values })}
              />

              <Divider style={{ margin: "18px 0px 10px 0px" }} />

              <Text
                color={Colors.BLUE}
                className={style.filterTitle}
                component="h4"
                weight="bold"
              >
                Restaurant features
              </Text>
              <RestaurantFeature
                values={state.features}
                updateState={(values) => setState({ ...state, features: values })}
              />

              <Divider style={{ margin: "18px 0px 10px 0px" }} />

              <Text
                color={Colors.BLUE}
                className={style.filterTitle}
                component="h4"
                weight="bold"
              >
                Cuisines
              </Text>
              <RestaurantCuisinesSelec
                values={state.cuisines}
                updateState={(values) => setState({ ...state, cuisines: values })}
              />
            </div>
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
            <RestaurantSlides restaurants={restaurants} title="Delivery Available" />
            <RestaurantSlides
              restaurants={restaurants}
              title="Outdoor Seating Available"
            />

            <RestaurantSlides restaurants={restaurants} title="Fine Dining" />
            <RestaurantSlides restaurants={restaurants} title="Cheap Eats" />
            <RestaurantSlides restaurants={restaurants} title="Local Cuisine" />

            <Text
              style={{ margin: "50px 0px 20px 0px" }}
              weight={500}
              component="h2"
              bold
            >{`Top Restaurants in ${state.city}`}</Text>
            <div className={style.restaurantCardContainer}>
              {restaurants.map((restaurant, i) => (
                <RestaurantCard key={i} restaurant={restaurant} />
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          width: "200px",
          height: "200px",
          border: "1px solid black",
          background: `linear-gradient(90deg, red 90%, white 90%)`,
        }}
      ></div>
    </div>
  );
}
