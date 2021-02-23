import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restaurantListStyles } from "../../scenes/Restaurants/restaurantList-styles";
import { Colors } from "../../styles";
import {
  hasAny,
  selectAllRestaurants,
  selectCurrentCity,
  selectRestaurantCuisines,
  selectRestaurantFeatures,
} from "../../utils";
import { fetchRestaurants } from "../../utils/external-apis/yelp-apis";
import {
  setRestaurants,
  updateRestaurantCheckedCuisines,
  updateRestaurantCheckedFeatures,
} from "../../utils/store/restaurant-slice";
import { IATALocation } from "../../utils/types/location-types";
import { CustomButton, Text } from "../atoms";
import { RestaurantCuisinesSelec, RestaurantFeature } from "../molecules";

interface RestaurantFilters {
  setLoading: (value: boolean) => void;
}

export function RestaurantFilters({ setLoading }: RestaurantFilters) {
  const style = restaurantListStyles();

  const [cuisines, setCuisines] = useState<RestaurantCuisine[]>([]);
  const cuisinesRedux: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);

  const featuresRedux: RestaurantFilter[] = useSelector(selectRestaurantFeatures);
  const [features, setFeatures] = useState<RestaurantFilter[]>([]);

  const dispatch = useDispatch();

  const allRestaurants: RestaurantSearch[] = useSelector(selectAllRestaurants);

  const currentCity: IATALocation = useSelector(selectCurrentCity);

  useEffect(() => {
    setCuisines(cuisinesRedux);
  }, [cuisinesRedux]);

  useEffect(() => {
    setFeatures(featuresRedux);
  }, [featuresRedux]);

  function applyFilters() {
    setLoading(true);

    let filteredFeatures: RestaurantFilter[] = features.filter((f) => f.checked);
    if (filteredFeatures.length > 0) {
      filterByFeatures(filteredFeatures);
    }

    let filteredCuisines: RestaurantCuisine[] = cuisines.filter((c) => c.checked);
    if (filteredCuisines.length > 0) {
      filterByCuisines(filteredCuisines);
    }
  }

  function filterByFeatures(filteredFeatures: RestaurantFilter[]) {
    let selectedFeatures: string[] = filteredFeatures.map((f) => f.name);

    if (selectedFeatures.length > 0) {
      let buffer: RestaurantSearch[] = allRestaurants.filter((r) => {
        let features: string[] = r.transactions;
        return hasAny(features, selectedFeatures);
      });
      dispatch(setRestaurants(buffer));
    } else {
      dispatch(setRestaurants(allRestaurants));
    }

    setLoading(false);
    dispatch(updateRestaurantCheckedFeatures(filteredFeatures));
  }

  function filterByCuisines(filteredCuisines: RestaurantCuisine[]) {
    fetchRestaurants(currentCity.lat, currentCity.lon, filteredCuisines)
      .then((res) => {
        dispatch(setRestaurants(res.data.businesses));
        dispatch(updateRestaurantCheckedCuisines(filteredCuisines));
        setLoading(false);
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
      <RestaurantFeature
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
      <RestaurantCuisinesSelec
        cuisines={cuisines}
        updateState={(selected) => setCuisines(selected)}
      />

      <CustomButton onClick={() => applyFilters()}>Search</CustomButton>
    </div>
  );
}
