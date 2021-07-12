import { Divider } from "@material-ui/core";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { batchActions } from "redux-batched-actions";
import { restaurantListStyles } from "../../scenes/Restaurants/restaurantList-styles";
import { Colors } from "../../styles";
import {
  fetchRestaurants,
  hasAny,
  IATALocation,
  selectAllRestaurants,
  selectDestinationCity,
  selectRestaurantCuisines,
  selectRestaurantFeatures,
  selectRestaurantFilterParams,
  setLoadingRestaurants,
  setRestaurantFilterParams,
  setRestaurants,
  setTotalRestaurants,
  updateRestaurantCuisines,
  updateRestaurantFeatures,
} from "../../utils";
import { CustomButton, Text } from "../atoms";
import { ResCuisineSelector } from "./RestaurantCuisinesSelec/ResCuisineSelector";
import { ResFeatureSelector } from "./RestaurantFeature/ResFeatureSelector";

interface RestaurantFilters {
  loadAllRestaurants: () => void;
  setPage: Dispatch<SetStateAction<number>>;
}

export function RestaurantFilters({ loadAllRestaurants, setPage }: RestaurantFilters) {
  const style = restaurantListStyles();

  const [cuisines, setCuisines] = useState<RestaurantCuisine[]>([]);
  const cuisinesRedux: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);

  const featuresRedux: RestaurantFeature[] = useSelector(selectRestaurantFeatures);
  const [features, setFeatures] = useState<RestaurantFeature[]>([]);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();

  const allRestaurants: RestaurantSearch[] = useSelector(selectAllRestaurants);
  const currentCity: IATALocation = useSelector(selectDestinationCity);
  const resFilterParams: RestaurantFilterParams = useSelector(
    selectRestaurantFilterParams
  );

  useEffect(() => {
    setCuisines(cuisinesRedux);
  }, [cuisinesRedux]);

  useEffect(() => {
    setFeatures(featuresRedux);
  }, [featuresRedux]);

  useEffect(() => {
    if (!firstRender && areNoFiltersApplied()) {
      loadAllRestaurants();
    }
  }, [resFilterParams]);

  function applyFilters() {
    setPage(0);
    setFirstRender(false);
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
        batchActions([
          updateRestaurantFeatures(features),
          updateRestaurantCuisines(cuisines),
          setRestaurantFilterParams({
            cuisines,
            features,
          }),
        ])
      );
    }, 250);
  }

  function areNoFiltersApplied(): boolean {
    let filteredFeatures: RestaurantFeature[] = features.filter((f) => f.checked);
    let filteredCuisines: RestaurantCuisine[] = cuisines.filter((c) => c.checked);

    return filteredFeatures.length === 0 && filteredCuisines.length === 0;
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

    dispatch(batchActions([restaurantDispatcher(), setLoadingRestaurants(false)]));
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
        let resTotal = Number(res.data.total);

        dispatch(
          batchActions([
            setTotalRestaurants(resTotal > 1000 ? 1000 : resTotal),
            setRestaurants(res.data.businesses),
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
