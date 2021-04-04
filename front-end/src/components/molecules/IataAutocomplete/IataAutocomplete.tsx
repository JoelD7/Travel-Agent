import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { batchActions } from "redux-batched-actions";
import {
  FlightSearch,
  getAutocompleteLabel,
  iataCodes,
  onQueryChanged,
  persistGeolocationInLocalStorage,
  selectFlightFromAutocomplete,
  selectFlightSearchParams,
  selectFlightToAutocomplete,
  selectSearchQuery,
  setDestinationCity,
  setFlightFrom,
  setFlightFromAutocomplete,
  setFlightTo,
  setFlightToAutocomplete,
  updateAirportPredictions,
  updateCityPredictions,
  LocationType,
  updateHotelCoordinates,
  setOriginCity,
} from "../../../utils";
import { IATALocation } from "../../../utils/types/location-types";
import { iataAutocompleteStyles } from "./iata-autocomplete-styles";

interface IataAutocomplete {
  flightDirection?: "from" | "to";
  type: "city" | "airport";
  cityType?: LocationType.LocationType;
  home?: boolean;
  placeholder?: string;
  isInNavbar?: boolean;
  required?: boolean;
  className?: string;
}

export function IataAutocomplete({
  flightDirection,
  type,
  placeholder,
  home,
  required = false,
  cityType = LocationType.DESTINATION,
  isInNavbar,
  className,
}: IataAutocomplete) {
  const [predictions, setPredictions] = useState<IATALocation[]>([]);

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);
  const flightSearch: FlightSearch = useSelector(selectFlightSearchParams);
  const dispatch = useDispatch();

  let batchedActions: AnyAction[] = [];

  const searchQuery = useSelector(selectSearchQuery);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const style = iataAutocompleteStyles();

  const [autocomplete, setAutocomplete] = useState<IATALocation | null | undefined>(
    getAutocompleteDefault()
  );
  const [text, setText] = useState<string>(
    type === "city"
      ? searchQuery
      : flightDirection === "from"
      ? flightSearch.from
      : flightSearch.to
  );

  function getAutocompleteDefault() {
    if (type === "city") {
      return undefined;
    } else {
      return flightDirection === "from" ? flightFromAutocomplete : flightToAutocomplete;
    }
  }

  useEffect(() => {
    getPredictions(text);
  }, [text]);

  useEffect(() => {
    setAutocomplete(getAutocompleteDefault());
  }, [flightFromAutocomplete, flightToAutocomplete]);

  function getPredictions(query: string) {
    let predictionsBuffer: IATALocation[] = iataCodes.filter(
      (iata) =>
        iata.code.toLowerCase().includes(query) ||
        iata.name.toLowerCase().includes(query) ||
        iata.city.toLowerCase().includes(query) ||
        (iata.state !== null ? iata.state.toLowerCase().includes(query) : false)
    );

    setPredictions(predictionsBuffer);
  }

  function onAutomcompleteValueChange(value: IATALocation | null) {
    setAutocomplete(value);

    if (required) {
      checkRequiredField(value);
    }

    if (value) {
      setText(value.code);
    }
  }

  function checkRequiredField(value: IATALocation | null) {
    if (isTextFieldEmpty(value)) {
      setError(true);
      setHelperText("Required");
    } else if (error) {
      setError(false);
      setHelperText("");
    }
  }

  function isTextFieldEmpty(value: IATALocation | null) {
    if (type === "city") {
      return false;
    }

    return value === null;
  }

  function onTextChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    let value = e.target.value;
    setText(value);
  }

  function updateState() {
    batchedActions = [];

    batchedActions.push(onQueryChanged({ value: text }));

    if (type === "city") {
      batchedActions.push(updateCityPredictions(predictions));

      //This var may be undefined
      if (autocomplete) {
        persistGeolocationInLocalStorage(autocomplete, cityType);

        if (cityType === LocationType.ORIGIN) {
          batchedActions.push(setFlightFrom(autocomplete.code));
          batchedActions.push(setFlightFromAutocomplete(autocomplete));
          batchedActions.push(setOriginCity(autocomplete));
        } else {
          batchedActions.push(setFlightTo(autocomplete.code));
          batchedActions.push(setFlightToAutocomplete(autocomplete));
          batchedActions.push(
            updateHotelCoordinates({
              latitude: Number(autocomplete.lat),
              longitude: Number(autocomplete.lon),
            })
          );
          batchedActions.push(setDestinationCity(autocomplete));
        }
      }
    } else {
      batchedActions.push(updateAirportPredictions(predictions));

      if (flightDirection === "from") {
        batchedActions.push(setFlightFrom(text));
        batchedActions.push(setFlightFromAutocomplete(autocomplete));
      } else {
        batchedActions.push(setFlightTo(text));
        batchedActions.push(setFlightToAutocomplete(autocomplete));
      }
    }

    dispatch(batchActions(batchedActions));
  }

  function onCityChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <>
      <Autocomplete
        onBlur={() => updateState()}
        value={autocomplete}
        onChange={(e, value) => onAutomcompleteValueChange(value)}
        options={predictions}
        className={className}
        style={{ width: "100%" }}
        loading={predictions.length !== 0}
        getOptionLabel={(option) => getAutocompleteLabel(option, type)}
        popupIcon={
          type === "city" ? (
            <IconButton>
              <FontAwesomeIcon icon={faSearch} color={home ? "white" : "#cecece"} />
            </IconButton>
          ) : (
            <div />
          )
        }
        classes={{
          input: home ? style.searchBarInputHome : style.searchBarInput,
          listbox: style.autocompelteListbox,
          option: style.autocompleteOption,
          endAdornment: type === "city" ? style.autocompleteAdornment : "",
          inputRoot: home ? style.searchBarInputHome : "",
          popupIndicatorOpen: type === "city" ? style.popupIndicatorOpen : "",
        }}
        renderInput={(params) =>
          type === "city" ? (
            <TextField
              {...params}
              value={text}
              variant="outlined"
              placeholder={placeholder ? placeholder : "Search locations"}
              style={isInNavbar ? { width: "100%" } : {}}
              className={isInNavbar ? style.navbar : style.searchBar}
              onChange={onCityChange}
              size="small"
            />
          ) : (
            <TextField
              {...params}
              value={text}
              size="small"
              placeholder={placeholder ? placeholder : "City or airport"}
              className={style.searchBarInput}
              variant={"outlined"}
              onChange={(e) => onTextChange(e)}
              error={error}
              helperText={helperText}
            />
          )
        }
      />
    </>
  );
}
