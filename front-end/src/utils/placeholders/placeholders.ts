import { parseISO } from "date-fns";
import { HotelAmenity } from "..";
import { EventType } from "../types";
import { HotelBooking, HotelAvailability } from "../types/HotelTypes";
import { Trip } from "../types/Trip";

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
    price: {
      currency: "USD",
      total: 245,
    },
    class: "Economy",
    itineraries: [
      {
        duration: "PT8H15M",
        segments: [
          {
            departure: {
              iata: "SIN",
              city: "Singapore",
              at: parseISO("2021-02-02T00:30:00"),
              terminal: "2",
            },
            arrival: {
              iata: "DMK",
              city: "Bangkok",
              at: parseISO("2021-02-02T23:30:00"),
              terminal: "31",
            },
            carrier: "Egyptair",
            duration: "PT8H15M",
          },
        ],
      },
    ],
  },
  {
    price: {
      currency: "USD",
      total: 198,
    },
    class: "Economy",
    itineraries: [
      {
        duration: "PT6H15M",
        segments: [
          {
            departure: {
              iata: "SIN",
              city: "Singapore",
              at: parseISO("2021-02-02T07:15:00"),
              terminal: "2",
            },
            arrival: {
              iata: "DXB",
              city: "Dubai",
              at: parseISO("2021-02-02T13:39:00"),
              terminal: "31",
            },
            carrier: "Egyptair",
            duration: "PT6H15M",
          },
        ],
      },
      {
        duration: "PT8H25M",
        segments: [
          {
            departure: {
              iata: "DXB",
              city: "Dubai",
              at: parseISO("2021-02-12T09:15:00"),
              terminal: "2",
            },
            arrival: {
              iata: "SIN",
              city: "Singapore",
              at: parseISO("2021-02-12T16:55:00"),
              terminal: "31",
            },
            carrier: "Emirates",
            duration: "PT8H25M",
          },
        ],
      },
    ],
  },
];

export const flightPlaceholder: Flight = {
  price: {
    currency: "USD",
    total: 198,
  },
  class: "Economy",
  itineraries: [
    {
      duration: "PT6H15M",
      segments: [
        {
          departure: {
            iata: "SIN",
            city: "Singapore",
            at: parseISO("2021-01-13T07:15:00"),
            terminal: "2",
          },
          arrival: {
            iata: "DXB",
            city: "Dubai",
            at: parseISO("2021-01-13T13:15:00"),
            terminal: "31",
          },
          carrier: "Egyptair",
          duration: "PT6H15M",
        },
      ],
    },
    {
      duration: "PT8H25M",
      segments: [
        {
          departure: {
            iata: "DXB",
            city: "Dubai",
            at: parseISO("2021-01-23T13:39:00"),
            terminal: "2",
          },
          arrival: {
            iata: "SIN",
            city: "Singapore",
            at: parseISO("2021-01-23T20:35:00"),
            terminal: "31",
          },
          carrier: "Emirates",
          duration: "PT8H25M",
        },
      ],
    },
  ],
};

export const hotelsPlaceholder: HotelAvailability = {
  checkIn: "2021-06-15",
  checkOut: "2021-06-16",
  hotels: [
    {
      code: 128537,
      name: {
        content: "Coco Key Hotel and Water Park Resort",
      },
      destinationName: "Orlando Area - Florida - FL",
      latitude: "28.45423",
      longitude: "-81.472135",
      categoryName: "",
      images: [
        {
          order: 1,
          path: "",
          visualOrder: 1,
        },
      ],
      rooms: [
        {
          code: "DBL.GR",
          name: "DOUBLE GUEST ROOM EXTERIOR CORRIDORS",
          rates: [
            {
              net: "46.44",
              taxes: {
                taxes: [
                  {
                    amount: "25.00",
                    currency: "USD",
                    clientAmount: "20.57",
                    clientCurrency: "EUR",
                  },
                ],
              },
              rooms: 1,
              adults: 1,
              children: 0,
            },
            {
              net: "46.44",
              taxes: {
                taxes: [
                  {
                    amount: "25.00",
                    currency: "USD",
                    clientAmount: "20.57",
                    clientCurrency: "EUR",
                  },
                ],
              },
              rooms: 1,
              adults: 1,
              children: 0,
            },
            {
              net: "52.70",
              taxes: {
                taxes: [
                  {
                    amount: "25.00",
                    currency: "USD",
                    clientAmount: "20.57",
                    clientCurrency: "EUR",
                  },
                ],
              },
              rooms: 1,
              adults: 1,
              children: 0,
            },
            {
              net: "52.70",
              taxes: {
                taxes: [
                  {
                    amount: "25.00",
                    currency: "USD",
                    clientAmount: "20.57",
                    clientCurrency: "EUR",
                  },
                ],
              },
              rooms: 1,
              adults: 1,
              children: 0,
            },
            {
              net: "67.85",
              rooms: 1,
              adults: 1,
              children: 0,
            },
            {
              net: "73.70",
              rooms: 1,
              adults: 1,
              children: 0,
            },
          ],
        },
      ],
      minRate: 46.44,
      maxRate: 73.7,
      currency: "EUR",
      description: {
        content: "description",
      },
      countryCode: "US",
      city: {
        content: "NYC",
      },
      categoryCode: "SUK",
      address: {
        content: "address",
      },
      email: "email",
      phones: [
        {
          phoneNumber: "809-456-7895",
        },
      ],
    },
  ],
};

const poiArray: POI[] = [
  {
    id: "49c54c1bf964a520ed561fe3",
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

export const tripPlaceholder: Trip = {
  id: "498650",
  name: "Journey through the alps",
  countries: ["Switzerland", "Austria", "France"],
  photos: 184,
  places: 13,
  days: 30,
  startDate: new Date(2021, 0, 13),
  albums: [
    {
      albumRoute: "",
      name: "Ballon day!",
      cover: "/Travel-Agent/globes.jpg",
      photos: ["", "", "", ""],
    },
    {
      albumRoute: "",
      name: "Villages",
      cover: "/Travel-Agent/country.jpg",
      photos: ["", "", "", ""],
    },
    {
      albumRoute: "",
      name: "Ballon day!",
      cover: "/Travel-Agent/globes.jpg",
      photos: ["", "", "", ""],
    },
    {
      albumRoute: "",
      name: "Villages",
      cover: "/Travel-Agent/country.jpg",
      photos: ["", "", "", ""],
    },
  ],
  coverPhoto: "",
  endDate: new Date(2021, 0, 23),
  itinerary: [
    {
      name: "Flight to Dubai",
      type: EventType.Flight,
      start: flightPlaceholder.itineraries[0].segments[0].departure.at,
      end: flightPlaceholder.itineraries[0].segments[0].arrival.at,
      detail: flightPlaceholder,
      location: "SIN, Singapore",
      time: true,
    },
    {
      name: "Flight to Singapore",
      type: EventType.Flight,
      start: flightPlaceholder.itineraries[1].segments[0].departure.at,
      end: flightPlaceholder.itineraries[1].segments[0].arrival.at,
      detail: flightPlaceholder,
      location: "DXB, Dubai",
      time: true,
    },
    {
      name: "Arrival at Hotel Sheraton Santo Domingo",
      type: EventType.Hotel,
      start: new Date(2021, 0, 13, 14, 35),
      end: new Date(2021, 0, 17, 11, 35),
      detail: hotelsPlaceholder,
      location: "Santo Domingo, Dominican Republic",
      time: true,
    },
    {
      name: "Visit to The Morgan Library & Museum",
      type: EventType.POI,
      start: new Date(2021, 0, 16, 16, 0),
      end: new Date(2021, 0, 16, 17, 0),
      detail: poiArray[0],
      location: "225 Madison Ave (btwn E 36th & E 37th St) New York, United States",
      time: true,
    },
    {
      name: "Visit to Hulu Theater",
      type: EventType.POI,
      start: new Date(2021, 0, 19, 12, 0),
      end: new Date(2021, 0, 19, 14, 0),
      detail: poiArray[1],
      location: "4 Penn Plz, New York, United States",
      time: true,
    },
    {
      name: "Visit to Dear Irving",
      type: EventType.POI,
      start: new Date(2021, 0, 21, 0, 0),
      end: new Date(2021, 0, 21, 3, 0),
      detail: poiArray[2],
      location: "55 Irving Pl (at E 17th St), New York, United States",
      time: true,
    },
  ],
};

export const tripsPlaceholder: Trip[] = [
  {
    id: "498650",
    name: "Journey through the alps",
    countries: ["Switzerland", "Austria", "France"],
    photos: 184,
    places: 13,
    days: 30,
    startDate: new Date(2019, 6, 13),
    endDate: new Date(2019, 7, 13),
    coverPhoto: "journey.jpg",
    albums: [
      {
        albumRoute: "",
        name: "Ballon day!",
        cover: "/Travel-Agent/globes.jpg",
        photos: ["", "", "", ""],
      },
      {
        albumRoute: "",
        name: "Villages",
        cover: "/Travel-Agent/country.jpg",
        photos: ["", "", "", ""],
      },
    ],
  },
  {
    id: "7008965",
    name: "Meso-american Tour",
    albums: [
      {
        albumRoute: "",
        name: "Ballon day!",
        cover: "/Travel-Agent/globes.jpg",
        photos: ["", "", "", ""],
      },
      {
        albumRoute: "",
        name: "Villages",
        cover: "/Travel-Agent/country.jpg",
        photos: ["", "", "", ""],
      },
    ],
    countries: ["Guatemala", "Mexico"],
    photos: 52,
    places: 9,
    days: 15,
    startDate: new Date(2019, 8, 2),
    endDate: new Date(2019, 8, 17),
    coverPhoto: "globes.jpg",
  },
  {
    id: "1235",
    name: "Indonesia in a month",
    countries: ["Indonesia"],
    photos: 216,
    places: 31,
    days: 30,
    startDate: new Date(2019, 4, 5),
    albums: [
      {
        albumRoute: "",
        name: "Ballon day!",
        cover: "/Travel-Agent/globes.jpg",
        photos: ["", "", "", ""],
      },
      {
        albumRoute: "",
        name: "Villages",
        cover: "/Travel-Agent/country.jpg",
        photos: ["", "", "", ""],
      },
    ],
    endDate: new Date(2019, 5, 5),
    coverPhoto: "country.jpg",
  },
  // {
  //   name: "Journey through the alps",
  //   countries: ["Switzerland", "Austria", "France"],
  //   photos: 184,
  //   places: 13,
  //   days: 30,
  //   startDate: new Date(2019, 6, 13),
  // albums:[],
  // coverPhoto: '',
  //   endDate: new Date(2019, 7, 13),
  //   coverPhoto: "journey.jpg",
  // },
  // {
  //   name: "Meso-american Tour",
  //   countries: ["Guatemala", "Mexico"],
  //   photos: 52,
  //   places: 9,
  //   days: 15,
  //   startDate: new Date(2019, 8, 2),
  // albums:[],
  // coverPhoto: '',
  //   endDate: new Date(2019, 8, 17),
  //   coverPhoto: "globes.jpg",
  // },
  // {
  //   name: "Indonesia in a month",
  //   countries: ["Indonesia"],
  //   photos: 216,
  //   places: 31,
  //   days: 30,
  //   startDate: new Date(2019, 4, 5),
  // albums:[],
  // coverPhoto: '',
  //   endDate: new Date(2019, 5, 5),
  //   coverPhoto: "country.jpg",
  // },
];
