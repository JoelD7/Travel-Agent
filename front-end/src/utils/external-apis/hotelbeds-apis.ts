import { sha256 } from "js-sha256";

export const hotelAvailabilityURL = "https://api.test.hotelbeds.com/hotel-api/1.0/hotels";
export const hotelContentURL =
  "https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels";

const apiKey = process.env.REACT_APP_HOTELBEDS_KEY;
const secret = process.env.REACT_APP_HOTELBEDS_SECRET;

export const headers = {
  "Api-key": apiKey,
  "X-Signature": sha256(`${apiKey}${secret}${Math.round(Date.now() / 1000)}`),
  "Accept-Encoding": "gzip",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const imageURL = {
  standard: "http://photos.hotelbeds.com/giata/", // + {path} For 320 pixel-wide images (standard size)
  small: "http://photos.hotelbeds.com/giata/small/ ", //+ {path} For 74 pixel-wide images (thumbnail size)
  medium: "http://photos.hotelbeds.com/giata/medium/", // + {path} For 117 pixel-wide images
  bigger: "http://photos.hotelbeds.com/giata/bigger/", // + {path} For 800 pixel-wide images
  xl: "http://photos.hotelbeds.com/giata/xl/ ", //+ {path} For 1024 pixel-wide images
  xxl: "http://photos.hotelbeds.com/giata/xxl/", // + {path} For 2048 pixel-wide images
  original: "http://photos.hotelbeds.com/giata/original/", //+ {path} For images in its original size (please note that this is not a standard and actual size may vary between hotels)
};
