import DateFnsUtils from "@date-io/date-fns";
import {
  faBed,
  faChild,
  faFilter,
  faMapMarkerAlt,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardContent,
  createMuiTheme,
  Divider,
  Drawer,
  FormControl,
  Grid,
  GridList,
  MenuItem,
  Popover,
  Select,
  ThemeProvider,
  Tooltip,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Axios, { AxiosResponse } from "axios";
import { addDays } from "date-fns";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Family } from "../../assets/fonts";
import {
  CustomButton,
  HotelStarSelector,
  IconText,
  Navbar,
  PriceRange,
  ProgressCircle,
  ServicesToolbar,
  Rating,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  capitalizeString,
  getFindPlaceFromTextURL,
  getLocalStorageConsumption,
  getPhotoFromReferenceURL,
  HotelBedAPI,
  hotelsPlaceholder,
  decimalFormatter,
  muiDateFormatter,
  Routes,
  getHotelStars,
  selectHotelReservationParams,
} from "../../utils";
import { proxyUrl } from "../../utils/external-apis";
import { updateReservationParams } from "../../utils/store/hotel-slice";
import {
  HotelAvailability,
  HotelBooking,
  HotelSearch,
  HotelPax,
  Occupancy,
} from "../../utils/types/hotel-types";
import { hotelsStyles } from "./hotels-styles";

interface AvailabilityParams {
  availability: any;
  hotelsForBooking: any[];
}

interface HotelCard {
  hotel: HotelBooking;
}

type SortOption =
  | "Name | A - Z"
  | "Name | Z - A"
  | "Stars | desc"
  | "Stars | asc"
  | "Price | desc"
  | "Price | asc";

export function Hotels() {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Family,
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
        h4: {
          fontFamily: Family,
        },
        subtitle1: {
          fontFamily: Family,
        },
        body1: {
          fontFamily: Family,
        },
        body2: {
          fontFamily: Family,
        },
        caption: {
          fontFamily: Family,
        },
      },
      MuiOutlinedInput: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            borderColor: `"#cecece"`,
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

  const style = hotelsStyles();

  const occupanciesParams: Occupancy[] = [
    {
      label: "Rooms",
      field: "rooms",
      icon: faBed,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      label: "Adults",
      field: "adults",
      icon: faUser,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      label: "Children",
      field: "children",
      icon: faChild,
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  ];

  const state = useSelector(selectHotelReservationParams);

  const dispatch = useDispatch();

  const [hotelAvailability, setHotelAvailability] = useState<HotelAvailability>(
    hotelsPlaceholder
  );

  const [allHotels, setAllHotels] = useState<HotelBooking[]>([]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [image, setImage] = useState<string>("");

  const [openOccupancies, setOpenOccupancies] = useState<boolean>(false);
  const [occupanciesAnchor, setOccupanciesAnchor] = useState<HTMLButtonElement | null>(
    null
  );

  const sortOptions: SortOption[] = [
    "Name | A - Z",
    "Name | Z - A",
    "Stars | desc",
    "Stars | asc",
    "Price | desc",
    "Price | asc",
  ];

  const [sortOption, setSortOption] = useState<SortOption>("Stars | desc");

  const [loadingOnMount, setLoadingOnMount] = useState(true);
  // const [loadingOnMount, setLoadingOnMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotelsMounted, setHotelsMounted] = useState(false);

  const [maxRate, setMaxRate] = useState<number>(500);

  const [noHotels, setNoHotels] = useState(false);
  // const [noHotels, setNoHotels] = useState(true);

  const history = useHistory();

  const city = "Paris";

  useEffect(() => {
    searchHotels();
  }, []);

  function searchHotels() {
    fetchHotelAvailability()
      .then((availabilityRes) => {
        let availability = availabilityRes.data.hotels;
        let hotelsForBooking: any[] = [];

        // console.log("Response: ", JSON.stringify(availabilityRes.data));

        if (availability.hotels) {
          /**
           * This array should be sorted the same way as "hotelsDetails"
           * in order to referencing the same hotels while iterating
           * over both of these arrays.
           */
          hotelsForBooking = availability.hotels.sort(
            (a: any, b: any) => a.code - b.code
          );
          fetchHotels({ availability, hotelsForBooking });
        } else {
          setNoHotelsAvailable(availability);
        }

        setMaximumPriceInRange(hotelsForBooking);
      })
      .catch((error) => {
        console.log("Error in fetchHotelAvailability(): ", error);
      });
  }

  function fetchHotelAvailability() {
    const filter = {
      maxHotels: 250,
      //stars
      minCategory: state.stars === 0 ? 1 : state.stars,
      minRate: state.priceRange[0],
    };

    const bookingParams = {
      stay: {
        checkIn: state.checkIn,
        checkOut: state.checkOut,
      },
      occupancies: [
        {
          rooms: state.rooms,
          adults: state.adults,
          children: state.children,
          paxes: state.paxes,
        },
      ],

      geolocation: {
        longitude: 2.3522,
        latitude: 48.8566,
        radius: 15,
        unit: "km",
      },
      filter:
        state.priceRange[1] === maxRate
          ? filter
          : { ...filter, maxRate: state.priceRange[1] },
    };

    return Axios.post(proxyUrl + HotelBedAPI.hotelAvailabilityURL, bookingParams, {
      headers: HotelBedAPI.headers,
    });
  }

  function fetchHotels(availabilityParams: AvailabilityParams) {
    const { availability } = availabilityParams;

    //Codes of the hotels to get details from
    let hotelCodes = availability.hotels.map((hotel: HotelBooking) => hotel.code);
    let maxHotels = availability.hotels.length;

    Axios.get(proxyUrl + HotelBedAPI.hotelContentURL, {
      headers: HotelBedAPI.headers,
      params: {
        fields: "all",
        codes: hotelCodes.join(","),
        language: "ENG",
        from: "1",
        to: maxHotels,
        useSecondaryLanguage: false,
      },
    }).then((res) => {
      console.log("Hotel details fetched: ", res.data.hotels.length);
      setHotels(res, availabilityParams);
    });
  }

  function setHotels(
    fetchHotelsRes: AxiosResponse<any>,
    availabilityParams: AvailabilityParams
  ) {
    const { availability, hotelsForBooking } = availabilityParams;

    /**
     * This array should be sorted the same way as "hotelsForBooking"
     * in order to referencing the same hotels while iterating
     * over both of these arrays.
     */
    let hotelsDetails = fetchHotelsRes.data.hotels.sort(
      (a: any, b: any) => a.code - b.code
    );
    let hotelAvailabilityTemp: HotelAvailability = {
      checkIn: availability.checkIn,
      checkOut: availability.checkOut,
      hotels: [],
    };

    let hotelsBuffer: any[] = sortHotelsByStarsDesc(hotelsForBooking, hotelsDetails);

    hotelAvailabilityTemp = { ...hotelAvailabilityTemp, hotels: hotelsBuffer };

    // console.log("Hotels: ", JSON.stringify(hotelAvailabilityTemp));
    setHotelAvailability(hotelAvailabilityTemp);

    if (hotelsMounted) {
      setLoading(false);
    } else {
      setLoadingOnMount(false);
      setHotelsMounted(true);
    }

    if (allHotels.length === 0) {
      setAllHotels(hotelsBuffer);
    }
  }

  function sortHotelsByStarsDesc(hotelsForBooking: any[], hotelsDetails: any): any[] {
    let unsortedHotels: any[] = [];

    for (let i = 0; i < hotelsDetails.length; i++) {
      const hotelDetail = hotelsDetails[i];
      const hotelForBooking = hotelsForBooking[i];

      unsortedHotels.push({ ...hotelForBooking, ...hotelDetail });
    }

    return unsortedHotels.sort(
      (a: HotelBooking, b: HotelBooking) => getHotelStars(b) - getHotelStars(a)
    );
  }

  /**
   * Sets hotels to an empty array in case there
   * isn't any that matches the search criteria.
   */
  function setNoHotelsAvailable(availability: any) {
    setNoHotels(true);

    setHotelAvailability({
      checkIn: availability.checkIn,
      checkOut: availability.checkOut,
      hotels: [],
    });

    if (hotelsMounted) {
      setLoading(false);
    } else {
      setLoadingOnMount(false);
      setHotelsMounted(true);
    }
  }

  function setMaximumPriceInRange(hotelsForBooking: any[]) {
    let sortedRates = hotelsForBooking
      .sort((a, b) => Number(a.minRate) - Number(b.minRate))
      .map((hotel) => Number(hotel.minRate));

    let mediumPrice = Math.floor(sortedRates[Math.round(sortedRates.length / 2) - 1]);
    setMaxRate(mediumPrice);
    dispatch(updateReservationParams({ priceRange: [0, mediumPrice] }));
  }

  function getCityImage() {
    const placesRequestUrl = getFindPlaceFromTextURL(city, ["name", "photos"]);

    Axios.get(proxyUrl + placesRequestUrl)
      .then((res) => {
        const photoRef = res.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
        // photoRef is the result of the initial Place Search query
        if (photoRef) {
          const imageLookupURL = getPhotoFromReferenceURL(photoRef, 700, 700);

          fetch(proxyUrl + imageLookupURL)
            .then((r) => {
              r.blob().then((blob) => {
                let convertedImage = URL.createObjectURL(blob);
                setImage(convertedImage);
              });
            })
            .catch((error) => {
              console.log("Error while getting image: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  function getHotelImage(hotel: HotelBooking) {
    /**
     * Sort by visualOrder to get the best image to use it
     * as cover.
     */
    let image = hotel.images.sort((a, b) => a.visualOrder - b.visualOrder)[0];
    return HotelBedAPI.imageURL.bigger + image.path;
  }

  function getFormattedAddress(hotel: HotelBooking) {
    return hotel.address.content;
  }

  function HotelCard({ hotel }: HotelCard) {
    return (
      <Grid container id="card" className={style.hotelCard}>
        {/* Image */}
        <Grid item className={style.hotelImageGrid} id="photo">
          {hotel.images.length > 1 && (
            <img src={`${getHotelImage(hotel)}`} className={style.hotelImage} />
          )}
        </Grid>

        {/* Content */}
        <Grid item className={style.hotelContentGrid} id="content">
          <Grid item xs={12} id="title">
            <Grid
              container
              alignItems="center"
              style={{ margin: "10px 0px", paddingLeft: "10px" }}
            >
              <Text component="h3" style={{ marginRight: "10px" }} bold>
                {hotel.name.content}
              </Text>

              <div>
                <Rating type="star" score={getHotelStars(hotel)} />
              </div>
            </Grid>
          </Grid>

          {/* Card content */}
          <Grid container className={style.defaultContentContainer}>
            {/* Price and details button */}
            <Grid item className={style.priceAndDetailsGrid}>
              <div>
                <h4 style={{ textAlign: "center" }}>{`From $ ${hotel.minRate}`}</h4>
                <CustomButton
                  backgroundColor={Colors.PURPLE}
                  onClick={() => history.push(`${Routes.HOTELS}/${hotel.code}`)}
                >
                  View details
                </CustomButton>
              </div>
            </Grid>

            <Grid item style={{ height: "90%" }}>
              <Divider orientation="vertical" />
            </Grid>

            {/* Contact and address */}
            <Grid item className={style.addressContactGrid}>
              <div>
                <p className={style.cardText}>
                  <b>Hotel info</b>
                </p>

                <IconText
                  text={hotel.phones[0].phoneNumber}
                  icon={faPhone}
                  style={{ marginBottom: "5px" }}
                />

                <IconText
                  text={capitalizeString(getFormattedAddress(hotel), "full sentence")}
                  icon={faMapMarkerAlt}
                />
              </div>
            </Grid>
          </Grid>

          {/* Card content for SM size */}
          <Grid container className={style.smContentContainer}>
            {/* Price and details button */}
            <Grid item xs={12}>
              <div style={{ paddingLeft: "10px" }}>
                <IconText
                  text={hotel.phones[0].phoneNumber}
                  icon={faPhone}
                  style={{ marginBottom: "5px" }}
                />

                <IconText
                  text={capitalizeString(getFormattedAddress(hotel), "full sentence")}
                  icon={faMapMarkerAlt}
                />
              </div>
            </Grid>

            <Grid item xs={12} style={{ padding: "10px" }}>
              <Grid container>
                <Text component="h3" bold>{`$ From ${hotel.minRate}`}</Text>
                <CustomButton
                  style={{
                    margin: "auto 0px auto auto",
                    fontSize: "16px",
                  }}
                  backgroundColor={Colors.PURPLE}
                  onClick={() => history.push(`${Routes.HOTELS}/${hotel.code}`)}
                >
                  View details
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function onOccupanciesParamChange(e: ChangeEvent<SelectEvent>, param: Occupancy) {
    let value: number = e.target.value as number;

    if (param.field === "children") {
      let paxes: HotelPax[] = [];

      for (let i = 0; i < value; i++) {
        paxes.push({ type: "CH", age: 4 });
      }

      dispatch(
        updateReservationParams({
          children: value,
          paxes: paxes,
          occupancyParamsChanged: true,
        })
      );
    } else {
      dispatch(
        updateReservationParams({
          [param.field]: value,
          occupancyParamsChanged: true,
        })
      );
    }
  }

  function onChildAgeChanged(e: ChangeEvent<SelectEvent>, index: number) {
    let newPaxes: HotelPax[] = [];

    newPaxes = state.paxes.map((pax, i) => {
      if (i === index) {
        return { ...pax, age: e.target.value as number };
      }
      return pax;
    });

    dispatch(updateReservationParams({ paxes: newPaxes, occupancyParamsChanged: true }));
  }

  function onOccupancyDateChange(date: any, param: "checkIn" | "checkOut") {
    dispatch(updateReservationParams({ [param]: date, occupancyParamsChanged: true }));
  }

  function onOccupanciesPopoverChange(event: MouseEvent<HTMLButtonElement>) {
    setOccupanciesAnchor(event.currentTarget);
    setOpenOccupancies(true);
  }

  function onPopoverClose() {
    setOccupanciesAnchor(null);
    setOpenOccupancies(false);
  }

  function onSearchButtonPress() {
    setLoading(true);

    searchHotels();
    dispatch(updateReservationParams({ occupancyParamsChanged: false }));
  }

  function getOccupancyText() {
    let roomQty = state.rooms > 1 ? "rooms" : "room";
    let adultQty = state.adults > 1 ? "adults" : "adult";

    return `${state.rooms} ${roomQty}, ${state.adults} ${adultQty}, ${state.children} children`;
  }

  function onSortOptionChange(option: SortOption) {
    setSortOption(option);
    sortHotels(option);
  }

  function sortHotels(option: SortOption) {
    let buffer: any[] = [];

    switch (option) {
      case "Name | A - Z":
        buffer = hotelAvailability.hotels.sort((a: HotelBooking, b: HotelBooking) =>
          a.name.content.localeCompare(b.name.content)
        );
        break;

      case "Name | Z - A":
        buffer = hotelAvailability.hotels.sort((a: HotelBooking, b: HotelBooking) =>
          b.name.content.localeCompare(a.name.content)
        );
        break;

      case "Stars | asc":
        buffer = hotelAvailability.hotels.sort(
          (a: HotelBooking, b: HotelBooking) => getHotelStars(a) - getHotelStars(b)
        );
        break;

      case "Stars | desc":
        buffer = hotelAvailability.hotels.sort(
          (a: HotelBooking, b: HotelBooking) => getHotelStars(b) - getHotelStars(a)
        );
        break;

      case "Price | asc":
        buffer = hotelAvailability.hotels.sort(
          (a: HotelBooking, b: HotelBooking) => a.minRate - b.minRate
        );
        break;

      case "Price | desc":
        buffer = hotelAvailability.hotels.sort(
          (a: HotelBooking, b: HotelBooking) => b.minRate - a.minRate
        );
        break;

      default:
        buffer = hotelAvailability.hotels;
    }

    setHotelAvailability({ ...hotelAvailability, hotels: buffer });
  }

  function areCardsLoading() {
    return loadingOnMount || loading;
  }

  function onPriceRangeChange(range: number[]) {
    dispatch(updateReservationParams({ priceRange: range }));
    let min = range[0];
    let max = range[1];

    let buffer = allHotels.filter(
      (hotel) => hotel.minRate >= min && hotel.minRate <= max
    );
    setHotelAvailability({ ...hotelAvailability, hotels: buffer });
  }

  function onStarChange(star: number) {
    dispatch(updateReservationParams({ stars: star }));
    let buffer = allHotels.filter((hotel) => getHotelStars(hotel) >= star);

    setHotelAvailability({ ...hotelAvailability, hotels: buffer });
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Hotels in Paris</title>
      </Helmet>

      <Navbar />

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Travel-Agent/destinations/paris.jpg")`,
        }}
        className={style.background}
      ></div>
      <Grid container>
        {/* Page title grid*/}
        <Grid item xs={12} className={style.pageTitleGrid}>
          <Grid container style={{ height: "100%" }}>
            {/* Services bar and title */}
            <Grid item xs={12}>
              <Grid container>
                {/* Services toolbar */}
                <Grid item xs={12}>
                  <ServicesToolbar style={{ boxShadow: Shadow.MEDIUM }} />
                </Grid>

                {/* Title */}
                <Grid item xs={10} style={{ margin: "0px auto" }}>
                  <Text
                    style={{ position: "relative" }}
                    component="hm"
                    color="white"
                    bold
                  >
                    Hotels in Paris
                  </Text>
                </Grid>
              </Grid>
            </Grid>

            {/* Reservation params box*/}
            <Grid item xs={10} className={style.reservationParamBox}>
              <Grid container spacing={2} className={style.pageTitleContainer}>
                {/* Dates */}
                <ThemeProvider theme={theme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item className={style.datepickerItemGrid}>
                      <h5 className={style.whiteParamText}>Check-in</h5>
                      <KeyboardDatePicker
                        value={state.checkIn}
                        labelFunc={muiDateFormatter}
                        className={style.datepicker}
                        minDate={new Date()}
                        format="dd MMM., yyyy"
                        onChange={(date) => onOccupancyDateChange(date, "checkIn")}
                      />
                    </Grid>

                    <Grid item className={style.datepickerItemGrid}>
                      <h5 className={style.whiteParamText}>Check-out</h5>
                      <KeyboardDatePicker
                        value={state.checkOut}
                        labelFunc={muiDateFormatter}
                        className={style.datepicker}
                        minDate={new Date()}
                        format="dd MMM., yyyy"
                        onChange={(date) => onOccupancyDateChange(date, "checkOut")}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </ThemeProvider>

                {/* Occupancy params */}
                <Grid item className={style.occupancyGrid}>
                  <Grid container alignItems="flex-end" style={{ height: "100%" }}>
                    <h5 className={style.whiteParamText}>Occupancy</h5>
                    <CustomButton
                      backgroundColor={"white"}
                      style={{ height: "32px", width: "100%" }}
                      textColor={Colors.BLUE}
                      onClick={(e) => onOccupanciesPopoverChange(e)}
                    >
                      {getOccupancyText()}
                    </CustomButton>
                  </Grid>
                </Grid>

                {/* Search Button */}
                <Grid item className={style.searchButtonGrid}>
                  <Grid
                    container
                    justify="flex-end"
                    alignItems="flex-end"
                    style={{ height: "100%" }}
                  >
                    <CustomButton
                      backgroundColor={Colors.GREEN}
                      rounded
                      className={style.searchButton}
                      onClick={() => onSearchButtonPress()}
                    >
                      {`${state.occupancyParamsChanged ? "Update search" : "Search"}`}
                    </CustomButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Page content */}
        <Grid item className={style.pageContainerChilds}>
          <Grid container className={style.pageContentContainer}>
            {/* Filters */}
            <Grid item className={style.filtersGrid}>
              <div className={style.filtersContainer}>
                <Text component="h4" weight="bold" style={{ color: Colors.BLUE }}>
                  Price range
                </Text>
                <PriceRange
                  value={state.priceRange}
                  max={maxRate}
                  updateState={onPriceRangeChange}
                />

                <Divider style={{ margin: "10px auto" }} />

                <Text component="h4" weight="bold" style={{ color: Colors.BLUE }}>
                  Stars
                </Text>
                <Rating
                  type="star"
                  score={state.stars}
                  onChange={onStarChange}
                  size="2x"
                />
              </div>
            </Grid>

            {/* Hotels grid */}
            <Grid
              item
              className={loadingOnMount ? style.hotelsGridLoading : style.hotelsGrid}
            >
              <Grid container>
                {/* Sort by and filter button */}
                <Grid item className={style.sortFilterGrid}>
                  <Grid container>
                    <Grid item className={style.filterButtonGrid}>
                      <Grid container alignItems="center" style={{ height: "100%" }}>
                        <CustomButton
                          icon={faFilter}
                          backgroundColor={Colors.PURPLE}
                          style={{ paddingLeft: "10px", fontSize: "14px" }}
                          onClick={() => setOpenDrawer(true)}
                        >
                          Filter
                        </CustomButton>
                      </Grid>
                    </Grid>

                    <Grid item className={style.sortGrid}>
                      <Grid container className={style.sortContainer} alignItems="center">
                        <Text
                          bold
                          style={{ alignSelf: "end", margin: "auto" }}
                          color={"white"}
                        >
                          Sort by
                        </Text>

                        <ThemeProvider theme={theme}>
                          <FormControl className={style.sortFormControl}>
                            <Select
                              value={sortOption}
                              variant="outlined"
                              classes={{ icon: style.selectIcon }}
                              className={style.select}
                              onChange={(e) =>
                                onSortOptionChange(e.target.value as SortOption)
                              }
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
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Hotel cards */}
                <Grid item style={{ margin: "auto" }}>
                  {areCardsLoading() && (
                    <ProgressCircle className={loading ? style.loadingCircle : ""} />
                  )}

                  {!loadingOnMount && (
                    <div
                      className={
                        loading
                          ? style.hotelCardContainerLoading
                          : style.hotelCardContainer
                      }
                    >
                      {hotelAvailability.hotels.slice(0, 20).map((hotel) => (
                        <HotelCard key={hotel.code} hotel={hotel} />
                      ))}
                    </div>
                  )}

                  {/* No hotels */}
                  {noHotels && (
                    <Grid container className={style.noHotelsContainer}>
                      {/* Message */}
                      <Grid item xs={8}>
                        <Text component="h1" bold color={Colors.BLUE}>
                          Oops...
                        </Text>

                        <Text component="h4">
                          Hey! It looks like no hotels match the search criteria. Try with
                          different dates or occupancy
                        </Text>
                      </Grid>

                      {/* Image */}
                      <Grid item xs={4}>
                        <Grid
                          alignItems="center"
                          justify="center"
                          container
                          style={{ height: "100%" }}
                        >
                          <img
                            src="/Travel-Agent/not-found.png"
                            className={style.notFoundImg}
                            alt="no hotels found"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Drawer filter */}
      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        classes={{ root: style.drawer, paper: style.drawer }}
      >
        <h2>Search filters</h2>

        <h3>Price range</h3>
        <PriceRange
          value={state.priceRange}
          max={maxRate}
          updateState={onPriceRangeChange}
        />

        <Divider style={{ margin: "10px auto" }} />

        <h3 style={{ marginBottom: "10px" }}>Stars</h3>
        <HotelStarSelector
          value={state.stars}
          updateState={(star) => dispatch(updateReservationParams({ stars: star }))}
        />
      </Drawer>

      {/* Occupancies popover  */}
      <Popover
        open={openOccupancies}
        anchorEl={occupanciesAnchor}
        onClose={() => onPopoverClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{ paper: style.popoverPaper }}
      >
        {/* Passenger params */}
        <ThemeProvider theme={theme}>
          {occupanciesParams.map((param) => (
            <Grid item style={{ marginBottom: "10px" }}>
              {/* Icon */}
              <Grid container>
                <Grid container alignItems="center" style={{ width: "auto" }}>
                  <FontAwesomeIcon icon={param.icon} color={Colors.BLUE} />
                  <h5 className={style.occupancyParamText}>{param.label}</h5>
                </Grid>

                {/* Select */}
                <FormControl
                  className="formControl"
                  style={{ width: "45%", marginLeft: "auto" }}
                >
                  <Select
                    value={state[param.field]}
                    style={{ height: "30px" }}
                    classes={{ icon: style.selectIcon }}
                    variant="outlined"
                    className={style.select}
                    onChange={(e) => onOccupanciesParamChange(e, param)}
                  >
                    {param.values.map((n) => (
                      <MenuItem value={n}>{n}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ))}

          {/* Children ages */}
          <div>
            {state.paxes.length > 0 && <Divider style={{ margin: "15px auto" }} />}

            {state.paxes.map((pax, i) => (
              <Grid key={i} item style={{ marginBottom: "10px" }}>
                <Grid container>
                  {/* Icon */}
                  <Grid container alignItems="center" style={{ width: "auto" }}>
                    <FontAwesomeIcon icon={faChild} color={Colors.BLUE} />
                    <h5 className={style.occupancyParamText}>{`Child ${i + 1} age`}</h5>
                  </Grid>

                  {/* Select */}
                  <FormControl
                    className="formControl"
                    style={{ width: "45%", marginLeft: "auto" }}
                  >
                    <Select
                      value={pax.age}
                      style={{ height: "30px" }}
                      classes={{ icon: style.selectIcon }}
                      variant="outlined"
                      className={style.select}
                      onChange={(e) => onChildAgeChanged(e, i)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <MenuItem value={n}>{n}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            ))}
          </div>
        </ThemeProvider>
      </Popover>
    </div>
  );
}
