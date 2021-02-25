import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../styles";
import {
  capitalizeString,
  getAutocompleteLabel,
  iataCodes,
  onQueryChanged,
  selectFlightFromAutocomplete,
  selectFlightParams,
  selectFlightToAutocomplete,
  selectSearchQuery,
  setCurrentCity,
  updateAirportPredictions,
  updateCityPredictions,
} from "../../../utils";
import {
  FlightSearch,
  setFlightFrom,
  setFlightFromAutocomplete,
  setFlightTo,
  setFlightToAutocomplete,
} from "../../../utils/store/flight-slice";
import { IATALocation } from "../../../utils/types/location-types";
import { CustomTF } from "../../atoms";
import { iataAutocompleteStyles } from "./iata-autocomplete-styles";

interface IataAutocomplete {
  flightDirection?: "from" | "to";
  type: "city" | "airport";
  home?: boolean;
}

interface RenderInput {
  params: any;
}

export function IataAutocomplete({ flightDirection, type, home }: IataAutocomplete) {
  const [predictions, setPredictions] = useState<IATALocation[]>([]);

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);
  const flight: FlightSearch = useSelector(selectFlightParams);
  const dispatch = useDispatch();

  const searchQuery = useSelector(selectSearchQuery);

  const style = iataAutocompleteStyles();

  const [autocomplete, setAutocomplete] = useState<IATALocation | null | undefined>(
    getAutocompleteDefault()
  );
  const [text, setText] = useState<string>("");

  function getAutocompleteDefault() {
    if (type === "city") {
      return undefined;
    } else {
      return flightDirection === "from" ? flightFromAutocomplete : flightToAutocomplete;
    }
  }

  const PopupIcon = (
    <IconButton>
      <FontAwesomeIcon icon={faSearch} color={home ? "white" : "#cecece"} />
    </IconButton>
  );

  useEffect(() => {
    getPredictions(text);
  }, [text]);

  function getPredictions(query: string) {
    let buffer = iataCodes.filter(
      (iata) =>
        iata.code.toLowerCase().includes(query) ||
        iata.name.toLowerCase().includes(query) ||
        iata.city.toLowerCase().includes(query)
    );

    setPredictions(buffer);
  }

  function onAutomcompleteValueChange(value: IATALocation | null) {
    setAutocomplete(value);
  }

  function onTextChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setText(e.target.value);
  }

  function updateState() {
    if (type === "city") {
      dispatch(updateCityPredictions(predictions));

      if (autocomplete) {
        dispatch(setCurrentCity(autocomplete));
      }
    } else {
      dispatch(updateAirportPredictions(predictions));

      if (flightDirection === "from") {
        dispatch(setFlightFromAutocomplete(autocomplete));
        dispatch(setFlightFrom(text));
      } else {
        dispatch(setFlightToAutocomplete(autocomplete));
        dispatch(setFlightTo(text));
      }
    }
  }

  return (
    <Autocomplete
      onBlur={() => updateState()}
      value={autocomplete}
      onChange={(e, value) => onAutomcompleteValueChange(value)}
      options={predictions}
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
            value={searchQuery}
            variant="outlined"
            placeholder="Search locations"
            className={style.searchBar}
            onChange={(e) => dispatch(onQueryChanged({ value: e.target.value }))}
            size="small"
          />
        ) : (
          <CustomTF
            params={params}
            value={flightDirection === "from" ? flight.from : flight.to}
            className={style.searchBarInput}
            outlineColor={Colors.GREEN_HOVER}
            onChange={(e) => onTextChange(e)}
            placeholder="City or airport"
            startAdornment={<FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BLUE} />}
          />
        )
      }
    />
  );
}
