import DateFnsUtils from "@date-io/date-fns";
import { faBed, faChild, faFilter, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  Grid,
  MenuItem,
  Popover,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Family } from "../../assets/fonts";
import {
  CustomButton,
  HotelCard,
  HotelStarSelector,
  Navbar,
  NotAvailableCard,
  Pagination,
  PriceRange,
  ProgressCircle,
  Rating,
  ServicesToolbar,
  SortPageSize,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  convertReservationParamsToURLParams,
  convertURLToReservationParams,
  getCityImage,
  getHotelStars,
  HotelBedAPI,
  hotelsPlaceholder,
  muiDateFormatter,
  selectHotelReservationParams,
  selectOpenRedirecDialog,
} from "../../utils";
import { proxyUrl } from "../../utils/external-apis";
import {
  setOpenRedirecDialog,
  updateReservationParams,
} from "../../utils/store/hotel-slice";
import {
  HotelAvailability,
  HotelBooking,
  HotelBookingParams,
  HotelPax,
  Occupancy,
} from "../../utils/types/hotel-types";
import { hotelsStyles } from "./hotels-styles";

interface AvailabilityParams {
  availability: any;
  hotelsForBooking: any[];
}

interface HotelSearchFilter {
  stars: number;
  priceRange: number[];
  occupancyParamsChanged: boolean;
}

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

  const location = useLocation();

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

  const [urlParams, setURLParams] = useState<{ [index: string]: string }>(
    getURLParamsAsKVP()
  );

  const [state, setState] = useState<HotelSearchFilter>({
    priceRange: [0, 500],
    stars: 0,
    occupancyParamsChanged: false,
  });

  let reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

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

  const sortOptions: string[] = [
    "Name | A - Z",
    "Name | Z - A",
    "Stars | desc",
    "Stars | asc",
    "Price | desc",
    "Price | asc",
  ];

  const [sortOption, setSortOption] = useState<string>(getSortOption());

  const [loadingOnMount, setLoadingOnMount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hotelsMounted, setHotelsMounted] = useState(false);

  const [maxRate, setMaxRate] = useState<number>(500);

  const [noHotels, setNoHotels] = useState(false);

  const pageSizeOptions = [20, 30, 40];
  const [pageSize, setPageSize] = useState(getPageSize());
  const [page, setPage] = useState(getPage());

  const openRedirecDialog: boolean = useSelector(selectOpenRedirecDialog);

  const history = useHistory();

  const city = "Paris";

  const firstRender = useRef(true);

  useEffect(() => {
    getCityImage(city).then((res) => {
      setImage(String(res));
    });

    if (isURLWithParams()) {
      reservationParams = convertURLToReservationParams(location.search, "hotel");

      dispatch(updateReservationParams(reservationParams));
      searchHotels(reservationParams);
    } else {
      updateURL();
      searchHotels(reservationParams);
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender()) {
      searchHotels(reservationParams);
    }
  }, [state.stars]);

  //On sortOption, page, pageSize change
  useEffect(() => {
    if (!isFirstRender()) {
      updateURL();
    }
  }, [sortOption, page, pageSize]);

  function searchHotels(reservationParams: HotelBookingParams) {
    if (!isFirstRender()) {
      updateURL();
    }

    fetchHotelAvailability(reservationParams)
      .then((availabilityRes) => {
        let availability = availabilityRes.data.hotels;
        let hotelsForBooking: any[] = [];

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

  function fetchHotelAvailability(reservationParams: HotelBookingParams) {
    const filter = {
      maxHotels: 250,
      //stars
      minCategory: state.stars === 0 ? 1 : state.stars,
      minRate: state.priceRange[0],
    };

    const bookingParams = {
      ...reservationParams,
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

    let hotelsBuffer: HotelBooking[] = buildHotels(hotelsForBooking, hotelsDetails);
    let sortedHotels: HotelBooking[] = sortHotels(sortOption, hotelsBuffer);

    hotelAvailabilityTemp = { ...hotelAvailabilityTemp, hotels: sortedHotels };

    setHotelAvailability(hotelAvailabilityTemp);
    firstRender.current = false;

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

  /**
   * Combines the hotels from responses of both requests(hotel availability and hotel content)
   * into a single type: HotelBooking.
   *
   * This combination is required in order to have the booking information
   * and hotel details of each hotel.
   */
  function buildHotels(hotelsForBooking: any[], hotelsDetails: any): HotelBooking[] {
    let hotels: HotelBooking[] = [];

    for (let i = 0; i < hotelsDetails.length; i++) {
      const hotelDetailBuffer = hotelsDetails[i];
      /**
       * I don't want the "rooms" key of hotelDetail to
       * override the key with the same name of
       * hotelForBooking, because the "rooms" key of
       * hotelDetail doesn't contain info about the
       * reservation and the rates of the different
       * rooms. Therefore, I extract the "rooms" key and
       * copy all other properties in the variable
       * "hotelDetail".
       */
      const { rooms, ...hotelDetail } = hotelDetailBuffer;
      const hotelForBooking = hotelsForBooking[i];

      hotels.push({ ...hotelForBooking, ...hotelDetail });
    }

    return hotels;
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

  function isURLWithParams(): boolean {
    return location.search !== "";
  }

  function isFirstRender() {
    return firstRender.current;
  }

  /**
   * Updates de URL using the reservation parameters.
   * It uses the the reservation parameters in the Redux store
   * unless the optional argument is provided.
   * @param optionalReservationParams
   */
  function updateURL(optionalReservationParams?: HotelBookingParams) {
    let validReservationParams: HotelBookingParams = optionalReservationParams
      ? optionalReservationParams
      : reservationParams;

    history.push(
      `${location.pathname}${convertReservationParamsToURLParams(
        validReservationParams,
        "hotel"
      )}&sortBy=${sortOption}&page=${page + 1}&pageSize=${pageSize}`
    );

    //To avoid setting the urlParams variable twice on the first render.
    if (!isFirstRender()) {
      setURLParams(getURLParamsAsKVP());
    }
  }

  function getPage(): number {
    let page = 0;

    if (isURLWithParams() && urlParams.hasOwnProperty("page")) {
      page = Number(urlParams["page"]);
    }

    return page;
  }

  function getPageSize(): number {
    let pageSize = 20;

    if (isURLWithParams() && urlParams.hasOwnProperty("pageSize")) {
      pageSize = Number(urlParams["pageSize"]);
    }

    return pageSize;
  }

  function getSortOption(): string {
    let sortOption = "Stars | desc";

    if (isURLWithParams() && urlParams.hasOwnProperty("sortBy")) {
      sortOption = urlParams["sortBy"];
    }

    return sortOption;
  }

  function getURLParamsAsKVP() {
    let kvpObject: { [key: string]: string } = {};

    location.search
      .substring(1)
      .split("&")
      .forEach((kvp) => {
        let key = kvp.split("=")[0];
        let value = kvp.split("=")[1];

        if (key === "page") {
          value = String(Number(value) - 1);
          kvpObject = { ...kvpObject, [key]: value };
        } else if (key === "sortBy") {
          kvpObject = { ...kvpObject, [key]: decodeURIComponent(value) };
        } else {
          kvpObject = { ...kvpObject, [key]: value };
        }
      });

    // console.log("kvpObject: ", JSON.stringify(kvpObject));
    return kvpObject;
  }

  function setMaximumPriceInRange(hotelsForBooking: any[]) {
    let sortedRates = hotelsForBooking
      .sort((a, b) => Number(a.minRate) - Number(b.minRate))
      .map((hotel) => Number(hotel.minRate));

    let mediumPrice = Math.floor(sortedRates[Math.round(sortedRates.length / 2) - 1]);
    setMaxRate(mediumPrice);

    setState({ ...state, priceRange: [state.priceRange[0], mediumPrice] });
  }

  function onOccupanciesParamChange(e: ChangeEvent<SelectEvent>, param: Occupancy) {
    let value: number = e.target.value as number;

    if (param.field === "children") {
      let paxes: HotelPax[] = [];

      for (let i = 0; i < value; i++) {
        paxes.push({ type: "CH", age: 4 });
      }

      let occupancies = [
        { ...reservationParams.occupancies[0], children: value, paxes: paxes },
      ];

      dispatch(updateReservationParams({ occupancies }));

      setState({ ...state, occupancyParamsChanged: true });
    } else {
      let occupancies = [{ ...reservationParams.occupancies[0], [param.field]: value }];
      dispatch(
        updateReservationParams({
          occupancies,
        })
      );
      setState({ ...state, occupancyParamsChanged: true });
    }
  }

  function onChildAgeChanged(e: ChangeEvent<SelectEvent>, index: number) {
    let newPaxes: HotelPax[] = [];

    newPaxes = reservationParams.occupancies[0].paxes.map((pax: any, i: any) => {
      if (i === index) {
        return { ...pax, age: e.target.value as number };
      }
      return pax;
    });

    let occupancies = [{ ...reservationParams.occupancies[0], paxes: newPaxes }];

    dispatch(updateReservationParams({ occupancies }));
    setState({ ...state, occupancyParamsChanged: true });
  }

  function onOccupancyDateChange(date: any, param: "checkIn" | "checkOut") {
    let stay = { ...reservationParams.stay, [param]: date };

    dispatch(
      updateReservationParams({
        stay,
      })
    );
    setState({ ...state, occupancyParamsChanged: true });
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

    searchHotels(reservationParams);
    setState({ ...state, occupancyParamsChanged: false });
  }

  function getOccupancyText() {
    let roomQty = reservationParams.occupancies[0].rooms > 1 ? "rooms" : "room";
    let adultQty = reservationParams.occupancies[0].adults > 1 ? "adults" : "adult";

    return `${reservationParams.occupancies[0].rooms} ${roomQty}, ${reservationParams.occupancies[0].adults} ${adultQty}, ${reservationParams.occupancies[0].children} children`;
  }

  function onSortOptionChange(option: string) {
    setSortOption(option);
    let sortedHotels = sortHotels(option, hotelAvailability.hotels);
    setHotelAvailability({ ...hotelAvailability, hotels: sortedHotels });
  }

  function sortHotels(option: string, hotels: HotelBooking[]) {
    let buffer: any[] = [];

    switch (option) {
      case "Name | A - Z":
        buffer = hotels.sort((a: HotelBooking, b: HotelBooking) =>
          a.name.content.localeCompare(b.name.content)
        );
        break;

      case "Name | Z - A":
        buffer = hotels.sort((a: HotelBooking, b: HotelBooking) =>
          b.name.content.localeCompare(a.name.content)
        );
        break;

      case "Stars | asc":
        buffer = hotels.sort(
          (a: HotelBooking, b: HotelBooking) => getHotelStars(a) - getHotelStars(b)
        );
        break;

      case "Stars | desc":
        buffer = hotels.sort(
          (a: HotelBooking, b: HotelBooking) => getHotelStars(b) - getHotelStars(a)
        );
        break;

      case "Price | asc":
        buffer = hotels.sort((a: HotelBooking, b: HotelBooking) => a.minRate - b.minRate);
        break;

      case "Price | desc":
        buffer = hotels.sort((a: HotelBooking, b: HotelBooking) => b.minRate - a.minRate);
        break;

      default:
        buffer = hotels;
    }

    return buffer;
  }

  function areCardsLoading() {
    return loadingOnMount || loading;
  }

  function onPriceRangeChange(range: number[]) {
    let min = range[0];
    let max = range[1];

    let buffer = allHotels.filter(
      (hotel) => hotel.minRate >= min && hotel.minRate <= max
    );
    setState({ ...state, priceRange: range });
    setHotelAvailability({ ...hotelAvailability, hotels: buffer });
  }

  function onStarChange(star: number) {
    setState({ ...state, stars: star });
    setLoading(true);
  }

  function onPageSizeChange(value: number) {
    setPageSize(value);
    setPage(0);
  }

  function onPageChange(newPage: number) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setPage(newPage - 1);
    }, 250);
  }

  function getPageCount() {
    return Math.ceil(hotelAvailability.hotels.length / pageSize);
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Hotels in Paris</title>
      </Helmet>

      <Navbar />

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
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
                        value={reservationParams.stay.checkIn}
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
                        value={reservationParams.stay.checkOut}
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
                    {/* Filter button */}
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

                    {/* Sort and paging grid */}
                    <Grid item className={style.sortGrid}>
                      <SortPageSize
                        pageSize={pageSize}
                        pageSizeOptions={pageSizeOptions}
                        sortOption={sortOption}
                        sortOptions={sortOptions}
                        onPageSizeChange={(value) => onPageSizeChange(value)}
                        onSortOptionChange={(e) =>
                          onSortOptionChange(e.target.value as string)
                        }
                      />
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
                      {hotelAvailability.hotels
                        .slice(page * pageSize, page * pageSize + pageSize)
                        .map((hotel) => (
                          <HotelCard key={hotel.code} hotel={hotel} />
                        ))}
                    </div>
                  )}

                  {/* No hotels */}
                  {noHotels && (
                    <NotAvailableCard title="Oops...">
                      Hey! It looks like no hotels match the search criteria. Try with
                      different dates or occupancy
                    </NotAvailableCard>
                  )}

                  {/* Pagination */}
                  {!loadingOnMount && (
                    <Pagination
                      page={page}
                      pageCount={getPageCount()}
                      className={style.pagination}
                      onChange={(e, page) => onPageChange(page)}
                    />
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
                    value={reservationParams.occupancies[0][param.field]}
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
            {reservationParams.occupancies[0].paxes.length > 0 && (
              <Divider style={{ margin: "15px auto" }} />
            )}

            {reservationParams.occupancies[0].paxes.map((pax, i) => (
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

      {/* Redirection dialog */}
      <Dialog
        className={style.redirectionDialog}
        open={openRedirecDialog}
        onClose={() => dispatch(setOpenRedirecDialog(false))}
      >
        <DialogTitle style={{ padding: "16px 24px 0px 16px" }}>
          <Text color={Colors.BLUE} bold component="h1">
            Hotel not available
          </Text>
        </DialogTitle>
        <DialogContent>
          <Divider />
          <Grid container>
            <Grid item xs={7}>
              <p>
                Sorry. This hotel has no rooms available for the dates and/or occupancy
                indicated.
              </p>
              <p>Redirecting to the Hotels page to enter new parameters.</p>
            </Grid>
            <Grid item xs={5}>
              <img
                src="/Travel-Agent/not-found.png"
                alt="dead-robot-emoji"
                className={style.notFoundImg}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <CustomButton
            backgroundColor={Colors.PURPLE}
            onClick={() => dispatch(setOpenRedirecDialog(false))}
          >
            Ok
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
