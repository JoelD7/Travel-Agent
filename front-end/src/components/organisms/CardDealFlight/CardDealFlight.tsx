import { faCalendar, faFlag, faPlane } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Grow,
} from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import {
  convertToUserCurrency,
  FlightClass,
  flightPlaceholder,
  FlightTypes,
  formatAsCurrency,
  getFlightSearchURL,
  getIataLocation,
} from "../../../utils";
import {
  FlightSearch,
  setFlightListURL,
  setFlightToAutocomplete,
} from "../../../utils/store/flight-slice";
import { IATALocation } from "../../../utils/types/location-types";
import { CustomButton, IconText, Text } from "../../atoms";
import { cardFlightStyles } from "../CardFlight/cardFlightStyles";

interface CardDealFlight {
  deal: FlightDeal;
  className?: string;
  animate?: boolean;
}

export function CardDealFlight({ deal, className, animate }: CardDealFlight) {
  const style = cardFlightStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const origin: IATALocation | undefined = getIataLocation(deal.origin);
  const destination: IATALocation | undefined = getIataLocation(deal.destination);

  function getCardTitle(location: IATALocation | undefined) {
    if (location) {
      return `${location.city} (${location.code})`;
    } else {
      return "Not available";
    }
  }

  function getCountries() {
    if (origin && destination) {
      let originCountry = origin.country;
      let destinationCountry = destination.country;

      return originCountry === destinationCountry
        ? originCountry
        : `${originCountry} - ${destinationCountry}`;
    } else {
      return "none";
    }
  }

  function onCardDealClick() {
    dispatch(setFlightListURL(deal.links.flightOffers));

    let urlParams = deal.links.flightOffers.split("?")[1];
    let query = new URLSearchParams(urlParams);

    let kvp: { [index: string]: string } = {};

    for (const pair of Array.from(query.entries())) {
      let key = pair[0];
      let value = pair[1];

      kvp = { ...kvp, [key]: value };
    }

    let flightSearch: FlightSearch = {
      from: kvp["originLocationCode"],
      to: kvp["destinationLocationCode"],
      departure: parseISO(kvp["departureDate"]),
      return: parseISO(kvp["returnDate"]),
      adults: Number(kvp["adults"]),
      flightType: FlightTypes.ROUND,
      class: FlightClass.Economy,
      flightDetail: flightPlaceholder,
    };

    history.push(getFlightSearchURL(flightSearch));

    let destinationIataLocation: IATALocation | undefined = getIataLocation(
      deal.destination
    );
    if (destinationIataLocation) {
      dispatch(setFlightToAutocomplete(destinationIataLocation));
    }
  }

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <Grid item className={`${style.dealGrid} ${className}`}>
        <CardActionArea
          className={animate ? style.cardAnimated : style.card}
          onClick={() => onCardDealClick()}
        >
          <Card>
            <CardHeader
              title={
                <Grid container style={{ fontFamily: Font.Family }}>
                  <Grid id="text grid" item xs={8}>
                    <div style={{ display: "flex" }}>
                      <Text style={{ color: Colors.BLUE }} component="h4" weight="bold">
                        {getCardTitle(origin)}
                      </Text>

                      <IconText
                        text=""
                        icon={faPlane}
                        style={{ margin: "0px 5px" }}
                        size={14}
                      />

                      <Text style={{ color: Colors.BLUE }} component="h4" weight="bold">
                        {getCardTitle(destination)}
                      </Text>
                    </div>

                    <div>
                      <IconText icon={faCalendar}>
                        {`${format(
                          new Date(deal.departureDate),
                          "EEE, d/MMM"
                        )} - ${format(new Date(deal.returnDate), "EEE, d/MMM")}`}
                      </IconText>

                      <IconText icon={faFlag}>{getCountries()}</IconText>
                    </div>
                  </Grid>

                  <Grid id="price grid" item xs={4}>
                    <Grid container alignItems="center">
                      <h5 style={{ margin: "auto 0px auto auto" }}>{`${formatAsCurrency(
                        convertToUserCurrency(
                          Number(deal.price.total),
                          deal.price.currency
                        )
                      )}`}</h5>
                    </Grid>
                  </Grid>
                </Grid>
              }
            />

            <CardContent>
              <div style={{ display: "flex" }}>
                <CustomButton
                  style={{ marginLeft: "auto", fontSize: "14px" }}
                  backgroundColor={Colors.PURPLE}
                >
                  View details
                </CustomButton>
              </div>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </Grow>
  );
}
