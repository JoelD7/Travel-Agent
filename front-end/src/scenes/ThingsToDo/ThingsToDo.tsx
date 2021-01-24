import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createMuiTheme,
  FormControl,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Select,
  Theme,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import {
  CustomButton,
  IconText,
  Navbar,
  ParentCategoryToolbar,
  POICategorySlider,
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
  POICategorySearch,
} from "../../utils/POICategory";
import { Font } from "../../assets";
import Slider from "react-slick";
import {
  activitiesPlaceholder,
  POICategory,
  poisPlaceholder,
  Routes,
  currencyFormatter,
  getPOICategoryParent,
  poisPlaceholderAPI,
} from "../../utils";
import {
  faMapMarkerAlt,
  faCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import Axios from "axios";
import { differenceInHours } from "date-fns";
import Helmet from "react-helmet";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import "./thingsTodo.css";

type SortOption = "" | "Name | A - Z" | "Name | Z - A";

interface POICard {
  poi: POISearch;
  slider?: boolean;
}

interface POICategoryAvailable {
  name: string;
  parent?: string;
  icon: IconDefinition;
  id: string;
  image: string;
  pluralName: string;
  available: boolean;
}

export function ThingsToDo() {
  const style = thingsToDoStyles();

  const [pois, setPois] = useState<POISearch[]>(poisPlaceholderAPI);
  const [allPois, setAllPois] = useState<POISearch[]>(poisPlaceholderAPI);

  /**
   * ID used by an <a> to scroll to
   * this title, once the Tours category
   * is selected.
   */
  const toursTitleID = "tours-activities";
  const toursTitleAnchorEl = useRef(null);

  const poiCardStyels = makeStyles((theme: Theme) => ({
    poiCardItem: {
      width: getPOICardWidth(3),
      [theme.breakpoints.down(1126)]: {
        width: getPOICardWidth(2),
      },
      [theme.breakpoints.down(796)]: {
        width: "100%",
      },
    },
  }));
  const cardStyle = poiCardStyels();

  const initialCategory = POICategory.Museum;
  const [selectedCategory, setSelectedCategory] = useState<POICategorySearch>(
    initialCategory
  );

  const history = useHistory();

  const [poiSliderRows, setPoiSliderRows] = useState(2);

  const poiSliderSettings = {
    className: `${style.poiSlider} center`,
    nextArrow: <SliderArrow iconSize="2x" direction="right" />,
    prevArrow: <SliderArrow iconSize="2x" direction="left" />,
    slidesToShow: 1,
    rows: pois.length > 3 ? poiSliderRows : 1,
    slidesPerRow: pois.length > 3 ? 3 : 1,
    responsive: [
      {
        breakpoint: 1126,
        settings: {
          slidesPerRow: pois.length > 3 ? 2 : 1,
        },
      },
      {
        breakpoint: 796,
        settings: {
          slidesPerRow: 1,
        },
      },
    ],
  };

  const activities: Activity[] = activitiesPlaceholder;
  const [rates, setRates] = useState<ExchangeRate>(
    JSON.parse(String(localStorage.getItem("rates")))
  );

  const [sortOption, setSortOption] = useState<SortOption>("");
  const sortOptions: SortOption[] = ["Name | A - Z", "Name | Z - A"];

  const [availableCategories, setAvailableCategories] = useState<POICategorySearch[]>([]);

  useEffect(() => {
    if (!areRatesUpdated()) {
      getExchangeRates();
    }
    getAvailableCategories();
    setPois(poisPlaceholderAPI);
    // getPOIs();
  }, []);

  function getAvailableCategories() {
    let availableCatsFromPois: any[] = [];
    let availableCategoriesTemp: any[] = [];

    allPois.forEach((poi) => {
      let name = getPOICategoryParent(poi.categories[0].id);
      if (!availableCatsFromPois.includes(name)) {
        availableCatsFromPois.push(name);
      }
    });

    POICategories.forEach((poiCategory) => {
      let name = getPOICategoryParent(poiCategory.id);
      if (availableCatsFromPois.includes(name)) {
        availableCategoriesTemp.push(poiCategory);
      }
    });
    setAvailableCategories(availableCategoriesTemp);
  }

  useEffect(() => {
    if (selectedCategory === POICategory.TOUR) {
      //@ts-ignore
      toursTitleAnchorEl.current.click();
    }
  }, [selectedCategory]);

  function getPOIs() {
    Axios.get("https://api.foursquare.com/v2/venues/search", {
      params: {
        ll: "25.2048, 55.2708",
        categoryId:
          "4deefb944765f83613cdba6e,4bf58dd8d48988d17f941735,4bf58dd8d48988d181941735,4bf58dd8d48988d1e5931735,4bf58dd8d48988d137941735,4bf58dd8d48988d184941735,4bf58dd8d48988d182941735,4bf58dd8d48988d17b941735,4bf58dd8d48988d116941735,4bf58dd8d48988d11f941735,4bf58dd8d48988d175941735,4bf58dd8d48988d1e2941735,52e81612bcbc57f1066b7a21,4bf58dd8d48988d1e9941735,4bf58dd8d48988d103951735,4bf58dd8d48988d1fd941735",
        client_id: "D2KZP5LQRWPEFKPA0PQLOIC3Z0CYDGYGR3UVIP4DOF2T0FWZ",
        client_secret: "HLUNYVTHZS2DB4THW2ZV0AFRIPG2HQNMM3V44NBOIMZX1C32",
        v: "20210104",
      },
    })
      .then((res) => {
        setPois(res.data.response.venues);
        setAllPois(res.data.response.venues);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  function getPOICategoryIcon(poi: POISearch): IconDefinition {
    if (POICategoryMap[poi.categories[0].name]) {
      return POICategoryMap[poi.categories[0].name].icon;
    } else if (!getPOICategoryParent(poi.categories[0].id)) {
      return faCircle;
    }
    return POICategoryMap[getPOICategoryParent(poi.categories[0].id)].icon;
  }

  function onCategorySelected(category: POICategorySearch) {
    seeLessPOIs();
    setSelectedCategory(category);
    let filteredPois: POISearch[] = getPoisOfCategory(category);
    setPois(filteredPois);
  }

  function getPoisOfCategory(category: POICategorySearch): POISearch[] {
    return allPois.filter(
      (poi) =>
        getPOICategoryParent(poi.categories[0].id) === getPOICategoryParent(category.id)
    );
  }

  function getPOICardWidth(cardsInRow: number) {
    switch (cardsInRow) {
      case 2:
        return pois.length < 2 ? `${100 / pois.length}%` : "50%";
      case 3:
        return pois.length < 3 ? `${100 / pois.length}%` : "31%";
      default:
        return;
    }
  }

  function POICard({ poi }: POICard) {
    return (
      <Card className={style.poiCard}>
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

          {/* POI Rating */}
          {poi.rating && (
            <Rating
              className={style.rating}
              initialRating={poi.rating}
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
          )}

          <IconText
            icon={faMapMarkerAlt}
            text={
              poi.location.address
                ? poi.location.address
                : poi.location.formattedAddress?.join(", ")
            }
          />
          <IconText icon={getPOICategoryIcon(poi)} text={poi.categories[0].name} />

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
    );
  }

  function seeMorePOIs() {
    setPoiSliderRows(4);
  }

  function seeLessPOIs() {
    setPoiSliderRows(2);
  }

  function onSortOptionChange(option: SortOption) {
    setSortOption(option);
    let sortedPois: POISearch[] = [];

    if (option === "Name | A - Z") {
      sortedPois = pois.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedPois = pois.sort((a, b) => b.name.localeCompare(a.name));
    }
    setPois(sortedPois);
  }

  return (
    <div className={style.mainContainer}>
      <a ref={toursTitleAnchorEl} href={`#${toursTitleID}`} hidden></a>

      <Helmet>
        <title>Things to do in Dubai</title>
      </Helmet>

      <Navbar />

      {/* Page Title Container */}
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

        {/* Parent categories of POIs */}
        <ParentCategoryToolbar
          itemsToShow={3}
          updateSelectedCategory={(category: any) => onCategorySelected(category)}
        />
      </Grid>

      {/* Page content */}
      <div className={style.pageContentContainer}>
        <Text component="h2" bold>
          Browse by category
        </Text>

        {/* Category Cards */}
        <POICategorySlider
          availableCategories={availableCategories}
          selectedCategory={selectedCategory}
          onCategorySelected={onCategorySelected}
        />

        {selectedCategory.pluralName !== POICategory.TOURS && (
          <>
            {/* POI cards header and sort */}
            <Grid container alignContent="flex-end" style={{ marginTop: "20px" }}>
              <Text component="h2" bold>{`${selectedCategory.pluralName} in Dubai`}</Text>

              {poiSliderRows === 2 ? (
                <CustomButton
                  iconColor="#7e7e7e"
                  backgroundColor="rgba(0,0,0,0)"
                  textColor="#7e7e7e"
                  onClick={() => seeMorePOIs()}
                >
                  See More
                </CustomButton>
              ) : (
                <CustomButton
                  iconColor="#7e7e7e"
                  backgroundColor="rgba(0,0,0,0)"
                  textColor="#7e7e7e"
                  onClick={() => seeLessPOIs()}
                >
                  See Less
                </CustomButton>
              )}

              {/* Sort selector */}
              <Grid item className={style.sortGrid}>
                <Grid container>
                  <Text
                    bold
                    style={{ alignSelf: "end", marginBottom: "5px" }}
                    color={Colors.BLUE}
                  >
                    Sort by
                  </Text>

                  <FormControl className={style.selectControl}>
                    <Select
                      value={sortOption}
                      variant="outlined"
                      className={style.select}
                      onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
                    >
                      {sortOptions.map((option, i) => (
                        <MenuItem
                          classes={{ root: style.menuItemSelect }}
                          key={i}
                          value={option}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* POIs cards */}
            {pois.length > 0 && (
              <Grid key="pois cards" container className={style.poiCardGrid}>
                {pois.length > 3 ? (
                  <Slider {...poiSliderSettings} dots>
                    {pois.map((poi, i) => (
                      <div key={i} style={{ height: "100%" }}>
                        <POICard key={i} slider poi={poi} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <Grid container className={style.poiCardContainer}>
                    {pois.map((poi, i) => (
                      <Grid item className={cardStyle.poiCardItem}>
                        <POICard key={i} poi={poi} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            )}
          </>
        )}

        {/* Tours cards */}
        <>
          <Text
            id={toursTitleID}
            component="h2"
            bold
            style={{ marginTop: "20px" }}
          >{`Tours and activites in Dubai`}</Text>
          <Grid key="tours cards" container>
            {activities.slice(0, 6).map((activity, i) => (
              <Card key={i} className={style.activityCard}>
                <CardActionArea onClick={() => goToBookingLink(activity.bookingLink)}>
                  <CardMedia component="img" image={activity.pictures[0]} height="200" />
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
      </div>
    </div>
  );
}
