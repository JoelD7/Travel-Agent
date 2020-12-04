import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { faCircle, faFilter } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import { SliderArrow } from "../../atoms";
import { restaurantSlidesStyles } from "./restaurantSlides-styles";
import Slider from "react-slick";
import { Colors } from "../../../styles";
import { Restaurant } from "../../../utils/types/Restaurant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RestaurantSlides {
  restaurants: Restaurant[];
  title: string;
}

export function RestaurantSlides({ restaurants, title }: RestaurantSlides) {
  const style = restaurantSlidesStyles();

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
            key={n}
            icon={score >= n ? faCircle : faCircleReg}
            color={Colors.PURPLE}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{marginTop: '20px'}}>
      <Grid item className={style.slideshowGrid}>
        <Grid container>
          <h2 style={{ marginLeft: "53px" }}>{`${title}`}</h2>
          <Button
            style={{ textTransform: "capitalize", margin: "auto 0px auto auto" }}
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
                  <CardActionArea>
                    <CardMedia component="img" height="150" image={restaurant.thumb} />
                  </CardActionArea>

                  <CardContent>
                    <p className={style.restaurantName}>{`${restaurant.name}`}</p>
                    <RestaurantScore score={Number(restaurant.rating)} />
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
