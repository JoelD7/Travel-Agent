import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { batchActions } from "redux-batched-actions";
import {
  CarSearch,
  FlightSearch,
  getAutocompleteLabel,
  getISOCodeFromCountry,
  iataCodes,
  LocationType,
  onQueryChanged,
  selectCarSearch,
  selectFlightFromAutocomplete,
  selectFlightSearchParams,
  selectFlightToAutocomplete,
  selectSearchQuery,
  setCarSearch,
  setDestinationCity,
  setFlightFrom,
  setFlightFromAutocomplete,
  setFlightTo,
  setFlightToAutocomplete,
  setOriginCity,
  updateAirportPredictions,
  updateCityPredictions,
  updateHotelCoordinates,
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
  getOptionLabel?: (option: any) => string;
}

export function IataAutocomplete({
  flightDirection,
  type,
  placeholder,
  home,
  required = false,
  cityType = LocationType.DESTINATION,
  isInNavbar,
  getOptionLabel,
  className,
}: IataAutocomplete) {
  const [predictions, setPredictions] = useState<IATALocation[]>([]);

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);
  const flightSearch: FlightSearch = useSelector(selectFlightSearchParams);

  const carSearch: CarSearch = useSelector(selectCarSearch);

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
    setAutocomplete(getAutocompleteDefault());
  }, [flightFromAutocomplete, flightToAutocomplete]);

  function getPredictions(query: string) {
    let predictionsBuffer: IATALocation[] = iataCodes.filter(
      (iata) =>
        iata.code.toLowerCase().indexOf(query) > -1 ||
        iata.name.toLowerCase().indexOf(query) > -1 ||
        iata.city.toLowerCase().indexOf(query) > -1
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
    let value = e.target.value as string;
    setText(value);
    getPredictions(value);
  }

  function updateState() {
    batchedActions = [];

    batchedActions.push(onQueryChanged({ value: text }));

    if (type === "city") {
      batchedActions.push(updateCityPredictions(predictions));

      //This var may be undefined
      if (autocomplete) {
        if (cityType === LocationType.ORIGIN) {
          batchedActions.push(
            setCarSearch({
              ...carSearch,
              country_code: getISOCodeFromCountry(autocomplete.country),
            })
          );
          batchedActions.push(setFlightFrom(autocomplete.code));
          batchedActions.push(setFlightFromAutocomplete(autocomplete));
          batchedActions.push(setOriginCity(autocomplete));
        } else {
          batchedActions.push(
            setCarSearch({
              ...carSearch,
              pickup_location: autocomplete.code,
            })
          );
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
        if (autocomplete) {
          batchedActions.push(
            setCarSearch({
              ...carSearch,
              pickup_location: autocomplete.code,
            })
          );
        }
      }
    }

    dispatch(batchActions(batchedActions));
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
        getOptionLabel={
          getOptionLabel ? getOptionLabel : (option) => getAutocompleteLabel(option, type)
        }
        popupIcon={
          type === "city" ? (
            <FontAwesomeIcon icon={faSearch} color={home ? "white" : "#cecece"} />
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
              onChange={onTextChange}
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
              onChange={onTextChange}
              error={error}
              helperText={helperText}
            />
          )
        }
      />
    </>
  );
}
