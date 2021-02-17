import { faBars, faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  IconButton,
  TextField,
  Toolbar,
  Avatar,
  MenuItem,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { carlos, logoType, logoTypeWhiteFore } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import {
  selectSearchQuery,
  onQueryChanged,
  Routes,
  getLinkStyle,
  selectCityPredictions,
  capitalizeString,
  updateCityPredictions,
} from "../../utils";
import {
  fetchAirportCitiesByInput,
  fetchNewAccessToken,
  isAccessTokenUpdatable,
  updateAccessToken,
} from "../../utils/external-apis/amadeus-apis";
import { AirportCity } from "../../utils/types/location-types";
import { IconText } from "../atoms";
import { ButtonIcon } from "../atoms/ButtonIcon";
import { NavDrawer } from "./NavDrawer/NavDrawer";

interface Navbar {
  home?: boolean;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
}

interface AutocompleteOption {
  option: AirportCity;
}

export const Navbar: FunctionComponent<Navbar> = ({
  home,
  position = "relative",
}: Navbar) => {
  const style = navbarStyles();
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  const history = useHistory();

  const cityPredictions: AirportCity[] = useSelector(selectCityPredictions);

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
    { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    { title: "The Lord of the Rings: The Two Towers", year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    {
      title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
  ];

  useEffect(() => {
    if (isAccessTokenUpdatable()) {
      fetchNewAccessToken()
        .then((res) => {
          updateAccessToken(res.data);
          getCityPredictions();
        })
        .catch((error) => console.log(error));
    } else {
      getCityPredictions();
    }
  }, [searchQuery]);

  function getCityPredictions() {
    if (searchQuery === "") {
      return;
    }
    fetchAirportCitiesByInput(searchQuery, "CITY")
      .then((res) => {
        dispatch(updateCityPredictions(res.data.data));
      })
      .catch((error) => console.log(error));
  }

  let userLoggedIn = true;
  // userLoggedIn = false;

  const [openDrawer, setOpenDrawer] = useState(false);

  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

  function getInputPropsClasses() {
    return {
      root: home ? style.searchBarInputHome : style.searchBarInput,
      input: home ? style.searchBarTextHome : style.searchBarText,
    };
  }

  return (
    <AppBar position={position} className={home ? style.appbarHome : style.appbar}>
      <Toolbar className={style.toolbar}>
        <Link to={Routes.HOME} style={{ outline: "none", border: "none" }}>
          <img src={home ? logoTypeWhiteFore : logoType} className={style.logotype} />
        </Link>

        {/* Search box */}
        <Autocomplete
          options={cityPredictions}
          loading={cityPredictions.length !== 0}
          getOptionLabel={(option) =>
            capitalizeString(option.address.cityName, "full sentence")
          }
          classes={{
            endAdornment: style.autocompleteAdornment,
            inputRoot: home ? style.searchBarInputHome : style.searchBarInput,
            popupIndicatorOpen: style.popupIndicatorOpen,
            listbox: style.autocompelteListbox,
            option: style.autocompleteOption,
          }}
          popupIcon={
            <IconButton>
              <FontAwesomeIcon icon={faSearch} color={home ? "white" : "#cecece"} />
            </IconButton>
          }
          renderInput={(params) => (
            <TextField
              {...params}
              value={searchQuery}
              variant="outlined"
              placeholder="Search locations"
              className={style.searchBar}
              onChange={(e) => dispatch(onQueryChanged({ value: e.target.value }))}
              size="small"
            />
          )}
        />

        <div className={style.rightChildrenContainer}>
          <div className={style.defaultHomeNav}>
            {userLoggedIn ? (
              <>
                <MenuItem
                  // selected={page === }
                  classes={{ root: style.menuItemRoot }}
                >
                  <Link
                    style={home ? getLinkStyle("white") : getLinkStyle(Colors.BLUE)}
                    to={Routes.TRIPS}
                  >
                    Trips
                  </Link>
                </MenuItem>
                <MenuItem
                  // selected={page === }
                  classes={{ root: style.menuItemRoot }}
                >
                  <Link
                    style={home ? getLinkStyle("white") : getLinkStyle(Colors.BLUE)}
                    to={Routes.RESERVATIONS}
                  >
                    Reservations
                  </Link>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {}}
                  style={home ? { color: "white" } : {}}
                  classes={{ root: style.menuItemRoot }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                  style={home ? { color: "white" } : {}}
                  classes={{ root: style.menuItemRoot }}
                >
                  Sign Up
                </MenuItem>
              </>
            )}

            {userLoggedIn && (
              <IconButton style={{ marginLeft: "10px" }}>
                <Avatar src={carlos} />
              </IconButton>
            )}
          </div>

          <IconButton onClick={() => setOpenDrawer(true)}>
            <FontAwesomeIcon color={home ? "white" : Colors.BLUE} icon={faBars} />
          </IconButton>
        </div>
      </Toolbar>

      <NavDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </AppBar>
  );
};
