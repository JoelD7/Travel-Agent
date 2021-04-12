import Axios, { AxiosResponse } from "axios";
import { addSeconds, compareAsc, parseISO } from "date-fns";

export interface AvisToken {
  token: string;
  expiration: string;
}

let emptyAccessToken = { token: "", expiration: new Date().toISOString() };
const TOKEN_NAME = "avisToken";

export async function fetchNewAvisAccessToken(): Promise<AxiosResponse<any>> {
  let client_id = process.env.REACT_APP_AVIS_ID;
  let client_secret = process.env.REACT_APP_AVIS_SECRET;
  let axiosResponse = await Axios.get(`https://stage.abgapiservices.com/oauth/token/v1`, {
    headers: {
      client_id,
      client_secret,
    },
  });

  return new Promise<AxiosResponse<any>>((resolve) => resolve(axiosResponse));
}

export function updateAvisAccessToken(data: any) {
  let newAccessToken = {
    token: data.access_token,
    expiration: addSeconds(new Date(), data.expires_in),
  };

  localStorage.setItem(TOKEN_NAME, JSON.stringify(newAccessToken));
}

/**
 * Returns the currently saved access token in localStorage,
 * or if expiration time is up, requests a new one.
 */
export async function getAvisAccessToken(): Promise<AvisToken> {
  let curAccessToken = getAvisSavedAccessToken();

  if (isAvisAccessTokenUpdatable()) {
    let accessTokenResponse = await fetchNewAvisAccessToken();
    updateAvisAccessToken(accessTokenResponse.data);

    let newAccessToken = JSON.parse(localStorage.getItem(TOKEN_NAME) || "");
    return new Promise<AvisToken>((resolve) => {
      resolve(newAccessToken);
    });
  } else {
    return new Promise<AvisToken>((resolve) => {
      resolve(curAccessToken);
    });
  }
}

/**
 * Returns the currently saved access token in localStorage.
 */
export function getAvisSavedAccessToken() {
  return localStorage.getItem(TOKEN_NAME) === null
    ? emptyAccessToken
    : JSON.parse(localStorage.getItem(TOKEN_NAME) || "");
}

export function isAvisAccessTokenUpdatable() {
  let curDate = new Date();
  let accessToken = getAvisSavedAccessToken();

  let tokenExpiration = parseISO(accessToken.expiration);
  return compareAsc(tokenExpiration, curDate) <= 0;
}

// export async function
