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
  createMuiTheme,
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
import { addDays } from "date-fns";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import Rating from "react-rating";
import { Family } from "../../assets/fonts";
import {
  CustomButton,
  HotelStarSelector,
  IconText,
  Navbar,
  PriceRange,
  ProgressCircle,
  ServicesToolbar,
  StarRating,
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
} from "../../utils";
import { proxyUrl } from "../../utils/external-apis";
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
  | "Stars | more - less"
  | "Stars | less - more";

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
          borderRadius: "10px",
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

  const [state, setState] = useState<HotelSearch>({
    checkIn: addDays(new Date(), 1),
    checkOut: addDays(new Date(), 3),
    adults: 2,
    children: 0,
    paxes: [],
    rooms: 1,
    priceRange: [0, 500],
    stars: 1,
    occupancyParamsChanged: false,
  });

  const [hotelAvailability, setHotelAvailability] = useState<HotelAvailability>(
    hotelsPlaceholder
  );

  const [openDrawer, setOpenDrawer] = useState(false);
  const [image, setImage] = useState<string>("");

  const [openOccupancies, setOpenOccupancies] = useState<boolean>(false);
  const [occupanciesAnchor, setOccupanciesAnchor] = useState<HTMLButtonElement | null>(
    null
  );

  const sortOptions: SortOption[] = [
    "Name | A - Z",
    "Name | Z - A",
    "Stars | more - less",
    "Stars | less - more",
  ];

  const [sortOption, setSortOption] = useState<SortOption>("Stars | more - less");

  const [loading, setLoading] = useState(true);

  // getLocalStorageConsumption("kB");

  const city = "Paris";

  useEffect(() => {
    searchHotels();
  }, []);

  function searchHotels() {
    fetchHotelAvailability()
      .then((availabilityRes) => {
        let availability = availabilityRes.data.hotels;
        // let topRankingHotels

        // console.log("Hotel availability fetched: ", availability.hotels.length);
        console.log("Response: ", JSON.stringify(availabilityRes.data));
        /**
         * This array should be sorted the same way as "hotelsDetails"
         * in order to referencing the same hotels while iterating
         * over both of these arrays.
         */
        let hotelsForBooking: any[] = availability.hotels.sort(
          (a: any, b: any) => a.code - b.code
        );

        setMaximumPriceInRange(hotelsForBooking);

        fetchHotels({ availability, hotelsForBooking });
      })
      .catch((error) => {
        console.log("Error in fetchHotelAvailability(): ", error);
      });
  }

  function fetchHotelAvailability() {
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
      filter: {
        maxHotels: 250,
        minCategory: state.stars, //stars
      },
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

    let hotelsBuffer: any[] = [];
    for (let i = 0; i < hotelsDetails.length; i++) {
      const hotelDetail = hotelsDetails[i];
      const hotelForBooking = hotelsForBooking[i];

      hotelsBuffer.push({ ...hotelForBooking, ...hotelDetail });
    }

    hotelsBuffer = hotelsBuffer.sort(
      (a: HotelBooking, b: HotelBooking) => getHotelStars(b) - getHotelStars(a)
    );

    hotelAvailabilityTemp = { ...hotelAvailabilityTemp, hotels: hotelsBuffer };

    // console.log("Hotels: ", JSON.stringify(hotelAvailabilityTemp));
    setHotelAvailability(hotelAvailabilityTemp);
    setLoading(false);
  }

  function setMaximumPriceInRange(hotelsForBooking: any[]) {
    let sortedRates = hotelsForBooking
      .sort((a, b) => Number(a.minRate) - Number(b.minRate))
      .map((hotel) => Number(hotel.minRate));

    let mediumPrice = Math.floor(sortedRates[Math.round(sortedRates.length / 2) - 1]);
    setState({ ...state, priceRange: [0, mediumPrice] });
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

  function getHotelStars(hotel: HotelBooking) {
    if (hotel.categoryName) {
      return Number(hotel.categoryName.split(" ")[0]);
    }
    return Number(hotel.categoryCode.split("EST")[0]);
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
            <Grid container alignItems="center" style={{ margin: "10px 0px" }}>
              <h3 style={{ margin: "0px 10px" }}>{hotel.name.content}</h3>

              <div className={style.hotelStarContainer}>
                <StarRating stars={getHotelStars(hotel)} />
              </div>
            </Grid>
          </Grid>

          {/* Card content */}
          <Grid container className={style.defaultContentContainer}>
            {/* Price and details button */}
            <Grid item className={style.priceAndDetailsGrid}>
              <div>
                <h4 style={{ textAlign: "center" }}>{`From $ ${hotel.minRate}`}</h4>
                <CustomButton backgroundColor={Colors.PURPLE} onClick={() => {}}>
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
            <Grid item xs={12} style={{ padding: "10px" }}>
              <Grid container>
                <h2 style={{ textAlign: "center", marginRight: "auto" }}>
                  {`$ From ${hotel.minRate}`}
                </h2>
                <CustomButton
                  style={{
                    margin: "auto 0px auto auto",
                    fontSize: "16px",
                  }}
                  backgroundColor={Colors.PURPLE}
                  onClick={() => {}}
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

      setState({
        ...state,
        children: value,
        paxes: paxes,
        occupancyParamsChanged: true,
      });
    } else {
      setState({ ...state, [param.field]: value, occupancyParamsChanged: true });
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

    setState({ ...state, paxes: newPaxes, occupancyParamsChanged: true });
  }

  function onOccupancyDateChange(date: any, param: "checkIn" | "checkOut") {
    setState({ ...state, [param]: date, occupancyParamsChanged: true });
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
    setState({ ...state, occupancyParamsChanged: false });
  }

  function getOccupancyText() {
    let roomQty = state.rooms > 1 ? "rooms" : "room";
    let adultQty = state.adults > 1 ? "adults" : "adult";

    return `${state.rooms} ${roomQty}, ${state.adults} ${adultQty}, ${state.children} children`;
  }

  function onSortOptionChange(option: SortOption) {
    setSortOption(option);
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
        <Grid item xs={9} className={style.pageContainerChilds}>
          <Grid container className={style.pageContentContainer}>
            {/* Filters */}
            <Grid item className={style.filtersGrid}>
              <div className={style.filtersContainer}>
                <Text component="h4" weight="bold" style={{ color: Colors.BLUE }}>
                  Price range
                </Text>
                <PriceRange
                  value={state.priceRange}
                  max={state.priceRange[1]}
                  updateState={(slider) => setState({ ...state, priceRange: slider })}
                />

                <Divider style={{ margin: "10px auto" }} />

                <Text component="h4" weight="bold" style={{ color: Colors.BLUE }}>
                  Stars
                </Text>
                <Rating
                  initialRating={state.stars}
                  onChange={(star) => setState({ ...state, stars: star })}
                  emptySymbol={
                    <FontAwesomeIcon
                      style={{ margin: "0px 1px" }}
                      size="2x"
                      icon={faStar}
                      color={"#cecece"}
                    />
                  }
                  fullSymbol={
                    <FontAwesomeIcon
                      style={{ margin: "0px 1px" }}
                      size="2x"
                      icon={faStar}
                      color={Colors.PURPLE}
                    />
                  }
                />
              </div>
            </Grid>

            <Grid item className={style.filterButtonGrid}>
              <CustomButton
                icon={faFilter}
                backgroundColor={Colors.PURPLE}
                style={{ paddingLeft: "10px", fontSize: "14px" }}
                onClick={() => setOpenDrawer(true)}
              >
                Filter
              </CustomButton>
            </Grid>

            {/* Hotels grid */}
            <Grid item className={loading ? style.hotelsGridLoading : style.hotelsGrid}>
              <Grid container>
                {/* Sort by */}
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

                {/* Hotel cards */}
                <div style={{ margin: "auto" }}>
                  {loading && <ProgressCircle />}

                  {!loading && (
                    <div>
                      {hotelAvailability.hotels.slice(0, 20).map((hotel) => (
                        <HotelCard key={hotel.code} hotel={hotel} />
                      ))}
                    </div>
                  )}
                </div>
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
          max={200}
          value={state.priceRange}
          updateState={(slider) => setState({ ...state, priceRange: slider })}
        />

        <Divider style={{ margin: "10px auto" }} />

        <h3 style={{ marginBottom: "10px" }}>Stars</h3>
        <HotelStarSelector
          value={state.stars}
          updateState={(star) => setState({ ...state, stars: star })}
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
