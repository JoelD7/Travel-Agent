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
import React, { useState } from "react";
import Helmet from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import {
  CustomButton,
  DashDrawer,
  Footer,
  IconText,
  Navbar,
  Rating,
  SliderArrow,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  getHotelImages,
  getHotelStars,
  getLinkStyle,
  getRestaurantCategoriesList,
  HotelBooking,
  hotelPlaceholder,
  POICategory,
  poisPlaceholder,
  restaurantsPlaceholder,
  Routes,
} from "../../utils";
import { favPlacesStyles } from "./favPlaces-styles";

interface RestaurantCardProps {
  restaurant: RestaurantSearch;
}

interface HotelCardProps {
  hotel: HotelBooking;
}

interface POICardProps {
  poi: POISearch;
}

export function FavPlaces() {
  const style = favPlacesStyles();

  const pois: POISearch[] = poisPlaceholder;
  let poiCategories = POICategory.POICategories;
  let poiCategoryNames: string[] = POICategory.POICategories.map(
    (category) => category.pluralName
  );

  const hotels: HotelBooking[] = [hotelPlaceholder, hotelPlaceholder, hotelPlaceholder];
  const restaurants: RestaurantSearch[] = restaurantsPlaceholder;

  const history = useHistory();

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
  };

  const filterOptions: string[] = [
    "All",
    "Restaurants",
    "Hotels",
    "Movie Theaters",
    "Gym / Fitness Centers",
    "Clothing Stores",
  ];

  const [selectedFilter, setSelectedFilter] = useState<string>("");

  function getResponsiveSlider(list: POISearch[] | RestaurantSearch[] | HotelBooking[]) {
    return [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: getSlidesToShow(3, list),
          slidesToScroll: getSlidesToShow(3, list),
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: getSlidesToShow(2, list),
          slidesToScroll: getSlidesToShow(2, list),
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: getSlidesToShow(1, list),
          slidesToScroll: getSlidesToShow(1, list),
        },
      },
    ];
  }

  function getSlidesToShow(
    def: number,
    list: POISearch[] | RestaurantSearch[] | HotelBooking[]
  ) {
    return list.length > def ? def : list.length;
  }

  function getPlacesOfCategory(category: string): POISearch[] {
    return pois.filter((poi) => poi.categories[0].name === category);
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
          <CardMedia component="img" src={restaurant.image_url} height="175" />

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
              {getRestaurantCategoriesList(restaurant)}
            </IconText>

            <IconText className={style.cardText} icon={faMapMarkerAlt}>
              {restaurant.location.display_address.join(", ")}
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

  function POICard({ poi }: POICardProps) {
    return (
      <Card className={style.favCard}>
        <CardActionArea onClick={() => goToPOI(poi)}>
          <Link style={getLinkStyle()} to="#">
            <CardMedia component="img" height="150" src={poi.photo} />
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
                text={
                  poi.location.formattedAddress
                    ? poi.location.formattedAddress.join(", ")
                    : "No address"
                }
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

  function goToRestaurant(restaurant: RestaurantSearch) {
    history.push(`${Routes.RESTAURANTS}/${restaurant.id}`);
  }

  function goToHotel(hotel: HotelBooking) {
    history.push(`${Routes.HOTELS}/${hotel.code}`);
  }

  function goToPOI(poi: POISearch) {
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

        {/* Restaurants */}
        {isSliderSectionVisible("Restaurants") && (
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
              <Slider
                {...sliderSettings}
                responsive={getResponsiveSlider(restaurants)}
                slidesToShow={getSlidesToShow(4, restaurants)}
              >
                {restaurants.map((restaurant) => (
                  <div key={restaurant.id}>
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </Slider>
            )}
          </Grid>
        )}

        {/* Hotels */}
        {isSliderSectionVisible("Hotels") && (
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
              <Slider
                {...sliderSettings}
                responsive={getResponsiveSlider(hotels)}
                slidesToShow={getSlidesToShow(4, hotels)}
              >
                {hotels.map((hotel) => (
                  <div key={hotel.code}>
                    <HotelCard hotel={hotel} />
                  </div>
                ))}
              </Slider>
            )}
          </Grid>
        )}

        {/* POI Sliders */}
        <Grid item xs={12}>
          {poiCategories
            .filter((category) => getPlacesOfCategory(category.name).length > 0)
            .map((category, i) => (
              <div key={category.id}>
                {isSliderSectionVisible(category.pluralName) && (
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
                        {getPlacesOfCategory(category.name).map((poi: POISearch, i) => (
                          <div key={poi.id} className={style.noSliderCard}>
                            <POICard poi={poi} />
                          </div>
                        ))}
                      </Grid>
                    ) : (
                      <Slider
                        {...sliderSettings}
                        responsive={getResponsiveSlider(
                          getPlacesOfCategory(category.name)
                        )}
                        slidesToShow={getSlidesToShow(
                          4,
                          getPlacesOfCategory(category.name)
                        )}
                      >
                        {getPlacesOfCategory(category.name).map((poi: POISearch, i) => (
                          <div key={poi.id}>
                            <POICard poi={poi} />
                          </div>
                        ))}
                      </Slider>
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
