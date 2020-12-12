import { restaurantDetailsStyles } from "./restaurantDetails-styles";
import React from "react";
import { CustomButton, IconText, Navbar, ServicesToolbar } from "../../components";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Ratings from "react-ratings-declarative";
import { Colors, Shadow } from "../../styles";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

export function RestaurantDetails() {
  const style = restaurantDetailsStyles();
  const { id } = useParams<any>();

  const restaurant: Restaurant = {
    id: "16769546",
    name: "Katz's Delicatessen",
    url:
      "https://www.zomato.com/new-york-city/katzs-delicatessen-lower-east-side?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "205 East Houston Street, New York 10002",
      locality: "Lower East Side",
      city: "New York City",
      cityID: 280,
      latitude: "40.7223277778",
      longitude: "-73.9873500000",
      zipcode: "10002",
      countryID: 216,
    },
    cuisines: "Sandwich",
    timings:
      "8 AM to 10:30 PM (Mon, Tue, Wed, Sun), 8 AM to 2:30 AM (Thu),24 Hours (Fri-Sat)",
    avgCostForTwo: 30,
    priceRange: 2,
    currency: "$",
    highlights: [
      "Lunch",
      "Serves Alcohol",
      "Cash",
      "Dinner",
      "Credit Card",
      "Takeaway Available",
      "Breakfast",
      "Wine",
      "Indoor Seating",
      "Kosher",
      "Beer",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/6/16769546/48ab9901ddf191d13ade07221b43ba93.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/katzs-delicatessen-lower-east-side/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/katzs-delicatessen-lower-east-side/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/6/16769546/48ab9901ddf191d13ade07221b43ba93.jpg",
    phoneNumbers: "(212) 254-2246",
    establishment: ["Deli"],
    rating: 4.6,
    ratingText: "Excellent",
  };

  return (
    <div className={style.mainContainer}>
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
            <IconText text={restaurant.location.address} icon={faMapMarkerAlt} />
            <p style={{ margin: "auto 5px" }}>|</p>
            <IconText text={restaurant.phoneNumbers} icon={faPhone} />
            
            <Grid item className={style.tripButtonGrid}>
              <CustomButton
                style={{ boxShadow: Shadow.LIGHT }}
                label="Include in trip"
                onClick={() => {}}
                backgroundColor={Colors.GREEN}
                rounded
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={style.imageGrid}>
          <Grid container style={{ height: "100%" }}>
            <img
              src={restaurant.featuredImage}  
              className={style.restaurantImage}
              alt="restaurant image"
            />
          </Grid>
        </Grid>

        <Grid item className={style.detailsGrid}>
          <div className={style.detailsContainer}>
            <h2>Details</h2>
            <h4 style={{ marginBottom: "0px" }}>Cuisines</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>{restaurant.cuisines}</p>

            <h4 style={{ marginBottom: "0px" }}>Timings</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>{restaurant.timings}</p>

            <h4 style={{ marginBottom: "0px" }}>Menu</h4>
            <a style={{ color: "white", fontSize: "15px" }} href={restaurant.menuURL}>
              Click here
            </a>

            <h4 style={{ marginBottom: "0px" }}>Website</h4>
            <a style={{ color: "white", fontSize: "15px" }} href={restaurant.url}>
              Click here
            </a>

            <h4 style={{ marginBottom: "0px" }}>Average cost for two</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>
              {restaurant.avgCostForTwo}
            </p>

            <h4 style={{ marginBottom: "0px" }}>Amenities</h4>
            <p style={{ marginTop: "5px", fontSize: "15px" }}>
              {restaurant.highlights.join(",  ")}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
