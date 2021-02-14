import Axios, { AxiosResponse } from "axios";
import { addSeconds, compareAsc, parseISO } from "date-fns";

export const airportCitySearchURL =
  "https://test.api.amadeus.com/v1/reference-data/locations";

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

export function fetchNewAccessToken(): Promise<AxiosResponse<any>> {
  let client_id = process.env.REACT_APP_AMADEUS_KEY;
  let client_secret = process.env.REACT_APP_AMADEUS_SECRET;

  return Axios.post(
    `https://test.api.amadeus.com/v1/security/oauth2/token`,
    `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
}

export function updateAccessToken(data: any) {
  let newAccessToken = {
    token: data.access_token,
    expiration: addSeconds(new Date(), data.expires_in),
  };

  localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
}

function getAccessToken() {
  return localStorage.getItem("accessToken") === null
    ? { token: "", expiration: new Date().toISOString() }
    : JSON.parse(localStorage.getItem("accessToken") || "");
}

export function isAccessTokenUpdatable() {
  let accessToken = getAccessToken();

  let tokenExpiration = parseISO(accessToken.expiration);

  return compareAsc(tokenExpiration, new Date()) !== 1;
}

export function fetchAirportCitiesByInput(input: string, type: "CITY" | "AIRPORT") {
  let accessToken = getAccessToken();
  return Axios.get(
    `https://test.api.amadeus.com/v1/reference-data/locations?subType=${type}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
      },
      params: {
        keyword: input,
        view: "FULL",
      },
    }
  );
}
