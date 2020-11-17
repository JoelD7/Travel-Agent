import { faCircle, faFilter } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  CustomButton,
  Navbar,
  RestaurantCuisinesSelec,
  RestaurantEstablishments,
  RestaurantFeature,
  ServicesToolbar,
  SliderArrow,
} from "../../components";
import { Colors } from "../../styles";
import { restaurantListStyles } from "./restaurantList-styles";
import { RestaurantFilter } from "../../utils/types/Establishment";
import { Restaurant } from "../../utils/types/Restaurant";
import { restaurantsPlaceholder } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";

interface Restaurant_List {
  city: string;
  establishments: RestaurantFilter[];
  cuisines: RestaurantFilter[];
  features: RestaurantFilter[];
}

export function Restaurant_List() {
  const style = restaurantListStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

  function RestaurantScore({ score }: { score: number }) {
    return (
      <div style={{ display: "flex" }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <FontAwesomeIcon
            size="xs"
            key={n}
            icon={score >= n ? faCircle : faCircleReg}
            color={Colors.PURPLE}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      <Navbar />
      <ServicesToolbar />

      <h1 style={{ textAlign: "center" }}>{`Restaurants in ${state.city}`}</h1>
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
          <Grid container>
            <h2 style={{marginLeft: '53px'}}>Delivery available</h2>
            <Button
              style={{ textTransform: "capitalize", marginLeft: "auto" }}
              classes={{ root: style.textButton }}
              onClick={() => {}}
            >
              Show all
            </Button>
          </Grid>

          <Grid item className={style.slideshowGrid}>
            <Grid container>
              <Slider {...sliderSettings} slidesToScroll={1} slidesToShow={4}>
                {restaurants.map((restaurant, i) => (
                  <div key={i}>
                    <Card className={style.card}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="150"
                          image={restaurant.thumb}
                        />
                      </CardActionArea>

                      <CardContent>
                        <div className={style.restaurantName}>{`${restaurant.name}`}</div>
                        <RestaurantScore score={Number(restaurant.rating)} />
                        <p className={style.restaurantCuisines}>{restaurant.cuisines}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Slider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
