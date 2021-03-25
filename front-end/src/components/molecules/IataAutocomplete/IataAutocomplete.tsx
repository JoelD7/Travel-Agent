import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { batchActions } from "redux-batched-actions";
import { Colors } from "../../../styles";
import {
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
  isInNavbar?: boolean;
  className?: string;
}

type PredictionPerQuery = { [index: string]: IATALocation[] };

export function IataAutocomplete({
  flightDirection,
  type,
  home,
  isInNavbar,
  className,
}: IataAutocomplete) {
  const [predictions, setPredictions] = useState<IATALocation[]>([]);

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);
  const flight: FlightSearch = useSelector(selectFlightParams);
  const dispatch = useDispatch();

  let batchedActions: AnyAction[] = [];

  const [searchQuery, setSearchQuery] = useState(useSelector(selectSearchQuery));

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const style = iataAutocompleteStyles();

  const [autocomplete, setAutocomplete] = useState<IATALocation | null | undefined>(
    getAutocompleteDefault()
  );
  const [text, setText] = useState<string>(
    type === "city" ? searchQuery : flightDirection === "from" ? flight.from : flight.to
  );

  const [predictionsPerQuery, setPredictionsPerQuery] = useState<PredictionPerQuery>({
    "": [],
  });

  const [predictionQueriesMade, setPredictionQueriesMade] = useState<string[]>([""]);

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
    let predictionsBuffer: IATALocation[] = [];

    if (!predictionQueriesMade.includes(query)) {
      predictionsBuffer = iataCodes.filter(
        (iata) =>
          iata.code.toLowerCase().includes(query) ||
          iata.name.toLowerCase().includes(query) ||
          iata.city.toLowerCase().includes(query)
      );

      setPredictionQueriesMade([...predictionQueriesMade, query]);
      setPredictionsPerQuery({ ...predictionsPerQuery, [query]: predictionsBuffer });
    } else {
      predictionsBuffer = predictionsPerQuery[query];
    }

    setPredictions(predictionsBuffer);
  }

  function onAutomcompleteValueChange(value: IATALocation | null) {
    setAutocomplete(value);

    if (type === "airport") {
      checkRequiredAirportField(value);
    }

    if (value) {
      setText(value.code);
    }
  }

  function checkRequiredAirportField(value: IATALocation | null) {
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

    batchedActions.push(onQueryChanged({ value: searchQuery }));

    if (type === "city") {
      batchedActions.push(updateCityPredictions(predictions));

      if (autocomplete) {
        batchedActions.push(setCurrentCity(autocomplete));
      }
    } else {
      batchedActions.push(updateAirportPredictions(predictions));

      if (flightDirection === "from") {
        batchedActions.push(setFlightFromAutocomplete(autocomplete));
        batchedActions.push(setFlightFrom(text));
      } else {
        batchedActions.push(setFlightToAutocomplete(autocomplete));
        batchedActions.push(setFlightTo(text));
      }
    }

    dispatch(batchActions(batchedActions));
  }

  function onCityChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <Autocomplete
        onBlur={() => updateState()}
        value={autocomplete}
        onChange={(e, value) => onAutomcompleteValueChange(value)}
        options={predictions}
        className={className}
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
              style={isInNavbar ? { width: "100%" } : {}}
              className={style.searchBar}
              onChange={onCityChange}
              size="small"
            />
          ) : (
            <TextField
              {...params}
              value={text}
              size="small"
              placeholder="City or airport"
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
