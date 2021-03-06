import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Font } from "../../assets";
import { Colors } from "../../styles";
import {
  backend,
  FavoriteTypes,
  getPoiDTO,
  getRestaurantDTO,
  HotelBooking,
  Person,
  selectFavorites,
  selectPerson,
  setFavorites,
} from "../../utils";
import { Favorite, FavoriteType } from "../../utils/types/favorite-types";
import { ProgressCircle } from "../atoms";

interface AddFavoritesProps {
  poi?: POIType;

  hotel?: HotelBooking;
  restaurant?: Restaurant;
  type: FavoriteType;
  style?: CSSProperties;
}

export function AddFavoritesButton({
  poi,
  type,
  hotel,
  restaurant,
  style,
}: AddFavoritesProps) {
  const person: Person | undefined = useSelector(selectPerson);
  const favorites: Favorite[] | undefined = useSelector(selectFavorites);

  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackRemoved, setOpenSnackRemoved] = useState(false);
  const [favorite, setFavorite] = useState(isPlaceAddedToFavorites());
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function isPlaceAddedToFavorites(): boolean {
    if (favorites) {
      let code: string = getCode();
      return favorites.filter((fav) => fav.code === code).length > 0;
    }

    return false;
  }

  function addToFavorites() {
    setLoading(true);

    let favoriteDTO: Favorite = getFavoriteDTO();

    if (person) {
      backend
        .post(`/favorite/add?personUuid=${person.uuid}`, favoriteDTO)
        .then((res) => {
          setFavorite(true);
          setOpenSnack(true);
          setLoading(false);

          let updatedFavs: Favorite[] = favorites
            ? [...favorites, favoriteDTO]
            : [favoriteDTO];
          dispatch(setFavorites(updatedFavs));
        })
        .catch((error) => console.log(error));
    }
  }

  function removeFromFavorites() {
    let code = getCode();
    backend
      .delete(`/favorite/delete?code=${code}`)
      .then((res) => {
        setFavorite(false);
        setOpenSnackRemoved(true);

        if (favorites) {
          let updatedFavs: Favorite[] = favorites.filter((fav) => fav.code !== code);
          dispatch(setFavorites(updatedFavs));
        }
      })
      .catch((error) => console.log(error));
  }

  function getFavoriteDTO(): Favorite {
    if (type === FavoriteTypes.HOTEL && hotel) {
      return {
        code: String(hotel.code),
        type: FavoriteTypes.HOTEL,
        poi: null,
        restaurant: null,
      };
    }

    if (type === FavoriteTypes.POI && poi) {
      return {
        code: poi.id,
        type: FavoriteTypes.POI,
        poi: getPoiDTO(poi),
        restaurant: null,
      };
    }

    if (type === FavoriteTypes.RESTAURANT && restaurant) {
      return {
        code: restaurant.id,
        type: FavoriteTypes.RESTAURANT,
        poi: null,
        restaurant: getRestaurantDTO(restaurant),
      };
    }

    return {
      code: "",
      type: FavoriteTypes.HOTEL,
      poi: null,
      restaurant: null,
    };
  }

  function getCode(): string {
    if (type === FavoriteTypes.HOTEL && hotel) {
      return String(hotel.code);
    }

    if (type === FavoriteTypes.POI && poi) {
      return poi.id;
    }

    if (type === FavoriteTypes.RESTAURANT && restaurant) {
      return restaurant.id;
    }

    return "";
  }

  return (
    <>
      {loading ? (
        <IconButton style={style} disabled>
          <ProgressCircle size={20} color={Colors.PURPLE} />
        </IconButton>
      ) : (
        <IconButton
          style={style}
          onClick={favorite ? () => removeFromFavorites() : () => addToFavorites()}
        >
          <FontAwesomeIcon icon={favorite ? faHeart : faHeartReg} color={Colors.PURPLE} />
        </IconButton>
      )}

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnack(false)}
          severity="success"
        >
          {"Added to favorites."}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackRemoved}
        autoHideDuration={6000}
        onClose={() => setOpenSnackRemoved(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnackRemoved(false)}
          severity="error"
        >
          {"Removed from favorites."}
        </Alert>
      </Snackbar>
    </>
  );
}
