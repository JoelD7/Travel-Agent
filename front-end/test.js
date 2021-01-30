let details = {
  type: "hotel-offers",
  hotel: {
    type: "hotel",
    hotelId: "BGMILBGB",
    chainCode: "BG",
    dupeId: "700025106",
    name: "BULGARI HOTELS RESORTS MILANO",
    rating: "5",
    cityCode: "MIL",
    latitude: 45.47253,
    longitude: 9.18805,
    address: {
      lines: ["VIA PRIVATA FRATELLI GABBA 7B"],
      postalCode: "20121",
      cityName: "MILAN",
      countryCode: "IT",
    },
    contact: {
      phone: "39-02-8058051",
      fax: "39-02-805805222",
    },
    amenities: [
      "CONVENTION_CTR",
      "MEETING_ROOMS",
      "ICE_MACHINES",
      "RESTAURANT",
      "HANDICAP_FAC",
      "ACC_TOILETS",
      "DIS_PARKG",
      "BABY-SITTING",
      "BEAUTY_PARLOUR",
      "CAR_RENTAL",
      "ELEVATOR",
      "EXCHANGE_FAC",
      "WIFI",
      "LAUNDRY_SVC",
      "SPA",
      "VALET_PARKING",
      "HAIRDRESSER",
      "SWIMMING_POOL",
      "AIR_CONDITIONING",
      "HAIR_DRYER",
      "MINIBAR",
      "MOVIE_CHANNELS",
      "ROOM_SERVICE",
      "TELEVISION",
      "SAFE_DEP_BOX",
      "FITNESS_CENTER",
    ],
    media: [
      {
        uri:
          "http://pdt.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/B6AA0C7920214C49AAFBCFFF32A15300",
        category: "EXTERIOR",
      },
      {
        uri:
          "http://pdt.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/0B9245555964410B97E958128EB3DE52",
        category: "LOBBY",
      },
      {
        uri:
          "http://pdt.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/DDFD5AD22B134110BCDBE64186FE860A",
        category: "SUITE",
      },
    ],
  },
  available: true,
  offers: [
    {
      id: "8BB1F89D377409FEFACB3E73654A5D765CD812920802E5976BFBB060BAF23AD7",
      rateCode: "RAC",
      room: {
        type: "REG",
        typeEstimated: {
          category: "SUPERIOR_ROOM",
          beds: 1,
          bedType: "KING",
        },
        description: {
          lang: "EN",
          text:
            "Regular Rate\nSuperior Room garden or patio view, large bathr\noom, 1 King, 35sqm/377sqft, Wireless internet,",
        },
      },
      guests: {
        adults: 2,
      },
      price: {
        currency: "EUR",
        total: "857.00",
      },
      self:
        "https://test.api.amadeus.com/v2/shopping/hotel-offers/8BB1F89D377409FEFACB3E73654A5D765CD812920802E5976BFBB060BAF23AD7",
    },
    {
      id: "2E5650829E01B8BD88085B597266F15EF03E6E23BC8DB1A470A6D03F8E2BA1A8",
      rateCode: "RAC",
      rateFamilyEstimated: {
        code: "RAC",
        type: "P",
      },
      room: {
        type: "REG",
        typeEstimated: {
          category: "DELUXE_ROOM",
        },
        description: {
          lang: "EN",
          text:
            "Regular Rate\nDeluxe Room garden or patio view, walk-in close\nt, large bathroom, 1 King or 2 Queen, 40sqm/430",
        },
      },
      guests: {
        adults: 2,
      },
      price: {
        currency: "EUR",
        total: "912.00",
      },
      self:
        "https://test.api.amadeus.com/v2/shopping/hotel-offers/2E5650829E01B8BD88085B597266F15EF03E6E23BC8DB1A470A6D03F8E2BA1A8",
    },
  ],
};

let search = {
  type: "hotel-offers",
  hotel: {
    type: "hotel",
    hotelId: "EAMIAMAP",
    chainCode: "EA",
    dupeId: "700107767",
    name: "CONCORDE OPERA PARIS OPERA PARIS",
    rating: "2",
    cityCode: "MIA",
    latitude: 48.85693,
    longitude: 2.3412,
    address: {
      lines: ["LEFISTON STREET"],
      cityName: "PARIS",
      countryCode: "FR",
    },
    contact: {
      phone: "1-305-436-1811",
      fax: "1-305-436-1864",
    },
    amenities: [
      "HANDICAP_FAC",
      "ACC_BATHS",
      "ACC_WASHBASIN",
      "ACC_BATH_CTRLS",
      "ACC_LIGHT_SW",
      "ACC_ELEVATORS",
      "ACC_TOILETS",
      "SERV_DOGS_ALWD",
      "DIS_PARKG",
      "HANDRAIL_BTHRM",
      "ADAPTED_PHONES",
      "ADAPT_RM_DOORS",
      "ACC_RM_WCHAIR",
      "TV_SUB/CAPTION",
      "ACC_WCHAIR",
      "HANDRAIL_BTHRM",
      "EXT_ROOM_ENTRY",
      "EMERG_LIGHTING",
      "EXTINGUISHERS",
      "FIRE_SAFETY",
      "RESTRIC_RM_ACC",
      "SMOKE_DETECTOR",
      "SPRINKLERS",
      "KIDS_WELCOME",
      "ELEVATOR",
      "INT_HOTSPOTS",
      "FREE_INTERNET",
      "LAUNDRY_SVC",
      "NO_PORN_FILMS",
      "PARKING",
      "PETS_ALLOWED",
      "SWIMMING_POOL",
      "AIR_CONDITIONING",
      "KITCHEN",
      "NONSMOKING_RMS",
      "TELEVISION",
      "WI-FI_IN_ROOM",
    ],
    media: [
      {
        uri:
          "http://pdt.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/69810B23CB8644A18AF760DC66BE41A6",
        category: "EXTERIOR",
      },
    ],
  },
  available: true,
  offers: [
    {
      id: "ECF8AD653801C3A81B3D04BAEF0D85AF182E8FB2115B0FAD144D49FAD108C60D",
      room: {
        type: "A0C",
        typeEstimated: {
          category: "ACCESSIBLE_ROOM",
          beds: 1,
          bedType: "QUEEN",
        },
        description: {
          lang: "EN",
          text:
            "NIGHTLY VALUE RATE\nSTANDARD STUDIO 1 QUEEN NONSMKNG ACCESSIBLE\nFREE WIFI",
        },
      },
      guests: {
        adults: 1,
      },
      price: {
        currency: "USD",
        total: "129.94",
      },
    },
  ],
  self:
    "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=EAMIAMAP&adults=1&paymentPolicy=NONE&view=FULL",
};
