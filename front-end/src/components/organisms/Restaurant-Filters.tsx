import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { batchActions } from "redux-batched-actions";
import { restaurantListStyles } from "../../scenes/Restaurants/restaurantList-styles";
import { Colors } from "../../styles";
import {
  hasAny,
  selectAllRestaurants,
  selectCurrentCity,
  selectRestaurantCuisines,
  selectRestaurantFeatures,
  selectRestaurants,
} from "../../utils";
import { fetchRestaurants } from "../../utils/external-apis/yelp-apis";
import {
  setLoadingRestaurants,
  setRestaurantFilterParams,
  setRestaurants,
  updateRestaurantCuisines,
  updateRestaurantFeatures,
} from "../../utils/store/restaurant-slice";
import { IATALocation } from "../../utils/types/location-types";
import { CustomButton, Text } from "../atoms";
import { ResCuisineSelector, ResFeatureSelector } from "../molecules";

interface RestaurantFilters {
  setLoading?: (value: boolean) => void;
}

export function RestaurantFilters({ setLoading }: RestaurantFilters) {
  const style = restaurantListStyles();

  const [cuisines, setCuisines] = useState<RestaurantCuisine[]>([]);
  const cuisinesRedux: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);

  const featuresRedux: RestaurantFeature[] = useSelector(selectRestaurantFeatures);
  const [features, setFeatures] = useState<RestaurantFeature[]>([]);

  const dispatch = useDispatch();

  const allRestaurants: RestaurantSearch[] = useSelector(selectAllRestaurants);
  const restaurants: RestaurantSearch[] = useSelector(selectRestaurants);

  const currentCity: IATALocation = useSelector(selectCurrentCity);

  useEffect(() => {
    setCuisines(cuisinesRedux);
  }, [cuisinesRedux]);

  useEffect(() => {
    setFeatures(featuresRedux);
  }, [featuresRedux]);

  function applyFilters() {
    dispatch(setLoadingRestaurants(true));

    setTimeout(() => {
      let filteredFeatures: RestaurantFeature[] = features.filter((f) => f.checked);
      if (filteredFeatures.length > 0) {
        filterByFeatures(filteredFeatures);
      }

      let filteredCuisines: RestaurantCuisine[] = cuisines.filter((c) => c.checked);
      if (filteredCuisines.length > 0) {
        filterByCuisines(filteredCuisines);
      }

      dispatch(
        setRestaurantFilterParams({
          cuisines,
          features,
        })
      );
    }, 250);
  }

  function filterByFeatures(filteredFeatures: RestaurantFeature[]) {
    let selectedFeatures: string[] = filteredFeatures.map((f) => f.name);
    let restaurantDispatcher;

    if (selectedFeatures.length > 0) {
      let buffer: RestaurantSearch[] = allRestaurants.filter((r) => {
        let features: string[] = r.transactions;
        return hasAny(features, selectedFeatures);
      });
      restaurantDispatcher = () => setRestaurants(buffer);
    } else {
      restaurantDispatcher = () => setRestaurants(allRestaurants);
    }

    dispatch(
      batchActions([
        restaurantDispatcher(),
        updateRestaurantFeatures(features),
        setLoadingRestaurants(false),
      ])
    );
  }

  function filterByCuisines(filteredCuisines: RestaurantCuisine[]) {
    fetchRestaurants(
      currentCity.lat,
      currentCity.lon,
      undefined,
      undefined,
      filteredCuisines
    )
      .then((res) => {
        dispatch(
          batchActions([
            setRestaurants(res.data.businesses),
            updateRestaurantCuisines(cuisines),
            setLoadingRestaurants(false),
          ])
        );
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={style.filterContainer}>
      <Text
        color={Colors.BLUE}
        className={style.filterTitle}
        component="h4"
        weight="bold"
      >
        Features
      </Text>

      <ResFeatureSelector
        features={features}
        updateState={(selected) => setFeatures(selected)}
      />

      <Divider style={{ margin: "18px 0px 10px 0px" }} />

      <Text
        color={Colors.BLUE}
        className={style.filterTitle}
        component="h4"
        weight="bold"
      >
        Cuisines
      </Text>
      <ResCuisineSelector
        cuisines={cuisines}
        updateState={(selected) => setCuisines(selected)}
      />

      <CustomButton onClick={() => applyFilters()}>Search</CustomButton>
    </div>
  );
}
