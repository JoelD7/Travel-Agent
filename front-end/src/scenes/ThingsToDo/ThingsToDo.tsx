import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  CustomButton,
  Footer,
  Navbar,
  ParentCategoryToolbar,
  POICard,
  POICategorySlider,
  ProgressCircle,
  ServicesToolbar,
  SliderArrow,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  fetchPOIs,
  getPOICategoryParent,
  POICategory,
  poisPlaceholder,
  selectAllPOIs,
  selectConsultedCategories,
  selectConsultedCoordinates,
  selectDestinationCity,
  selectLoadingPOICard,
  selectPOIs,
  selectPOIsByCategory,
  useAppDispatch,
} from "../../utils";
import { POICategoryFetch, POICategorySearch } from "../../utils/POICategory";
import {
  addPOIsByCategoryGroup,
  fetchPOIsOfCategory,
  onLoadingPOICardChange,
  setPOIs,
} from "../../utils/store/poi-slice";
import { IATALocation } from "../../utils/types/location-types";
import { thingsToDoStyles as thingsToDoStyles } from "./thingsToDo-styles";
import "./thingsTodo.css";

type SortOption = "" | "Name | A - Z" | "Name | Z - A";

export function ThingsToDo() {
  const style = thingsToDoStyles();

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
  const [selectedCategory, setSelectedCategory] =
    useState<POICategorySearch>(categoryPlaceholder);

  const [poiSliderRows, setPoiSliderRows] = useState(2);

  const loadingPOICard = useSelector(selectLoadingPOICard);

  const consultedCategories = useSelector(selectConsultedCategories);
  const consultedCoordinates = useSelector(selectConsultedCoordinates);

  const poiSliderSettings = {
    className: loadingPOICard ? style.poiSliderLoading : style.poiSlider,
    nextArrow: <SliderArrow iconSize="2x" direction="right" />,
    prevArrow: <SliderArrow iconSize="2x" direction="left" />,
    infinite: false,
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

  const dispatch = useAppDispatch();

  const [sortOption, setSortOption] = useState<SortOption>("");
  const sortOptions: SortOption[] = ["Name | A - Z", "Name | Z - A"];

  const availableCategories: POICategorySearch[] = POICategory.POICategories;
  const poisByCategory = useSelector(selectPOIsByCategory);

  const destinationCity: IATALocation = useSelector(selectDestinationCity);

  useEffect(() => {
    if (JSON.stringify(allPois) === JSON.stringify(poisPlaceholder)) {
      dispatch(fetchPOIs(`${destinationCity.lat}, ${destinationCity.lon}`));
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

  function onCategorySelected(category: POICategorySearch) {
    dispatch(onLoadingPOICardChange(true));

    //Unselect category and show all pois
    if (category.name === selectedCategory.name) {
      setSelectedCategory(categoryPlaceholder);
      dispatch(setPOIs(allPois));
    } else {
      setSelectedCategory(category);

      let params: POICategoryFetch = {
        category,
        categoryParent: "",
        ll: `${destinationCity.lat}, ${destinationCity.lon}`,
        cached: false,
      };

      let categoryParent: string = getPOICategoryParent(category.id);

      let cached: boolean = arePOIsOfCategoryCached(
        `${destinationCity.lat}, ${destinationCity.lon}`,
        categoryParent
      );
      params = { ...params, cached, categoryParent };

      if (cached) {
        let filteredPois: POISearch[] = poisByCategory[categoryParent][params.ll];
        dispatch(setPOIs(filteredPois));
      } else {
        dispatch(fetchPOIsOfCategory(params)).then((res) => {
          dispatch(
            addPOIsByCategoryGroup({
              category: categoryParent,
              ll: `${destinationCity.lat}, ${destinationCity.lon}`,
              pois: res.payload as POISearch[],
            })
          );
        });
      }
    }
  }

  function arePOIsOfCategoryCached(ll: string, categoryParent: string) {
    return (
      consultedCategories.includes(categoryParent) && consultedCoordinates.includes(ll)
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

  function seeMorePOIs() {
    setPoiSliderRows(4);
  }

  function seeLessPOIs() {
    setPoiSliderRows(2);
  }

  function onSortOptionChange(option: SortOption) {
    setSortOption(option);
    let sortedPois: POISearch[] = [...pois];

    if (option === "Name | A - Z") {
      sortedPois = sortedPois.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else {
      sortedPois = sortedPois.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }
    dispatch(setPOIs(sortedPois));
  }

  function getPOICardGridClass() {
    return loadingPOICard
      ? poiSliderRows === 4
        ? style.poiCardGridLoadingMore
        : style.poiCardGridLoading
      : style.poiCardGrid;
  }

  return (
    <div className={style.mainContainer}>
      <a ref={toursTitleAnchorEl} href={`#${toursTitleID}`} hidden></a>

      <Helmet>
        <title>{`Things to do in ${destinationCity.city}`}</title>
      </Helmet>

      {/* Page Title Container */}
      <Grid container className={style.pageTitleContainer}>
        <img
          src="/Travel-Agent/thingsToDo.jpg"
          className={style.backgroundImage}
          alt=""
        />

        <Grid container style={{ zIndex: 1, width: "100%" }}>
          {/* Services toolbar and title */}
          <Grid item xs={12}>
            <Navbar variant="transparent" />

            <Grid container>
              <Grid item xs={12}>
                <ServicesToolbar transparent />
              </Grid>

              <Grid item xs={10} className={style.pageTitleTextGrid}>
                <Text style={{ position: "relative" }} bold component="hm" color="white">
                  {`Things to do in ${destinationCity.city}`}
                </Text>
              </Grid>
            </Grid>
          </Grid>

          {/* Parent categories of POIs */}
          <Grid container style={{ alignSelf: "flex-end" }}>
            <ParentCategoryToolbar
              itemsToShow={3}
              selectedCategory={selectedCategory}
              updateSelectedCategory={(category: any) => {
                onCategorySelected(category);
              }}
            />
          </Grid>
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
          onCategorySelected={onCategorySelected}
        />

        <>
          {/* POI cards header and sort */}
          <Grid container alignContent="flex-end" style={{ marginTop: "20px" }}>
            <Text component="h2" bold color={Colors.BLUE}>{`${
              selectedCategory.name === categoryPlaceholder.name
                ? "Places to go"
                : selectedCategory.pluralName
            } in ${destinationCity.city}`}</Text>

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
                    classes={{ icon: style.selectIcon }}
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
          <Grid container className={getPOICardGridClass()}>
            <Grid container>
              {loadingPOICard && <ProgressCircle />}

              {pois.length > 3 ? (
                <Slider lazyLoad="ondemand" {...poiSliderSettings} dots>
                  {pois.map((poi: POISearch) => (
                    <div key={poi.id} style={{ height: "100%" }}>
                      <POICard poi={poi} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <Grid
                  container
                  className={
                    loadingPOICard
                      ? style.poiCardContainerLoading
                      : style.poiCardContainer
                  }
                >
                  {pois.map((poi: POISearch) => (
                    <Grid key={poi.id} item className={cardStyle.poiCardItem}>
                      <POICard poi={poi} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      </div>

      <Footer />
    </div>
  );
}
