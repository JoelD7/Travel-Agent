import { faDollarSign, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, FormControl, Grid, MenuItem, Select } from "@material-ui/core";
import Axios from "axios";
import { differenceInHours } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoIcon } from "../../../assets";
import { Colors } from "../../../styles";
import {
  currencies,
  ExchangeRate,
  getHotelSearchURL,
  getRestaurantsDefaultRoute,
  Routes,
  selectBaseCurrency,
  selectExchangeRate,
  selectHotelReservationParams,
  setBaseCurrency,
  setExchangeRate,
} from "../../../utils";
import { IconText, Text } from "../../atoms";
import { footerStyles } from "./footer-styles";

export function Footer() {
  const style = footerStyles();

  const reservationParams = useSelector(selectHotelReservationParams);

  const bookLinks = [
    {
      label: "Hotels",
      route: getHotelSearchURL(reservationParams),
    },
    {
      label: "Flights",
      route: Routes.FLIGHTS,
    },
  ];

  const seeLinks = [
    {
      label: "Restaurants",
      route: getRestaurantsDefaultRoute(),
    },
    {
      label: "Things to do",
      route: Routes.THINGS_TODO,
    },
    {
      label: "My trips",
      route: Routes.TRIPS,
    },
    {
      label: "Reservations",
      route: Routes.RESERVATIONS,
    },
    {
      label: "Trip itinerary",
      route: Routes.ITINERARY,
    },

    {
      label: "My favorite places",
      route: Routes.FAVORITE_PLACES,
    },
  ];

  const exchangeRate: ExchangeRate = useSelector(selectExchangeRate);
  const baseCurrencyStore: string = useSelector(selectBaseCurrency);
  const [currency, setCurrency] = useState<string>(baseCurrencyStore);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!areRatesUpdated()) {
      getExchangeRates();
    }
  }, []);

  function areRatesUpdated() {
    if (exchangeRate === null) {
      return false;
    }

    return differenceInHours(Date.now(), exchangeRate.lastUpdated) < 24;
  }

  function getExchangeRates() {
    Axios.get("https://openexchangerates.org/api/latest.json", {
      params: {
        app_id: process.env.REACT_APP_CURRENCY_API_KEY,
        base: baseCurrencyStore,
      },
    })
      .then((res) => {
        let newExchangeRates = { ...res.data, lastUpdated: Date.now() };
        dispatch(setExchangeRate(newExchangeRates));

        localStorage.setItem("rates", JSON.stringify(newExchangeRates));
      })
      .catch((er) => {
        console.log(`Error: ${er}`);
      });
  }

  function onCurrencyBaseChange(
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) {
    setCurrency(e.target.value as string);
  }

  function updateBaseCurrencyInStore() {
    dispatch(setBaseCurrency(currency));
  }

  return (
    <div className={style.mainContainer}>
      <Grid container className={style.contentContainer}>
        {/* Logo */}
        <Grid item className={style.logoGrid}>
          <Grid container>
            <img src={logoIcon} className={style.logo} alt="" />
            <Text style={{ marginLeft: "5px" }} color="white" bold component="h1">
              Tripper
            </Text>
          </Grid>
        </Grid>

        {/* Content grids */}
        <Grid item className={style.contentGrid}>
          <Grid container>
            {/* Book links */}
            <Grid item className={style.linkGrid}>
              <Text color="white" bold component="h4" style={{ marginBottom: "12px" }}>
                Book
              </Text>

              {bookLinks.map((link) => (
                <Link key={link.route} className={style.link} to={link.route}>
                  <Text color="white" component="h5" style={{ marginTop: "6px" }}>
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Grid>

            {/* See links */}
            <Grid item className={style.linkGrid}>
              <Text color="white" bold component="h4" style={{ marginBottom: "12px" }}>
                See
              </Text>

              {seeLinks.map((link) => (
                <Link key={link.route} className={style.link} to={link.route}>
                  <Text color="white" component="h5" style={{ marginTop: "6px" }}>
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Grid>

            {/* Divider */}
            <Grid item className={style.dividerGrid}>
              <Grid container justify="center" style={{ height: "100%" }}>
                <Divider orientation="vertical" style={{ backgroundColor: "white" }} />
              </Grid>
            </Grid>

            {/* Contact */}
            <Grid item className={style.linkGrid}>
              <Text color="white" bold component="h4" style={{ marginBottom: "12px" }}>
                Contact info
              </Text>

              {/* eMail */}
              <Grid container alignItems="center">
                <IconText
                  fontSize={16}
                  textColor="white"
                  icon={faEnvelope}
                  style={{ marginTop: "6px" }}
                  backgroundColor={"inherit"}
                >
                  joeld200013@gmail.com
                </IconText>
              </Grid>
              {/* Phone */}
              <Grid container alignItems="center">
                <IconText
                  fontSize={16}
                  textColor="white"
                  icon={faPhone}
                  style={{ marginTop: "6px" }}
                  backgroundColor={"inherit"}
                >
                  (829) 977 0013
                </IconText>
              </Grid>
            </Grid>

            {/* Currency */}
            <Grid
              item
              className={style.currencyGrid}
              onBlur={() => updateBaseCurrencyInStore()}
            >
              <Text color="white" bold component="h4" style={{ marginBottom: "12px" }}>
                Currency
              </Text>

              <FormControl style={{ width: "100%" }} className={style.selectControl}>
                <Select
                  value={baseCurrencyStore}
                  variant="outlined"
                  className={style.select}
                  startAdornment={
                    <FontAwesomeIcon icon={faDollarSign} color={Colors.BLUE} />
                  }
                  onChange={(e) => onCurrencyBaseChange(e)}
                >
                  {currencies.map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
