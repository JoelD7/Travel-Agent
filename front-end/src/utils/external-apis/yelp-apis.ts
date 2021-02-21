import Axios from "axios";
import { proxyUrl } from ".";
import { RestaurantCategories } from "../types/restaurant-types";
export {};
export const restaurantCategories: RestaurantCategories[] = [
  {
    alias: "afghani",
    title: "Afghan",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["MX", "TR"],
  },
  {
    alias: "african",
    title: "African",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["TR"],
  },
  {
    alias: "andalusian",
    title: "Andalusian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["ES", "IT"],
    country_blacklist: [],
  },
  {
    alias: "arabian",
    title: "Arabian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["DK"],
  },
  {
    alias: "argentine",
    title: "Argentine",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["FI"],
  },
  {
    alias: "armenian",
    title: "Armenian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "BE", "CZ", "ES", "FR", "GB", "IT", "PL", "TR", "US"],
    country_blacklist: [],
  },
  {
    alias: "asianfusion",
    title: "Asian Fusion",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "asturian",
    title: "Asturian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["ES"],
    country_blacklist: [],
  },
  {
    alias: "australian",
    title: "Australian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "austrian",
    title: "Austrian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["DK", "ES"],
  },
  {
    alias: "baguettes",
    title: "Baguettes",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CZ", "DE", "IT", "MX", "NO", "PT", "SE", "TR"],
    country_blacklist: [],
  },
  {
    alias: "bangladeshi",
    title: "Bangladeshi",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["DK", "ES", "MX", "PT", "TR"],
  },
  {
    alias: "basque",
    title: "Basque",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AU", "CZ", "DK", "PT", "SG", "TR"],
  },
  {
    alias: "bavarian",
    title: "Bavarian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE"],
    country_blacklist: [],
  },
  {
    alias: "bbq",
    title: "Barbeque",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AU", "BR"],
  },
  {
    alias: "beergarden",
    title: "Beer Garden",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "CZ", "DE"],
    country_blacklist: [],
  },
  {
    alias: "beerhall",
    title: "Beer Hall",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE"],
    country_blacklist: [],
  },
  {
    alias: "beisl",
    title: "Beisl",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT"],
    country_blacklist: [],
  },
  {
    alias: "belgian",
    title: "Belgian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "bistros",
    title: "Bistros",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["US"],
  },
  {
    alias: "blacksea",
    title: "Black Sea",
    parent_aliases: ["restaurants"],
    country_whitelist: ["TR"],
    country_blacklist: [],
  },
  {
    alias: "brasseries",
    title: "Brasseries",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AR", "MX"],
  },
  {
    alias: "brazilian",
    title: "Brazilian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "breakfast_brunch",
    title: "Breakfast & Brunch",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "british",
    title: "British",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["FI"],
  },
  {
    alias: "buffets",
    title: "Buffets",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "bulgarian",
    title: "Bulgarian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["BR", "CA", "DK", "NL", "NO", "NZ", "SG", "TR"],
  },
  {
    alias: "burgers",
    title: "Burgers",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "burmese",
    title: "Burmese",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "DK", "ES", "FI", "PT", "TR"],
  },
  {
    alias: "cafes",
    title: "Cafes",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AR", "ES", "FI", "MX"],
  },
  {
    alias: "cafeteria",
    title: "Cafeteria",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["BR", "CA", "FR", "IE", "NZ", "SE", "SG"],
  },
  {
    alias: "cajun",
    title: "Cajun/Creole",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AU", "ES", "PT", "SG"],
  },
  {
    alias: "cambodian",
    title: "Cambodian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "DK", "ES", "FI", "PT", "TR"],
  },
  {
    alias: "canteen",
    title: "Canteen",
    parent_aliases: ["restaurants"],
    country_whitelist: [
      "AT",
      "BE",
      "CH",
      "CZ",
      "DE",
      "DK",
      "FI",
      "IT",
      "JP",
      "NL",
      "NO",
      "PL",
    ],
    country_blacklist: [],
  },
  {
    alias: "caribbean",
    title: "Caribbean",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["FI", "PT", "TR"],
  },
  {
    alias: "catalan",
    title: "Catalan",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "CL", "ES", "FR", "IT", "MX", "PT", "TR", "US"],
    country_blacklist: [],
  },
  {
    alias: "chech",
    title: "Chech",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "cheesesteaks",
    title: "Cheesesteaks",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU", "CA", "GB", "IE", "NL", "PL", "US"],
    country_blacklist: [],
  },
  {
    alias: "chicken_wings",
    title: "Chicken Wings",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [
      "BE",
      "CH",
      "CL",
      "DK",
      "ES",
      "FI",
      "FR",
      "IT",
      "JP",
      "NL",
      "NO",
      "PT",
    ],
  },
  {
    alias: "chickenshop",
    title: "Chicken Shop",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ"],
  },
  {
    alias: "chilean",
    title: "Chilean",
    parent_aliases: ["restaurants"],
    country_whitelist: ["BR", "CL", "FI", "FR"],
    country_blacklist: [],
  },
  {
    alias: "chinese",
    title: "Chinese",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "comfortfood",
    title: "Comfort Food",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "CA", "CL", "FI", "JP", "MX", "US"],
    country_blacklist: [],
  },
  {
    alias: "corsican",
    title: "Corsican",
    parent_aliases: ["restaurants"],
    country_whitelist: ["BE", "FR"],
    country_blacklist: [],
  },
  {
    alias: "creperies",
    title: "Creperies",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "cuban",
    title: "Cuban",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["DK", "SG", "TR"],
  },
  {
    alias: "currysausage",
    title: "Curry Sausage",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE"],
    country_blacklist: [],
  },
  {
    alias: "cypriot",
    title: "Cypriot",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE"],
    country_blacklist: [],
  },
  {
    alias: "czech",
    title: "Czech",
    parent_aliases: ["restaurants"],
    country_whitelist: [
      "AU",
      "BE",
      "CA",
      "CZ",
      "DE",
      "DK",
      "FI",
      "FR",
      "GB",
      "IE",
      "IT",
      "NO",
      "PL",
      "SE",
      "US",
    ],
    country_blacklist: [],
  },
  {
    alias: "czechslovakian",
    title: "Czech/Slovakian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "MX", "PT"],
    country_blacklist: [],
  },
  {
    alias: "danish",
    title: "Danish",
    parent_aliases: ["restaurants"],
    country_whitelist: ["DK", "FR", "NO", "SE"],
    country_blacklist: [],
  },
  {
    alias: "delis",
    title: "Delis",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["BE", "CL", "FR", "IT", "NL", "PT", "SE"],
  },
  {
    alias: "diners",
    title: "Diners",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AU", "CZ", "FI", "SE"],
  },
  {
    alias: "dinnertheater",
    title: "Dinner Theater",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["BE", "FR", "IT", "JP", "NL"],
  },
  {
    alias: "dumplings",
    title: "Dumplings",
    parent_aliases: ["restaurants"],
    country_whitelist: [
      "JP",
      "BE",
      "CH",
      "NL",
      "SG",
      "CA",
      "DE",
      "NZ",
      "AU",
      "GB",
      "IE",
      "PL",
      "AT",
    ],
    country_blacklist: [],
  },
  {
    alias: "eastern_european",
    title: "Eastern European",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU", "CZ", "DK", "FR", "NO"],
    country_blacklist: [],
  },
  {
    alias: "eltern_cafes",
    title: "Parent Cafes",
    parent_aliases: ["food", "restaurants"],
    country_whitelist: ["AT", "CH", "DE"],
    country_blacklist: [],
  },
  {
    alias: "eritrean",
    title: "Eritrean",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE", "IT", "US"],
    country_blacklist: [],
  },
  {
    alias: "ethiopian",
    title: "Ethiopian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "MX", "SG", "TR"],
  },
  {
    alias: "filipino",
    title: "Filipino",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "DK", "FI", "TR"],
  },
  {
    alias: "fischbroetchen",
    title: "Fischbroetchen",
    parent_aliases: ["restaurants"],
    country_whitelist: ["DE"],
    country_blacklist: [],
  },
  {
    alias: "fishnchips",
    title: "Fish & Chips",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["BR", "PT"],
  },
  {
    alias: "flatbread",
    title: "Flatbread",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE", "DK", "PL"],
    country_blacklist: [],
  },
  {
    alias: "fondue",
    title: "Fondue",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "DK", "ES"],
  },
  {
    alias: "food_court",
    title: "Food Court",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["FI", "FR", "TR", "TW"],
  },
  {
    alias: "foodstands",
    title: "Food Stands",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "freiduria",
    title: "Freiduria",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "CL", "ES", "MX"],
    country_blacklist: [],
  },
  {
    alias: "french",
    title: "French",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "galician",
    title: "Galician",
    parent_aliases: ["restaurants"],
    country_whitelist: ["ES", "PT"],
    country_blacklist: [],
  },
  {
    alias: "gamemeat",
    title: "Game Meat",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [
      "AR",
      "BR",
      "CA",
      "CL",
      "FI",
      "HK",
      "JP",
      "MX",
      "MY",
      "PH",
      "PT",
      "TR",
      "TW",
    ],
  },
  {
    alias: "gastropubs",
    title: "Gastropubs",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "georgian",
    title: "Georgian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CH", "DE", "US", "CZ", "AT", "FI", "PL", "GB"],
    country_blacklist: [],
  },
  {
    alias: "german",
    title: "German",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "giblets",
    title: "Giblets",
    parent_aliases: ["restaurants"],
    country_whitelist: ["TR"],
    country_blacklist: [],
  },
  {
    alias: "gluten_free",
    title: "Gluten-Free",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "greek",
    title: "Greek",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "guamanian",
    title: "Guamanian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AR", "CL", "FR", "JP", "MX", "PL", "TR"],
  },
  {
    alias: "halal",
    title: "Halal",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["PT", "TR"],
  },
  {
    alias: "hawaiian",
    title: "Hawaiian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AU", "CZ", "DK", "PT", "TR"],
  },
  {
    alias: "heuriger",
    title: "Heuriger",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT"],
    country_blacklist: [],
  },
  {
    alias: "himalayan",
    title: "Himalayan/Nepalese",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "hkcafe",
    title: "Hong Kong Style Cafe",
    parent_aliases: ["restaurants"],
    country_whitelist: ["HK", "CA", "US", "TW"],
    country_blacklist: [],
  },
  {
    alias: "honduran",
    title: "Honduran",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["JP", "TR"],
  },
  {
    alias: "hotdog",
    title: "Hot Dogs",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "hotdogs",
    title: "Fast Food",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "hotpot",
    title: "Hot Pot",
    parent_aliases: ["restaurants"],
    country_whitelist: ["BR", "CA", "FR", "HK", "JP", "MY", "PH", "SE", "SG", "TW", "US"],
    country_blacklist: [],
  },
  {
    alias: "hungarian",
    title: "Hungarian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "iberian",
    title: "Iberian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CA", "PT", "US"],
    country_blacklist: [],
  },
  {
    alias: "indonesian",
    title: "Indonesian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["ES", "MX"],
  },
  {
    alias: "indpak",
    title: "Indian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "international",
    title: "International",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["FI", "IT", "MY", "PH", "TR", "US"],
  },
  {
    alias: "irish",
    title: "Irish",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "island_pub",
    title: "Island Pub",
    parent_aliases: ["restaurants"],
    country_whitelist: ["SE"],
    country_blacklist: [],
  },
  {
    alias: "israeli",
    title: "Israeli",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "CZ", "DE"],
    country_blacklist: [],
  },
  {
    alias: "italian",
    title: "Italian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "japanese",
    title: "Japanese",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "jewish",
    title: "Jewish",
    parent_aliases: ["restaurants"],
    country_whitelist: ["DE", "IT", "PL"],
    country_blacklist: [],
  },
  {
    alias: "kebab",
    title: "Kebab",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "kopitiam",
    title: "Kopitiam",
    parent_aliases: ["restaurants"],
    country_whitelist: ["MY", "SG"],
    country_blacklist: [],
  },
  {
    alias: "korean",
    title: "Korean",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "kosher",
    title: "Kosher",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["PT", "TR"],
  },
  {
    alias: "kurdish",
    title: "Kurdish",
    parent_aliases: ["restaurants"],
    country_whitelist: ["NO", "SE"],
    country_blacklist: [],
  },
  {
    alias: "laos",
    title: "Laos",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU"],
    country_blacklist: [],
  },
  {
    alias: "laotian",
    title: "Laotian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ"],
  },
  {
    alias: "latin",
    title: "Latin American",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "lyonnais",
    title: "Lyonnais",
    parent_aliases: ["restaurants"],
    country_whitelist: ["BE", "FR"],
    country_blacklist: [],
  },
  {
    alias: "malaysian",
    title: "Malaysian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "ES", "PT", "TR"],
  },
  {
    alias: "meatballs",
    title: "Meatballs",
    parent_aliases: ["restaurants"],
    country_whitelist: ["BE", "FR", "NL", "TR"],
    country_blacklist: [],
  },
  {
    alias: "mediterranean",
    title: "Mediterranean",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "mexican",
    title: "Mexican",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "mideastern",
    title: "Middle Eastern",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["BR"],
  },
  {
    alias: "milkbars",
    title: "Milk Bars",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU", "PL"],
    country_blacklist: [],
  },
  {
    alias: "modern_australian",
    title: "Modern Australian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU"],
    country_blacklist: [],
  },
  {
    alias: "modern_european",
    title: "Modern European",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "mongolian",
    title: "Mongolian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["ES", "FI", "PT", "TR"],
  },
  {
    alias: "moroccan",
    title: "Moroccan",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["TR"],
  },
  {
    alias: "newamerican",
    title: "American (New)",
    parent_aliases: ["restaurants"],
    country_whitelist: ["DK", "GB", "IE", "NO", "SE", "US"],
    country_blacklist: [],
  },
  {
    alias: "newcanadian",
    title: "Canadian (New)",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CA"],
    country_blacklist: [],
  },
  {
    alias: "newmexican",
    title: "New Mexican Cuisine",
    parent_aliases: ["restaurants"],
    country_whitelist: ["US"],
    country_blacklist: [],
  },
  {
    alias: "newzealand",
    title: "New Zealand",
    parent_aliases: ["restaurants"],
    country_whitelist: ["NZ"],
    country_blacklist: [],
  },
  {
    alias: "nicaraguan",
    title: "Nicaraguan",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AR", "CL"],
  },
  {
    alias: "nightfood",
    title: "Night Food",
    parent_aliases: ["restaurants"],
    country_whitelist: ["DK", "NO", "PL", "SE", "TR"],
    country_blacklist: [],
  },
  {
    alias: "nikkei",
    title: "Nikkei",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "BR", "CL", "ES", "MX"],
    country_blacklist: [],
  },
  {
    alias: "noodles",
    title: "Noodles",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AT", "CH", "DE", "FR"],
  },
  {
    alias: "norcinerie",
    title: "Norcinerie",
    parent_aliases: ["restaurants"],
    country_whitelist: ["IT"],
    country_blacklist: [],
  },
  {
    alias: "norwegian",
    title: "Traditional Norwegian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["FR", "NO"],
    country_blacklist: [],
  },
  {
    alias: "opensandwiches",
    title: "Open Sandwiches",
    parent_aliases: ["restaurants"],
    country_whitelist: ["DK", "NO", "SE", "TR"],
    country_blacklist: [],
  },
  {
    alias: "oriental",
    title: "Oriental",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE", "FR", "PT", "PL"],
    country_blacklist: [],
  },
  {
    alias: "pakistani",
    title: "Pakistani",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "panasian",
    title: "Pan Asian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["IT"],
  },
  {
    alias: "parma",
    title: "Parma",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU"],
    country_blacklist: [],
  },
  {
    alias: "persian",
    title: "Persian/Iranian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "peruvian",
    title: "Peruvian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["PT", "SG", "TR"],
  },
  {
    alias: "pfcomercial",
    title: "PF/Comercial",
    parent_aliases: ["restaurants"],
    country_whitelist: ["BR"],
    country_blacklist: [],
  },
  {
    alias: "pita",
    title: "Pita",
    parent_aliases: ["restaurants"],
    country_whitelist: ["TR"],
    country_blacklist: [],
  },
  {
    alias: "pizza",
    title: "Pizza",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "polish",
    title: "Polish",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["FI", "SG"],
  },
  {
    alias: "polynesian",
    title: "Polynesian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["US"],
    country_blacklist: [],
  },
  {
    alias: "popuprestaurants",
    title: "Pop-Up Restaurants",
    parent_aliases: ["restaurants"],
    country_whitelist: [
      "BE",
      "FR",
      "NL",
      "DK",
      "NO",
      "MY",
      "CA",
      "DE",
      "US",
      "HK",
      "NZ",
      "AU",
      "GB",
      "TW",
      "SG",
      "PH",
      "IE",
      "SE",
    ],
    country_blacklist: [],
  },
  {
    alias: "portuguese",
    title: "Portuguese",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["FI"],
  },
  {
    alias: "potatoes",
    title: "Potatoes",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "AU", "CH", "DE"],
    country_blacklist: [],
  },
  {
    alias: "poutineries",
    title: "Poutineries",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CA", "US"],
    country_blacklist: [],
  },
  {
    alias: "pubfood",
    title: "Pub Food",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU"],
    country_blacklist: [],
  },
  {
    alias: "raw_food",
    title: "Live/Raw Food",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "riceshop",
    title: "Rice",
    parent_aliases: ["restaurants"],
    country_whitelist: ["JP", "TR"],
    country_blacklist: [],
  },
  {
    alias: "romanian",
    title: "Romanian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "BE", "CH", "CZ", "DE", "ES", "FR", "PL"],
    country_blacklist: [],
  },
  {
    alias: "rotisserie_chicken",
    title: "Rotisserie Chicken",
    parent_aliases: ["restaurants"],
    country_whitelist: [
      "AR",
      "AU",
      "BE",
      "BR",
      "CL",
      "ES",
      "FR",
      "IT",
      "MX",
      "NL",
      "NZ",
      "PL",
      "PT",
    ],
    country_blacklist: [],
  },
  {
    alias: "rumanian",
    title: "Rumanian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "russian",
    title: "Russian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "salad",
    title: "Salad",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "sandwiches",
    title: "Sandwiches",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "scandinavian",
    title: "Scandinavian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["PT"],
  },
  {
    alias: "schnitzel",
    title: "Schnitzel",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE", "PL"],
    country_blacklist: [],
  },
  {
    alias: "scottish",
    title: "Scottish",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CA", "CH", "DE", "GB", "IE", "US"],
    country_blacklist: [],
  },
  {
    alias: "seafood",
    title: "Seafood",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "serbocroatian",
    title: "Serbo Croatian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "AT", "BE", "CH", "CL", "CZ", "DE", "FR", "IT", "PL", "SE"],
    country_blacklist: [],
  },
  {
    alias: "signature_cuisine",
    title: "Signature Cuisine",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "CL", "DK", "ES", "MX", "NO", "PT", "SE"],
    country_blacklist: [],
  },
  {
    alias: "singaporean",
    title: "Singaporean",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "DK", "ES", "FI", "PT", "TR"],
  },
  {
    alias: "slovakian",
    title: "Slovakian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU", "BE", "CA", "CZ", "FR", "GB", "IE", "IT", "PL", "US"],
    country_blacklist: [],
  },
  {
    alias: "somali",
    title: "Somali",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE", "IT", "PL", "US"],
    country_blacklist: [],
  },
  {
    alias: "soulfood",
    title: "Soul Food",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CA", "ES", "GB", "IE", "NL", "NO", "PL", "SE", "US"],
    country_blacklist: [],
  },
  {
    alias: "soup",
    title: "Soup",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "southern",
    title: "Southern",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CA", "GB", "IE", "NL", "NZ", "PL", "SE", "TR", "US"],
    country_blacklist: [],
  },
  {
    alias: "spanish",
    title: "Spanish",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "srilankan",
    title: "Sri Lankan",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ"],
  },
  {
    alias: "steak",
    title: "Steakhouses",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "sud_ouest",
    title: "French Southwest",
    parent_aliases: ["restaurants"],
    country_whitelist: ["BE", "FR"],
    country_blacklist: [],
  },
  {
    alias: "supperclubs",
    title: "Supper Clubs",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CA", "ES", "GB", "US"],
    country_blacklist: [],
  },
  {
    alias: "sushi",
    title: "Sushi Bars",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "swabian",
    title: "Swabian",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AT", "CH", "DE"],
    country_blacklist: [],
  },
  {
    alias: "swedish",
    title: "Swedish",
    parent_aliases: ["restaurants"],
    country_whitelist: ["SE"],
    country_blacklist: [],
  },
  {
    alias: "swissfood",
    title: "Swiss Food",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "CH", "CL", "CZ", "DE", "ES", "MX"],
    country_blacklist: [],
  },
  {
    alias: "syrian",
    title: "Syrian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "tabernas",
    title: "Tabernas",
    parent_aliases: ["restaurants"],
    country_whitelist: ["ES", "PT", "TR"],
    country_blacklist: [],
  },
  {
    alias: "taiwanese",
    title: "Taiwanese",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["CZ", "ES", "FI", "PT", "TR"],
  },
  {
    alias: "tapas",
    title: "Tapas Bars",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AU", "FI", "SG"],
  },
  {
    alias: "tapasmallplates",
    title: "Tapas/Small Plates",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "tavolacalda",
    title: "Tavola Calda",
    parent_aliases: ["restaurants"],
    country_whitelist: ["IT"],
    country_blacklist: [],
  },
  {
    alias: "tex-mex",
    title: "Tex-Mex",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["AU", "DK", "ES", "PT"],
  },
  {
    alias: "thai",
    title: "Thai",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "tradamerican",
    title: "American (Traditional)",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "traditional_swedish",
    title: "Traditional Swedish",
    parent_aliases: ["restaurants"],
    country_whitelist: ["FI", "SE"],
    country_blacklist: [],
  },
  {
    alias: "trattorie",
    title: "Trattorie",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AR", "CH", "CL", "FR", "IT", "PL"],
    country_blacklist: [],
  },
  {
    alias: "turkish",
    title: "Turkish",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "ukrainian",
    title: "Ukrainian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: ["DK", "ES", "TR"],
  },
  {
    alias: "uzbek",
    title: "Uzbek",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CZ", "US"],
    country_blacklist: [],
  },
  {
    alias: "vegan",
    title: "Vegan",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "vegetarian",
    title: "Vegetarian",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "venison",
    title: "Venison",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU", "CA", "CZ", "DK", "GB", "IE", "IT", "NO", "NZ", "PL", "SG"],
    country_blacklist: [],
  },
  {
    alias: "vietnamese",
    title: "Vietnamese",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "waffles",
    title: "Waffles",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [],
  },
  {
    alias: "wok",
    title: "Wok",
    parent_aliases: ["restaurants"],
    country_whitelist: [],
    country_blacklist: [
      "AR",
      "AU",
      "BR",
      "CA",
      "GB",
      "HK",
      "IE",
      "IT",
      "JP",
      "NZ",
      "PL",
      "SG",
      "TR",
      "TW",
      "US",
    ],
  },
  {
    alias: "wraps",
    title: "Wraps",
    parent_aliases: ["restaurants"],
    country_whitelist: ["CZ", "DK", "NO", "PT", "SE", "TR", "US"],
    country_blacklist: [],
  },
  {
    alias: "yugoslav",
    title: "Yugoslav",
    parent_aliases: ["restaurants"],
    country_whitelist: ["AU", "BE", "FR", "IT", "PT", "SE"],
    country_blacklist: [],
  },
];

export function fetchRestaurants(latitude: string, longitude: string) {
  return Axios.get(proxyUrl + "https://api.yelp.com/v3/businesses/search", {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
    },
    params: {
      term: "restaurants",
      latitude,
      longitude,
    },
  });
}

export function fetchRestaurant(id: string) {
  return Axios.get(proxyUrl + `https://api.yelp.com/v3/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
    },
  });
}