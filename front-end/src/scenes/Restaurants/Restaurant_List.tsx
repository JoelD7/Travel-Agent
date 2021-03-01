import { Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { batchActions } from "redux-batched-actions";
import {
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
import { Shadow } from "../../styles";
import {
  filterByFeature,
  hasAny,
  selectCurrentCity,
  selectLoadingRestaurants,
  selectRestaurantCuisines,
  selectRestaurantFeatures,
  selectRestaurants,
} from "../../utils";
import { fetchRestaurants } from "../../utils/external-apis/yelp-apis";
import {
  addRestaurantCuisines,
  addRestaurantFeatures,
  setAllRestaurants,
  setLoadingRestaurants,
  setRestaurants,
} from "../../utils/store/restaurant-slice";
import { IATALocation } from "../../utils/types/location-types";
import { restaurantListStyles } from "./restaurantList-styles";

interface Restaurant_List {
  city: string;
  establishments: RestaurantFilter[];
  cuisines: RestaurantFilter[];
  features: RestaurantFilter[];
}

export function Restaurant_List() {
  const style = restaurantListStyles();

  const currentCity: IATALocation = useSelector(selectCurrentCity);
  const restaurants: RestaurantSearch[] = useSelector(selectRestaurants);

  const [deliveryRestaurants, setDeliveryRestaurants] = useState<RestaurantSearch[]>(
    filterByFeature("delivery", restaurants)
  );
  const [pickupRestaurants, setPickupRestaurants] = useState<RestaurantSearch[]>(
    filterByFeature("pickup", restaurants)
  );
  const [reservationRestaurants, setReservationRestaurants] = useState<
    RestaurantSearch[]
  >(filterByFeature("restaurant_reservation", restaurants));

  const cuisines: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);
  const features: RestaurantFilter[] = useSelector(selectRestaurantFeatures);

  // const [loading, setLoading] = useState(false);
  const loading: boolean = useSelector(selectLoadingRestaurants);
  const [noRestaurants, setNoRestaurants] = useState(false);

  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const pageSizeOptions = [20, 30, 40];

  const dispatch = useDispatch();

  const topRestaurantAnchorEl = useRef(null);
  const topRestaurantId = "topRestaurantId";

  useEffect(() => {
    if (!loading) {
      dispatch(setLoadingRestaurants(true));
    }

    loadRestaurants();
  }, [currentCity, page, pageSize]);

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

  function loadRestaurants() {
    fetchRestaurants(currentCity.lat, currentCity.lon, pageSize, page * pageSize)
      .then((res) => {
        let restaurantsRes: RestaurantSearch[] = res.data.businesses;

        let resTotal = Number(res.data.total);
        setTotal(resTotal > 1000 ? 1000 : resTotal);

        if (areFeaturesSelected()) {
          filterRestaurantsByFeatures(restaurantsRes);
        }

        dispatch(
          batchActions([
            setRestaurants(restaurantsRes),
            setAllRestaurants(restaurantsRes),
            addRestaurantCuisines(cuisines, restaurantsRes),
            addRestaurantFeatures(features, restaurantsRes),
            setLoadingRestaurants(false),
          ])
        );

        if (restaurantsRes.length === 0) {
          setNoRestaurants(true);
        } else if (noRestaurants) {
          setNoRestaurants(false);
        }
      })
      .catch((error) => console.log(error));
  }

  function filterRestaurantsByFeatures(restaurantsRes: RestaurantSearch[]) {
    let selectedFeatures: string[] = features.map((f) => f.name);

    restaurantsRes.filter((restaurant: RestaurantSearch) => {
      let resFeatures: string[] = restaurant.transactions;
      return hasAny(resFeatures, selectedFeatures);
    });
  }

  function areFeaturesSelected() {
    return features.filter((ft) => ft.checked).length > 0;
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
    return (deliveryRestaurants.length === 0 &&
      pickupRestaurants.length === 0 &&
      reservationRestaurants.length === 0) ||
      page > 0
      ? "white"
      : "black";
  }

  function onPageChange(newPage: number) {
    //@ts-ignore
    topRestaurantAnchorEl.current.click();
    setTimeout(() => setPage(newPage - 1), 250);
  }

  function onPageSizeChange(value: number) {
    setPageSize(value);
    //@ts-ignore
    topRestaurantAnchorEl.current.click();
    setTimeout(() => setPage(0), 250);
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Restaurants in ${currentCity.city}`}</title>
      </Helmet>

      <Navbar />
      <a ref={topRestaurantAnchorEl} href={`#${topRestaurantId}`} hidden></a>

      <div>
        <Grid container className={style.pageTitleContainer}>
          {/* Services toolbar and title */}
          <Grid item xs={12}>
            <Grid container className={style.titleAndToolbarContainer}>
              <Grid item xs={12}>
                <ServicesToolbar style={{ boxShadow: Shadow.MEDIUM }} />
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
          <Grid item className={style.filterGrid}>
            <RestaurantFilters setLoading={(value) => {}} />
          </Grid>

          {/* Filter button */}
          <Grid item className={style.filterButtonGrid}>
            <RestaurantFilterDrawer />
          </Grid>

          {/* Restaurants */}
          <Grid item className={style.restaurantsGrid}>
            {noRestaurants ? (
              <NotAvailableCard title="Oops...">
                Sorry! Our database seems to have no restaurants in this city.
              </NotAvailableCard>
            ) : (
              <>
                {/* Slides */}
                {page === 0 && (
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
                  weight={500}
                  component="h2"
                  bold
                  color={getTitleColor()}
                >{`Top Restaurants in ${currentCity.city}`}</Text>

                <div className={style.restaurantCardContainer}>
                  <Grid container style={{ marginTop: "15px" }}>
                    <SortPageSize
                      includeSort={false}
                      pageSize={pageSize}
                      className={style.topSorter}
                      pageSizeOptions={pageSizeOptions}
                      onPageSizeChange={(value) => onPageSizeChange(value)}
                    />

                    <Pagination
                      className={style.pagination}
                      page={page}
                      onChange={(e, page) => onPageChange(page)}
                      pageCount={Math.ceil(total / pageSize)}
                    />
                  </Grid>

                  {/* ProgressCircle */}
                  {loading && (
                    <Grid
                      container
                      justify="center"
                      style={{ position: "absolute", left: "150px" }}
                    >
                      <ProgressCircle />
                    </Grid>
                  )}

                  <div style={loading ? { filter: "blur(4px)" } : {}}>
                    {restaurants.map((restaurant, i) => (
                      <RestaurantCard key={i} restaurant={restaurant} />
                    ))}
                  </div>

                  <Grid container>
                    <Pagination
                      className={style.pagination}
                      page={page}
                      onChange={(e, page) => onPageChange(page)}
                      pageCount={Math.ceil(total / pageSize)}
                    />
                  </Grid>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
