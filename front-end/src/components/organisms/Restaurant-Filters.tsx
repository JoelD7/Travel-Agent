import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { batchActions } from "redux-batched-actions";
import { restaurantListStyles } from "../../scenes/Restaurants/restaurantList-styles";
import { Colors } from "../../styles";
import {
  fetchRestaurants,
  IATALocation,
  selectDestinationCity,
  selectRestaurantCuisines,
  selectRestaurantFilterParams,
  setLoadingRestaurants,
  setRestaurantFilterParams,
  setRestaurants,
  setTotalRestaurants,
  updateRestaurantCuisines,
} from "../../utils";
import { CustomButton, Text } from "../atoms";
import { ResCuisineSelector } from "./RestaurantCuisinesSelec/ResCuisineSelector";

interface RestaurantFilters {
  loadAllRestaurants: () => void;
  setPage: Dispatch<SetStateAction<number>>;
  updateURL: () => void;
}

export function RestaurantFilters({
  updateURL,
  loadAllRestaurants,
  setPage,
}: RestaurantFilters) {
  const style = restaurantListStyles();

  const cuisinesRedux: RestaurantCuisine[] = useSelector(selectRestaurantCuisines);
  const currentCity: IATALocation = useSelector(selectDestinationCity);
  const resFilterParams: RestaurantFilterParams = useSelector(
    selectRestaurantFilterParams
  );

  const [cuisines, setCuisines] = useState<RestaurantCuisine[]>([]);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setCuisines(cuisinesRedux);
  }, [cuisinesRedux]);

  useEffect(() => {
    if (!firstRender) {
      if (areNoFiltersApplied()) {
        loadAllRestaurants();
      } else {
        updateURL();
      }
    }
  }, [resFilterParams]);

  function applyFilters() {
    setPage(0);
    setFirstRender(false);
    dispatch(setLoadingRestaurants(true));

    setTimeout(() => {
      let filteredCuisines: RestaurantCuisine[] = cuisines.filter((c) => c.checked);
      if (filteredCuisines.length > 0) {
        filterByCuisines(filteredCuisines);
      }

      dispatch(
        batchActions([
          updateRestaurantCuisines(cuisines),
          setRestaurantFilterParams({
            cuisines,
          }),
        ])
      );
    }, 250);
  }

  function areNoFiltersApplied(): boolean {
    let filteredCuisines: RestaurantCuisine[] = cuisines.filter((c) => c.checked);

    return filteredCuisines.length === 0;
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
        Cuisines
      </Text>
      <ResCuisineSelector
        cuisines={cuisines}
        updateState={(selected) => setCuisines(selected)}
      />

      <CustomButton style={{ marginTop: 20 }} onClick={() => applyFilters()}>
        Search
      </CustomButton>
    </div>
  );
}
