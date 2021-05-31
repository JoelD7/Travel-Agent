import DateFnsUtils from "@date-io/date-fns";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  createMuiTheme,
  Drawer,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Axios from "axios";
import { addDays, format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { AnyAction } from "redux";
import { batchActions } from "redux-batched-actions";
import { Font } from "../../assets";
import {
  CarFilters,
  CarsCard,
  CustomButton,
  Footer,
  IataAutocomplete,
  Navbar,
  NotAvailableCard,
  ProgressCircle,
  ServicesToolbar,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  AvisToken,
  Car,
  CarCheckbox,
  CarReducer,
  CarSearch,
  carsPlaceholder,
  convertCarReducerToURLParams,
  convertURLToCarReducer,
  featureVarToLabel,
  getAvisAccessToken,
  getIataLocation,
  IATALocation,
  isDateAfterOrEqual,
  muiDateFormatter,
  Routes,
  selectCarSearch,
  selectCarSearchBrands,
  hasAny,
  selectCarSearchFeatures,
  selectCarSearchTransmission,
  selectDestinationCity,
  setCarSearch,
  setCarSearchBrands,
  setCarSearchFeatures,
  setCarSearchTransmission,
  setDestinationCity,
  setFlightTo,
  setFlightToAutocomplete,
  carRsvPlaceholder,
} from "../../utils";
import { carRentalStyles } from "./carRental-styles";

interface NoCarRentalsInfo {
  code: string;
  details: string;
}

export function CarRental() {
  const style = carRentalStyles();
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: Font.Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Font.Family,
          color: Colors.BLUE,
        },
      },
      //@ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiTypography: {
        h3: {
          fontFamily: Font.Family,
        },
        h4: {
          fontFamily: Font.Family,
        },
        subtitle1: {
          fontFamily: Font.Family,
        },
        body1: {
          fontFamily: Font.Family,
        },
        body2: {
          fontFamily: Font.Family,
        },
        caption: {
          fontFamily: Font.Family,
        },
      },
      MuiOutlinedInput: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            borderColor: "#cecece",
          },
        },
      },

      MuiPickersDay: {
        current: {
          color: Colors.BLUE,
        },
        daySelected: {
          backgroundColor: Colors.BLUE,

          "&:hover": {
            backgroundColor: Colors.BLUE_HOVER,
          },
        },
      },
      MuiInput: {
        underline: {
          "&:hover": {
            "&:not(.Mui-disabled)": {
              "&::before": {
                borderBottom: `2px solid ${Colors.GREEN}`,
              },
            },
          },
          "&::after": {
            borderBottom: `2px solid ${Colors.PURPLE}`,
          },
        },
      },
    },
  });

  const carSearch: CarSearch = useSelector(selectCarSearch);
  const [cars, setCars] = useState<Car[]>(carsPlaceholder);
  const [allCars, setAllCars] = useState<Car[]>([]);

  const destinationCity: IATALocation = useSelector(selectDestinationCity);

  const sortOptions: string[] = [
    "Name | A - Z",
    "Name | Z - A",
    "Price | desc",
    "Price | asc",
  ];

  const brands: CarCheckbox[] = useSelector(selectCarSearchBrands);
  const features: CarCheckbox[] = useSelector(selectCarSearchFeatures);
  const transmission: string = useSelector(selectCarSearchTransmission);

  const location = useLocation();

  const query = useQuery();

  const history = useHistory();

  let batchedActions: AnyAction[] = [];

  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();

  const [localCarSearch, setLocalCarSearch] = useState<CarSearch>(carSearch);
  const [sortOption, setSortOption] = useState<string>("Price | desc");

  const [loading, setLoading] = useState(true);
  const [loadingOnMount, setLoadingOnMount] = useState(true);

  const [noCarRentalsInfo, setNoCarRentalsInfo] = useState<NoCarRentalsInfo>({
    code: "",
    details: "",
  });

  /**
   * Contains the last city on which the list of brands
   * was generated from.
   *
   * Each city will obviously have a specific set of available
   * car brands, therefore each time the user changes the city a
   * new list of brands will override the previous one, and if
   * the user modifies the search params without modifying the
   * city, the list shall remain the same with the possibiliy of
   * having some brands checked.
   *
   * When a search is made, this variable will indicate whether an
   * entirely new list of brands must be generated, or if the new brands
   * must be added to existing list.
   *
   */
  const [lastQueriedCityForBrand, setLastQueriedCityForBrand] = useState<string>(
    carSearch.pickup_location
  );

  let carReducer: CarReducer;

  useEffect(() => {
    carReducer = convertURLToCarReducer(query);

    batchedActions.push(setCarSearch(carReducer.carSearch));
    batchedActions.push(setCarSearchBrands(carReducer.brands));
    batchedActions.push(setCarSearchFeatures(getCarFeatures(carReducer)));
    batchedActions.push(setCarSearchTransmission(carReducer.transmission));

    let destinationCity: IATALocation | undefined = getIataLocation(
      carReducer.carSearch.pickup_location
    );
    if (destinationCity) {
      batchedActions.push(setDestinationCity(destinationCity));
      batchedActions.push(setFlightToAutocomplete(destinationCity));
      batchedActions.push(setFlightTo(destinationCity.code));
    }

    dispatch(batchActions(batchedActions));

    fetchCarRentals(carReducer);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [brands, features, transmission]);

  function areAnyBrandsChecked(): boolean {
    return brands.filter((b) => b.checked).length > 0;
  }

  function areAnyFeaturesChecked(): boolean {
    return features.filter((f) => f.checked).length > 0;
  }

  function applyFilters() {
    let filteredCars: Car[] = [];
    let bufferCarList: Car[] = [...allCars];

    //Brands
    if (areAnyBrandsChecked()) {
      let selectedBrands: string[] = brands
        .filter((brand) => brand.checked)
        .map((brand) => brand.name);

      filteredCars = bufferCarList.filter((car) =>
        selectedBrands.includes(car.category.make)
      );
      bufferCarList = [...filteredCars];
    }

    //Features
    if (areAnyFeaturesChecked()) {
      let selectedFeatures: string[] = features
        .filter((feature) => feature.checked)
        .map((feature) => feature.name);

      filteredCars = bufferCarList.filter((car) => {
        let carFeatures: string[] = [];

        for (const key in car.features) {
          if (Object.prototype.hasOwnProperty.call(car.features, key)) {
            const checked = car.features[key];

            if (checked) {
              carFeatures.push(featureVarToLabel(key));
            }
          }
        }

        return hasAny(selectedFeatures, carFeatures);
      });

      bufferCarList = [...filteredCars];
    }

    //Transmission
    if (transmission !== "All" && transmission !== "") {
      filteredCars = bufferCarList.filter(
        (car) => car.category.vehicle_transmission === transmission
      );
      bufferCarList = [...filteredCars];
    }

    setCars(bufferCarList);
  }

  function fetchCarRentals(carReducer?: CarReducer) {
    let carSearchParams: CarSearch = carReducer ? carReducer.carSearch : carSearch;
    let selectedBrands: CarCheckbox[] = carReducer ? carReducer.brands : [];

    getAvisAccessToken()
      .then((accessToken: AvisToken) => {
        Axios.get("https://stage.abgapiservices.com:443/cars/catalog/v1/vehicles", {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            client_id: process.env.REACT_APP_AVIS_ID,
          },
          params: {
            brand: "Avis",
            pickup_date: carSearchParams.pickup_date,
            pickup_location: carSearchParams.pickup_location,
            dropoff_date: carSearchParams.dropoff_date,
            dropoff_location: carSearchParams.pickup_location,
            country_code: carSearchParams.country_code,
          },
        })
          .then((res) => {
            setCars(res.data.vehicles);
            setAllCars(res.data.vehicles);
            setBrands(res.data.vehicles, selectedBrands);

            setLoading(false);
            setLoadingOnMount(false);
          })
          .catch((error) => {
            if (error.response) {
              let errorDetail: any = error.response.data.status.errors[0];
              setLoading(false);
              setLoadingOnMount(false);

              setNoCarRentalsInfo({
                code: errorDetail.code,
                details: errorDetail.details,
              });
            }
          });
      })
      .catch((error) => console.log(error));
  }

  function setBrands(vehicles: any[], brands: CarCheckbox[]) {
    let brandsFromResponseSet = new Set<string>();
    vehicles.forEach((vehicle) => brandsFromResponseSet.add(vehicle.category.make));

    let brandsFromResponse: string[] = Array.from(brandsFromResponseSet.values());

    let existingBrands: string[] = brands.map((brand) => brand.name);

    let selectedBrands: CarCheckbox[] = brands.filter((brand) => brand.checked);
    let brandsBuffer: CarCheckbox[] = [];

    brandsFromResponse.forEach((make) => {
      if (!existingBrands.includes(make)) {
        brandsBuffer.push({ name: make, checked: false });
        existingBrands.push(make);
      }
    });

    setLastQueriedCityForBrand(carSearch.pickup_location);

    brandsBuffer.sort((a, b) => a.name.localeCompare(b.name));

    if (hasTheCityChanged()) {
      dispatch(setCarSearchBrands(brandsBuffer));
    } else {
      dispatch(setCarSearchBrands([...selectedBrands, ...brandsBuffer]));
    }
  }

  function hasTheCityChanged(): boolean {
    return lastQueriedCityForBrand !== carSearch.pickup_location;
  }

  function onDateChange(
    date: MaterialUiPickersDate,
    type: "pickup_date" | "dropoff_date"
  ) {
    let newDate: Date;

    switch (type) {
      case "pickup_date":
        newDate = date === null ? new Date() : parseISO(date.toISOString());
        let dropoff_date: Date = parseISO(localCarSearch.dropoff_date);

        if (dropoff_date && isDateAfterOrEqual(newDate, dropoff_date)) {
          setLocalCarSearch({
            ...localCarSearch,
            pickup_date: format(newDate, `yyyy-MM-dd'T'HH:mm:ss`),
            dropoff_date: format(addDays(newDate, 1), `yyyy-MM-dd'T'HH:mm:ss`),
          });
        } else {
          setLocalCarSearch({
            ...localCarSearch,
            pickup_date: format(newDate, `yyyy-MM-dd'T'HH:mm:ss`),
          });
        }

        break;
      case "dropoff_date":
        newDate = date === null ? new Date() : parseISO(date.toISOString());
        setLocalCarSearch({
          ...localCarSearch,
          dropoff_date: format(newDate, `yyyy-MM-dd'T'HH:mm:ss`),
        });
        break;
    }
  }

  function onSortOptionChange(
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) {
    let selectedSortOption = event.target.value as string;
    setSortOption(selectedSortOption);

    let sortedCars: Car[] = [];

    switch (selectedSortOption) {
      case "Name | A - Z":
        sortedCars = allCars.sort((a, b) => {
          let nameA = a.category.make + " " + a.category.model;
          let nameB = b.category.make + " " + b.category.model;

          return nameA.localeCompare(nameB);
        });

        setCars(sortedCars);
        break;
      case "Name | Z - A":
        sortedCars = allCars.sort((a, b) => {
          let nameA = a.category.make + " " + a.category.model;
          let nameB = b.category.make + " " + b.category.model;

          return nameB.localeCompare(nameA);
        });

        setCars(sortedCars);
        break;
      case "Price | desc":
        sortedCars = allCars.sort(
          (a, b) =>
            b.rate_totals.pay_later.reservation_total -
            a.rate_totals.pay_later.reservation_total
        );
        setCars(sortedCars);
        break;
      case "Price | asc":
        sortedCars = allCars.sort(
          (a, b) =>
            a.rate_totals.pay_later.reservation_total -
            b.rate_totals.pay_later.reservation_total
        );
        setCars(sortedCars);
        break;
      default:
        break;
    }
  }

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  /**
   *
   * @param carReducer uses this parameter to check if a feature was
   * previously selected(it's in the url).
   */
  function getCarFeatures(carReducer: CarReducer) {
    let featuresToShow: CarCheckbox[] = [];
    let selectedFeatures: string[] = carReducer.features.map((f) => f.name);

    features.forEach((feature) => {
      if (selectedFeatures.includes(feature.name)) {
        featuresToShow.push({ name: feature.name, checked: true });
      } else {
        featuresToShow.push({ name: feature.name, checked: false });
      }
    });

    return featuresToShow;
  }

  function onSearchClick() {
    setLoading(true);

    let updatedCarSearch: CarSearch = {
      ...carSearch,
      pickup_date: localCarSearch.pickup_date,
      dropoff_date: localCarSearch.dropoff_date,
    };

    dispatch(setCarSearch(updatedCarSearch));

    //In this case, the brands in the URL should be deleted.
    if (hasTheCityChanged()) {
      carReducer = {
        carRsv: carRsvPlaceholder[0],
        carSearch: updatedCarSearch,
        brands: [],
        features,
        transmission,
      };
    } else {
      carReducer = {
        carRsv: carRsvPlaceholder[0],
        carSearch: updatedCarSearch,
        brands,
        features,
        transmission,
      };
    }

    let urlParams = convertCarReducerToURLParams(carReducer);
    history.push(`${Routes.CAR_RENTAL}${urlParams}`);

    fetchCarRentals(carReducer);
  }

  function areCarRentalCardsRenderable(): boolean {
    return !loadingOnMount && noCarRentalsInfo.code !== "223";
  }

  function noCarRentalCardsFound(): boolean {
    return noCarRentalsInfo.code === "223";
  }

  function getBlurStyle() {
    return loading ? { filter: "blur(4px)" } : {};
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Car rental in ${destinationCity.city}`}</title>
      </Helmet>

      {/* Image container */}
      <Grid container className={style.topImageContainer}>
        <img
          src="/Travel-Agent/car-rental.jpg"
          className={style.backgroundImage}
          alt=""
        />

        <Grid item xs={12} style={{ zIndex: 1 }}>
          <Navbar transparent />
          <ServicesToolbar transparent />

          {/* Title */}
          <div className={style.pageTitleContainer}>
            <Text
              component="hm"
              color="white"
            >{`Car Rental in ${destinationCity.city}`}</Text>
          </div>
        </Grid>

        {/* Search params */}
        <Grid container spacing={2} className={style.searchParamsGrid}>
          {/* Location */}
          <Grid item className={style.locationGrid}>
            <Text color="white" className={style.whiteParamText} bold>
              Pickup location
            </Text>
            <div className={style.locationDiv}>
              <IataAutocomplete type="airport" flightDirection="to" />
            </div>
          </Grid>

          {/* Dates */}
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {/* Pickup date */}
              <Grid item className={style.dateButtonGrid}>
                <Text color="white" className={style.whiteParamText} bold>
                  Pickup
                </Text>
                <KeyboardDatePicker
                  value={parseISO(localCarSearch.pickup_date)}
                  labelFunc={(date, invalidLabel) =>
                    muiDateFormatter(date, invalidLabel, "date")
                  }
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => onDateChange(d, "pickup_date")}
                />
              </Grid>

              {/* Dropoff date */}
              <Grid item className={style.dateButtonGrid}>
                <Text color="white" className={style.whiteParamText} bold>
                  Dropoff
                </Text>
                <KeyboardDatePicker
                  value={parseISO(localCarSearch.dropoff_date)}
                  labelFunc={(date, invalidLabel) =>
                    muiDateFormatter(date, invalidLabel, "date")
                  }
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => onDateChange(d, "dropoff_date")}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </ThemeProvider>

          {/* Button */}
          <Grid item className={style.buttonGrid}>
            <Grid
              container
              style={{ height: "100%" }}
              justify="flex-end"
              alignItems="flex-end"
            >
              <CustomButton
                style={{ fontSize: "18px" }}
                onClick={() => onSearchClick()}
                backgroundColor={Colors.GREEN}
              >
                Search
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Page container */}
      <Grid container className={style.pageContainer} justify="center">
        {/* Filter button */}
        <Grid item className={style.filterButtonGrid}>
          <Grid container alignItems="center" style={{ height: "100%" }}>
            <CustomButton
              icon={faFilter}
              backgroundColor={Colors.GREEN}
              style={{ paddingLeft: "10px", fontSize: "14px" }}
              onClick={() => setOpenDrawer(true)}
            >
              Filter
            </CustomButton>
          </Grid>
        </Grid>

        {/* Sort */}
        <Grid item className={style.sortGrid}>
          <Grid container className={style.gridContainer}>
            <Grid container className={style.sortContainer}>
              <Text
                bold
                style={{ alignSelf: "end", margin: "auto 0px" }}
                color={Colors.BLUE}
              >
                Sort by
              </Text>

              <FormControl className={style.sortFormControl}>
                <Select
                  value={sortOption}
                  variant="outlined"
                  classes={{ icon: style.selectIcon }}
                  className={style.select}
                  onChange={onSortOptionChange}
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

        {/* Filters */}
        <Grid item className={style.filterGrid}>
          <div className={style.filterContainer}>
            <CarFilters />
          </div>
        </Grid>

        {/* Cars cards */}
        <Grid item className={style.carsGrid}>
          {loading && (
            <Grid container justify="center" className={style.progressCircleContainer}>
              <ProgressCircle />
            </Grid>
          )}

          {noCarRentalCardsFound() && (
            <Grid container justify="center" style={getBlurStyle()}>
              <NotAvailableCard title="Sorry">
                {noCarRentalsInfo.details}
              </NotAvailableCard>
            </Grid>
          )}

          {areCarRentalCardsRenderable() && (
            <Grid container spacing={2} justify="center" style={getBlurStyle()}>
              {cars.map((car, i) => (
                <Grid key={i} item className={style.carsGridItem}>
                  <CarsCard car={car} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Footer />

      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: style.drawer }}
      >
        <CarFilters />
      </Drawer>
    </div>
  );
}
