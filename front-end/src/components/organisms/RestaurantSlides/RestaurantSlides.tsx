import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Grow,
} from "@material-ui/core";
import React from "react";
import Rating from "react-rating";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { Colors } from "../../../styles";
import { Routes } from "../../../utils";
import { getRestaurantCategoriesList } from "../../../utils/functions/restaurant-functions";
import { ProgressCircle, SliderArrow, Text } from "../../atoms";
import { restaurantSlidesStyles } from "./restaurantSlides-styles";

interface RestaurantSlides {
  restaurants: RestaurantSearch[];
  title: string;
  loading: boolean;
}

interface SlideContent {
  restaurant: RestaurantSearch;
}

export function RestaurantSlides({ restaurants, title, loading }: RestaurantSlides) {
  const style = restaurantSlidesStyles();

  const history = useHistory();

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToScroll: getSlidesToShow(3),
    responsive: [
      {
        breakpoint: 1388,
        settings: {
          slidesToShow: getSlidesToShow(3),
          slidesToScroll: getSlidesToShow(3),
        },
      },
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: getSlidesToShow(2),
          slidesToScroll: getSlidesToShow(2),
        },
      },
      {
        breakpoint: 628,
        settings: {
          slidesToShow: getSlidesToShow(1),
          slidesToScroll: getSlidesToShow(1),
        },
      },
    ],
  };

  function SlideContent({ restaurant }: SlideContent) {
    return (
      <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <div className={restaurants.length > 3 ? style.cardParent : ""}>
          <CardActionArea
            className={style.card}
            onClick={() => history.push(`${Routes.RESTAURANTS}/${restaurant.id}`)}
          >
            <Card>
              <CardMedia component="img" height="150" image={restaurant.image_url} />

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

                <Text className={style.restaurantCuisines}>
                  {getRestaurantCategoriesList(restaurant)}
                </Text>
              </CardContent>
            </Card>
          </CardActionArea>
        </div>
      </Grow>
    );
  }

  function getNoSliderWidth(): string {
    return `${100 / restaurants.length - 4}%`;
  }

  function getSlidesToShow(def: number) {
    return restaurants.length > def ? def : restaurants.length;
  }

  return (
    <div>
      {loading && (
        <Grid container justify="center" style={{ position: "relative", top: "215px" }}>
          <ProgressCircle />
        </Grid>
      )}
      <Grid
        item
        className={style.slideshowGrid}
        style={loading ? { filter: "blur(4px)" } : {}}
      >
        {/* Slide title */}
        <Grid container>
          <Text style={{ marginLeft: "45px" }} color={Colors.BLUE} component="h2">
            {title}
          </Text>
        </Grid>

        <Grid
          container
          style={restaurants.length > 3 ? {} : { margin: "auto", width: "96%" }}
        >
          {restaurants.length > 3 ? (
            <Slider {...sliderSettings} slidesToShow={getSlidesToShow(3)}>
              {restaurants.map((restaurant, i) => (
                <SlideContent key={restaurant.id} restaurant={restaurant} />
              ))}
            </Slider>
          ) : (
            <Grid container justify="center">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} style={{ width: `${getNoSliderWidth()}` }}>
                  <SlideContent restaurant={restaurant} />
                </div>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
