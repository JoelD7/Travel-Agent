import { Car, CarCheckbox, CarRsv, EventTypes } from "../types";
import { HotelAvailability, HotelBooking, HotelReservation } from "../types/hotel-types";
import { IATALocation } from "../types/location-types";
import { Trip, TripAlbum, TripEvent } from "../types/trip-types";

export const restaurantsPlaceholder: RestaurantSearch[] = [
  {
    id: "3xTQT7qjZJIxc-eBiFMerQ",
    name: "1803",
    image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/f6_ZYxoZGbyGsCn6m_auog/o.jpg",
    url: "https://www.yelp.com/biz/1803-new-york?adjust_creative=2rcWu7IBP84xEJVOm6j7Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2rcWu7IBP84xEJVOm6j7Cw",
    categories: [
      {
        alias: "cajun",
        title: "Cajun/Creole",
      },
      {
        alias: "seafood",
        title: "Seafood",
      },
      {
        alias: "bars",
        title: "Bars",
      },
    ],
    transactions: ["pickup", "delivery", "restaurant_reservation"],
    rating: 4.5,
    coordinates: {
      latitude: 40.715498,
      longitude: -74.007178,
    },
    location: {
      city: "New York",
      zip_code: "10007",
      country: "US",
      state: "NY",
      display_address: ["82 Reade St", "New York, NY 10007"],
    },
    phone: "+12122673000",
    display_phone: "(212) 267-3000",
  },
  {
    id: "A0saPXtRGKl-SVJGQyQAOw",
    name: "Brooklyn Chop House",
    image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/v_C5TFckFT2rfH-DXIousw/o.jpg",
    url: "https://www.yelp.com/biz/brooklyn-chop-house-new-york-3?adjust_creative=2rcWu7IBP84xEJVOm6j7Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2rcWu7IBP84xEJVOm6j7Cw",
    categories: [
      {
        alias: "dimsum",
        title: "Dim Sum",
      },
      {
        alias: "steak",
        title: "Steakhouses",
      },
      {
        alias: "asianfusion",
        title: "Asian Fusion",
      },
    ],
    transactions: ["pickup", "delivery"],
    rating: 4.0,
    coordinates: {
      latitude: 40.7115099,
      longitude: -74.00597,
    },
    location: {
      city: "New York",
      zip_code: "10038",
      country: "US",
      state: "NY",
      display_address: ["150 Nassau St", "New York, NY 10038"],
    },
    phone: "+12126191200",
    display_phone: "(212) 619-1200",
  },
  {
    id: "rCS4w1A24k33FFTzZ52Vog",
    name: "Oh K-Dog",
    image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/GHVdc3P2hEO0TknfI2O8Tg/o.jpg",
    url: "https://www.yelp.com/biz/oh-k-dog-new-york?adjust_creative=2rcWu7IBP84xEJVOm6j7Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2rcWu7IBP84xEJVOm6j7Cw",
    categories: [
      {
        alias: "korean",
        title: "Korean",
      },
      {
        alias: "hotdog",
        title: "Hot Dogs",
      },
      {
        alias: "hotdogs",
        title: "Fast Food",
      },
    ],
    rating: 4.5,
    transactions: ["pickup", "delivery"],
    coordinates: {
      latitude: 40.72104,
      longitude: -73.98804,
    },
    location: {
      city: "New York",
      zip_code: "10002",
      country: "US",
      state: "NY",
      display_address: ["159 Ludlow St", "New York, NY 10002"],
    },
    phone: "+16464484836",
    display_phone: "(646) 448-4836",
  },
  {
    id: "8uuMkezIN1c8zGEWkaMRqg",
    name: "Los Tacos No. 1",
    image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/Ug-RpXxf5dWvhGBkO85eIw/o.jpg",
    url: "https://www.yelp.com/biz/los-tacos-no-1-new-york-5?adjust_creative=2rcWu7IBP84xEJVOm6j7Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2rcWu7IBP84xEJVOm6j7Cw",
    categories: [
      {
        alias: "tacos",
        title: "Tacos",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 40.714282,
      longitude: -74.008675,
    },
    transactions: ["pickup", "delivery", "restaurant_reservation"],
    location: {
      city: "New York",
      zip_code: "10007",
      country: "US",
      state: "NY",
      display_address: ["136 Church St", "New York, NY 10007"],
    },
    phone: "",
    display_phone: "",
  },
  {
    id: "f8ipr8Wdy1_wHhw7JgNqPQ",
    name: "Da Claudio",
    image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/OUy0ve7CHI2x7_bMb0wAEw/o.jpg",
    url: "https://www.yelp.com/biz/da-claudio-new-york?adjust_creative=2rcWu7IBP84xEJVOm6j7Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2rcWu7IBP84xEJVOm6j7Cw",
    categories: [
      {
        alias: "italian",
        title: "Italian",
      },
      {
        alias: "cocktailbars",
        title: "Cocktail Bars",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 40.71087,
      longitude: -74.00753,
    },
    transactions: ["pickup", "restaurant_reservation"],
    location: {
      city: "New York",
      zip_code: "10038",
      country: "US",
      state: "NY",
      display_address: ["21 Ann St", "New York, NY 10038"],
    },
    phone: "+12122852668",
    display_phone: "(212) 285-2668",
  },
  {
    id: "BKMCAYb9EAivUm3p-vrC9w",
    name: "Khe-Yo",
    image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/Ars_y_Fis_3n-H4neUv9Fw/o.jpg",
    url: "https://www.yelp.com/biz/khe-yo-new-york?adjust_creative=2rcWu7IBP84xEJVOm6j7Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2rcWu7IBP84xEJVOm6j7Cw",
    categories: [
      {
        alias: "laotian",
        title: "Laotian",
      },
    ],
    rating: 4.0,
    coordinates: {
      latitude: 40.716906,
      longitude: -74.008587,
    },
    transactions: ["delivery", "restaurant_reservation"],
    location: {
      city: "New York",
      zip_code: "10013",
      country: "US",
      state: "NY",
      display_address: ["157 Duane St", "New York, NY 10013"],
    },
    phone: "+12125871089",
    display_phone: "(212) 587-1089",
  },
];

export const rsvRestaurantsPlaceholder: RsvRestaurant[] = [
  {
    id: "asjdf9",
    idRestaurant: 12,
    name: "Hazelwood Food and Drinks",
    imageUrl: "/Travel-Agent/restaurant.jpg",
    rating: 4,
    displayAddress: "Park Av 188, New York",
    visitDate: new Date().toISOString(),
    cuisines: "American (Traditional), Pizza, Seafood",
  },
  {
    id: "asf9",
    idRestaurant: 121,
    name: "Robertson’s burger",
    imageUrl: "/Travel-Agent/restaurant.jpg",
    rating: 5,
    displayAddress: "Mike Dawson Lane, Wichita, Arksansas",
    cuisines: "Burgers, Seafood",
    visitDate: new Date(2021, 8, 15, 10, 30).toISOString(),
  },
];

export const restaurantPlaceholder: Restaurant = {
  id: "3xTQT7qjZJIxc-eBiFMerQ",
  favorite: false,
  name: "1803",
  image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/f6_ZYxoZGbyGsCn6m_auog/o.jpg",
  url: "https://www.yelp.com/biz/1803-new-york?adjust_creative=2rcWu7IBP84xEJVOm6j7Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=2rcWu7IBP84xEJVOm6j7Cw",
  phone: "+12122673000",
  display_phone: "(212) 267-3000",
  categories: [
    {
      alias: "cajun",
      title: "Cajun/Creole",
    },
    {
      alias: "seafood",
      title: "Seafood",
    },
    {
      alias: "bars",
      title: "Bars",
    },
  ],
  transactions: ["pickup", "delivery", "restaurant_reservation"],
  rating: 4.5,
  location: {
    city: "New York",
    zip_code: "10007",
    country: "US",
    state: "NY",
    display_address: ["82 Reade St", "New York, NY 10007"],
  },
  coordinates: {
    latitude: 40.715498,
    longitude: -74.007178,
  },
  photos: [
    "https://s3-media3.fl.yelpcdn.com/bphoto/f6_ZYxoZGbyGsCn6m_auog/o.jpg",
    "https://s3-media2.fl.yelpcdn.com/bphoto/WwUWYeiQoleN1aVd7QKbSg/o.jpg",
    "https://s3-media3.fl.yelpcdn.com/bphoto/V1-_214Vuijh5t__vGtyxw/o.jpg",
  ],
  hours: [
    {
      open: [
        {
          is_overnight: false,
          start: "1600",
          end: "2200",
          day: 0,
        },
        {
          is_overnight: false,
          start: "1600",
          end: "2200",
          day: 1,
        },
        {
          is_overnight: false,
          start: "1600",
          end: "2200",
          day: 2,
        },
        {
          is_overnight: false,
          start: "1600",
          end: "2200",
          day: 3,
        },
        {
          is_overnight: false,
          start: "1200",
          end: "2200",
          day: 4,
        },
        {
          is_overnight: false,
          start: "1200",
          end: "2200",
          day: 5,
        },
        {
          is_overnight: false,
          start: "1200",
          end: "2000",
          day: 6,
        },
      ],
    },
  ],
};

export const poisPlaceholder: POISearch[] = [
  {
    id: "5c126be2e55d8b002c6430b6",
    name: "H&M",
    photo:
      "https://fastly.4sqi.net/img/general/619x412/87388367_WYz8Av0IXESHmRGYmpl0hg32N3wvS24K8v9SpclZlBE.jpg",
    contact: {},
    location: {
      address: "7601 South Cicero Avenue",
      lat: 41.756158,
      lng: -87.737777,
      distance: 16263,
      postalCode: "60652",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "7601 South Cicero Avenue",
        "Chicago, IL 60652",
        "United States",
      ],
    },
    rating: 5,
    categories: [
      {
        id: "4bf58dd8d48988d103951735",
        name: "Clothing Store",
        pluralName: "Clothing Stores",
        shortName: "Apparel",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "4f22e6e5e4b067a3253b02c8",
    name: "Wigwam at ULC",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/81679595_DMhmpfeLJ5-fv-N27ULxqn1qq-lw8AEJNGVsayR_2u8.jpg",
    location: {
      lat: 41.8782400358223,
      lng: -87.62976060609788,
      distance: 15,
      postalCode: "60603",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: ["Chicago, IL 60603", "United States"],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d1cc941735",
        name: "Movie Theater",
        pluralName: "Steakhouses",
        shortName: "Steakhouse",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5ba16e7e46e1b6002ca0221b",
    name: "Athletico Physical Therapy - Union League Club",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/56821033_cyZ-YmlnsvJZrOrbe3wjODEASupk_LSz4YNzO4a4uXg.jpg",
    location: {
      address: "67 W Jackson Blvd",
      crossStreet: "#175",
      lat: 41.87805938720703,
      lng: -87.63006591796875,
      distance: 22,
      postalCode: "60604",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "67 W Jackson Blvd (#175)",
        "Chicago, IL 60604",
        "United States",
      ],
    },
    rating: 3,
    categories: [
      {
        id: "5744ccdfe4b0c0459246b4af",
        name: "Gym / Fitness Center",
        pluralName: "Physical Therapists",
        shortName: "Physical Therapist",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5c126be2e55d8b002c6430b6",
    name: "H&M",
    photo:
      "https://fastly.4sqi.net/img/general/619x412/87388367_WYz8Av0IXESHmRGYmpl0hg32N3wvS24K8v9SpclZlBE.jpg",
    contact: {},
    location: {
      address: "7601 South Cicero Avenue",
      lat: 41.756158,
      lng: -87.737777,
      distance: 16263,
      postalCode: "60652",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "7601 South Cicero Avenue",
        "Chicago, IL 60652",
        "United States",
      ],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d103951735",
        name: "Clothing Store",
        pluralName: "Clothing Stores",
        shortName: "Apparel",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "4f22e6e5e4b067a3253b02c8",
    name: "Wigwam at ULC",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/81679595_DMhmpfeLJ5-fv-N27ULxqn1qq-lw8AEJNGVsayR_2u8.jpg",
    location: {
      lat: 41.8782400358223,
      lng: -87.62976060609788,
      distance: 15,
      postalCode: "60603",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: ["Chicago, IL 60603", "United States"],
    },
    rating: 5,
    categories: [
      {
        id: "4bf58dd8d48988d1cc941735",
        name: "Movie Theater",
        pluralName: "Steakhouses",
        shortName: "Steakhouse",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5ba16e7e46e1b6002ca0221b",
    name: "Athletico Physical Therapy - Union League Club",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/56821033_cyZ-YmlnsvJZrOrbe3wjODEASupk_LSz4YNzO4a4uXg.jpg",
    location: {
      address: "67 W Jackson Blvd",
      crossStreet: "#175",
      lat: 41.87805938720703,
      lng: -87.63006591796875,
      distance: 22,
      postalCode: "60604",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "67 W Jackson Blvd (#175)",
        "Chicago, IL 60604",
        "United States",
      ],
    },
    rating: 2,
    categories: [
      {
        id: "5744ccdfe4b0c0459246b4af",
        name: "Gym / Fitness Center",
        pluralName: "Physical Therapists",
        shortName: "Physical Therapist",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5c126be2e55d8b002c6430b6",
    name: "H&M",
    photo:
      "https://fastly.4sqi.net/img/general/619x412/87388367_WYz8Av0IXESHmRGYmpl0hg32N3wvS24K8v9SpclZlBE.jpg",
    contact: {},
    location: {
      address: "7601 South Cicero Avenue",
      lat: 41.756158,
      lng: -87.737777,
      distance: 16263,
      postalCode: "60652",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "7601 South Cicero Avenue",
        "Chicago, IL 60652",
        "United States",
      ],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d103951735",
        name: "Clothing Store",
        pluralName: "Clothing Stores",
        shortName: "Apparel",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "4f22e6e5e4b067a3253b02c8",
    name: "Wigwam at ULC",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/81679595_DMhmpfeLJ5-fv-N27ULxqn1qq-lw8AEJNGVsayR_2u8.jpg",
    location: {
      lat: 41.8782400358223,
      lng: -87.62976060609788,
      distance: 15,
      postalCode: "60603",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: ["Chicago, IL 60603", "United States"],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d1cc941735",
        name: "Movie Theater",
        pluralName: "Steakhouses",
        shortName: "Steakhouse",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5ba16e7e46e1b6002ca0221b",
    name: "Athletico Physical Therapy - Union League Club",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/56821033_cyZ-YmlnsvJZrOrbe3wjODEASupk_LSz4YNzO4a4uXg.jpg",
    location: {
      address: "67 W Jackson Blvd",
      crossStreet: "#175",
      lat: 41.87805938720703,
      lng: -87.63006591796875,
      distance: 22,
      postalCode: "60604",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "67 W Jackson Blvd (#175)",
        "Chicago, IL 60604",
        "United States",
      ],
    },
    rating: 3,
    categories: [
      {
        id: "5744ccdfe4b0c0459246b4af",
        name: "Gym / Fitness Center",
        pluralName: "Physical Therapists",
        shortName: "Physical Therapist",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5c126be2e55d8b002c6430b6",
    name: "H&M",
    photo:
      "https://fastly.4sqi.net/img/general/619x412/87388367_WYz8Av0IXESHmRGYmpl0hg32N3wvS24K8v9SpclZlBE.jpg",
    contact: {},
    location: {
      address: "7601 South Cicero Avenue",
      lat: 41.756158,
      lng: -87.737777,
      distance: 16263,
      postalCode: "60652",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "7601 South Cicero Avenue",
        "Chicago, IL 60652",
        "United States",
      ],
    },
    rating: 5,
    categories: [
      {
        id: "4bf58dd8d48988d103951735",
        name: "Clothing Store",
        pluralName: "Clothing Stores",
        shortName: "Apparel",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "4f22e6e5e4b067a3253b02c8",
    name: "Wigwam at ULC",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/81679595_DMhmpfeLJ5-fv-N27ULxqn1qq-lw8AEJNGVsayR_2u8.jpg",
    location: {
      lat: 41.8782400358223,
      lng: -87.62976060609788,
      distance: 15,
      postalCode: "60603",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: ["Chicago, IL 60603", "United States"],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d1cc941735",
        name: "Movie Theater",
        pluralName: "Steakhouses",
        shortName: "Steakhouse",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5ba16e7e46e1b6002ca0221b",
    name: "Athletico Physical Therapy - Union League Club",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/56821033_cyZ-YmlnsvJZrOrbe3wjODEASupk_LSz4YNzO4a4uXg.jpg",
    location: {
      address: "67 W Jackson Blvd",
      crossStreet: "#175",
      lat: 41.87805938720703,
      lng: -87.63006591796875,
      distance: 22,
      postalCode: "60604",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "67 W Jackson Blvd (#175)",
        "Chicago, IL 60604",
        "United States",
      ],
    },
    rating: 3,
    categories: [
      {
        id: "5744ccdfe4b0c0459246b4af",
        name: "Gym / Fitness Center",
        pluralName: "Physical Therapists",
        shortName: "Physical Therapist",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5c126be2e55d8b002c6430b6",
    name: "H&M",
    photo:
      "https://fastly.4sqi.net/img/general/619x412/87388367_WYz8Av0IXESHmRGYmpl0hg32N3wvS24K8v9SpclZlBE.jpg",
    contact: {},
    location: {
      address: "7601 South Cicero Avenue",
      lat: 41.756158,
      lng: -87.737777,
      distance: 16263,
      postalCode: "60652",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "7601 South Cicero Avenue",
        "Chicago, IL 60652",
        "United States",
      ],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d103951735",
        name: "Clothing Store",
        pluralName: "Clothing Stores",
        shortName: "Apparel",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "4f22e6e5e4b067a3253b02c8",
    name: "Wigwam at ULC",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/81679595_DMhmpfeLJ5-fv-N27ULxqn1qq-lw8AEJNGVsayR_2u8.jpg",
    location: {
      lat: 41.8782400358223,
      lng: -87.62976060609788,
      distance: 15,
      postalCode: "60603",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: ["Chicago, IL 60603", "United States"],
    },
    rating: 5,
    categories: [
      {
        id: "4bf58dd8d48988d1cc941735",
        name: "Movie Theater",
        pluralName: "Steakhouses",
        shortName: "Steakhouse",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5ba16e7e46e1b6002ca0221b",
    name: "Athletico Physical Therapy - Union League Club",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/56821033_cyZ-YmlnsvJZrOrbe3wjODEASupk_LSz4YNzO4a4uXg.jpg",
    location: {
      address: "67 W Jackson Blvd",
      crossStreet: "#175",
      lat: 41.87805938720703,
      lng: -87.63006591796875,
      distance: 22,
      postalCode: "60604",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "67 W Jackson Blvd (#175)",
        "Chicago, IL 60604",
        "United States",
      ],
    },
    rating: 2,
    categories: [
      {
        id: "5744ccdfe4b0c0459246b4af",
        name: "Gym / Fitness Center",
        pluralName: "Physical Therapists",
        shortName: "Physical Therapist",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5c126be2e55d8b002c6430b6",
    name: "H&M",
    photo:
      "https://fastly.4sqi.net/img/general/619x412/87388367_WYz8Av0IXESHmRGYmpl0hg32N3wvS24K8v9SpclZlBE.jpg",
    contact: {},
    location: {
      address: "7601 South Cicero Avenue",
      lat: 41.756158,
      lng: -87.737777,
      distance: 16263,
      postalCode: "60652",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "7601 South Cicero Avenue",
        "Chicago, IL 60652",
        "United States",
      ],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d103951735",
        name: "Clothing Store",
        pluralName: "Clothing Stores",
        shortName: "Apparel",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "4f22e6e5e4b067a3253b02c8",
    name: "Wigwam at ULC",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/81679595_DMhmpfeLJ5-fv-N27ULxqn1qq-lw8AEJNGVsayR_2u8.jpg",
    location: {
      lat: 41.8782400358223,
      lng: -87.62976060609788,
      distance: 15,
      postalCode: "60603",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: ["Chicago, IL 60603", "United States"],
    },
    rating: 4,
    categories: [
      {
        id: "4bf58dd8d48988d1cc941735",
        name: "Movie Theater",
        pluralName: "Steakhouses",
        shortName: "Steakhouse",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "5ba16e7e46e1b6002ca0221b",
    name: "Athletico Physical Therapy - Union League Club",
    contact: {},
    photo:
      "https://fastly.4sqi.net/img/general/1440x1920/56821033_cyZ-YmlnsvJZrOrbe3wjODEASupk_LSz4YNzO4a4uXg.jpg",
    location: {
      address: "67 W Jackson Blvd",
      crossStreet: "#175",
      lat: 41.87805938720703,
      lng: -87.63006591796875,
      distance: 22,
      postalCode: "60604",
      city: "Chicago",
      state: "IL",
      country: "United States",
      formattedAddress: [
        "67 W Jackson Blvd (#175)",
        "Chicago, IL 60604",
        "United States",
      ],
    },
    rating: 3,
    categories: [
      {
        id: "5744ccdfe4b0c0459246b4af",
        name: "Gym / Fitness Center",
        pluralName: "Physical Therapists",
        shortName: "Physical Therapist",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
];

export const rsvPoisPlaceholder: RsvPOI[] = [
  {
    id: "adjhf7fa9",
    name: "H&M",
    rating: 5,
    category: "Clothing Store",
    imageUrl:
      "https://fastly.4sqi.net/img/general/619x412/87388367_WYz8Av0IXESHmRGYmpl0hg32N3wvS24K8v9SpclZlBE.jpg",
    categoryIconUrl: "",
    visitDate: new Date().toISOString(),
    formattedAddress: "7601 South Cicero Avenue, Chicago, IL 60652, United States",
  },
  {
    id: "adjhfa9",
    name: "Wigwam at ULC",
    rating: 5,
    formattedAddress: "Chicago, IL 60603",
    imageUrl:
      "https://fastly.4sqi.net/img/general/1440x1920/81679595_DMhmpfeLJ5-fv-N27ULxqn1qq-lw8AEJNGVsayR_2u8.jpg",
    categoryIconUrl: "",
    visitDate: new Date().toISOString(),
    category: "Movie Theater",
  },
];

export const poisPlaceholderAPI = [
  {
    id: "4cdbbcc599026dcbeea90e81",
    name: "Fashion Avenue",
    location: {
      address: "The Dubai Mall",
      lat: 25.198198373774343,
      lng: 55.275885288223414,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.198198373774343,
          lng: 55.275885288223414,
        },
      ],
      distance: 895,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["The Dubai Mall", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d104951735",
        name: "Boutique",
        pluralName: "Boutiques",
        shortName: "Boutique",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/apparel_boutique_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0587f3f964a520cfa822e3",
    name: "The Dubai Mall (دبي مول)",
    location: {
      address: "Mohammed bin Rashid Blvd.",
      crossStreet: "بوليفارد محمد بن راشد",
      lat: 25.197388603252538,
      lng: 55.27886867523193,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.197388603252538,
          lng: 55.27886867523193,
        },
      ],
      distance: 1158,
      postalCode: "113444",
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Mohammed bin Rashid Blvd. (بوليفارد محمد بن راشد)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    venuePage: {
      id: "77362868",
    },
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "595b81a1b1538e23f914b0b3",
    name: "HUQQA",
    location: {
      address: "The Dubai Mall",
      crossStreet: "Fashion Ave Level 3",
      lat: 25.196681,
      lng: 55.276912,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.196681,
          lng: 55.276912,
        },
      ],
      distance: 1093,
      cc: "AE",
      neighborhood: "Downtown Dubai",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "The Dubai Mall (Fashion Ave Level 3)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d119941735",
        name: "Hookah Bar",
        pluralName: "Hookah Bars",
        shortName: "Hookah Bar",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/nightlife/hookahbar_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "511778eb90e7caad6e2ea696",
    name: "Kite Surf Beach",
    location: {
      address: "2C St",
      lat: 25.165239020746718,
      lng: 55.20926153619319,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.165239020746718,
          lng: 55.20926153619319,
        },
      ],
      distance: 7604,
      postalCode: "00000",
      cc: "AE",
      neighborhood: "أم سقيم الأولى",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["2C St", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1e2941735",
        name: "Beach",
        pluralName: "Beaches",
        shortName: "Beach",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/beach_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    venuePage: {
      id: "48037726",
    },
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "5dfa2a879432d90008f59435",
    name: "Festival Plaza",
    location: {
      address: "Jebel Ali",
      lat: 25.028846,
      lng: 55.107055,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.028846,
          lng: 55.107055,
        },
      ],
      distance: 25613,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Jebel Ali", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "5c8e4907cb3fd2002ca6ac43",
    name: "The Galleria Barsha",
    location: {
      lat: 25.09925,
      lng: 55.200095,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.09925,
          lng: 55.200095,
        },
      ],
      distance: 13740,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "5dd54e9ddde9de0009af5183",
    name: "AROUND THE BLOCK",
    location: {
      address: "Wasl 51",
      crossStreet: "53",
      lat: 25.218941,
      lng: 55.261318,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.218941,
          lng: 55.261318,
        },
      ],
      distance: 1841,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Wasl 51 (53)", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1e0931735",
        name: "Coffee Shop",
        pluralName: "Coffee Shops",
        shortName: "Coffee Shop",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0ad94cf964a520da2823e3",
    name: "Dubai Marina Mall (دبي مارينا مول)",
    location: {
      address: "Dubai Marina",
      crossStreet: "Sheikh Zayed Rd",
      lat: 25.076765515807697,
      lng: 55.13919126697897,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.076765515807697,
          lng: 55.13919126697897,
        },
      ],
      distance: 19468,
      cc: "AE",
      neighborhood: "Dubai Marina",
      city: "دبي مارينا",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Dubai Marina (Sheikh Zayed Rd)",
        "دبي مارينا",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0587f1f964a5209da822e3",
    name: "Mercato Mall (مركز ميركاتو)",
    location: {
      address: "Jumeirah Beach Rd",
      lat: 25.216469529211064,
      lng: 55.25288477713316,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.216469529211064,
          lng: 55.25288477713316,
        },
      ],
      distance: 2223,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Jumeirah Beach Rd", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b4f73d7f964a520430727e3",
    name: "Global Village (القرية العالمية)",
    location: {
      address: "Sheikh Mohamed Bin Zayed Rd",
      lat: 25.069910467046487,
      lng: 55.307407633967074,
      distance: 15462,
      postalCode: "33550",
      cc: "AE",
      neighborhood: "Global Village",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Sheikh Mohamed Bin Zayed Rd",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d182941735",
        name: "Theme Park",
        pluralName: "Theme Parks",
        shortName: "Theme Park",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/arts_entertainment/themepark_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0587f2f964a520c0a822e3",
    name: "Mall of the Emirates (مول الإمارات)",
    location: {
      address: "Sheikh Zayed Rd",
      crossStreet: "Al Barsha Rd",
      lat: 25.118476274733304,
      lng: 55.20052671432495,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.118476274733304,
          lng: 55.20052671432495,
        },
      ],
      distance: 11936,
      cc: "AE",
      neighborhood: "Al Barsha 1",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Sheikh Zayed Rd (Al Barsha Rd)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0587f3f964a520d0a822e3",
    name: "Dubai Festival City Mall (فستيفال سنتر)",
    location: {
      address: "Dubai Festival City",
      crossStreet: "at Al Rebat Rd.",
      lat: 25.222548748831255,
      lng: 55.35273272106723,
      distance: 8484,
      postalCode: "49776",
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Dubai Festival City (at Al Rebat Rd.)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "56cea6ebcd109631feed7d88",
    name: "Luna Sky Bar",
    location: {
      address: "Four Seasons Hotel DIFC",
      lat: 25.212649,
      lng: 55.282493,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.212649,
          lng: 55.282493,
        },
      ],
      distance: 1466,
      postalCode: "507027",
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Four Seasons Hotel DIFC", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d11e941735",
        name: "Cocktail Bar",
        pluralName: "Cocktail Bars",
        shortName: "Cocktail",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/nightlife/cocktails_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    venuePage: {
      id: "161296252",
    },
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0587f1f964a5209ea822e3",
    name: "Wafi Shopping Mall (مركز وافي للتسوق)",
    location: {
      address: "Al Garhoud Rd",
      crossStreet: "13th St",
      lat: 25.22911288296755,
      lng: 55.31896349159231,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.22911288296755,
          lng: 55.31896349159231,
        },
      ],
      distance: 5554,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Al Garhoud Rd (13th St)", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b9f2101f964a520df1437e3",
    name: "City Centre Mirdif (مردف سيتي سنتر)",
    location: {
      address: "Mohammad Bin Zayed Rd",
      crossStreet: "at Al Rebat Rd",
      lat: 25.21632450563917,
      lng: 55.40758982655163,
      distance: 13836,
      cc: "AE",
      city: "مردف",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Mohammad Bin Zayed Rd (at Al Rebat Rd)",
        "مردف",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "5ac76c633b4e0045927f9216",
    name: "Zero 6",
    location: {
      lat: 25.290450721115505,
      lng: 55.49699522726142,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.290450721115505,
          lng: 55.49699522726142,
        },
      ],
      distance: 24689,
      cc: "AE",
      city: "الشارقة",
      state: "الشارقة",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["الشارقة", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0587f2f964a520b5a822e3",
    name: "Ibn Battuta Mall (مركز ابن بطوطة)",
    location: {
      address: "Garden Cross Rd",
      lat: 25.04429859699999,
      lng: 55.11860312845696,
      distance: 23548,
      postalCode: "261177",
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Garden Cross Rd", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b5b000bf964a52027de28e3",
    name: "City Centre Deira (ديرة سيتي سنتر)",
    location: {
      address: "Al Ithihad Rd",
      crossStreet: "8th St",
      lat: 25.25269999507256,
      lng: 55.331071799411966,
      distance: 8078,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Al Ithihad Rd (8th St)", "ديرة", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "5af5a78783e380002cc644bb",
    name: "Nakheel Mall",
    location: {
      lat: 25.114435087802615,
      lng: 55.138041973114014,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.114435087802615,
          lng: 55.138041973114014,
        },
      ],
      distance: 16736,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4bd86e2f0b779c74642107a0",
    name: "The Courtyard",
    location: {
      address: "Manzil Downtown Dubai",
      crossStreet: "Downtown Boulevard",
      lat: 25.191035058526605,
      lng: 55.27762954935826,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.191035058526605,
          lng: 55.27762954935826,
        },
      ],
      distance: 1679,
      postalCode: "114788",
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Manzil Downtown Dubai (Downtown Boulevard)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d121941735",
        name: "Lounge",
        pluralName: "Lounges",
        shortName: "Lounge",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/nightlife/default_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "53abd811498e24eaf5b1f127",
    name: "Galleria (غاليريا)",
    location: {
      address: "Al Wasl Rd",
      crossStreet: "Al Urouba Rd",
      lat: 25.20719565727844,
      lng: 55.25421381037178,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.20719565727844,
          lng: 55.25421381037178,
        },
      ],
      distance: 1691,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Al Wasl Rd (Al Urouba Rd)", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b0587f2f964a520bea822e3",
    name: "Souq Madinat Jumeirah (سوق مدينة جميرا)",
    location: {
      address: "Al Sufouh",
      lat: 25.1331244570725,
      lng: 55.18582820892334,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.1331244570725,
          lng: 55.18582820892334,
        },
      ],
      distance: 11702,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Al Sufouh", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "5b06b3346bd36b00396880d2",
    name: "The Springs Souk (سوق الينابيع)",
    location: {
      crossStreet: "Al Afnan Street",
      lat: 25.065235266041377,
      lng: 55.19304430191122,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.065235266041377,
          lng: 55.19304430191122,
        },
      ],
      distance: 17400,
      cc: "AE",
      neighborhood: "The Springs",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Al Afnan Street", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4bd2958e462cb713b7bcdc07",
    name: "Sunset Beach",
    location: {
      address: "Jumeira Beach Road",
      crossStreet: "Jumeira",
      lat: 25.18484395673391,
      lng: 55.22444534874443,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.18484395673391,
          lng: 55.22444534874443,
        },
      ],
      distance: 5170,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Jumeira Beach Road (Jumeira)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1e2941735",
        name: "Beach",
        pluralName: "Beaches",
        shortName: "Beach",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/beach_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "575c6540498eed448b029202",
    name: "Al Falamanki (الفلمنكي)",
    location: {
      address: "Villa 351, Opposite Four Seasons Resort, Jumeirah Beach Road, Jumeirah 2",
      crossStreet: "Jumeirah Street",
      lat: 25.199726,
      lng: 55.239519,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.199726,
          lng: 55.239519,
        },
      ],
      distance: 3200,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Villa 351, Opposite Four Seasons Resort, Jumeirah Beach Road, Jumeirah 2 (Jumeirah Street)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d16d941735",
        name: "Café",
        pluralName: "Cafés",
        shortName: "Café",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/food/cafe_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "5e00aa7b14cd200008ea7ac5",
    name: "Nammos Dubai",
    location: {
      address: "FourSeasons Hotel",
      lat: 25.202278,
      lng: 55.238231,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.202278,
          lng: 55.238231,
        },
      ],
      distance: 3292,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["FourSeasons Hotel", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "52e81612bcbc57f1066b7a0d",
        name: "Beach Bar",
        pluralName: "Beach Bars",
        shortName: "Beach Bar",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/nightlife/default_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "53036e72498efc4ae793ee02",
    name: "The Beach",
    location: {
      address: "Shoreline of JBR",
      crossStreet: "JBR",
      lat: 25.077369265919035,
      lng: 55.13186866665861,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.077369265919035,
          lng: 55.13186866665861,
        },
      ],
      distance: 19930,
      cc: "AE",
      neighborhood: "دبي مارينا",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["Shoreline of JBR (JBR)", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1e2941735",
        name: "Beach",
        pluralName: "Beaches",
        shortName: "Beach",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/beach_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    venuePage: {
      id: "79310740",
    },
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4b23d11af964a520575a24e3",
    name: "Reel Cinemas (ريل سينما)",
    location: {
      address: "The Dubai Mall",
      lat: 25.196280234164316,
      lng: 55.2806395719699,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.196280234164316,
          lng: 55.2806395719699,
        },
      ],
      distance: 1371,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: ["The Dubai Mall", "دبي", "الإمارات العربية المتحدة"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d180941735",
        name: "Multiplex",
        pluralName: "Multiplexes",
        shortName: "Cineplex",
        icon: {
          prefix:
            "https://ss3.4sqi.net/img/categories_v2/arts_entertainment/movietheater_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4bb5dcbb2ea19521f8d1aa2f",
    name: "Dragon Mart (سوق التنين)",
    location: {
      address: "Dubai International City",
      crossStreet: "Al Khail Rd",
      lat: 25.174170147604706,
      lng: 55.41590977148005,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.174170147604706,
          lng: 55.41590977148005,
        },
      ],
      distance: 15009,
      cc: "AE",
      city: "دبي",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Dubai International City (Al Khail Rd)",
        "دبي",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
  {
    id: "4e2d400d14955dbf7aec6cac",
    name: "Al Barsha Mall (البرشاء مول)",
    location: {
      address: "Near Al Barsha Park",
      crossStreet: "بالقرب من حديقة البرشاء",
      lat: 25.09885195293604,
      lng: 55.20463585853577,
      labeledLatLngs: [
        {
          label: "display",
          lat: 25.09885195293604,
          lng: 55.20463585853577,
        },
      ],
      distance: 13547,
      cc: "AE",
      city: "البرشاء",
      state: "دبي",
      country: "الإمارات العربية المتحدة",
      formattedAddress: [
        "Near Al Barsha Park (بالقرب من حديقة البرشاء)",
        "البرشاء",
        "الإمارات العربية المتحدة",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1fd941735",
        name: "Shopping Mall",
        pluralName: "Shopping Malls",
        shortName: "Mall",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
    referralId: "v-1611330326",
    hasPerk: false,
  },
];

export const poiPlaceholder: POIType = {
  id: "49eeaf08f964a52078681fe3",
  name: "Vanessa's Dumpling House",
  favorite: true,
  contact: {
    phone: "2126258008",
    formattedPhone: "(212) 625-8008",
    twitter: "vanessadumpling",
    facebookName: "Vanessa's Dumpling House",
  },
  location: {
    address: "118 Eldridge St",
    crossStreet: "btwn Broome & Grand St",
    lat: 40.718316255518644,
    lng: -73.99188498001898,
    postalCode: "10002",
    city: "New York",
    state: "NY",
    distance: 16233,
    country: "United States",
    formattedAddress: [
      "118 Eldridge St (btwn Broome & Grand St)",
      "New York, NY 10002",
      "United States",
    ],
  },
  categories: [
    {
      id: "4bf58dd8d48988d108941735",
      name: "Dumpling Restaurant",
      pluralName: "Dumpling Restaurants",
      shortName: "Dumplings",
      icon: {
        prefix: "",
        suffix: "",
      },
    },
    {
      id: "4bf58dd8d48988d145941735",
      name: "Chinese Restaurant",
      pluralName: "Chinese Restaurants",
      shortName: "Chinese",
      icon: {
        prefix: "",
        suffix: "",
      },
    },
  ],
  url: "http://vanessas.com",
  rating: 8.6,
  photos: {
    groups: [
      {
        items: [
          {
            prefix: "https://fastly.4sqi.net/img/general/",
            suffix: "/6036_Xv3VOJm0A8HMF8EbQWdKPXIce7LxcvXOMt4_nW5gDhU.jpg",
            width: 960,
            height: 720,
          },
        ],
      },
    ],
  },
  hours: {
    timeframes: [
      {
        days: "Mon–Sat",
        open: [{ renderedTime: "10:30 AM–10:30 PM" }],
      },
      { days: "Sun", open: [{ renderedTime: "10:30 AM–10:00 PM" }] },
    ],
  },
  attributes: {
    groups: [
      {
        name: "Price",
      },
      {
        name: "Reservations",
      },
      {
        name: "Credit Cards",
      },
      {
        name: "Outdoor Seating",
      },
      {
        name: "Music",
      },
      {
        name: "Menus",
      },
      {
        name: "Parking",
      },
    ],
  },
  bestPhoto: {
    prefix: "https://fastly.4sqi.net/img/general/",
    suffix: "/6036_Xv3VOJm0A8HMF8EbQWdKPXIce7LxcvXOMt4_nW5gDhU.jpg",
    width: 960,
    height: 720,
  },
};

export const activitiesPlaceholder: Activity[] = [
  {
    name: "9-11 Memorial and Museum tickets",
    shortDescription:
      "Book your tickets to the 9/11 Memorial & Museum on Musement today. Visit the touching memorial, and learn about the events of that fateful day.",

    rating: "4.700000",
    pictures: [
      "https://images.musement.com/cover/0001/19/9-11-memorial-museum-tickets_header-18896.jpeg?w=500",
    ],
    bookingLink: "https://b2c.mla.cloud/c/pv4WuKnR?c=2WxbgL36",
    price: {
      currencyCode: "EUR",
      amount: "26.00",
    },
  },
  {
    name: "Big Apple Helicopter Tour of New York",
    shortDescription:
      "See New York's famous landmarks from the air on an exhilarating 15-minute helicopter tour. You'll come face-to-face with the Statue of Liberty as you fly above the Hudson River. Admire the iconic Empire State Building, the silver Art Deco brilliance of the Chrysler Building, and the sprawling green expanse of Central Park. A must for any visitor to New York City!",

    rating: "4.400000",
    pictures: [
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/61/53.jpg",
    ],
    bookingLink: "https://b2c.mla.cloud/c/ZAEPrRDM?c=2WxbgL36",
    price: {
      currencyCode: "EUR",
      amount: "195.00",
    },
  },
  {
    name: "NYC One World Observatory Skip-the-Line Ticket",
    shortDescription:
      "There are a million things to experience in New York City, but this is one in a million. Located at the top three floors of the One World Trade Center, which is now the tallest building in the western hemisphere, the observatory boasts jaw-dropping views of Manhattan and its surrounds. With this admission ticket, you'll have access to all three Observatory floors for a memorable experience that offers fabulous photo ops, New York City history, and dining options to buy food or drinks high in the sky. Choose to upgrade to the priority combo ticket to skip all the lines with Priority Access security line and Express elevator to the top, Priority exit from the Observatory and access to the One World Explorer - the virtual guide iPad. For the ultimate experience, upgrade to the All-Inclusive Flex Admission to arrive anytime on your selected travel date, receive all the upgrades of a Priority Combo ticket plus $15 to Eat, Drink, or Shop.",

    rating: "4.600000",
    // pictures: [""],
    pictures: [
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/75/92/7d.jpg",
    ],
    bookingLink: "https://b2c.mla.cloud/c/nppqFU4f?c=2WxbgL36",
    price: {
      currencyCode: "EUR",
      amount: "36.00",
    },
  },
  {
    name: "9-11 Memorial and Museum tickets",
    shortDescription:
      "Book your tickets to the 9/11 Memorial & Museum on Musement today. Visit the touching memorial, and learn about the events of that fateful day.",

    rating: "4.700000",
    // pictures: [""],
    pictures: [
      "https://images.musement.com/cover/0001/19/9-11-memorial-museum-tickets_header-18896.jpeg?w=500",
    ],
    bookingLink: "https://b2c.mla.cloud/c/pv4WuKnR?c=2WxbgL36",
    price: {
      currencyCode: "EUR",
      amount: "26.00",
    },
  },
  {
    name: "Big Apple Helicopter Tour of New York",
    shortDescription:
      "See New York's famous landmarks from the air on an exhilarating 15-minute helicopter tour. You'll come face-to-face with the Statue of Liberty as you fly above the Hudson River. Admire the iconic Empire State Building, the silver Art Deco brilliance of the Chrysler Building, and the sprawling green expanse of Central Park. A must for any visitor to New York City!",

    rating: "4.400000",
    // pictures: [""],
    pictures: [
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/61/53.jpg",
    ],
    bookingLink: "https://b2c.mla.cloud/c/ZAEPrRDM?c=2WxbgL36",
    price: {
      currencyCode: "EUR",
      amount: "195.00",
    },
  },
  {
    name: "NYC One World Observatory Skip-the-Line Ticket",
    shortDescription:
      "There are a million things to experience in New York City, but this is one in a million. Located at the top three floors of the One World Trade Center, which is now the tallest building in the western hemisphere, the observatory boasts jaw-dropping views of Manhattan and its surrounds. With this admission ticket, you'll have access to all three Observatory floors for a memorable experience that offers fabulous photo ops, New York City history, and dining options to buy food or drinks high in the sky. Choose to upgrade to the priority combo ticket to skip all the lines with Priority Access security line and Express elevator to the top, Priority exit from the Observatory and access to the One World Explorer - the virtual guide iPad. For the ultimate experience, upgrade to the All-Inclusive Flex Admission to arrive anytime on your selected travel date, receive all the upgrades of a Priority Combo ticket plus $15 to Eat, Drink, or Shop.",

    rating: "4.600000",
    // pictures: [""],
    pictures: [
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/75/92/7d.jpg",
    ],
    bookingLink: "https://b2c.mla.cloud/c/nppqFU4f?c=2WxbgL36",
    price: {
      currencyCode: "EUR",
      amount: "36.00",
    },
  },
];

export const flightsPlaceholder: Flight[] = [
  {
    id: "1",
    idFlight: "0",
    travelerPricings: [
      {
        fareDetailsBySegment: [
          {
            cabin: "Economy",
          },
        ],
      },
    ],
    price: {
      currency: "USD",
      total: 245,
    },
    class: "ECONOMY",
    itineraries: [
      {
        duration: "PT8H15M",
        segments: [
          {
            departure: {
              iataCode: "SIN",
              city: "Singapore",
              at: "2021-02-02T00:30:00",
              terminal: "2",
            },
            arrival: {
              iataCode: "DMK",
              city: "Bangkok",
              at: "2021-02-02T23:30:00",
              terminal: "31",
            },
            carrierCode: "Egyptair",
            duration: "PT8H15M",
          },
        ],
      },
    ],
  },
  {
    idFlight: "0",
    id: "2",
    travelerPricings: [
      {
        fareDetailsBySegment: [
          {
            cabin: "Economy",
          },
        ],
      },
    ],
    price: {
      currency: "USD",
      total: 198,
    },
    class: "ECONOMY",
    itineraries: [
      {
        duration: "PT6H15M",
        segments: [
          {
            departure: {
              iataCode: "SIN",
              city: "Singapore",
              at: "2021-02-02T07:15:00",
              terminal: "2",
            },
            arrival: {
              iataCode: "DXB",
              city: "Dubai",
              at: "2021-02-02T13:39:00",
              terminal: "31",
            },
            carrierCode: "Egyptair",
            duration: "PT6H15M",
          },
        ],
      },
      {
        duration: "PT8H25M",
        segments: [
          {
            departure: {
              iataCode: "DXB",
              city: "Dubai",
              at: "2021-02-12T09:15:00",
              terminal: "2",
            },
            arrival: {
              iataCode: "SIN",
              city: "Singapore",
              at: "2021-02-12T16:55:00",
              terminal: "31",
            },
            carrierCode: "Emirates",
            duration: "PT8H25M",
          },
        ],
      },
    ],
  },
];

export const flightPlaceholder: Flight = {
  id: "3",
  idFlight: "12",
  travelerPricings: [
    {
      fareDetailsBySegment: [
        {
          cabin: "Economy",
        },
      ],
    },
  ],
  price: {
    currency: "USD",
    total: 198,
  },
  class: "ECONOMY",
  itineraries: [
    {
      duration: "PT6H15M",
      segments: [
        {
          departure: {
            iataCode: "SIN",
            city: "Singapore",
            at: "2021-05-13T07:15:00",
            terminal: "2",
          },
          arrival: {
            iataCode: "DXB",
            city: "Dubai",
            at: "2021-05-13T13:15:00",
            terminal: "31",
          },
          carrierCode: "Egyptair",
          duration: "PT6H15M",
        },
      ],
    },
    {
      duration: "PT8H25M",
      segments: [
        {
          departure: {
            iataCode: "DXB",
            city: "Dubai",
            at: "2021-05-23T13:39:00",
            terminal: "2",
          },
          arrival: {
            iataCode: "SIN",
            city: "Singapore",
            at: "2021-05-23T20:35:00",
            terminal: "31",
          },
          carrierCode: "Emirates",
          duration: "PT8H25M",
        },
      ],
    },
  ],
};

export const hotelsPlaceholder: HotelAvailability = {
  checkIn: "2021-06-15",
  checkOut: "2021-06-16",
  hotels: [],
};

export const hotelPlaceholder: HotelBooking = {
  checkIn: "2021-06-15",
  checkOut: "2021-06-16",
  categoryGroupCode: "4EST",
  favorite: false,
  S2C: "4*",
  code: 128537,
  name: {
    content: "Coco Key Hotel and Water Park Resort",
  },
  description: {
    content:
      "The Hilton Garden Inn Lake Buena Vista/Orlando is a state-of-the-art, Green lodging hotel located just off I-4 and CR 535 and directly across the highway from Orlando's Premium Outlet Mall. Strategically situated just one mile from the entrance to Walt Disney World Resort and the entrance to SeaWorld, the Hilton Garden Inn Lake Buena Vista hotel offers easy access to the spectacular theme parks, unique restaurants, abundant shops, and exciting entertainment that have made this region one of the world's most popular. This new Hilton Garden Inn is just minutes from the downtown Orlando business center and city night life. A 5,400 sq.ft. conference facility was designed to accommodate the most discerning of meeting travelers and leisure vacationers alike.\n\nThis modern 7 story hotel was designed with the high-tech features to ensure the corporate traveler of the most modern conveniences. Radio Frequency room key technology affords travelers easy access into their rooms without fumbling for a room key. A spacious workout facility overlooking the Caribbean pool beach and spa area is available to all hotel guests. For your convenience, wireless HSIA is accessible throughout the hotel, complimentary. Modern designed guest rooms with 32\" Plasma HDTVs afford the very best of in-room entertainment.\n\nAll interior decorator designed rooms afford elegant, executive styled quarters with rich feeling of cherry wood and granite accents.\n\nComplimentary in-room HSIA, wired and wireless, is available throughout the hotel and conference rooms.\n\nA heated Caribbean style outdoor pool and whirlpool await guests after a long day of meetings or park hopping.\n\nA full size Fitness Center facility overlooking the spa and pool beach area is available for all guests 24/7, complimentary.\n\nThe Hilton Garden Inn LBV conference facilities include 5,400 square feet of flexible meeting and banquet facilities, abound in natural light. A 3,200 sq. ft.",
  },
  address: {
    content: "11400 Marbella Palm Ct.",
  },
  city: {
    content: " ORLANDO",
  },
  email: "MCOBV_GM@hilton.com",
  phones: [
    {
      phoneNumber: "+14072399550",
    },
    {
      phoneNumber: "+14072399550",
    },
    {
      phoneNumber: "14072399550",
    },
    {
      phoneNumber: "+14072389605",
    },
  ],
  categoryCode: "3EST",
  category: {
    code: "3EST",
  },
  categoryName: "3 STARS",
  destinationName: "Orlando Area - Florida - FL",
  countryCode: "US",
  latitude: "28.45423",
  longitude: "-81.472135",
  rooms: [
    {
      code: "DBL.GR",
      name: "DOUBLE GUEST ROOM EXTERIOR CORRIDORS",
      rates: [
        {
          net: "153.48",
          rateKey: "",
          boardName: "ROOM ONLY",
          taxes: {
            taxes: [
              {
                amount: "50.00",
                currency: "USD",
                clientAmount: "41.13",
                clientCurrency: "EUR",
              },
            ],
          },
          rooms: 2,
          adults: 4,
          children: 0,
        },
        {
          net: "153.48",
          boardName: "ROOM ONLY",
          rateKey: "",
          taxes: {
            taxes: [
              {
                amount: "50.00",
                currency: "USD",
                clientAmount: "41.13",
                clientCurrency: "EUR",
              },
            ],
          },
          rooms: 2,
          adults: 4,
          children: 0,
        },
        {
          net: "159.94",
          rateKey: "",
          boardName: "ROOM ONLY",
          taxes: {
            taxes: [
              {
                amount: "50.00",
                currency: "USD",
                clientAmount: "41.13",
                clientCurrency: "EUR",
              },
            ],
          },
          rooms: 2,
          adults: 4,
          children: 0,
        },
        {
          net: "159.94",
          rateKey: "",
          boardName: "ROOM ONLY",
          taxes: {
            taxes: [
              {
                amount: "50.00",
                currency: "USD",
                clientAmount: "41.13",
                clientCurrency: "EUR",
              },
            ],
          },
          rooms: 2,
          adults: 4,
          children: 0,
        },
        {
          net: "190.24",
          rateKey: "",
          boardName: "ROOM ONLY",
          rooms: 2,
          adults: 4,
          children: 0,
        },
        {
          net: "208.00",
          rateKey: "",
          boardName: "ROOM ONLY",
          rooms: 2,
          adults: 4,
          children: 0,
        },
      ],
    },
  ],
  minRate: 153.48,
  maxRate: 208.0,
  currency: "EUR",
  images: [
    {
      path: "13/130786/130786a_hb_r_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 601,
    },
    {
      path: "13/130786/130786a_hb_r_002.jpg",
      roomCode: "a",
      order: 2,
      visualOrder: 602,
    },
    {
      path: "13/130786/130786a_hb_r_004.jpg",
      roomCode: "a",
      order: 4,
      visualOrder: 603,
    },
    {
      path: "13/130786/130786a_hb_f_011.jpg",
      roomCode: "a",
      order: 11,
      visualOrder: 902,
    },
    {
      path: "13/130786/130786a_hb_f_012.jpg",
      roomCode: "a",
      order: 12,
      visualOrder: 903,
    },
    {
      path: "13/130786/130786a_hb_ro_007.jpg",
      roomCode: "a",
      order: 7,
      visualOrder: 405,
    },
    {
      path: "13/130786/130786a_hb_f_010.jpg",
      roomCode: "a",
      order: 10,
      visualOrder: 901,
    },
    {
      path: "13/130786/130786a_hb_ro_009.jpg",
      roomCode: "a",
      order: 9,
      visualOrder: 407,
    },
    {
      path: "13/130786/130786a_hb_ro_006.jpg",
      roomCode: "a",
      order: 6,
      visualOrder: 404,
    },
    {
      path: "13/130786/130786a_hb_r_005.jpg",
      roomCode: "a",
      order: 5,
      visualOrder: 604,
    },
    {
      path: "13/130786/130786a_hb_ro_010.jpg",
      roomCode: "a",
      order: 10,
      visualOrder: 10,
    },
    {
      path: "13/130786/130786a_hb_r_006.jpg",
      roomCode: "a",
      order: 6,
      visualOrder: 605,
    },
    {
      path: "13/130786/130786a_hb_r_007.jpg",
      roomCode: "a",
      order: 7,
      visualOrder: 606,
    },
    {
      path: "13/130786/130786a_hb_l_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 201,
    },
    {
      path: "13/130786/130786a_hb_ro_012.jpg",
      roomCode: "a",
      order: 12,
      visualOrder: 12,
    },
    {
      path: "13/130786/130786a_hb_k_002.jpg",
      roomCode: "a",
      order: 2,
      visualOrder: 802,
    },
    {
      path: "13/130786/130786a_hb_l_003.jpg",
      roomCode: "a",
      order: 3,
      visualOrder: 203,
    },
    {
      path: "13/130786/130786a_hb_k_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 801,
    },
    {
      path: "13/130786/130786a_hb_l_002.jpg",
      roomCode: "a",
      order: 2,
      visualOrder: 202,
    },
    {
      path: "13/130786/130786a_hb_ro_013.jpg",
      roomCode: "a",
      order: 13,
      visualOrder: 13,
    },
    {
      path: "13/130786/130786a_hb_p_002.jpg",
      roomCode: "a",
      order: 2,
      visualOrder: 502,
    },
    {
      path: "13/130786/130786a_hb_ba_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 701,
    },
    {
      path: "13/130786/130786a_hb_p_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 501,
    },
    {
      path: "13/130786/130786a_hb_ba_002.jpg",
      roomCode: "a",
      order: 2,
      visualOrder: 702,
    },
    {
      path: "13/130786/130786a_hb_w_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 301,
    },
    {
      path: "13/130786/130786a_hb_ro_003.jpg",
      roomCode: "a",
      order: 3,
      visualOrder: 401,
    },
    {
      path: "13/130786/130786a_hb_ro_004.jpg",
      roomCode: "a",
      order: 4,
      visualOrder: 402,
    },
    {
      path: "13/130786/130786a_hb_ro_005.jpg",
      roomCode: "a",
      order: 5,
      visualOrder: 403,
    },
    {
      path: "13/130786/130786a_hb_l_005.jpg",
      roomCode: "a",
      order: 5,
      visualOrder: 205,
    },
    {
      path: "13/130786/130786a_hb_a_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 101,
    },
    {
      path: "13/130786/130786a_hb_k_003.jpg",
      roomCode: "a",
      order: 3,
      visualOrder: 803,
    },
    {
      path: "13/130786/130786a_hb_l_004.jpg",
      roomCode: "a",
      order: 4,
      visualOrder: 204,
    },
    {
      path: "13/130786/130786a_hb_ro_008.jpg",
      roomCode: "a",
      order: 8,
      visualOrder: 406,
    },
    {
      path: "13/130786/130786a_hb_t_001.jpg",
      roomCode: "a",
      order: 1,
      visualOrder: 1001,
    },
    {
      path: "13/130786/130786a_hb_p_003.jpg",
      roomCode: "a",
      order: 3,
      visualOrder: 503,
    },
    {
      path: "13/130786/130786a_hb_ro_011.jpg",
      roomCode: "a",
      order: 11,
      visualOrder: 11,
    },
  ],
};

export const hotelRsvPlaceholder: HotelReservation = {
  idHotelReservation: null,
  checkIn: new Date(2021, 5, 15),
  checkOut: new Date(2021, 5, 26),
  hotelCode: 128537,
  hotelImage: "/Travel-Agent/h1.jpg",
  stars: 5,
  name: "Coco Key Hotel and Water Park Resort",
  address: "11400 Marbella Palm Ct.",
  phoneNumber: "+14072399550",
  adults: 4,
  children: 4,
  rooms: [],
};

export const hotelPhotos = [
  "/Travel-Agent/george1.jpg",
  "/Travel-Agent/george2.jpg",
  "/Travel-Agent/george3.jpg",
  "/Travel-Agent/george4.jpg",
  "/Travel-Agent/george5.jpg",
  "/Travel-Agent/george6.jpg",
];

const poiArray: POIType[] = [
  {
    id: "49c54c1bf964a520ed561fe3",
    favorite: false,
    name: "The Morgan Library & Museum",
    attributes: {
      groups: [],
    },
    bestPhoto: { height: 0, prefix: "", suffix: "", width: 0 },
    contact: {},
    hours: {
      timeframes: [],
    },
    rating: 5,
    url: "",

    location: {
      address: "225 Madison Ave",
      crossStreet: "btwn E 36th & E 37th St",
      lat: 40.74921,
      lng: -73.98153,
      distance: 363,
      postalCode: "10016",
      city: "New York",
      state: "NY",
      country: "United States",
      formattedAddress: [
        "225 Madison Ave (btwn E 36th & E 37th St)",
        "New York, NY 10016",
        "United States",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d181941735",
        name: "Museum",
        pluralName: "Museums",
        shortName: "Museum",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "4e8c7d54e5fa774802eb9515",
    favorite: false,
    name: "Hulu Theater",
    attributes: {
      groups: [],
    },
    bestPhoto: { height: 0, prefix: "", suffix: "", width: 0 },
    contact: {},
    hours: {
      timeframes: [],
    },
    rating: 5,
    url: "",

    location: {
      address: "4 Penn Plz",
      lat: 40.750923181108604,
      lng: -73.99407910561577,
      distance: 760,
      postalCode: "10121",
      city: "New York",
      state: "NY",
      country: "United States",
      formattedAddress: ["4 Penn Plz", "New York, NY 10121", "United States"],
    },
    categories: [
      {
        id: "4bf58dd8d48988d1e5931735",
        name: "Music Venue",
        pluralName: "Music Venues",
        shortName: "Music Venue",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
  {
    id: "53866567498ea4ed73cabb0c",
    favorite: false,
    name: "Dear Irving",
    attributes: {
      groups: [],
    },
    bestPhoto: { height: 0, prefix: "", suffix: "", width: 0 },
    contact: {},
    hours: {
      timeframes: [],
    },
    rating: 5,
    url: "",

    location: {
      address: "55 Irving Pl",
      crossStreet: "at E 17th St",
      lat: 40.736088656671825,
      lng: -73.98732376809846,
      distance: 1377,
      postalCode: "10003",
      city: "New York",
      state: "NY",
      country: "United States",
      formattedAddress: [
        "55 Irving Pl (at E 17th St)",
        "New York, NY 10003",
        "United States",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d116941735",
        name: "Bar",
        pluralName: "Bars",
        shortName: "Cocktail",
        icon: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
];

const poiRsv: RsvPOI = {
  id: "49c54c1bf964a520ed561fe3",
  name: "The Morgan Library & Museum",

  rating: 5,
  category: "Music Venues",
  categoryIconUrl: "a",
  formattedAddress: "",
  imageUrl: "",
  visitDate: new Date().toISOString(),
};

export const tripAlbumPlaceholder: TripAlbum = {
  idAlbum: "qec",
  name: "Ballon day!",
  cover: "/Travel-Agent/globes.jpg",
  pictures: [
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date(2021, 4, 25).toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date(2021, 4, 25).toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date(2021, 4, 25).toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date().toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date().toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      date: new Date().toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date(2021, 4, 25).toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date(2021, 4, 25).toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date(2021, 4, 25).toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date().toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: new Date().toISOString(),
    },
    {
      idPicture: "asd",
      name: "",
      pictureUrl:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      date: new Date().toISOString(),
    },
  ],
};

export const tripPlaceholder: Trip = {
  idTrip: "498650",
  name: "Journey through the alps",
  countries: ["Switzerland", "Austria", "France"],
  photosQty: 184,
  places: 13,
  days: 30,
  budget: 2500,
  startDate: new Date(2021, 4, 13),
  albums: [
    tripAlbumPlaceholder,
    {
      idAlbum: "1223asa",
      name: "Villages",
      cover: "/Travel-Agent/country.jpg",
      pictures: [
        {
          idPicture: "asd",
          pictureUrl: "",
          name: "country.jpg",
          date: new Date().toISOString(),
        },
      ],
    },
    {
      idAlbum: "fsdgf",
      name: "Ballon day!",
      cover: "/Travel-Agent/globes.jpg",
      pictures: [
        {
          idPicture: "asd",
          pictureUrl: "",
          name: "globes.jpg",
          date: new Date().toISOString(),
        },
      ],
    },
    {
      idAlbum: "5a4sd",
      name: "Villages",
      cover: "/Travel-Agent/country.jpg",
      pictures: [
        {
          idPicture: "asd",
          pictureUrl: "",
          name: "country.jpg",
          date: new Date().toISOString(),
        },
      ],
    },
  ],
  coverPhoto: "",
  endDate: new Date(2021, 4, 23),
  itinerary: [
    {
      name: "Flight to Dubai",
      idEvent: 12,
      type: EventTypes.FLIGHT,
      start: new Date(flightPlaceholder.itineraries[0].segments[0].departure.at),
      end: new Date(flightPlaceholder.itineraries[0].segments[0].arrival.at),
      flight: flightPlaceholder,
      location: "SIN, Singapore",
      includesTime: true,
    },
    {
      name: "Flight to Singapore",
      type: EventTypes.FLIGHT,
      idEvent: 11,
      start: new Date(flightPlaceholder.itineraries[1].segments[0].departure.at),
      end: new Date(flightPlaceholder.itineraries[1].segments[0].arrival.at),
      flight: flightPlaceholder,
      location: "DXB, Dubai",
      includesTime: true,
    },
    {
      idEvent: 46,
      name: "Arrival at Hotel Sheraton Santo Domingo",
      type: EventTypes.HOTEL,
      start: new Date(2021, 4, 13, 14, 35),
      end: new Date(2021, 4, 17, 11, 35),
      hotelReservation: hotelRsvPlaceholder,
      location: "Santo Domingo, Dominican Republic",
      includesTime: true,
    },
    {
      idEvent: 78,
      name: "Visit to The Morgan Library & Museum",
      type: EventTypes.POI,
      start: new Date(2021, 4, 16, 16, 0),
      end: new Date(2021, 4, 16, 17, 0),
      poi: poiRsv,
      location: "225 Madison Ave (btwn E 36th & E 37th St) New York, United States",
      includesTime: true,
    },
    {
      name: "Visit to Hulu Theater",
      type: EventTypes.POI,
      idEvent: 44,
      start: new Date(2021, 4, 19, 12, 0),
      end: new Date(2021, 4, 19, 14, 0),
      poi: poiRsv,
      location: "4 Penn Plz, New York, United States",
      includesTime: true,
    },
    {
      name: "Visit to Dear Irving",
      idEvent: 18,
      type: EventTypes.POI,
      start: new Date(2021, 4, 21, 0, 0),
      end: new Date(2021, 4, 21, 3, 0),
      poi: poiRsv,
      location: "55 Irving Pl (at E 17th St), New York, United States",
      includesTime: true,
    },
  ],
};

export const tripsPlaceholder: Trip[] = [
  {
    idTrip: "498650",
    name: "Journey through the alps",
    countries: ["Switzerland", "Austria", "France"],
    photosQty: 184,
    budget: 2500,
    places: 13,
    days: 30,
    startDate: new Date(2019, 6, 13),
    endDate: new Date(2019, 7, 13),
    coverPhoto: "journey.jpg",
    albums: [
      {
        idAlbum: "",
        name: "Ballon day!",
        cover: "/Travel-Agent/globes.jpg",
        pictures: [
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
        ],
      },
      {
        idAlbum: "",
        name: "Villages",
        cover: "/Travel-Agent/country.jpg",
        pictures: [
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
        ],
      },
    ],
  },
  {
    idTrip: "7008965",
    name: "Meso-american Tour",
    budget: 2500,
    albums: [
      {
        idAlbum: "",
        name: "Ballon day!",
        cover: "/Travel-Agent/globes.jpg",
        pictures: [
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
        ],
      },
      {
        idAlbum: "",
        name: "Villages",
        cover: "/Travel-Agent/country.jpg",
        pictures: [
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
        ],
      },
    ],
    countries: ["Guatemala", "Mexico"],
    photosQty: 52,
    places: 9,
    days: 15,
    startDate: new Date(2019, 8, 2),
    endDate: new Date(2019, 8, 17),
    coverPhoto: "globes.jpg",
  },
  {
    idTrip: "1235",
    name: "Indonesia in a month",
    countries: ["Indonesia"],
    budget: 2500,
    photosQty: 216,
    places: 31,
    days: 30,
    startDate: new Date(2019, 4, 5),
    albums: [
      {
        idAlbum: "",
        name: "Ballon day!",
        cover: "/Travel-Agent/globes.jpg",
        pictures: [
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
        ],
      },
      {
        idAlbum: "",
        name: "Villages",
        cover: "/Travel-Agent/country.jpg",
        pictures: [
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date(2021, 4, 25).toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
          {
            idPicture: "asd",
            name: "",
            pictureUrl:
              "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            date: new Date().toISOString(),
          },
        ],
      },
    ],
    endDate: new Date(2019, 5, 5),
    coverPhoto: "country.jpg",
  },
];

export const tripEventPlaceholder: TripEvent = {
  name: "Flight to Dubai",
  idEvent: 12,
  type: EventTypes.FLIGHT,
  start: new Date(flightPlaceholder.itineraries[0].segments[0].departure.at),
  end: new Date(flightPlaceholder.itineraries[0].segments[0].arrival.at),
  flight: flightPlaceholder,
  location: "SIN, Singapore",
  includesTime: true,
};

export const airportCityPlaceholder: IATALocation = {
  code: "MIA",
  lat: "25.7953",
  lon: "-80.2727",
  name: "Miami International Airport",
  city: "Miami",
  state: "Florida",
  country: "United States",
  woeid: "12520923",
  tz: "America/New_York",
  phone: "(305) 876-7000",
  type: "Airports",
  email: "customerservice@miami-airport.com",
  url: "http://www.miami-airport.com",
  runway_length: "13000",
  elev: "11",
  icao: "KMIA",
  direct_flights: "167",
  carriers: "91",
};

export const airportCityPlaceholderTwo: IATALocation = {
  code: "MUC",
  lat: "48.354",
  lon: "11.7816",
  name: "Franz-Josef-Strauss Airport",
  city: "Oberding",
  state: "Bavaria",
  country: "Germany",
  woeid: "22923040",
  tz: "Europe/Berlin",
  phone: "",
  type: "Airports",
  email: "",
  url: "http://www.munich-airport.de/",
  runway_length: "13100",
  elev: "1737",
  icao: "EDDM",
  direct_flights: "213",
  carriers: "95",
};

export const carBrandPlaceholder: CarCheckbox[] = [
  {
    name: "Chrysler",
    checked: true,
  },
  {
    name: "Fiat",
    checked: false,
  },
  {
    name: "Ford",
    checked: false,
  },
  {
    name: "Toyota",
    checked: true,
  },
];

export const carsPlaceholder: Car[] = [
  {
    category: {
      name: "Ford Fiesta or similar",
      make: "Kia",
      model: "Rio",
      vehicle_class_name: "Economy",
      vehicle_transmission: "Automatic",
      mpg: "27/35",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2019/ford/2019-ford-fiesta-se-5door-2wd-hatchback-grey.png",
    },
    features: {
      bluetooth_equipped: false,
      smoke_free: true,
      air_conditioned: true,
      connected_car: false,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 217.74,
      },
    },
  },
  {
    category: {
      name: "Group B - Kia Soul or similar",
      make: "Kia",
      model: "Soul",
      vehicle_class_name: "Compact",
      vehicle_transmission: "Automatic",
      mpg: "25/29",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2021/kia/2021-kia-soul-s-5door-hatchback-black.png",
    },
    features: {
      bluetooth_equipped: false,
      smoke_free: true,
      air_conditioned: true,
      connected_car: false,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 237.07,
      },
    },
  },
  {
    category: {
      name: "Group C - Toyota Corolla or similar",
      make: "Toyota",
      model: "Corolla",
      vehicle_class_name: "Intermediate",
      vehicle_transmission: "Automatic",
      mpg: "29/35",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2020/toyota/2020-toyota-corolla-le-sedan-grey.png",
    },
    features: {
      bluetooth_equipped: false,
      smoke_free: true,
      connected_car: false,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 256.4,
      },
    },
  },
  {
    category: {
      name: "Group D - Volkswagen Jetta or similar",
      make: "Volkswagen",
      model: "Jetta",
      vehicle_class_name: "Standard",
      vehicle_transmission: "Automatic",
      mpg: "24/35",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2021/volkswagen/2021-volkswagen-jetta-s-sedan-silver.png",
    },
    features: {
      smoke_free: true,
      bluetooth_equipped: false,
      connected_car: false,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 217.72,
      },
    },
  },
  {
    category: {
      name: "Group E - Toyota Camry or similar",
      make: "Toyota",
      model: "Camry",
      vehicle_class_name: "Full-Size",
      vehicle_transmission: "Automatic",
      mpg: "22/30",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2021/toyota/2021-toyota-camry-se-sedan-black.png",
    },
    features: {
      bluetooth_equipped: false,
      connected_car: false,
      air_conditioned: true,
      smoke_free: true,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 275.73,
      },
    },
  },
  {
    category: {
      name: "Group S - Nissan Pathfinder or similar",
      make: "Nissan",
      model: "Pathfinder",
      vehicle_class_name: "Standard Elite SUV",
      vehicle_transmission: "Automatic",
      mpg: "15/20",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2020/nissan/2020-nissan-pathfinder-s-4wd-suv-black.png",
    },
    features: {
      bluetooth_equipped: false,
      smoke_free: true,
      connected_car: false,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "7",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 306.62,
      },
    },
  },
  {
    category: {
      name: "Group P - Ford Transit 12-Passenger Van or similar",
      make: "Ford Transit",
      model: "12-Passenger Van",
      vehicle_class_name: "Passenger Van",
      vehicle_transmission: "Automatic",
      mpg: "15/20",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2020/ford/2020-ford-transit-350-xlt-low-roof-passenger-van-white.png",
    },
    features: {
      bluetooth_equipped: false,
      connected_car: false,
      air_conditioned: true,
      smoke_free: true,
    },
    capacity: {
      doors: "4",
      seats: "12",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 396.84,
      },
    },
  },
  {
    category: {
      name: "Group G - Volkswagen Passat or similar",
      make: "Volkswagen",
      model: "Passat",
      vehicle_class_name: "Premium",
      vehicle_transmission: "Automatic",
      mpg: "18/29",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2021/volkswagen/2021-volkswagen-passat-se-sedan-black.png",
    },
    features: {
      connected_car: false,
      bluetooth_equipped: false,
      smoke_free: true,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 295.06,
      },
    },
  },
  {
    category: {
      name: "Group H - Chrysler 300 or similar",
      make: "Chrysler",
      model: "300",
      vehicle_class_name: "Luxury",
      vehicle_transmission: "Automatic",
      mpg: "18/21",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2019/chrysler/2019-chrysler-300-limited-sedan-black.png",
    },
    features: {
      smoke_free: true,
      connected_car: false,
      bluetooth_equipped: false,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 311.8,
      },
    },
  },
  {
    category: {
      name: "Group L - Ford Expedition or similar",
      make: "Ford",
      model: "Expedition",
      vehicle_class_name: "Premium SUV",
      vehicle_transmission: "Automatic",
      mpg: "16/21",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2020/ford/2020-ford-expedition-xlt-suv-black.png",
    },
    features: {
      connected_car: false,
      bluetooth_equipped: false,
      smoke_free: true,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "7/8",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 373.65,
      },
    },
  },
  {
    category: {
      name: "Group K - Ford Mustang Convertible or similar",
      make: "Ford",
      model: "Mustang Convertible",
      vehicle_class_name: "Convertible",
      vehicle_transmission: "Automatic",
      mpg: "19/24",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2020/ford/2020-ford-mustang-ecoboost-premium-convertible-grey.png",
    },
    features: {
      bluetooth_equipped: false,
      smoke_free: true,
      connected_car: false,
      air_conditioned: true,
    },
    capacity: {
      doors: "2",
      seats: "4",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 511.48,
      },
    },
  },
  {
    category: {
      name: "Group W - Ford Edge or similar",
      make: "Ford",
      model: "Edge",
      vehicle_class_name: "Standard SUV",
      vehicle_transmission: "Automatic",
      mpg: "15/22",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2020/ford/2020-ford-edge-st-4wd-suv-grey.png",
    },
    features: {
      bluetooth_equipped: false,
      connected_car: false,
      smoke_free: true,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 291.19,
      },
    },
  },
  {
    category: {
      name: "Group V - Chrysler Voyager or similar",
      make: "Chrysler",
      model: "Voyager",
      vehicle_class_name: "Minivan",
      vehicle_transmission: "Automatic",
      mpg: "16/21",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2020/chrysler/2020-chrysler-voyager-lx-minivan-white.png",
    },
    features: {
      bluetooth_equipped: false,
      air_conditioned: true,
      connected_car: false,
      smoke_free: true,
    },
    capacity: {
      doors: "4",
      seats: "7",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 286.04,
      },
    },
  },
  {
    category: {
      name: "Group F - Mazda CX-5 or similar",
      make: "Mazda",
      model: "CX-5",
      vehicle_class_name: "Intermediate SUV",
      vehicle_transmission: "Automatic",
      mpg: "20/26",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2021/mazda/2021-mazda-cx-5-grand-touring-4wd-suv-gray.png",
    },
    features: {
      bluetooth_equipped: false,
      smoke_free: true,
      air_conditioned: true,
      connected_car: false,
    },
    capacity: {
      doors: "4",
      seats: "5",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 284.75,
      },
    },
  },
  {
    category: {
      name: "Group Z - Chevrolet Tahoe or similar",
      make: "Chevrolet",
      model: "Tahoe",
      vehicle_class_name: "Full-Size SUV",
      vehicle_transmission: "Automatic",
      mpg: "14/19",
      image_url:
        "https://www.avis.com/content/dam/cars/l/2021/chevrolet/2021-chevrolet-tahoe-lt-4wd-suv-black.png",
    },
    features: {
      bluetooth_equipped: false,
      smoke_free: true,
      connected_car: false,
      air_conditioned: true,
    },
    capacity: {
      doors: "4",
      seats: "7/8",
    },
    rate_totals: {
      rate: {
        currency: "EUR",
      },
      pay_later: {
        reservation_total: 301.5,
      },
    },
  },
];

export const carRsvPlaceholder: CarRsv[] = [
  {
    name: "Toyota Corolla",
    idCarRental: 12,
    features: ["AIR_CONDITIONED", "BLUETOOTH"],
    cost: 285,
    doors: 3,
    seats: 4,
    image:
      "https://www.avis.com/content/dam/cars/l/2020/toyota/2020-toyota-corolla-le-sedan-grey.png",
    pickupDate: new Date().toISOString(),
    dropoffDate: new Date().toISOString(),
    location: "St Paul Intl Airport, Minnesota, United States",
    mpg: "25/33",
    transmission: "AUTOMATIC",
  },
  {
    name: "Kia Sorento",
    idCarRental: 111,
    features: ["AIR_CONDITIONED", "BLUETOOTH"],
    cost: 285,
    doors: 3,
    seats: 4,
    image:
      "https://www.avis.com/content/dam/cars/l/2019/ford/2019-ford-fiesta-se-5door-2wd-hatchback-grey.png",
    pickupDate: new Date().toISOString(),
    dropoffDate: new Date().toISOString(),
    location: "St Paul Intl Airport, Minnesota, United States",
    mpg: "21/28",
    transmission: "AUTOMATIC",
  },
];
