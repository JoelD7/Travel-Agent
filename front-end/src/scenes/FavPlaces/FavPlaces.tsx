import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@material-ui/core";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  DashDrawer,
  IconText,
  Navbar,
  SliderArrow,
  Text,
} from "../../components";
import { favPlacesStyles } from "./favPlaces-styles";
import { getLinkStyle, POICategory, poisPlaceholder } from "../../utils";
import { faCircle, faHeart, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../styles";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

interface POICategoryGroup {
  name: string;
  pluralName: string;
  places: POISearch[];
}

export function FavPlaces() {
  const styles = favPlacesStyles();

  const pois: POISearch[] = poisPlaceholder;
  let poiCategories = POICategory.POICategories;

  const [categoryGroups, setCategoryGroups] = useState<POICategoryGroup[]>([]);

  let categoryGroupsMap: { [index: string]: POICategoryGroup } = {};
  let categoryGroupsTemp: POICategoryGroup[] = [];

  const sliderSettings = {
    className: styles.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
  };

  function getResponsiveSlider(group: POICategoryGroup) {
    return [
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: getSlidesToShow(2, group),
          slidesToScroll: getSlidesToShow(2, group),
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: getSlidesToShow(1, group),
          slidesToScroll: getSlidesToShow(1, group),
        },
      },
    ];
  }

  function getSlidesToShow(def: number, group: POICategoryGroup) {
    return group.places.length > def ? def : group.places.length;
  }

  useEffect(() => {
    groupPOIByCategory();
  }, []);

  function groupPOIByCategory() {
    //Create categories groups
    poiCategories.forEach((category) => {
      categoryGroupsMap = {
        ...categoryGroupsMap,
        [category.name]: {
          name: category.name,
          pluralName: category.pluralName,
          places: [],
        },
      };
    });

    //Group pois by category
    pois.forEach((poi) => {
      let curGroup = categoryGroupsMap[poi.categories[0].name];
      categoryGroupsMap = {
        ...categoryGroupsMap,
        [poi.categories[0].name]: {
          ...curGroup,
          places: [...curGroup.places, poi],
        },
      };
    });

    //Add groups to the array on which to iterate over
    //in order to render the JSX elements(cards).
    for (const category in categoryGroupsMap) {
      if (Object.prototype.hasOwnProperty.call(categoryGroupsMap, category)) {
        const group = categoryGroupsMap[category];
        categoryGroupsTemp.push(group);
      }
    }
    setCategoryGroups(categoryGroupsTemp);
  }

  return (
    <div className={styles.mainContainer}>
      <Helmet>
        <title>Favorite Places</title>
      </Helmet>
      <Navbar position="sticky" />
      <DashDrawer />

      <Grid container className={styles.mainGrid}>
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <IconText iconStyle={{ padding: "7px" }} shadow size={44} icon={faHeart}>
            <Text component="h1" bold>
              Your favorite spots
            </Text>
          </IconText>
          {categoryGroups && (
            <div>
              {categoryGroups
                .filter((group) => group.places.length > 0)
                .map((group, i) => (
                  <Grid container style={{ marginTop: "20px" }}>
                    <Grid item xs={12}>
                      <Grid container>
                        <Text weight={500} component="h2">
                          {group.pluralName}
                        </Text>
                        <CustomButton
                          style={{ paddingBottom: "0px" }}
                          iconColor="#7e7e7e"
                          backgroundColor="rgba(0,0,0,0)"
                          textColor="#7e7e7e"
                        >
                          See all
                        </CustomButton>
                      </Grid>
                    </Grid>

                    <Slider
                      {...sliderSettings}
                      responsive={getResponsiveSlider(group)}
                      slidesToShow={getSlidesToShow(3, group)}
                    >
                      {group.places.map((place: POISearch, i) => (
                        <div key={i}>
                          <Card className={styles.favCard}>
                            <CardActionArea>
                              <Link style={getLinkStyle()} to="#">
                                <CardMedia
                                  component="img"
                                  height="150"
                                  src={place.photo}
                                />
                                <CardContent>
                                  <Text
                                    weight={700}
                                    style={{ color: Colors.BLUE }}
                                    component="h4"
                                  >
                                    {place.name}
                                  </Text>

                                  <Rating
                                    initialRating={place.rating}
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

                                  <IconText
                                    style={{ marginTop: "10px" }}
                                    icon={faMapMarkerAlt}
                                    text={
                                      place.location.formattedAddress
                                        ? place.location.formattedAddress.join(", ")
                                        : "No address"
                                    }
                                  />
                                </CardContent>
                              </Link>
                            </CardActionArea>
                          </Card>
                        </div>
                      ))}
                    </Slider>
                  </Grid>
                ))}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
