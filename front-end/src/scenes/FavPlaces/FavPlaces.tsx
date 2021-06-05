import {
  faHeart,
  faMapMarkerAlt,
  faPhone,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  CustomButton,
  DashDrawer,
  Footer,
  IconText,
  Navbar,
  ProgressCircle,
  Rating,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  backend,
  FavoriteTypes,
  getHotelImages,
  getHotelStars,
  getLinkStyle,
  HotelBedAPI,
  HotelBooking,
  POICategory,
  proxyUrl,
  Routes,
  selectFavorites,
  selectIdPerson,
  setFavorites,
} from "../../utils";
import { getHotelBedHeaders } from "../../utils/external-apis/hotelbeds-apis";
import { Favorite } from "../../utils/types/favorite-types";
import { favPlacesStyles } from "./favPlaces-styles";

interface RestaurantCardProps {
  restaurant: RsvRestaurant;
}

interface HotelCardProps {
  hotel: HotelBooking;
}

interface POICardProps {
  poi: RsvPOI;
}

export function FavPlaces() {
  const style = favPlacesStyles();

  const [hotels, setHotels] = useState<HotelBooking[]>();
  const [restaurants, setRestaurants] = useState<RsvRestaurant[]>();
  const [pois, setPois] = useState<RsvPOI[]>();
  const [filterOptions, setFilterOptions] = useState<string[]>(["All"]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  let poiCategories = POICategory.POICategories;
  let poiCategoryNames: string[] = POICategory.POICategories.map(
    (category) => category.pluralName
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const favorites: Favorite[] = useSelector(selectFavorites);
  const idPerson = useSelector(selectIdPerson);

  useEffect(() => {
    let restaurantsBuffer: RsvRestaurant[] = [];
    let poisBuffer: RsvPOI[] = [];
    let hotelCodes: string[] = [];

    fetchFavPlaces().then((res) => {
      let favoritePlaces: Favorite[] = res;

      favoritePlaces.forEach((fav) => {
        if (fav.type === FavoriteTypes.HOTEL) {
          hotelCodes.push(fav.code);
        } else if (fav.type === FavoriteTypes.POI && fav.poi !== null) {
          poisBuffer.push(fav.poi);
        } else if (fav.type === FavoriteTypes.RESTAURANT && fav.restaurant !== null) {
          restaurantsBuffer.push(fav.restaurant);
        }
      });

      setPois(poisBuffer);
      setRestaurants(restaurantsBuffer);
      buildFilterOptions(restaurantsBuffer, poisBuffer, hotelCodes);

      fetchFavHotels(hotelCodes);

      setLoading(false);
    });
  }, []);

  async function fetchFavPlaces() {
    if (favorites.length === 0) {
      let res = await backend.get(`/favorite/all?idPerson=${idPerson}`);
      let favoritePlaces: Favorite[] = res.data._embedded.favoriteList;
      dispatch(setFavorites(favoritePlaces));

      return favoritePlaces;
    }

    return favorites;
  }

  function fetchFavHotels(hotelCodes: string[]) {
    Axios.get(proxyUrl + HotelBedAPI.hotelContentURL, {
      headers: getHotelBedHeaders(),
      params: {
        fields: "all",
        codes: hotelCodes.join(","),
        language: "ENG",
        from: "1",
        to: 100,
        useSecondaryLanguage: false,
      },
    }).then((res) => {
      setHotels(res.data.hotels);
    });
  }

  function buildFilterOptions(
    restaurants: RsvRestaurant[],
    pois: RsvPOI[],
    hotelCodes: string[]
  ) {
    let filtersBuffer: string[] = [];

    if (restaurants.length > 0) {
      filtersBuffer.push("Restaurants");
    }

    if (pois.length > 0) {
      pois
        .map((poi) => poi.category)
        .forEach((category) => {
          if (!filtersBuffer.includes(category)) {
            filtersBuffer.push(category);
          }
        });
    }

    if (hotelCodes.length > 0) {
      filtersBuffer.push("Hotels");
    }

    filtersBuffer.sort((a, b) => a.localeCompare(b));

    setFilterOptions([...filterOptions, ...filtersBuffer]);
  }

  function getPlacesOfCategory(category: string): RsvPOI[] {
    if (pois) {
      return pois.filter((poi) => poi.category === category);
    }
    return [];
  }

  function isFilterSelected(): boolean {
    return selectedFilter !== "" && selectedFilter !== "All";
  }

  function onFilterOptionChange(
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) {
    setSelectedFilter(event.target.value as string);
  }

  function isSliderSectionVisible(sectionName: string): boolean {
    return (
      selectedFilter === sectionName || selectedFilter === "All" || selectedFilter === ""
    );
  }

  function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
      <Card className={style.favCard}>
        <CardActionArea onClick={() => goToRestaurant(restaurant)}>
          <CardMedia component="img" src={restaurant.imageUrl} height="175" />

          <CardContent>
            <Text component="h4" className={style.cardText} color={Colors.BLUE}>
              {restaurant.name}
            </Text>

            <Rating type="circle" score={restaurant.rating} />

            <IconText
              className={style.cardText}
              style={{ marginTop: "10px" }}
              icon={faUtensils}
            >
              {restaurant.cuisines}
            </IconText>

            <IconText className={style.cardText} icon={faMapMarkerAlt}>
              {restaurant.displayAddress}
            </IconText>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  function HotelCard({ hotel }: HotelCardProps) {
    return (
      <Card className={style.favCard}>
        <CardActionArea onClick={() => goToHotel(hotel)}>
          <CardMedia component="img" src={getHotelImages(hotel)[0]} height="175" />

          <CardContent>
            <Text color={Colors.BLUE} className={style.cardText} component="h4" bold>
              {hotel.name.content}
            </Text>

            <Rating type="star" score={getHotelStars(hotel)} />

            <IconText
              style={{ marginTop: 10 }}
              className={style.cardText}
              icon={faMapMarkerAlt}
            >
              {hotel.address.content}
            </IconText>

            <IconText className={style.cardText} icon={faPhone}>
              {hotel.phones[0].phoneNumber}
            </IconText>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  function FavPOICard({ poi }: POICardProps) {
    return (
      <Card className={style.favCard}>
        <CardActionArea onClick={() => goToPOI(poi)}>
          <Link style={getLinkStyle()} to="#">
            <CardMedia component="img" height="150" src={poi.imageUrl} />
            <CardContent>
              <Text
                weight={700}
                style={{ color: Colors.BLUE }}
                component="h4"
                className={style.cardText}
              >
                {poi.name}
              </Text>

              <Rating type="circle" score={poi.rating ? poi.rating : 0} />

              <IconText
                style={{ marginTop: "10px" }}
                className={style.cardText}
                icon={faMapMarkerAlt}
                text={poi.formattedAddress}
              />
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }

  function isACategoryFilterSelected(): boolean {
    return poiCategoryNames.includes(selectedFilter);
  }

  function goToRestaurant(restaurant: RsvRestaurant) {
    history.push(`${Routes.RESTAURANTS}/${restaurant.id}`);
  }

  function goToHotel(hotel: HotelBooking) {
    history.push(`${Routes.HOTELS}/${hotel.code}`);
  }

  function goToPOI(poi: RsvPOI) {
    history.push(`${Routes.THINGS_TODO}/${poi.id}`);
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Favorite Places</title>
      </Helmet>
      <Navbar className={style.navbar} dashboard position="sticky" />
      <DashDrawer />

      <Grid container className={style.mainGrid}>
        {/* Page Title */}
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <IconText iconStyle={{ padding: "12px" }} shadow size={44} icon={faHeart}>
            <Text component="h1" bold>
              Your favorite spots
            </Text>
          </IconText>
        </Grid>

        {/* Filter by type of place */}
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <Grid container alignItems="center" justify="flex-end">
            <Text component="h4" color={Colors.BLUE}>
              Filter
            </Text>

            {/* Select */}
            <FormControl className={style.sortFormControl}>
              <Select
                value={selectedFilter}
                variant="outlined"
                classes={{ icon: style.selectIcon }}
                className={style.select}
                onChange={onFilterOptionChange}
              >
                {filterOptions.map((option, i) => (
                  <MenuItem
                    classes={{ root: style.menuItemSelect }}
                    key={i}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading && (
          <Grid container style={{ height: "85vh" }}>
            <ProgressCircle />
          </Grid>
        )}

        {/* Restaurants */}
        {isSliderSectionVisible("Restaurants") && restaurants && (
          <Grid container style={{ marginTop: "20px" }}>
            {/*  Category title */}
            <Grid item xs={12}>
              <Grid container>
                <Text bold color={Colors.BLUE} component="h2">
                  Restaurants
                </Text>

                {!isFilterSelected() && (
                  <CustomButton
                    style={{ paddingBottom: "0px" }}
                    iconColor="#7e7e7e"
                    backgroundColor="rgba(0,0,0,0)"
                    textColor="#7e7e7e"
                    onClick={() => setSelectedFilter("Restaurants")}
                  >
                    See all
                  </CustomButton>
                )}
              </Grid>
            </Grid>

            {selectedFilter === "Restaurants" ? (
              <Grid container>
                {restaurants.map((restaurant) => (
                  <div key={restaurant.id} className={style.noSliderCard}>
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </Grid>
            ) : (
              <Grid container>
                {restaurants.slice(0, 3).map((restaurant) => (
                  <div key={restaurant.id} className={style.noSliderCard}>
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </Grid>
            )}
          </Grid>
        )}

        {/* Hotels */}
        {isSliderSectionVisible("Hotels") && hotels && (
          <Grid container style={{ marginTop: "20px" }}>
            {/*  Category title */}
            <Grid item xs={12}>
              <Grid container>
                <Text bold color={Colors.BLUE} component="h2">
                  Hotels
                </Text>

                {!isFilterSelected() && (
                  <CustomButton
                    style={{ paddingBottom: "0px" }}
                    iconColor="#7e7e7e"
                    backgroundColor="rgba(0,0,0,0)"
                    textColor="#7e7e7e"
                    onClick={() => setSelectedFilter("Hotels")}
                  >
                    See all
                  </CustomButton>
                )}
              </Grid>
            </Grid>

            {selectedFilter === "Hotels" ? (
              <Grid container>
                {hotels.map((hotel) => (
                  <div key={hotel.code} className={style.noSliderCard}>
                    <HotelCard hotel={hotel} />
                  </div>
                ))}
              </Grid>
            ) : (
              <Grid container>
                {hotels.slice(0, 3).map((hotel) => (
                  <div key={hotel.code} className={style.noSliderCard}>
                    <HotelCard hotel={hotel} />
                  </div>
                ))}
              </Grid>
            )}
          </Grid>
        )}

        {/* POI Sliders */}
        <Grid item xs={12}>
          {poiCategories
            .filter((category) => getPlacesOfCategory(category.name).length > 0)
            .map((category, i) => (
              <div key={category.id}>
                {isSliderSectionVisible(category.pluralName) && pois && (
                  <Grid container style={{ marginTop: "20px" }}>
                    {/*  Category title */}
                    <Grid item xs={12}>
                      <Grid container>
                        <Text
                          bold
                          color={Colors.BLUE}
                          className={style.cardText}
                          component="h2"
                        >
                          {category.pluralName}
                        </Text>

                        {!isFilterSelected() && (
                          <CustomButton
                            style={{ paddingBottom: "0px" }}
                            iconColor="#7e7e7e"
                            backgroundColor="rgba(0,0,0,0)"
                            textColor="#7e7e7e"
                            onClick={() => setSelectedFilter(category.pluralName)}
                          >
                            See all
                          </CustomButton>
                        )}
                      </Grid>
                    </Grid>

                    {isACategoryFilterSelected() ? (
                      <Grid container>
                        {getPlacesOfCategory(category.name).map((poi: RsvPOI, i) => (
                          <div key={poi.id} className={style.noSliderCard}>
                            <FavPOICard poi={poi} />
                          </div>
                        ))}
                      </Grid>
                    ) : (
                      <Grid container>
                        {getPlacesOfCategory(category.name)
                          .slice(0, 3)
                          .map((poi: RsvPOI, i) => (
                            <div key={poi.id} className={style.noSliderCard}>
                              <FavPOICard poi={poi} />
                            </div>
                          ))}
                      </Grid>
                    )}
                  </Grid>
                )}
              </div>
            ))}
        </Grid>
      </Grid>

      <div className={style.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
