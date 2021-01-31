import DateFnsUtils from "@date-io/date-fns";
import {
  faBed,
  faChild,
  faFilter,
  faMapMarker,
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
  Select,
  Slider,
  ThemeProvider,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, compareAsc, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Family } from "../../assets/fonts";
import {
  CustomButton,
  PriceRange,
  HotelStarSelector,
  IconText,
  Navbar,
  ServicesToolbar,
  StarRating,
  Text,
} from "../../components";
import { HotelAmenitiesSelector } from "../../components/atoms/HotelAmenitiesSelector/HotelAmenitiesSelector";
import { Colors, Shadow } from "../../styles";
import {
  getFindPlaceFromTextURL,
  getLocalStorageConsumption,
  getPhotoFromReferenceURL,
  GoogleAPI,
  HotelAmenity,
  hotelPlaceholder,
  muiDateFormatter,
} from "../../utils";
import { AmenitiesList, Amenity } from "../../utils/HotelAmenities";
import { Hotel, HotelOffer } from "../../utils/types/Hotel";
import { hotelsStyles } from "./hotels-styles";
import { format } from "date-fns";
import Rating from "react-rating";
import Helmet from "react-helmet";
import Axios from "axios";
import { createStringLiteral } from "typescript";
import { addSeconds } from "date-fns/esm";

interface HotelSearch {
  checkIn: MaterialUiPickersDate;
  checkOut: MaterialUiPickersDate;
  adults: unknown;
  children: unknown;
  rooms: unknown;
  priceRange: number[];
  stars: number;
  amenities: Amenity[];
  [key: string]: HotelSearch[keyof HotelSearch];
}

interface HotelCard {
  hotelOffer: HotelOffer;
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
    },
  });

  const style = hotelsStyles();

  const hotelReservationParams = [
    {
      label: "Adults",
      field: "adults",
      icon: faUser,
    },
    {
      label: "Children",
      field: "children",
      icon: faChild,
    },
    {
      label: "Rooms",
      field: "rooms",
      icon: faBed,
    },
  ];

  const [state, setState] = useState<HotelSearch>({
    checkIn: new Date(),
    checkOut: addDays(new Date(), 2),
    adults: "",
    children: "",
    rooms: "",
    priceRange: [0, 100],
    stars: 0,
    amenities: AmenitiesList,
  });

  const hotels: HotelOffer[] = [hotelPlaceholder, hotelPlaceholder, hotelPlaceholder];
  const [openDrawer, setOpenDrawer] = useState(false);
  const [image, setImage] = useState<string>("");
  getLocalStorageConsumption("kB");

  const city = "Paris";

  useEffect(() => {
    // getCityImage();

    if (isNewAccessTokenRequired()) {
      console.log("Fetching new access token...");
      fetchAccessToken()
        .then((res) => {
          const accessToken = res.data.access_token;
          const expiresIn = res.data.expires_in;

          const newAccessToken = {
            token: accessToken,
            expiration: addSeconds(Date.now(), expiresIn),
          };
          localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

          fetchHotelOffers(accessToken);
        })
        .catch((error) => {
          console.log("Error in POST request from Amadeus: ", error);
        });
    } else {
      console.log("Using stored access token...");
      const accessTokenRaw = localStorage.getItem("accessToken");
      let curAccessToken = {
        token: 0,
      };
      if (accessTokenRaw !== null) {
        curAccessToken = JSON.parse(accessTokenRaw);
      }

      fetchHotelOffers(curAccessToken.token);
    }
  }, []);

  function isNewAccessTokenRequired() {
    const accessTokenRaw = localStorage.getItem("accessToken");
    if (accessTokenRaw === null) {
      return true;
    }
    let curAccessToken = JSON.parse(accessTokenRaw);

    return compareAsc(new Date(Date.now()), parseISO(curAccessToken.expiration)) > -1;
  }

  function fetchAccessToken() {
    const amadeusTokenRequest = `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_KEY}&client_secret=${process.env.REACT_APP_AMADEUS_SECRET}`;

    return Axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      amadeusTokenRequest,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  function fetchHotelOffers(accessToken: number) {
    Axios.get(
      "https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=NYC&checkInDate=2021-02-25&roomQuantity=1&adults=2&radius=5&radiusUnit=KM&ratings=5&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=NONE",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getCityImage() {
    const placesRequestUrl = getFindPlaceFromTextURL(city, ["name", "photos"]);

    Axios.get(GoogleAPI.proxyUrl + placesRequestUrl)
      .then((res) => {
        const photoRef = res.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
        // photoRef is the result of the initial Place Search query
        if (photoRef) {
          const imageLookupURL = getPhotoFromReferenceURL(photoRef, 700, 700);

          fetch(GoogleAPI.proxyUrl + imageLookupURL)
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

  function getMinorPrice(hotel: HotelOffer) {
    let minorPrice = Number(hotel.offers[0].price.total);
    hotel.offers.forEach((offer) => {
      let offerPrice = Number(offer.price.total);

      if (offerPrice < minorPrice) {
        minorPrice = Number(offer.price.total);
      }
    });
    return minorPrice;
  }

  function capitalizeString(value: string, type: "each word" | "full sentence") {
    value = value.toLowerCase();

    if (type === "each word") {
      let words = value.split(" ");
      return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    } else {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

  function getFormattedAddress(hotelOffer: HotelOffer) {
    return hotelOffer.hotel.address.lines.join("");
  }

  function HotelCard({ hotelOffer }: HotelCard) {
    return (
      <Grid container id="card" className={style.hotelCard}>
        <Grid item className={style.hotelImageGrid} id="photo">
          <img src={"/Travel-Agent/h1.jpg"} className={style.hotelImage} />
        </Grid>

        <Grid item className={style.hotelContentGrid} id="content">
          <Grid item xs={12} id="title">
            <Grid container alignItems="center" style={{ margin: "10px 0px" }}>
              <h3 style={{ margin: "0px 10px" }}>
                {capitalizeString(hotelOffer.hotel.name, "each word")}
              </h3>

              <div className={style.hotelStarContainer}>
                <StarRating stars={Number(hotelOffer.hotel.rating)} />
              </div>
            </Grid>
          </Grid>

          {/* Card content */}
          <Grid container className={style.defaultContentContainer}>
            {/* Price and details button */}
            <Grid item className={style.priceAndDetailsGrid}>
              <div>
                <h4 style={{ textAlign: "center" }}>{`From $ ${getMinorPrice(
                  hotelOffer
                )}`}</h4>
                <CustomButton backgroundColor={Colors.PURPLE} onClick={() => {}}>
                  View details
                </CustomButton>
              </div>
            </Grid>

            {/* Contact and address */}
            <Grid item className={style.addressContactGrid}>
              <div>
                <p className={style.cardText}>
                  <b>Hotel info</b>
                </p>

                <IconText
                  text={hotelOffer.hotel.contact.phone}
                  icon={faPhone}
                  style={{ marginBottom: "5px" }}
                />

                <IconText
                  text={capitalizeString(
                    getFormattedAddress(hotelOffer),
                    "full sentence"
                  )}
                  icon={faMapMarkerAlt}
                />
              </div>
            </Grid>

            <Grid item className={style.cardData2}>
              <div>
                <p className={style.cardText}>
                  <b>Amenities</b>
                </p>
                {hotelOffer.hotel.amenities.slice(0, 5).map((amenity, i) => (
                  <IconText
                    key={i}
                    style={{ marginBottom: "5px" }}
                    text={amenity.value}
                    icon={amenity.icon}
                  />
                ))}
              </div>
            </Grid>
          </Grid>

          {/* Card content for SM size */}
          <Grid container className={style.smContentContainer}>
            {/* Contact and address */}
            <Grid item xs={12} style={{ padding: "10px" }}>
              <div>
                <IconText
                  text={hotelOffer.hotel.contact.phone}
                  icon={faPhone}
                  style={{ marginBottom: "5px" }}
                />

                <IconText
                  text={capitalizeString(
                    getFormattedAddress(hotelOffer),
                    "full sentence"
                  )}
                  icon={faMapMarkerAlt}
                />
              </div>
            </Grid>

            {/* Amenities */}
            <Grid item xs={12} style={{ padding: "0px 10px" }}>
              <div>
                <p className={style.cardText}>
                  <b>Amenities</b>
                </p>
                <Grid container>
                  {hotelOffer.hotel.amenities.slice(0, 5).map((amenity) => (
                    <IconText
                      key={amenity.key}
                      style={{ margin: "0px 5px 5px 5px" }}
                      text={amenity.value}
                      icon={amenity.icon}
                    />
                  ))}
                </Grid>
              </div>
            </Grid>

            {/* Price and details button */}
            <Grid item xs={12} style={{ padding: "10px" }}>
              <Grid container>
                <h2 style={{ textAlign: "center", marginRight: "auto" }}>
                  {`$ From ${getMinorPrice(hotelOffer)}`}
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
                      <h5 className={style.reservationParamText}>Check-in</h5>
                      <KeyboardDatePicker
                        value={state.checkIn}
                        labelFunc={muiDateFormatter}
                        className={style.datepicker}
                        minDate={new Date()}
                        format="dd MMM., yyyy"
                        onChange={(d) => setState({ ...state, checkIn: d })}
                      />
                    </Grid>

                    <Grid item className={style.datepickerItemGrid}>
                      <h5 className={style.reservationParamText}>Check-out</h5>
                      <KeyboardDatePicker
                        value={state.checkOut}
                        labelFunc={muiDateFormatter}
                        className={style.datepicker}
                        minDate={new Date()}
                        format="dd MMM., yyyy"
                        onChange={(d) => setState({ ...state, checkOut: d })}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </ThemeProvider>

                {/* Passenger params */}
                <ThemeProvider theme={theme}>
                  {hotelReservationParams.map((param) => (
                    <Grid item className={style.revervationParamsGrid}>
                      <h5 className={style.reservationParamText}>{param.label}</h5>

                      <FormControl style={{ width: "100%" }}>
                        <Select
                          value={state[param.field]}
                          style={{ height: "30px" }}
                          variant="outlined"
                          className={style.select}
                          startAdornment={
                            <FontAwesomeIcon icon={param.icon} color={Colors.BLUE} />
                          }
                          onChange={(e) =>
                            setState({ ...state, [param.field]: e.target.value })
                          }
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                            <MenuItem value={n}>{n}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  ))}

                  {/* Search Button */}
                  <Grid item xs={2} style={{ marginLeft: "auto" }}>
                    <Grid
                      container
                      justify="flex-end"
                      alignItems="flex-end"
                      style={{ height: "100%" }}
                    >
                      <CustomButton
                        backgroundColor={Colors.GREEN}
                        rounded
                        style={{
                          width: "140px",
                          minWidth: "115px",
                          boxShadow: Shadow.MEDIUM,
                          color: Colors.BLUE,
                        }}
                        onClick={() => {
                          state.amenities.forEach((am) => {
                            if (am.checked) {
                              console.log(am.value);
                            }
                          });
                        }}
                      >
                        Search
                      </CustomButton>
                    </Grid>
                  </Grid>
                </ThemeProvider>
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
                  max={200}
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

                <Divider style={{ margin: "10px auto" }} />

                <Text component="h4" weight="bold" style={{ color: Colors.BLUE }}>
                  Amenities
                </Text>
                <HotelAmenitiesSelector
                  values={state.amenities}
                  updateState={(selected) => {
                    setState({ ...state, amenities: selected });
                  }}
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
            <Grid item className={style.hotelsGrid}>
              {hotels.map((hotel, i) => (
                <HotelCard key={i} hotelOffer={hotel} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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

        <Divider style={{ margin: "10px auto" }} />

        <h3>Amenities</h3>
        <HotelAmenitiesSelector
          values={state.amenities}
          buttonColor="white"
          updateState={(selected) => {
            setState({ ...state, amenities: selected });
          }}
        />
      </Drawer>
    </div>
  );
}
