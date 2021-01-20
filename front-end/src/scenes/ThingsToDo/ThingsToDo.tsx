import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createMuiTheme,
  Grid,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import React, { MouseEvent, useEffect, useState } from "react";
import {
  CustomButton,
  IconText,
  Navbar,
  ParentCategoryToolbar,
  ServicesToolbar,
  SliderArrow,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import { thingsToDoStyles as thingsToDoStyles } from "./thingsToDo-styles";
import {
  POICategories,
  POICategoryMap,
  POICategoryParent,
} from "../../utils/POICategory";
import { Font } from "../../assets";
import Slider from "react-slick";
import {
  activitiesPlaceholder,
  POICategory,
  poisPlaceholder,
  Routes,
  currencyFormatter,
} from "../../utils";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import Axios from "axios";
import { differenceInHours } from "date-fns";
import Helmet from "react-helmet";

export function ThingsToDo() {
  const style = thingsToDoStyles();

  const sliderSettings = {
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

  const initialCategory = POICategory.Museum.pluralName;
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const history = useHistory();

  const pois: POISearch[] = poisPlaceholder;

  const activities: Activity[] = activitiesPlaceholder;
  const [rates, setRates] = useState<ExchangeRate>(
    JSON.parse(String(localStorage.getItem("rates")))
  );

  const [titleBackground, setTitleBackground] = useState<string>("");

  useEffect(() => {
    if (!areRatesUpdated()) {
      getExchangeRates();
    }
  }, []);

  function areRatesUpdated() {
    if (rates === null) {
      return false;
    }
    return differenceInHours(Date.now(), rates.lastUpdated) < 24;
  }

  function getExchangeRates() {
    Axios.get("https://openexchangerates.org/api/latest.json", {
      params: {
        app_id: process.env.REACT_APP_CURRENCY_API_KEY,
        base: "USD",
      },
    })
      .then((res) => {
        let newExchangeRates = { ...res.data, lastUpdated: Date.now() };
        setRates(newExchangeRates);
        localStorage.setItem("rates", JSON.stringify(newExchangeRates));
      })
      .catch((er) => {
        console.log(`Error: ${er}`);
      });
  }

  function goToBookingLink(href: string) {
    Object.assign(document.createElement("a"), {
      target: "_blank",
      href: href,
    }).click();
  }

  function convertCurrency(currency: string, amount: string) {
    if (rates) {
      let value = Number(amount);
      return currencyFormatter((1 / Number(rates.rates[currency])) * value);
    } else {
      return amount;
    }
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Things to do in Dubai</title>
      </Helmet>

      <Navbar />

      <Grid
        container
        className={style.pageTitleContainer}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Travel-Agent/dubai.jpg")`,
        }}
      >
        {/* Services toolbar and title */}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <ServicesToolbar style={{ boxShadow: Shadow.MEDIUM }} />
            </Grid>

            <Grid item xs={10} style={{ margin: "0px auto" }}>
              <Text bold component="hm" color="white">
                Things to in Dubai
              </Text>
            </Grid>
          </Grid>
        </Grid>

        {/* Parent ategories of POIs */}
        <ParentCategoryToolbar
          itemsToShow={3}
          updateSelectedCategory={(category: any) => setSelectedCategory(category)}
        />
      </Grid>

      {/* Page content */}
      <div className={style.pageContentContainer}>
        <Text component="h2" bold>
          Browse by category
        </Text>

        {/* Category Cards */}
        <Slider {...sliderSettings}>
          {POICategories.map((category, i) => (
            <div key={i}>
              <Card
                className={
                  selectedCategory === category.pluralName
                    ? style.cardSelected
                    : style.card
                }
              >
                <CardActionArea onClick={() => setSelectedCategory(category.pluralName)}>
                  <CardMedia component="img" height="150" image={category.image} />
                </CardActionArea>

                <CardContent>
                  <div style={{ color: "white", fontWeight: "bold" }}>
                    {category.name}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>

        {selectedCategory !== POICategory.TOURS && (
          <>
            <Text
              component="h2"
              bold
              style={{ marginTop: "20px" }}
            >{`${selectedCategory} in Dubai`}</Text>

            {/* POIs cards */}
            <Grid key="pois cards" container>
              {pois.slice(0, 6).map((poi, i) => (
                <Card key={i} className={style.poiCard}>
                  <CardActionArea
                    style={{ padding: "10px" }}
                    onClick={() => history.push(`${Routes.THINGS_TODO}/${poi.id}`)}
                  >
                    <Text
                      bold
                      style={{
                        color: Colors.BLUE,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      component="h4"
                    >
                      {poi.name}
                    </Text>
                    <IconText
                      icon={faMapMarkerAlt}
                      text={
                        poi.location.address
                          ? poi.location.address
                          : poi.location.formattedAddress?.join(", ")
                      }
                    />
                    <IconText
                      icon={POICategoryMap[poi.categories[0].name].icon}
                      text={poi.categories[0].name}
                    />

                    <div style={{ display: "flex" }}>
                      <CustomButton
                        onClick={() => history.push(`${Routes.THINGS_TODO}/${poi.id}`)}
                        backgroundColor={Colors.PURPLE}
                        style={{
                          borderRadius: "10px",
                          fontSize: "16px",
                          marginLeft: "auto",
                        }}
                      >
                        Check out
                      </CustomButton>
                    </div>
                  </CardActionArea>
                </Card>
              ))}
            </Grid>
          </>
        )}

        {/* Tours cards */}
        {(selectedCategory === initialCategory ||
          selectedCategory === POICategory.TOURS) && (
          <>
            <Text
              component="h2"
              bold
              style={{ marginTop: "20px" }}
            >{`Tours and activites in Dubai`}</Text>
            <Grid key="tours cards" container>
              {activities.slice(0, 6).map((activity, i) => (
                <Card key={i} className={style.activityCard}>
                  <CardActionArea onClick={() => goToBookingLink(activity.bookingLink)}>
                    <CardMedia
                      component="img"
                      image={activity.pictures[0]}
                      height="200"
                    />
                  </CardActionArea>

                  <CardContent>
                    <Text
                      component="h5"
                      bold
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "52px",
                        marginTop: "0px",
                      }}
                    >
                      {activity.name}
                    </Text>
                    <Ratings
                      rating={Number(activity.rating)}
                      widgetRatedColors={Colors.PURPLE}
                      widgetHoverColors={Colors.PURPLE}
                      widgetDimensions="25px"
                      widgetSpacings="4px"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Ratings.Widget key={n} />
                      ))}
                    </Ratings>

                    <p>{`${convertCurrency(
                      activity.price.currencyCode,
                      activity.price.amount
                    )}`}</p>
                    <CustomButton
                      rounded
                      style={{ fontSize: "16px", marginTop: "auto" }}
                      onClick={() => goToBookingLink(activity.bookingLink)}
                    >
                      Check out
                    </CustomButton>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}
