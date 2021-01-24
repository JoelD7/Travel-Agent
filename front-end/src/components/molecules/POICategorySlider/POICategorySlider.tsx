import React from "react";
import { POICategorySearch } from "../../../utils/POICategory";
import Slider from "react-slick";
import { CardActionArea, Card, CardContent } from "@material-ui/core";
import { SliderArrow, Text } from "../../atoms";
import { thingsToDoStyles } from "../../../scenes/ThingsToDo/thingsToDo-styles";

interface POICategorySlider {
  availableCategories: POICategorySearch[];
  onCategorySelected: (category: POICategorySearch) => void;
  selectedCategory: POICategorySearch;
}

export function POICategorySlider({
  availableCategories,
  onCategorySelected,
  selectedCategory,
}: POICategorySlider) {
  const style = thingsToDoStyles();

  const categorySliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 628,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <Slider {...categorySliderSettings}>
      {availableCategories.map((category, i) => (
        <div key={i}>
          <CardActionArea
            className={
              selectedCategory.pluralName === category.pluralName
                ? style.cardSelected
                : style.card
            }
            onClick={() => onCategorySelected(category)}
          >
            <Card style={{ borderRadius: "15px" }}>
              <CardContent
                style={{
                  background: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7) ), url("${category.image}")`,
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundPosition: "50%",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                }}
              >
                <div className={style.categoryNameContainer}>
                  <Text bold color="white">
                    {category.name}
                  </Text>
                </div>
              </CardContent>
            </Card>
          </CardActionArea>
        </div>
      ))}
    </Slider>
  );
}
