import React from "react";
import { POICategories, POICategorySearch } from "../../../utils/POICategory";
import Slider from "react-slick";
import { CardActionArea, Card, CardContent } from "@material-ui/core";
import { ProgressCircle, SliderArrow, Text } from "../../atoms";
import { thingsToDoStyles } from "../../../scenes/ThingsToDo/thingsToDo-styles";
import { CSSProperties } from "@material-ui/styles";

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
    slidesToShow: availableCategories.length >= 4 ? 4 : availableCategories.length,
    slidesToScroll: availableCategories.length >= 4 ? 4 : availableCategories.length,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: availableCategories.length >= 3 ? 3 : availableCategories.length,
          slidesToScroll:
            availableCategories.length >= 3 ? 3 : availableCategories.length,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: availableCategories.length >= 2 ? 2 : availableCategories.length,
          slidesToScroll:
            availableCategories.length >= 2 ? 2 : availableCategories.length,
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

  function getCategoryCardStyle(category: POICategorySearch): CSSProperties {
    return {
      background: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7) ), url("${category.image}")`,
      height: "200px",
      backgroundSize: "cover",
      backgroundPosition: "50%",
      backgroundRepeat: "no-repeat",
      display: "flex",
    };
  }

  return (
    <div style={{ height: "264px", display: "flex" }}>
      <Slider {...categorySliderSettings}>
        {POICategories.map((category, i) => (
          <div key={category.id}>
            <CardActionArea
              className={
                selectedCategory.pluralName === category.pluralName
                  ? style.cardSelected
                  : style.card
              }
              onClick={() => onCategorySelected(category)}
            >
              <Card style={{ borderRadius: "15px" }}>
                <CardContent style={getCategoryCardStyle(category)}>
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
    </div>
  );
}
