import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import { SliderArrow, Text } from "../../atoms";
import { restaurantSlidesStyles } from "./restaurantSlides-styles";
import Slider from "react-slick";
import { Colors } from "../../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../utils";
import Rating from "react-rating";

interface RestaurantSlides {
  restaurants: Restaurant[];
  title: string;
}

export function RestaurantSlides({ restaurants, title }: RestaurantSlides) {
  const style = restaurantSlidesStyles();

  const history = useHistory();

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

  return (
    <div style={{ marginTop: "20px" }}>
      <Grid item className={style.slideshowGrid}>
        <Grid container>
          <Text style={{ marginLeft: "53px" }} weight={500} component="h2">
            {title}
          </Text>
          <Button
            style={{ textTransform: "capitalize", margin: "auto 0px 5px auto" }}
            classes={{ root: style.textButton }}
            onClick={() => {}}
          >
            Show all
          </Button>
        </Grid>

        <Grid container>
          <Slider {...sliderSettings} slidesToScroll={1} slidesToShow={4}>
            {restaurants.map((restaurant, i) => (
              <div key={i}>
                <Card className={style.card}>
                  <CardActionArea
                    onClick={() => history.push(`${Routes.RESTAURANTS}/${restaurant.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={restaurant.featuredImage}
                    />
                  </CardActionArea>

                  <CardContent>
                    <Text
                      component="h4"
                      className={style.restaurantName}
                    >{`${restaurant.name}`}</Text>

                    <Rating
                      initialRating={restaurant.rating}
                      readonly
                      emptySymbol={
                        <FontAwesomeIcon
                          style={{ margin: "0px 1px" }}
                          icon={faCircleReg}
                          color={Colors.PURPLE}
                        />
                      }
                      fullSymbol={
                        <FontAwesomeIcon
                          style={{ margin: "0px 1px" }}
                          icon={faCircle}
                          color={Colors.PURPLE}
                        />
                      }
                    />

                    <p className={style.restaurantCuisines}>{restaurant.cuisines}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </div>
  );
}
