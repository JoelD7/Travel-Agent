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
import { getRestaurantCategoriesList } from "../../../utils/functions/restaurant";

interface RestaurantSlides {
  restaurants: RestaurantSearch[];
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
        breakpoint: 1388,
        settings: {
          slidesToShow: getSlidesToShow(3),
          slidesToScroll: getSlidesToShow(3),
        },
      },
      {
        breakpoint: 782,
        settings: {
          slidesToShow: getSlidesToShow(2),
          slidesToScroll: getSlidesToShow(2),
        },
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: getSlidesToShow(1),
          slidesToScroll: getSlidesToShow(1),
        },
      },
    ],
  };

  function getSlidesToShow(def: number) {
    return restaurants.length > def ? def : restaurants.length;
  }

  return (
    <div>
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
          <Slider
            {...sliderSettings}
            slidesToScroll={1}
            slidesToShow={3}
            // slidesToShow={getSlidesToShow(4)}
          >
            {restaurants.map((restaurant, i) => (
              <div key={i}>
                <CardActionArea
                  className={style.card}
                  onClick={() => history.push(`${Routes.RESTAURANTS}/${restaurant.id}`)}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={restaurant.image_url}
                    />

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

                      <p className={style.restaurantCuisines}>
                        {getRestaurantCategoriesList(restaurant)}
                      </p>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </div>
  );
}
