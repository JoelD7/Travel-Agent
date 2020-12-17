import * as Routes from "./Routes";
import * as HotelAmenity from "./HotelAmenities";
import * as POICategory from "./POICategory";
export * from "./slices";
export * from "./types";
export * from "./functions/functions";
export { HotelAmenity, Routes, POICategory };

export const restaurantsPlaceholder: Restaurant[] = [
  {
    id: "16769546",
    name: "Katz's Delicatessen",
    url:
      "https://www.zomato.com/new-york-city/katzs-delicatessen-lower-east-side?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "205 East Houston Street, New York 10002",
      locality: "Lower East Side",
      city: "New York City",
      cityID: 280,
      latitude: "40.7223277778",
      longitude: "-73.9873500000",
      zipcode: "10002",
      countryID: 216,
    },
    cuisines: "Sandwich",
    timings:
      "8 AM to 10:30 PM (Mon, Tue, Wed, Sun), 8 AM to 2:30 AM (Thu),24 Hours (Fri-Sat)",
    avgCostForTwo: 30,
    priceRange: 2,
    currency: "$",
    highlights: [
      "Lunch",
      "Serves Alcohol",
      "Cash",
      "Dinner",
      "Credit Card",
      "Takeaway Available",
      "Breakfast",
      "Wine",
      "Indoor Seating",
      "Kosher",
      "Beer",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/6/16769546/48ab9901ddf191d13ade07221b43ba93.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/katzs-delicatessen-lower-east-side/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/katzs-delicatessen-lower-east-side/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/6/16769546/48ab9901ddf191d13ade07221b43ba93.jpg",
    phoneNumbers: "(212) 254-2246",
    establishment: ["Deli"],
    rating: 4.6,
    ratingText: "Excellent",
  },
  {
    id: "16771079",
    name: "Lombardi's Pizza",
    url:
      "https://www.zomato.com/new-york-city/lombardis-pizza-lower-east-side?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "32 Spring Street, New York 10012",
      locality: "Spring Street, Lower East Side",
      city: "New York City",
      cityID: 280,
      latitude: "40.7215730000",
      longitude: "-73.9956350000",
      zipcode: "10012",
      countryID: 216,
    },
    cuisines: "Pizza, Italian",
    timings:
      "11:30 AM to 11 PM (Mon, Tue, Wed, Thu, Sun), 11:30 AM to 12 Midnight (Fri-Sat)",
    avgCostForTwo: 50,
    priceRange: 3,
    currency: "$",
    highlights: [
      "Lunch",
      "Delivery",
      "Dinner",
      "Cash",
      "Takeaway Available",
      "Wine",
      "Private Parking",
      "Street Parking",
      "ATM",
      "Beer",
      "Indoor Seating",
      "Casual Attire",
    ],
    thumb:
      "https://b.zmtcdn.com/data/res_imagery/16771079_RESTAURANT_da60c9abb32fa64cddc148a2795ae43c_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/lombardis-pizza-lower-east-side/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/lombardis-pizza-lower-east-side/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/res_imagery/16771079_RESTAURANT_da60c9abb32fa64cddc148a2795ae43c_c.jpg",
    phoneNumbers: "(212) 941-7994",
    establishment: ["Pizzeria"],
    rating: 4.2,
    ratingText: "Very good",
  },
  {
    id: "16781904",
    name: "Momofuku Noodle Bar",
    url:
      "https://www.zomato.com/new-york-city/momofuku-noodle-bar-east-village?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "171 1st Avenue 10003",
      locality: "East Village",
      city: "New York City",
      cityID: 280,
      latitude: "40.7291000000",
      longitude: "-73.9843200000",
      zipcode: "10003",
      countryID: 216,
    },
    cuisines: "Asian, Ramen",
    timings:
      "12 Noon to 4:30 PM, 5:30 PM to 11 PM (Mon-Thu),12 Noon to 4:30 PM, 5:30 PM to 1 AM (Fri),12 Noon to 4 PM, 5:30 PM to 1 AM (Sat),12 Noon to 4 PM, 5:30 PM to 11 PM (Sun)",
    avgCostForTwo: 70,
    priceRange: 4,
    currency: "$",
    highlights: [
      "Lunch",
      "Serves Alcohol",
      "Delivery",
      "Credit Card",
      "Dinner",
      "Takeaway Available",
      "Lunch Menu",
      "Beer",
      "Wine",
      "Indoor Seating",
      "Table booking recommended",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/chains/3/16772773/032b860c175202ad63c7a5ae1add1f99.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/momofuku-noodle-bar-east-village/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/momofuku-noodle-bar-east-village/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/chains/3/16772773/032b860c175202ad63c7a5ae1add1f99.png?output-format=webp",
    phoneNumbers: "(212) 777-7773",
    establishment: ["Casual Dining"],
    rating: 3.6,
    ratingText: "Excellent",
  },
  {
    id: "16777961",
    name: "The Spotted Pig",
    url:
      "https://www.zomato.com/new-york-city/the-spotted-pig-greenwich-village?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "314 West 11th Street 10014",
      locality: "Greenwich Village",
      city: "New York City",
      cityID: 280,
      latitude: "40.7355900000",
      longitude: "-74.0065000000",
      zipcode: "10014",
      countryID: 216,
    },
    cuisines: "Burger, Bar Food",
    timings: "12 Noon to 2 AM (Mon-Fri),11 AM to 2 AM (Sat-Sun)",
    avgCostForTwo: 70,
    priceRange: 4,
    currency: "$",
    highlights: [
      "Dinner",
      "Credit Card",
      "Lunch",
      "Serves Alcohol",
      "Michelin Starred",
      "Fullbar",
      "Indoor Seating",
      "Nightlife",
      "Gastro Pub",
      "Brunch",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/chains/1/16777961/1c02d5846ed641b4a9d096b1486f30e2.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/the-spotted-pig-greenwich-village/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/the-spotted-pig-greenwich-village/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/chains/1/16777961/1c02d5846ed641b4a9d096b1486f30e2.png?output-format=webp",
    phoneNumbers: "(212) 937-8518, (212) 620-0393, (212) 937-8518",
    establishment: ["Casual Dining"],
    rating: 4.7,
    ratingText: "Very good",
  },
  {
    id: "16760100",
    name: "Balthazar",
    url:
      "https://www.zomato.com/new-york-city/balthazar-soho?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "80 Spring Street 10012",
      locality: "Soho",
      city: "New York City",
      cityID: 280,
      latitude: "40.7225900000",
      longitude: "-73.9980500000",
      zipcode: "10012",
      countryID: 216,
    },
    cuisines: "French, Seafood, Bakery",
    timings:
      "7:30 AM to 11:30 AM, 12 Noon to 5 PM, 6 PM to 12 Midnight (Mon-Fri),9 AM to 4 PM, 6 PM to 1 AM (Sat),9 AM to 4 PM, 5:30 PM to 1 AM (Sun)",
    avgCostForTwo: 140,
    priceRange: 4,
    currency: "$",
    highlights: [
      "Dinner",
      "Takeaway Available",
      "Credit Card",
      "Lunch",
      "Serves Alcohol",
      "Breakfast",
      "Lunch Menu",
      "Indoor Seating",
      "Brunch",
      "Fullbar",
      "Vegan Options",
      "Desserts and Bakes",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/0/16760100/2cee8640b74a1e53fde146c9c90f5213.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/balthazar-soho/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/balthazar-soho/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/0/16760100/2cee8640b74a1e53fde146c9c90f5213.png?output-format=webp",
    phoneNumbers: "(212) 965-1414",
    establishment: ["Casual Dining"],
    rating: 4.2,
    ratingText: "Excellent",
  },
  {
    id: "16777384",
    name: "Shake Shack",
    url:
      "https://www.zomato.com/new-york-city/shake-shack-gramercy-flatiron?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "Madison Square Park, 23rd & Madison, New York 10010",
      locality: "Gramercy-Flatiron",
      city: "New York City",
      cityID: 280,
      latitude: "40.7408681000",
      longitude: "-73.9879841000",
      zipcode: "10010",
      countryID: 216,
    },
    cuisines: "American, Burger",
    timings: "7 AM to 11 PM (Mon-Fri), 8 AM to 11 PM (Sat-Sun)",
    avgCostForTwo: 30,
    priceRange: 2,
    currency: "$",
    highlights: [
      "Lunch",
      "Serves Alcohol",
      "Breakfast",
      "Dinner",
      "Cash",
      "Takeaway Available",
      "Credit Card",
      "Debit Card",
      "Outdoor Seating",
      "Beer",
      "Dog Friendly",
      "Gluten Free Options",
      "Wine",
      "Indoor Seating",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/4/16777384/2a989275f117f6bf1f63919c66cbc2cc.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/shake-shack-gramercy-flatiron/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/shake-shack-gramercy-flatiron/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/4/16777384/2a989275f117f6bf1f63919c66cbc2cc.jpg?output-format=webp",
    phoneNumbers: "(212) 889-6600",
    establishment: ["Fast Food"],
    rating: 3.5,
    ratingText: "Very good",
  },
  {
    id: "16781875",
    name: "Ippudo",
    url:
      "https://www.zomato.com/new-york-city/ippudo-east-village?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "65 4th Avenue, New York 10003",
      locality: "East Village",
      city: "New York City",
      cityID: 280,
      latitude: "40.7307361111",
      longitude: "-73.9906833333",
      zipcode: "10003",
      countryID: 216,
    },
    cuisines: "Ramen",
    timings:
      "11 AM to 3:30 PM, 5 PM to 12:30 AM (Mon-Fri),11 AM to 11:30 PM (Sat),11 AM to 8:30 PM (Sun)",
    avgCostForTwo: 40,
    priceRange: 3,
    currency: "$",
    highlights: [
      "Dinner",
      "Lunch",
      "Credit Card",
      "Lunch Menu",
      "Indoor Seating",
      "Fullbar",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/5/16781875/1a72663426d6e780f6363b6b7da6d48b.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/ippudo-east-village/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/ippudo-east-village/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/5/16781875/1a72663426d6e780f6363b6b7da6d48b.png?output-format=webp",
    phoneNumbers: "(212) 388-0088",
    establishment: ["Casual Dining"],
    rating: 4.65,
    ratingText: "Excellent",
  },
  {
    id: "16775039",
    name: "Peter Luger Steak House",
    url:
      "https://www.zomato.com/new-york-city/peter-luger-steak-house-south-side?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "178 Broadway, Brooklyn 11211",
      locality: "South Side",
      city: "New York City",
      cityID: 280,
      latitude: "40.7098777778",
      longitude: "-73.9623416667",
      zipcode: "11211",
      countryID: 216,
    },
    cuisines: "Steak, American, German, Burger",
    timings:
      "11:30 AM to 9:30 PM (Mon-Thu),12 Noon to 10:30 PM (Fri-Sat),1 PM to 9:30 PM (Sun)",
    avgCostForTwo: 150,
    priceRange: 4,
    currency: "$",
    highlights: [
      "Lunch",
      "Serves Alcohol",
      "Cash",
      "Dinner",
      "Debit Card",
      "Fullbar",
      "Michelin Starred",
      "Indoor Seating",
      "Table booking recommended",
    ],
    thumb:
      "https://b.zmtcdn.com/data/reviews_photos/ea9/ed66f37a5492836605ec71582db68ea9_1441919144.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/peter-luger-steak-house-south-side/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/peter-luger-steak-house-south-side/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/reviews_photos/ea9/ed66f37a5492836605ec71582db68ea9_1441919144.jpg?output-format=webp",
    phoneNumbers: "(718) 387-7400",
    establishment: ["Fine Dining"],
    rating: 4,
    ratingText: "Very good",
  },
  {
    id: "16761344",
    name: "Buddakan",
    url:
      "https://www.zomato.com/new-york-city/buddakan-greenwich-village?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "75 9th Avenue 10011",
      locality: "9th Avenue, Greenwich Village",
      city: "New York City",
      cityID: 280,
      latitude: "40.7422762672",
      longitude: "-74.0048000962",
      zipcode: "10011",
      countryID: 216,
    },
    cuisines: "Chinese, Fusion, Asian",
    timings:
      "5:30 PM to 11 PM (Mon-Tue), 5:30 PM to 12 Midnight (Wed-Thu), 5 PM to 1 AM (Fri-Sat), 5 PM to 11 PM (Sun)",
    avgCostForTwo: 130,
    priceRange: 4,
    currency: "$",
    highlights: [
      "Serves Alcohol",
      "Credit Card",
      "Dinner",
      "Nightlife",
      "Indoor Seating",
      "Fullbar",
      "Table booking recommended",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/4/16761344/5535198640b49778b948e916d392ebb8.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/buddakan-greenwich-village/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/buddakan-greenwich-village/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/4/16761344/5535198640b49778b948e916d392ebb8.jpg?output-format=webp",
    phoneNumbers: "(212) 989-6699, (212) 989-6699",
    establishment: ["Fine Dining"],
    rating: 5,
    ratingText: "Excellent",
  },
  {
    id: "16767139",
    name: "Gramercy Tavern",
    url:
      "https://www.zomato.com/new-york-city/gramercy-tavern-gramercy-flatiron?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    location: {
      address: "42 E 20th Street 10003",
      locality: "East 20th Street, Gramercy-Flatiron",
      city: "New York City",
      cityID: 280,
      latitude: "40.7387166667",
      longitude: "-73.9883888889",
      zipcode: "10003",
      countryID: 216,
    },
    cuisines: "American",
    timings: "11:30 AM to 11 PM (Mon-Thu, Sun), 11:30 AM to 12 Midnight (Fri-Sat)",
    avgCostForTwo: 200,
    priceRange: 4,
    currency: "$",
    highlights: [
      "Dinner",
      "Takeaway Available",
      "Lunch",
      "Serves Alcohol",
      "Cash",
      "Credit Card",
      "Michelin Starred",
      "Indoor Seating",
      "Table booking recommended",
      "Lunch Menu",
      "Fullbar",
    ],
    thumb:
      "https://b.zmtcdn.com/data/pictures/9/16767139/8e3fae144133ba709852d6eec7280397.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    photosURL:
      "https://www.zomato.com/new-york-city/gramercy-tavern-gramercy-flatiron/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    menuURL:
      "https://www.zomato.com/new-york-city/gramercy-tavern-gramercy-flatiron/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    featuredImage:
      "https://b.zmtcdn.com/data/pictures/9/16767139/8e3fae144133ba709852d6eec7280397.jpg?output-format=webp",
    phoneNumbers: "(212) 477-0777",
    establishment: ["Fine Dining"],
    rating: 4,
    ratingText: "Very good",
  },
];

export const poisPlaceholder: POISearch[] = [
  {
    id: "5c126be2e55d8b002c6430b6",
    name: "H&M",
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
    categories: [
      {
        id: "4bf58dd8d48988d103951735",
        name: "Clothing Store",
        pluralName: "Clothing Stores",
        shortName: "Apparel",
      },
    ],
  },
  {
    id: "4f22e6e5e4b067a3253b02c8",
    name: "Wigwam at ULC",
    contact: {},
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
    categories: [
      {
        id: "4bf58dd8d48988d1cc941735",
        name: "Movie Theater",
        pluralName: "Steakhouses",
        shortName: "Steakhouse",
      },
    ],
  },
  {
    id: "5ba16e7e46e1b6002ca0221b",
    name: "Athletico Physical Therapy - Union League Club",
    contact: {},
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
    categories: [
      {
        id: "5744ccdfe4b0c0459246b4af",
        name: "Gym / Fitness Center",
        pluralName: "Physical Therapists",
        shortName: "Physical Therapist",
      },
    ],
  },
];

export const poiPlaceholder: POI = {
  id: "49eeaf08f964a52078681fe3",
  name: "Vanessa's Dumpling House",
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
    },
    {
      id: "4bf58dd8d48988d145941735",
      name: "Chinese Restaurant",
      pluralName: "Chinese Restaurants",
      shortName: "Chinese",
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
