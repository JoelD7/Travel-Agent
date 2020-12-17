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
  Title,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import { restaurantListStyles } from "./restaurantList-styles";
import { restaurantsPlaceholder } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import Axios from "axios";

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

  function test() {
    Axios.get("https://api.foursquare.com/v2/venues/49eeaf08f964a52078681fe3", {
      params: {
        client_id: "D2KZP5LQRWPEFKPA0PQLOIC3Z0CYDGYGR3UVIP4DOF2T0FWZ",
        client_secret: "HLUNYVTHZS2DB4THW2ZV0AFRIPG2HQNMM3V44NBOIMZX1C32",
        v: "20180323",
      },
    })
      .then((res) => {
        poiDetail = res.data.response.venue;
        console.log(`Categories: ${JSON.stringify(poiDetail.categories)}`);
        console.log(JSON.stringify(poiDetail));
      })
      .catch((er) => {
        console.log(er);
      });
  }

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
      <Navbar />
      <ServicesToolbar />

      <Title component="h1" style={{ textAlign: "center" }}>{`Restaurants in ${state.city}`}</Title>
      <Grid container className={style.pageContentContainer}>
        <Grid item className={style.filterGrid}>
          <h3 className={style.filterTitle}>Establishment</h3>
          <RestaurantEstablishments
            values={state.establishments}
            updateState={(values) => setState({ ...state, establishments: values })}
          />

          <Divider style={{ marginTop: "18px" }} />

          <h3 className={style.filterTitle}>Restaurant features</h3>
          <RestaurantFeature
            values={state.features}
            updateState={(values) => setState({ ...state, features: values })}
          />

          <Divider style={{ marginTop: "18px" }} />

          <h3 className={style.filterTitle}>Cuisines</h3>
          <RestaurantCuisinesSelec
            values={state.cuisines}
            updateState={(values) => setState({ ...state, cuisines: values })}
          />
        </Grid>

        <Grid item className={style.filterButtonGrid}>
          <CustomButton
            label="Filter"
            icon={faFilter}
            backgroundColor={Colors.PURPLE}
            style={{ paddingLeft: "10px", fontSize: "14px" }}
            onClick={() => setOpenDrawer(true)}
          />
        </Grid>

        <Grid item className={style.restaurantsGrid}>
          <RestaurantSlides restaurants={restaurants} title="Delivery Available" />
          <RestaurantSlides restaurants={restaurants} title="Outdoor Seating Available" />

          <Grid container className={style.browseByFoodGrid} spacing={3}>
            <Grid item xs={12}>
              <h2 style={{ marginBottom: "0px" }}>{`Browse ${state.city} by Food`}</h2>
            </Grid>

            {state.cuisines.slice(0, 9).map((cuisine, i) => (
              <Grid item key={i} style={{ width: "33%" }}>
                <CustomButton
                  backgroundColor={Colors.PURPLE}
                  style={{ width: "150px", boxShadow: Shadow.MEDIUM }}
                  label={cuisine.name}
                  onClick={() => {}}
                />
              </Grid>
            ))}
          </Grid>

          <RestaurantSlides restaurants={restaurants} title="Fine Dining" />
          <RestaurantSlides restaurants={restaurants} title="Cheap Eats" />
          <RestaurantSlides restaurants={restaurants} title="Local Cuisine" />

          <Title
            style={{ marginTop: "50px" }}
            component="h1"
          >{`Top Restaurants in ${state.city}`}</Title>
          {restaurants.map((restaurant, i) => (
            <RestaurantCard key={i} restaurant={restaurant} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
