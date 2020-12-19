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
  ServicesToolbar,
  SliderArrow,
  Title,
} from "../../components";
import { Colors } from "../../styles";
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

export function ThingsToDo() {
  const style = thingsToDoStyles();
  const theme = createMuiTheme({
    overrides: {
      MuiListItem: {
        root: {
          borderBottom: `2px solid rgba(0,0,0,0)`,
          "&.Mui-selected": {
            backgroundColor: "rgba(0,0,0,0)",
            borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
          },
        },

        button: {
          "&:hover": {
            borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
          },
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
        },
      },
    },
  });

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToShow: 4,
    slidesToScroll: 4,
    // responsive: [
    //   {
    //     breakpoint: 990,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       infinite: true,
    //     },
    //   },
    //   {
    //     breakpoint: 740,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: true,
    //     },
    //   },
    // ],
  };

  const parentCategories = [
    POICategoryParent.ArtsEntertainment,
    POICategoryParent.Nightlife,
    POICategoryParent.OutdoorsRec,
    POICategoryParent.ShopService,
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState(false);

  const initialCategory = POICategory.Museum.pluralName;
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const onMenuOpen = (event: MouseEvent<HTMLElement>) => {
    if (event.currentTarget !== anchorEl) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  const history = useHistory();

  const pois: POISearch[] = poisPlaceholder;

  const activities: Activity[] = activitiesPlaceholder;
  const [rates, setRates] = useState<ExchangeRate>({ rates: {} });

  useEffect(() => {
    // getExchangeRates();
  }, []);

  function getExchangeRates() {
    Axios.get("https://openexchangerates.org/api/latest.json", {
      params: {
        app_id: process.env.REACT_APP_CURRENCY_API_KEY,
        base: "USD",
      },
    })
      .then((res) => {
        setRates(res.data.rates);
        console.log(`Currencies: `, res.data);
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
      return currencyFormatter((1 / Number(rates[currency])) * value);
    } else {
      return amount;
    }
  }

  return (
    <div className={style.mainContainer}>
      <Navbar />
      <ServicesToolbar />

      <Title style={{ textAlign: "center" }} component="h1">
        Things to in Dubai
      </Title>

      <ThemeProvider key="categories parent menu" theme={theme}>
        <Toolbar className={style.parentCategoryBar}>
          {parentCategories.map((parentCategory, i) => (
            <MenuItem
              id={parentCategory}
              onClick={onMenuOpen}
              classes={{ root: style.menuItemRoot }}
              key={i}
            >
              {parentCategory}
            </MenuItem>
          ))}
          <MenuItem
            id={"Tours & activities"}
            onClick={() => setSelectedCategory(POICategory.TOURS)}
            classes={{ root: style.menuItemRoot }}
          >
            Tours & activities
          </MenuItem>
        </Toolbar>

        <Menu
          open={open}
          onClose={() => {
            setOpen(false);
            setAnchorEl(null);
          }}
          anchorEl={anchorEl}
        >
          {POICategories.filter((category) => category.parent === anchorEl?.id).map(
            (category, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  setOpen(false);
                  setSelectedCategory(category.name);
                  setAnchorEl(null);
                }}
              >
                {category.name}
              </MenuItem>
            )
          )}
        </Menu>
      </ThemeProvider>

      <div style={{backgroundColor: Colors.BACKGROUND}}>
        <div className={style.pageContentContainer}>
          <Title component="h2">Browse by category</Title>
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
                  <CardActionArea
                    onClick={() => setSelectedCategory(category.pluralName)}
                  >
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
              <Title component="h2">{`${selectedCategory} in Dubai`}</Title>

              <Grid key="pois cards" container>
                {pois.slice(0, 6).map((poi, i) => (
                  <Card key={i} className={style.poiCard}>
                    <CardActionArea
                      onClick={() => history.push(`${Routes.THINGS_TODO}/${poi.id}`)}
                    >
                      <Title
                        style={{
                          color: Colors.BLUE,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        component="h3"
                      >
                        {poi.name}
                      </Title>
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
                          label="Check out"
                          onClick={() => history.push(`${Routes.THINGS_TODO}/${poi.id}`)}
                          backgroundColor={Colors.PURPLE}
                          style={{ borderRadius: "10px", marginLeft: "auto" }}
                        />
                      </div>
                    </CardActionArea>
                  </Card>
                ))}
              </Grid>
            </>
          )}

          {(selectedCategory === initialCategory ||
            selectedCategory === POICategory.TOURS) && (
            <>
              {" "}
              <Title component="h2">{`Tours and activites in Dubai`}</Title>
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
                      <Title
                        component="h4"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: "52px",
                          maxHeight: "52px",
                          marginTop: "0px",
                        }}
                      >
                        {activity.name}
                      </Title>
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
                        label="Check out"
                        rounded
                        style={{ fontSize: "16px" }}
                        onClick={() => goToBookingLink(activity.bookingLink)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
