import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import {
  CustomButton,
  IconText,
  Navbar,
  ParentCategoryToolbar,
  POICategorySlider,
  ServicesToolbar,
  SliderArrow,
  POICard,
  Text,
  ProgressCircle,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import { thingsToDoStyles as thingsToDoStyles } from "./thingsToDo-styles";
import {
  POICategories,
  POICategoryFetch,
  POICategoryMap,
  POICategorySearch,
} from "../../utils/POICategory";
import { Font } from "../../assets";
import Slider from "react-slick";
import {
  activitiesPlaceholder,
  POICategory,
  currencyFormatter,
  getPOICategoryParent,
  poisPlaceholderAPI,
  selectPOIs,
  selectAllPOIs,
  selectLoadingPOICard,
  selectLoadingCategories,
  selectAvailableCategories,
  setAvailableCategories,
  getPOIs,
  useAppDispatch,
  selectConsultedCategories,
  selectConsultedCoordinates,
  poisPlaceholder,
} from "../../utils";
import { faCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import Axios from "axios";
import { differenceInHours } from "date-fns";
import Helmet from "react-helmet";
import "./thingsTodo.css";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
  getPOIsOfCategory,
  onLoadingPOICardChange,
  setPOIs,
  addPOIsByCategoryGroup,
} from "../../utils/store/poi-slice";

type SortOption = "" | "Name | A - Z" | "Name | Z - A";

export function ThingsToDo() {
  const style = thingsToDoStyles();

  // const [pois, setPois] = useState<POISearch[]>([]);
  // const [allPois, setAllPois] = useState<POISearch[]>([]);

  const pois = useSelector(selectPOIs);
  const allPois = useSelector(selectAllPOIs);

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

  /**
   * This serves the purpose of not having selectedCategory undefined
   * on the first render.
   * If I iniatilize selectedCategory to one of the
   * categories it'll be more complicated to handle the behaviour of the
   * program before the user has selected any.
   */
  const categoryPlaceholder: POICategorySearch = {
    name: "categoryPlaceholder",
    icon: faCircle,
    id: "",
    image: "",
    pluralName: "",
  };
  const [selectedCategory, setSelectedCategory] = useState<POICategorySearch>(
    categoryPlaceholder
  );

  const [poiSliderRows, setPoiSliderRows] = useState(2);

  const loadingPOICard = useSelector(selectLoadingPOICard);
  const loadingCategories = useSelector(selectLoadingCategories);
  // const [loadingPOICard, setLoadingPOICard] = useState(true);
  // const [loadingCategories, setLoadingCategories] = useState(true);

  const consultedCategories = useSelector(selectConsultedCategories);
  const consultedCoordinates = useSelector(selectConsultedCoordinates);

  const poiSliderSettings = {
    className: style.poiSlider,
    nextArrow: <SliderArrow iconSize="2x" direction="right" />,
    prevArrow: <SliderArrow iconSize="2x" direction="left" />,
    infinite: false,
    slidesToShow: 1,
    rows: pois.length > 3 ? poiSliderRows : 1,
    slidesPerRow: pois.length > 3 ? 3 : 1,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesPerRow: pois.length > 3 ? 2 : 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesPerRow: 1,
        },
      },
    ],
  };

  const poiSliderSettingsPlaceholder = {
    className: style.poiSliderPlaceholder,
    nextArrow: <SliderArrow iconSize="2x" direction="right" />,
    prevArrow: <SliderArrow iconSize="2x" direction="left" />,
    slidesToShow: 1,
    rows: 2,
    slidesPerRow: 3,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesPerRow: poisPlaceholderAPI.length > 3 ? 2 : 1,
        },
      },
      {
        breakpoint: 800,
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

  const dispatch = useAppDispatch();

  const [sortOption, setSortOption] = useState<SortOption>("");
  const sortOptions: SortOption[] = ["Name | A - Z", "Name | Z - A"];

  const availableCategories: POICategorySearch[] = useSelector(selectAvailableCategories);

  useEffect(() => {
    if (!areRatesUpdated()) {
      getExchangeRates();
    }

    if (JSON.stringify(allPois) === JSON.stringify(poisPlaceholder)) {
      dispatch(getPOIs("51.5074, 0.1278")).then((res) => {
        let pois: POISearch[] = res.payload.response.venues;
        dispatch(setAvailableCategories(pois));
      });
    } else {
      dispatch(setPOIs(allPois));
    }
  }, []);

  useEffect(() => {
    goToToursTitle();
  }, [selectedCategory]);

  /**
   * Clicks on the anchor element with a ref to
   * the Tours title so that the screen scrolls
   * down to it.
   */
  function goToToursTitle() {
    if (selectedCategory === POICategory.TOUR) {
      //@ts-ignore
      toursTitleAnchorEl.current.click();
    }
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

  function onCategorySelected(category: POICategorySearch) {
    dispatch(onLoadingPOICardChange(true));
    seeLessPOIs();

    //Unselect category and show all pois
    if (category.name === selectedCategory.name) {
      setSelectedCategory(categoryPlaceholder);
      dispatch(setPOIs(allPois));
    } else {
      let params: POICategoryFetch = { category, ll: "51.5074, 0.1278" };
      setSelectedCategory(category);

      dispatch(getPOIsOfCategory(params)).then((res) => {
        if (!arePOIsOfCategoryCached(params)) {
          let categoryParent: string = getPOICategoryParent(category.id);

          dispatch(
            addPOIsByCategoryGroup({
              category: categoryParent,
              ll: "51.5074, 0.1278",
              pois: res.payload as POISearch[],
            })
          );
        }
      });
    }
  }

  function arePOIsOfCategoryCached(params: POICategoryFetch) {
    let categoryParent: string = getPOICategoryParent(params.category.id);

    return (
      consultedCategories.includes(categoryParent) &&
      consultedCoordinates.includes(params.ll)
    );
  }

  function getPoisOfCategory(category: POICategorySearch) {
    Axios.get("https://api.foursquare.com/v2/venues/search", {
      params: {
        ll: "51.5074, 0.1278",
        categoryId: `${category.id}`,
        client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
        client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
        v: "20210104",
        radius: "100000",
      },
    })
      .then((res) => {
        // setLoadingPOICard(false);
        let pois: POISearch[] = res.data.response.venues;
        // setPois(pois);
      })
      .catch((error) => {
        console.log(error);
      });
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
      sortedPois = pois.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else {
      sortedPois = pois.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }
    // setPois(sortedPois);
  }

  return (
    <div className={style.mainContainer}>
      <a ref={toursTitleAnchorEl} href={`#${toursTitleID}`} hidden></a>

      <Helmet>
        <title>Things to do in London</title>
      </Helmet>

      <Navbar />

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Travel-Agent/dubai.jpg")`,
        }}
        className={style.background}
      ></div>
      {/* Page Title Container */}
      <Grid container className={style.pageTitleContainer}>
        {/* Services toolbar and title */}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <ServicesToolbar style={{ boxShadow: Shadow.MEDIUM }} />
            </Grid>

            <Grid item xs={10} className={style.pageTitleTextGrid}>
              <Text style={{ position: "relative" }} bold component="hm" color="white">
                Things to in London
              </Text>
            </Grid>
          </Grid>
        </Grid>

        {/* Parent categories of POIs */}
        <Grid container style={{ alignSelf: "flex-end" }}>
          <ParentCategoryToolbar
            itemsToShow={3}
            updateSelectedCategory={(category: any) => onCategorySelected(category)}
          />
        </Grid>
      </Grid>

      {/* Page content */}
      <div className={style.pageContentContainer}>
        <Text component="h2" bold color="white">
          Browse by category
        </Text>

        {/* Category Cards */}
        <POICategorySlider
          availableCategories={availableCategories}
          selectedCategory={selectedCategory}
          loading={loadingCategories}
          onCategorySelected={onCategorySelected}
        />

        <>
          {/* POI cards header and sort */}
          <Grid container alignContent="flex-end" style={{ marginTop: "20px" }}>
            <Text component="h2" bold>{`${
              selectedCategory.name === categoryPlaceholder.name
                ? "Places to go"
                : selectedCategory.pluralName
            } in London`}</Text>

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
          <Grid key="pois cards" container className={style.poiCardGrid}>
            {loadingPOICard ? (
              <>
                <ProgressCircle />
                <Slider {...poiSliderSettingsPlaceholder} dots>
                  {poisPlaceholderAPI.map((poi) => (
                    <div key={poi.id} style={{ height: "100%" }}>
                      <POICard poi={poi} />
                    </div>
                  ))}
                </Slider>
              </>
            ) : (
              <Grid container>
                {pois.length > 3 ? (
                  <Slider lazyLoad="ondemand" {...poiSliderSettings} dots>
                    {pois.map((poi: any) => (
                      <div key={poi.id} style={{ height: "100%" }}>
                        <POICard poi={poi} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <Grid container className={style.poiCardContainer}>
                    {pois.map((poi: any) => (
                      <Grid key={poi.id} item className={cardStyle.poiCardItem}>
                        <POICard poi={poi} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </>

        {/* Tours cards */}
        <>
          <Text
            id={toursTitleID}
            component="h2"
            bold
            className={style.toursTitle}
          >{`Tours and activites in London`}</Text>

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
