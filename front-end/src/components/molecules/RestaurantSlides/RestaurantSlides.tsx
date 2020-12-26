import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { faCircle} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import { SliderArrow, Text } from "../../atoms";
import { restaurantSlidesStyles } from "./restaurantSlides-styles";
import Slider from "react-slick";
import { Colors } from "../../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../utils";

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

  function RestaurantScore({ score }: { score: number }) {
    return (
      <div style={{ display: "flex" }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <FontAwesomeIcon
            size="xs"
            style={{ margin: "auto 1px" }}
            key={n}
            icon={score >= n ? faCircle : faCircleReg}
            color={Colors.PURPLE}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Grid item className={style.slideshowGrid}>
        <Grid container>
          <Text style={{ marginLeft: "53px" }} component="h2">{title}</Text>
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
                    <p className={style.restaurantName}>{`${restaurant.name}`}</p>
                    <RestaurantScore score={restaurant.rating} />
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
