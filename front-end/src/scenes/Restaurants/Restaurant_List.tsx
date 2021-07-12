import { Grid, Grow, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { AnyAction } from "redux";
import { batchActions } from "redux-batched-actions";
import {
  Footer,
  Navbar,
  NotAvailableCard,
  Pagination,
  ProgressCircle,
  RestaurantCard,
  RestaurantFilterDrawer,
  RestaurantFilters,
  RestaurantSlides,
  ServicesToolbar,
  SortPageSize,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  addRestaurantCuisines,
  addRestaurantFeatures,
  convertResFilterParamsToURLParams,
  fetchRestaurants,
  filterByFeature,
  getDistinctCuisines,
  hasAny,
  IATALocation,
  Routes,
  selectDestinationCity,
  selectLoadingRestaurants,
  selectRestaurantCuisines,
  selectRestaurantFeatures,
  selectRestaurantFilterParams,
  selectRestaurants,
  selectTotalRestaurants,
  setAllRestaurants,
  setLoadingRestaurants,
  setRestaurantFilterCuisines,
  setRestaurants,
  setTotalRestaurants,
  updateResCheckedCuisinesFromURL,
  updateRestaurantCheckedFeatures,
} from "../../utils";
import { restaurantListStyles } from "./restaurantList-styles";

interface Restaurant_List {
  city: string;
  establishments: RestaurantFeature[];
  cuisines: RestaurantFeature[];
  features: RestaurantFeature[];
}

export function Restaurant_List() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const query = useQuery();
  let urlParams: { [index: string]: string } = getURLParamsAsKVP();

  const style = restaurantListStyles();

  const currentCity: IATALocation = useSelector(selectDestinationCity);
  const restaurants: RestaurantSearch[] = useSelector(selectRestaurants);
  let defaultCuisines: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);
  let defaultFeatures: RestaurantFeature[] = useSelector(selectRestaurantFeatures);
  const totalRestaurants: number = useSelector(selectTotalRestaurants);
  const cuisines: RestaurantCuisine[] = getCuisines();
  const features: RestaurantFeature[] = getFeatures();

  const [deliveryRestaurants, setDeliveryRestaurants] = useState<RestaurantSearch[]>(
    filterByFeature("delivery", restaurants)
  );
  const [pickupRestaurants, setPickupRestaurants] = useState<RestaurantSearch[]>(
    filterByFeature("pickup", restaurants)
  );
  const [reservationRestaurants, setReservationRestaurants] = useState<
    RestaurantSearch[]
  >(filterByFeature("restaurant_reservation", restaurants));
  const [noRestaurants, setNoRestaurants] = useState(false);
  const [page, setPage] = useState<number>(getPage());
  const [pageSize, setPageSize] = useState<number>(getPageSize());
  const pageSizeOptions = [20, 30, 40];

  const resFilterParams: RestaurantFilterParams = useSelector(
    selectRestaurantFilterParams
  );

  /**
   * Group of actions to be dispatched together in first render, in order
   * to improve performance.
   */
  let batchedActionsOnFirstRender: AnyAction[] = [];

  const loading: boolean = useSelector(selectLoadingRestaurants);

  const topRestaurantAnchorEl = useRef(null);
  const topRestaurantId = "topRestaurantId";

  const firstRender = useRef(true);

  const is430pxOrLess = useMediaQuery("(max-width:430px)");

  /**
   * The returned restaurants by the API.
   *
   * The purpose of this variable is to
   * be able to use the returned restaurants
   * without being held back by the fact that the
   * setting of the state is async.
   */
  let restaurantsRes: RestaurantSearch[] = [];

  useEffect(() => {
    if (!loading) {
      dispatch(setLoadingRestaurants(true));
    }

    if (!isFirstRender()) {
      updateURL();
    }

    loadAllRestaurants();
  }, [currentCity, page, pageSize]);

  useEffect(() => {
    if (!isFirstRender()) {
      // setPage(0); Move this variable to the store so that the cuisine filter
      // can be able to change it when the user selects or deselects cuisines.
    }
  }, [resFilterParams]);

  /**
   * The restaurant slides actually depend only on the
   * currently displayed restaurants.
   *
   * If the displayed restaurants are modified by
   * a filter, this code ensures that the slides are
   * updated.
   */
  useEffect(() => {
    if (page === 0) {
      setRestaurantSlides(restaurants);
    }
  }, [restaurants]);

  function isFirstRender(): boolean {
    return firstRender.current;
  }

  function isURLWithResParams(): boolean {
    return urlParams.hasOwnProperty("cuisines") || urlParams.hasOwnProperty("features");
  }

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  /**
   *
   * @returns The URL parameters as key value pairs in an object with
   * the form: {key: value}.
   */
  function getURLParamsAsKVP(): { [index: string]: string } {
    let kvp: { [index: string]: string } = {};

    for (const pair of Array.from(query.entries())) {
      let key = pair[0];
      let value = pair[1];

      kvp = { ...kvp, [key]: value };
    }
    return kvp;
  }

  function getCuisines(): RestaurantCuisine[] {
    if (!urlParams.hasOwnProperty("cuisines")) {
      return defaultCuisines;
    }

    let cuisinesInURL: string[] = urlParams["cuisines"].split(",");

    let cuisinesToReturn: RestaurantCuisine[] = defaultCuisines.map((cuisine) => {
      if (cuisinesInURL.includes(cuisine.alias)) {
        return { ...cuisine, checked: true };
      } else {
        return { ...cuisine, checked: false };
      }
    });

    return cuisinesToReturn;
  }

  function getFeatures(): RestaurantFeature[] {
    if (!urlParams.hasOwnProperty("features")) {
      return defaultFeatures;
    }

    let featuresInURL: string[] = urlParams["features"].split(",");

    let featuresToReturn: RestaurantFeature[] = defaultFeatures.map((feature) => {
      if (featuresInURL.includes(feature.name)) {
        return { ...feature, checked: true };
      }

      return feature;
    });

    return featuresToReturn;
  }

  /**
   * Fetches restaurants from the APU and sets the variables that depend
   * on the response from it.
   */
  function loadAllRestaurants() {
    updateURL();

    let cuisinesURL: string = "";
    urlParams = getURLParamsAsKVP();

    if (urlParams.hasOwnProperty("cuisines")) {
      cuisinesURL = urlParams["cuisines"];
    }

    fetchRestaurants(
      currentCity.lat,
      currentCity.lon,
      pageSize,
      page * pageSize,
      undefined,
      cuisinesURL
    )
      .then((res) => {
        restaurantsRes = res.data.businesses;

        let resTotal = Number(res.data.total);
        dispatch(setTotalRestaurants(resTotal > 1000 ? 1000 : resTotal));

        setRestaurantsDependencies();

        if (restaurantsRes.length === 0) {
          setNoRestaurants(true);
        } else if (noRestaurants) {
          setNoRestaurants(false);
        }
      })
      .catch((error) => console.log(error));
  }

  function setRestaurantsDependencies() {
    let cuisinesToAdd: RestaurantCuisine[] = getCuisinesFromRestaurantsResponse(
      cuisines,
      restaurantsRes
    );

    let featuresToAdd: RestaurantFeature[] = getFeaturesFromRestaurantResponse(
      features,
      restaurantsRes
    );
    batchedActionsOnFirstRender = [];

    batchedActionsOnFirstRender.push(setAllRestaurants(restaurantsRes));
    batchedActionsOnFirstRender.push(setLoadingRestaurants(false));
    batchedActionsOnFirstRender.push(setRestaurants(restaurantsRes));

    /**
     * Do not dispatch the actions to set cuisines and features
     * if the URL includes such parameters. In that case, the job
     * is done by the url to paremeter converter.
     */
    if (isURLWithResParams()) {
      convertURLParamsToResFilterParams(
        cuisinesToAdd,
        featuresToAdd,
        addRestaurantCuisines(cuisinesToAdd),
        addRestaurantFeatures(featuresToAdd)
      );
    } else {
      batchedActionsOnFirstRender.push(addRestaurantCuisines(cuisinesToAdd));
      batchedActionsOnFirstRender.push(addRestaurantFeatures(featuresToAdd));
    }

    firstRender.current = false;
    dispatch(batchActions(batchedActionsOnFirstRender));
  }

  /**
   * Returns all the cuisines included in the restaurants
   * returned by the API.
   */
  function getCuisinesFromRestaurantsResponse(
    curCuisines: RestaurantCuisine[],
    restaurants: RestaurantSearch[]
  ): RestaurantCuisine[] {
    let cuisinesMerge: any[] = [];

    restaurants.forEach((r) => {
      let cuisinesForRestaurant = r.categories;
      cuisinesMerge = [...cuisinesMerge, ...cuisinesForRestaurant];
    });

    let curCuisinesString = curCuisines.map((cuisine) => cuisine.title);
    let newCuisines: RestaurantCuisine[] = [];

    let cuisinesSet = getDistinctCuisines(cuisinesMerge);

    cuisinesSet.forEach((c) => {
      if (!curCuisinesString.includes(c.title)) {
        newCuisines.push({ title: c.title, alias: c.alias, checked: false });
      }
    });

    return newCuisines;
  }

  /**
   * Returns all the features included in the restaurants
   * returned by the API.
   */
  function getFeaturesFromRestaurantResponse(
    curFeatures: RestaurantFeature[],
    restaurants: RestaurantSearch[]
  ): RestaurantFeature[] {
    let featuresMerge: any[] = [];
    restaurants.forEach((r) => {
      let featuresForRestaurant = r.transactions.filter((e) => e !== "");
      featuresMerge = [...featuresMerge, ...featuresForRestaurant];
    });

    let curFeaturesString = curFeatures.map((ft) => ft.name);
    let newFeatures: RestaurantFeature[] = [];

    let featuresSet = new Set([...featuresMerge]);

    featuresSet.forEach((ft) => {
      if (!curFeaturesString.includes(ft)) {
        newFeatures.push({ name: ft, checked: false });
      }
    });

    return newFeatures;
  }

  function updateURL() {
    let resFilterParamsAsURL: string = convertResFilterParamsToURLParams(resFilterParams);

    if (resFilterParamsAsURL === "") {
      history.push(`${Routes.RESTAURANTS}?page=${page + 1}&pageSize=${pageSize}`);
      return;
    }

    history.push(
      `${Routes.RESTAURANTS}${resFilterParamsAsURL}&page=${page + 1}&pageSize=${pageSize}`
    );

    urlParams = getURLParamsAsKVP();
  }

  function convertURLParamsToResFilterParams(
    cuisines: RestaurantCuisine[],
    features: RestaurantFeature[],
    defaultCuisinesAction: AnyAction,
    defaultFeaturesAction: AnyAction
  ) {
    if (urlParams.hasOwnProperty("cuisines")) {
      let cuisinesURL: string = urlParams["cuisines"];

      batchedActionsOnFirstRender.push(
        updateResCheckedCuisinesFromURL(cuisines, cuisinesURL)
      );

      batchedActionsOnFirstRender.push(
        setRestaurantFilterCuisines(cuisines, cuisinesURL)
      );
    } else {
      batchedActionsOnFirstRender.push(defaultCuisinesAction);
    }

    if (urlParams.hasOwnProperty("features")) {
      let featuresURL: string = urlParams["features"];
      batchedActionsOnFirstRender.push(
        updateRestaurantCheckedFeatures(features, featuresURL)
      );

      filterRestaurantsByFeatures(featuresURL);
    } else {
      batchedActionsOnFirstRender.push(defaultFeaturesAction);
    }
  }

  /**
   * In case that the URL includes the cuisines parameter, this function
   * fetches restaurants from it.
   * @param cuisinesURL
   */
  function fetchRestaurantsByCuisineURL(cuisinesURL: string) {
    fetchRestaurants(currentCity.lat, currentCity.lon, pageSize, page * pageSize)
      .then((res) => {
        let restaurantsRes: RestaurantSearch[] = res.data.businesses;

        dispatch(
          batchActions([setRestaurants(restaurantsRes), setLoadingRestaurants(false)])
        );
      })
      .catch((error) =>
        console.log("Error while fetching restaurants by cuisines | ", error)
      );
  }

  function filterRestaurantsByFeatures(featuresURL: string) {
    let selectedFeatures: string[] = featuresURL.split(",");

    let filteredRestaurants: RestaurantSearch[] = restaurantsRes.filter(
      (restaurant: RestaurantSearch) => {
        let resFeatures: string[] = restaurant.transactions;
        return hasAny(resFeatures, selectedFeatures);
      }
    );
    batchedActionsOnFirstRender.push(setRestaurants(filteredRestaurants));
  }

  function getPage(): number {
    let page = 0;
    if (urlParams.hasOwnProperty("page")) {
      page = Number(urlParams.page) - 1;
    }

    return page;
  }

  function getPageSize(): number {
    let pageSize = 20;
    if (urlParams.hasOwnProperty("pageSize")) {
      pageSize = Number(urlParams.pageSize);
    }

    return pageSize;
  }

  function setRestaurantSlides(restaurantsRes: RestaurantSearch[]) {
    let deliveryRestaurantsBuf: RestaurantSearch[] = [];
    let pickupRestaurantsBuf: RestaurantSearch[] = [];
    let reservationRestaurantsBuf: RestaurantSearch[] = [];

    restaurantsRes.forEach((restaurant) => {
      if (restaurant.transactions.includes("delivery")) {
        deliveryRestaurantsBuf.push(restaurant);
      }

      if (restaurant.transactions.includes("pickup")) {
        pickupRestaurantsBuf.push(restaurant);
      }

      if (restaurant.transactions.includes("restaurant_reservation")) {
        reservationRestaurantsBuf.push(restaurant);
      }
    });

    setDeliveryRestaurants(deliveryRestaurantsBuf);
    setPickupRestaurants(pickupRestaurantsBuf);
    setReservationRestaurants(reservationRestaurantsBuf);
  }

  /**
   * Returns 'white' if none of the restaurant slides
   * has any restaurants. This is because it's the only
   * ocassion on which this title will have the top
   * image as background.
   */
  function getTitleColor() {
    return areRestaurantSlidesAvailable() || is430pxOrLess ? Colors.BLUE : "white";
  }

  function onPageChange(newPage: number) {
    setPage(newPage - 1);
  }

  function onPageSizeChange(value: number) {
    setPageSize(value);
    //@ts-ignore
    topRestaurantAnchorEl.current.click();
    setTimeout(() => setPage(0), 250);
  }

  function areRestaurantSlidesAvailable(): boolean {
    return (
      (deliveryRestaurants.length > 0 ||
        pickupRestaurants.length > 0 ||
        reservationRestaurants.length > 0) &&
      page === 0
    );
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Restaurants in ${currentCity.city}`}</title>
      </Helmet>

      <a ref={topRestaurantAnchorEl} href={`#${topRestaurantId}`} hidden></a>

      <div>
        <Grid container className={style.pageTitleContainer}>
          <img
            src="/Travel-Agent/restaurant.jpg"
            className={style.backgroundImage}
            alt=""
          />

          {/* Services toolbar and title */}
          <Grid item xs={12} style={{ zIndex: 1 }}>
            <Navbar variant="transparent" />

            <Grid container className={style.titleAndToolbarContainer}>
              <Grid item xs={12}>
                <ServicesToolbar transparent />
              </Grid>

              <Grid item xs={10} style={{ margin: "0px auto" }}>
                <Text
                  component="hm"
                  weight="bold"
                  color="white"
                  style={{ marginBottom: "20px" }}
                >{`Restaurants in ${currentCity.city}`}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={style.pageContentContainer}>
          {/* Filters */}
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <>
              <Grid item className={style.filterGrid}>
                <RestaurantFilters
                  setPage={setPage}
                  loadAllRestaurants={loadAllRestaurants}
                />
              </Grid>

              {/* Filter button */}
              <Grid item className={style.filterButtonGrid}>
                <RestaurantFilterDrawer
                  setPage={setPage}
                  loadAllRestaurants={loadAllRestaurants}
                />
              </Grid>
            </>
          </Grow>

          {/* Restaurants */}
          <Grid item className={style.restaurantsGrid}>
            {noRestaurants ? (
              <NotAvailableCard title="Oops...">
                Sorry! Our database seems to have no restaurants in this city.
              </NotAvailableCard>
            ) : (
              <>
                {/* Slides */}
                {areRestaurantSlidesAvailable() && (
                  <div style={{ marginBottom: "50px" }}>
                    {deliveryRestaurants.length > 0 && page === 0 && (
                      <RestaurantSlides
                        loading={loading}
                        restaurants={deliveryRestaurants}
                        title="Delivery Available"
                      />
                    )}

                    {pickupRestaurants.length > 0 && page === 0 && (
                      <RestaurantSlides
                        loading={loading}
                        restaurants={filterByFeature("pickup", restaurants)}
                        title="Pickup"
                      />
                    )}

                    {reservationRestaurants.length > 0 && page === 0 && (
                      <RestaurantSlides
                        loading={loading}
                        restaurants={filterByFeature(
                          "restaurant_reservation",
                          restaurants
                        )}
                        title="Reservation"
                      />
                    )}
                  </div>
                )}

                <Text
                  id={topRestaurantId}
                  style={{ marginBottom: "20px" }}
                  component="h2"
                  bold
                  color={getTitleColor()}
                >{`Top Restaurants in ${currentCity.city}`}</Text>

                <Grid container className={style.restaurantCardContainer}>
                  <Grid container style={{ marginTop: "15px" }}>
                    <SortPageSize
                      includeSort={false}
                      pageSize={pageSize}
                      className={style.topSorter}
                      pageSizeOptions={pageSizeOptions}
                      onPageSizeChange={(value) => onPageSizeChange(value)}
                    />

                    {!loading && (
                      <Pagination
                        className={style.pagination}
                        page={page}
                        onChange={(e, page) => onPageChange(page)}
                        pageCount={Math.ceil(totalRestaurants / pageSize)}
                      />
                    )}
                  </Grid>

                  {/* ProgressCircle */}
                  {loading && (
                    <Grid item xs={12} className={style.loadingContainer}>
                      <ProgressCircle />
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                    className={style.cardContainer}
                    style={loading ? { filter: "blur(4px)" } : {}}
                  >
                    {restaurants.map((restaurant, i) => (
                      <RestaurantCard key={i} restaurant={restaurant} />
                    ))}
                  </Grid>

                  <Grid container>
                    {!loading && (
                      <Pagination
                        className={style.pagination}
                        page={page}
                        onChange={(e, page) => onPageChange(page)}
                        pageCount={Math.ceil(totalRestaurants / pageSize)}
                      />
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </div>

      <div style={{ marginTop: 50 }}>
        <Footer />
      </div>
    </div>
  );
}
