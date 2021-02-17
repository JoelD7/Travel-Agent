import Axios, { AxiosResponse } from "axios";
import { addSeconds, compareAsc, formatISO, parseISO } from "date-fns";
import { AirportCity } from "../types/location-types";

export const airportCitySearchURL =
  "https://test.api.amadeus.com/v1/reference-data/locations";

interface AccessToken {
  token: string;
  expiration: string;
}

let emptyAccessToken = { token: "", expiration: new Date().toISOString() };

export function startAirportCityPrediction(
  query: string,
  getPrediction: (query: string) => void
) {
  if (isAccessTokenUpdatable()) {
    fetchNewAccessToken()
      .then((res) => {
        updateAccessToken(res.data);
        getPrediction(query);
      })
      .catch((error) => console.log(error));
  } else {
    getPrediction(query);
  }
}

export async function fetchNewAccessToken() {
  let client_id = process.env.REACT_APP_AMADEUS_KEY;
  let client_secret = process.env.REACT_APP_AMADEUS_SECRET;
  let axiosResponse = await Axios.post(
    `https://test.api.amadeus.com/v1/security/oauth2/token`,
    `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return new Promise<AxiosResponse<any>>((resolve) => resolve(axiosResponse));
}

export function updateAccessToken(data: any) {
  let newAccessToken = {
    token: data.access_token,
    expiration: addSeconds(new Date(), data.expires_in),
  };

  localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
}

/**
 * Returns the currently saved access token in localStorage,
 * or if expiration time is up, requests a new one.
 */
async function getAccessToken() {
  let curAccessToken = getSavedAccessToken();

  if (isAccessTokenUpdatable()) {
    let accessTokenResponse = await fetchNewAccessToken();
    updateAccessToken(accessTokenResponse.data);

    let newAccessToken = JSON.parse(localStorage.getItem("accessToken") || "");
    return new Promise<AccessToken>((resolve) => {
      resolve(newAccessToken);
    });
  } else {
    return new Promise<AccessToken>((resolve) => {
      resolve(curAccessToken);
    });
  }
}

/**
 * Returns the currently saved access token in localStorage.
 */
export function getSavedAccessToken() {
  return localStorage.getItem("accessToken") === null
    ? emptyAccessToken
    : JSON.parse(localStorage.getItem("accessToken") || "");
}

export function isAccessTokenUpdatable() {
  let curDate = new Date();
  let accessToken = getSavedAccessToken();

  let tokenExpiration = parseISO(accessToken.expiration);
  return compareAsc(tokenExpiration, curDate) <= 0;
}

export async function fetchAirportCitiesByInput(input: string, type: "CITY" | "AIRPORT") {
  let accessToken = await getAccessToken();

  return Axios.get(
    `https://test.api.amadeus.com/v1/reference-data/locations?subType=${type}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken ? accessToken.token : ""}`,
      },
      params: {
        keyword: input,
        view: "FULL",
      },
    }
  );
}

export async function fetchGreatFlightDeals(city: AirportCity, departureDate: Date) {
  let accessToken = await getAccessToken();

  return Axios.get(`https://test.api.amadeus.com/v1/shopping/flight-destinations`, {
    headers: {
      Authorization: `Bearer ${accessToken ? accessToken.token : ""}`,
    },
    params: {
      origin: `${city.iataCode}`,
      departureDate: `${formatISO(departureDate, { representation: "date" })}`,
    },
  });
}

export function startFlightFetching(url: string, fetchFlights: (url: string) => void) {
  if (isAccessTokenUpdatable()) {
    fetchNewAccessToken()
      .then((res) => {
        updateAccessToken(res.data);
        fetchFlights(url);
      })
      .catch((error) => console.log(error));
  } else {
    fetchFlights(url);
  }
}
