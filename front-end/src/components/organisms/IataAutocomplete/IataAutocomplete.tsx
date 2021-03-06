import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { AnyAction } from "redux";
import { batchActions } from "redux-batched-actions";
import { Font } from "../../../assets";
import {
  AutocompleteType,
  CarSearch,
  getAutocompleteLabel,
  getISOCodeFromCountry,
  iataCodes,
  LocationType,
  onQueryChanged,
  selectCarSearch,
  selectFlightFromAutocomplete,
  selectFlightToAutocomplete,
  selectOriginCity,
  selectSearchQuery,
  setCarSearch,
  setDestinationCity,
  setFlightFromAutocomplete,
  setFlightToAutocomplete,
  setOriginCity,
  sortIATAPredictionsByImportance,
  updateAirportPredictions,
  updateCityPredictions,
  updateHotelCoordinates,
} from "../../../utils";
import { IATALocation } from "../../../utils/types/location-types";
import { iataAutocompleteStyles } from "./iata-autocomplete-styles";

interface IataAutocomplete {
  flightDirection?: "from" | "to";
  type: AutocompleteType;
  cityType?: LocationType.LocationType;
  home?: boolean;
  placeholder?: string;
  isInNavbar?: boolean;
  label?: string;
  required?: boolean;
  className?: string;
  getOptionLabel?: (option: any) => string;
}

const OuterElementContext = createContext({});

const OuterElementType = (props: any) => {
  const outerProps = useContext(OuterElementContext);
  return <div {...props} {...outerProps} />;
};

export function IataAutocomplete({
  flightDirection,
  type,
  placeholder,
  home,
  label,
  required = false,
  cityType = LocationType.DESTINATION,
  isInNavbar,
  getOptionLabel,
  className,
}: IataAutocomplete) {
  const predictions: IATALocation[] = iataCodes;

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);
  const carSearch: CarSearch = useSelector(selectCarSearch);

  const dispatch = useDispatch();

  let batchedActions: AnyAction[] = [];

  const searchQuery = useSelector(selectSearchQuery);
  const originCity: IATALocation = useSelector(selectOriginCity);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const style = iataAutocompleteStyles();

  const [autocomplete, setAutocomplete] = useState<IATALocation | null>(
    getAutocompleteDefault()
  );

  const [text, setText] = useState<string>(getDefaultText());

  function getAutocompleteDefault() {
    if (type === AutocompleteType.CITY) {
      return cityType === LocationType.ORIGIN ? originCity : null;
    } else {
      return flightDirection === "from" ? flightFromAutocomplete : flightToAutocomplete;
    }
  }

  function getDefaultText(): string {
    if (type === AutocompleteType.CITY) {
      return searchQuery;
    }

    if (flightDirection === "from" && flightFromAutocomplete !== null) {
      return flightFromAutocomplete.code;
    }

    if (flightDirection === "to" && flightToAutocomplete !== null) {
      return flightToAutocomplete.code;
    }

    return "";
  }

  useEffect(() => {
    setAutocomplete(getAutocompleteDefault());
  }, [flightFromAutocomplete, flightToAutocomplete]);

  function getPredictions(options: IATALocation[], query: string) {
    query = query.toLowerCase();
    let predictionsBuffer: IATALocation[] = [];

    if (type === AutocompleteType.AIRPORT) {
      predictionsBuffer = options.filter(
        (iata) =>
          iata.code.toLowerCase().indexOf(query) === 0 ||
          iata.name.toLowerCase().indexOf(query) === 0 ||
          iata.city.toLowerCase().indexOf(query) === 0
      );
    } else {
      predictionsBuffer = options.filter(
        (iata) =>
          iata.code.toLowerCase().indexOf(query) === 0 ||
          iata.city.toLowerCase().indexOf(query) === 0
      );
    }

    predictionsBuffer = filterSameCityAirports(predictionsBuffer);

    return predictionsBuffer;
  }

  /**
   * Excludes airports in the same city so that the predictions
   * only include the most important airport in a city.
   */
  function filterSameCityAirports(predictionsBuffer: IATALocation[]): IATALocation[] {
    let includedCities: string[] = [];
    let filteredPredictions: IATALocation[] = [];

    sortIATAPredictionsByImportance(predictionsBuffer);

    predictionsBuffer.forEach((iata) => {
      if (!includedCities.includes(iata.city)) {
        includedCities.push(iata.city);
        filteredPredictions.push(iata);
      }
    });

    return filteredPredictions;
  }

  function onAutomcompleteValueChange(value: IATALocation | null) {
    setAutocomplete(value);

    if (required) {
      checkRequiredField(value);
    }

    // if (value) {
    //   setText(value.code);
    // }
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
          batchedActions.push(setFlightFromAutocomplete(autocomplete));
          batchedActions.push(setOriginCity(autocomplete));
        } else {
          batchedActions.push(
            setCarSearch({
              ...carSearch,
              pickup_location: autocomplete.code,
            })
          );
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
        batchedActions.push(setFlightFromAutocomplete(autocomplete));
      } else {
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
    setAutocomplete(null);
    setText("");
  }

  function ListboxComponent(props: any) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const itemCount = itemData.length;
    const [hover, setHover] = useState(false);
    const [curIndex, setCurIndex] = useState(-1);

    function getListBoxHeight(): number {
      let max: number = 250;
      let calculated: number = 35 * itemCount;

      return calculated > max ? max : calculated;
    }

    function renderRow(props: ListChildComponentProps) {
      const { data, index, style: styleProps } = props;

      function onHover() {
        setHover(true);
        setCurIndex(index);
      }

      function onBlur() {
        setHover(false);
        setCurIndex(-1);
      }

      return React.cloneElement(data[index], {
        onMouseEnter: () => onHover(),
        onMouseLeave: () => onBlur(),
        style: {
          ...styleProps,
          backgroundColor: curIndex === index && hover ? "#f5f5f5" : "white",
          fontFamily: Font.Family,
          top: (styleProps.top as number) + 5,
          bottom: (styleProps.bottom as number) + 5,
        },
      });
    }

    return (
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          height={getListBoxHeight() + 16}
          itemData={itemData}
          width="100%"
          itemSize={(index) => 30}
          overscanCount={5}
          outerElementType={OuterElementType}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    );
  }

  return (
    <>
      <Autocomplete
        onBlur={() => updateState()}
        value={autocomplete}
        onChange={(e, value) => onAutomcompleteValueChange(value)}
        filterOptions={(options) => getPredictions(options, text)}
        options={predictions}
        className={className}
        autoHighlight
        style={{ width: "100%" }}
        loading={predictions.length !== 0}
        getOptionLabel={
          getOptionLabel ? getOptionLabel : (option) => getAutocompleteLabel(option, type)
        }
        ListboxComponent={
          ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>
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
              label={label}
              size="small"
              InputLabelProps={{
                classes: { root: style.inputLabel },
              }}
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
