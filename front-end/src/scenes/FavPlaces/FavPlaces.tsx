import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@material-ui/core";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  DashDrawer,
  Footer,
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

  function getResponsiveSlider(places: POISearch[]) {
    return [
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: getSlidesToShow(2, places),
          slidesToScroll: getSlidesToShow(2, places),
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: getSlidesToShow(1, places),
          slidesToScroll: getSlidesToShow(1, places),
        },
      },
    ];
  }

  function getSlidesToShow(def: number, places: POISearch[]) {
    return places.length > def ? def : places.length;
  }

  function getPlacesOfCategory(category: string): POISearch[] {
    return pois.filter((poi) => poi.categories[0].name === category);
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
          <IconText iconStyle={{ padding: "12px" }} shadow size={44} icon={faHeart}>
            <Text component="h1" bold>
              Your favorite spots
            </Text>
          </IconText>

          <div>
            {poiCategories
              .filter((category) => getPlacesOfCategory(category.name).length > 0)
              .map((category, i) => (
                <Grid container style={{ marginTop: "20px" }}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Text bold color={Colors.BLUE} component="h2">
                        {category.pluralName}
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
                    responsive={getResponsiveSlider(getPlacesOfCategory(category.name))}
                    slidesToShow={getSlidesToShow(4, getPlacesOfCategory(category.name))}
                  >
                    {getPlacesOfCategory(category.name).map((place: POISearch, i) => (
                      <div key={i}>
                        <Card className={styles.favCard}>
                          <CardActionArea>
                            <Link style={getLinkStyle()} to="#">
                              <CardMedia component="img" height="150" src={place.photo} />
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
        </Grid>
      </Grid>

      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
