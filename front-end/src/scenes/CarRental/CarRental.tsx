import DateFnsUtils from "@date-io/date-fns";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  Grid,
  ThemeProvider,
  FormControl,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Tooltip,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, parseISO } from "date-fns";
import React, { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Font } from "../../assets";
import {
  Navbar,
  ServicesToolbar,
  Text,
  IataAutocomplete,
  CustomButton,
  SortPageSize,
  CarsCard,
  Footer,
} from "../../components";
import { Colors } from "../../styles";
import {
  CarCheckbox,
  carBrandPlaceholder,
  CarSearch,
  FlightTypes,
  IATALocation,
  isDateAfterOrEqual,
  muiDateFormatter,
  selectCarSearch,
  selectDestinationCity,
  carRentalFeatures,
  Car,
  carsPlaceholder,
} from "../../utils";
import { carRentalStyles } from "./carRental-styles";

export function CarRental() {
  const style = carRentalStyles();
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: Font.Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Font.Family,
          color: Colors.BLUE,
        },
      },
      //@ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiTypography: {
        h3: {
          fontFamily: Font.Family,
        },
        h4: {
          fontFamily: Font.Family,
        },
        subtitle1: {
          fontFamily: Font.Family,
        },
        body1: {
          fontFamily: Font.Family,
        },
        body2: {
          fontFamily: Font.Family,
        },
        caption: {
          fontFamily: Font.Family,
        },
      },
      MuiOutlinedInput: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            borderColor: "#cecece",
          },
        },
      },

      MuiPickersDay: {
        current: {
          color: Colors.BLUE,
        },
        daySelected: {
          backgroundColor: Colors.BLUE,

          "&:hover": {
            backgroundColor: Colors.BLUE_HOVER,
          },
        },
      },
      MuiInput: {
        underline: {
          "&:hover": {
            "&:not(.Mui-disabled)": {
              "&::before": {
                borderBottom: `2px solid ${Colors.GREEN}`,
              },
            },
          },
          "&::after": {
            borderBottom: `2px solid ${Colors.PURPLE}`,
          },
        },
      },
    },
  });

  const carSearch: CarSearch = useSelector(selectCarSearch);
  const [cars, setCars] = useState<Car[]>(carsPlaceholder);
  const destinationCity: IATALocation = useSelector(selectDestinationCity);

  const sortOptions: string[] = [
    "Name | A - Z",
    "Name | Z - A",
    "Price | desc",
    "Price | asc",
  ];

  const [brands, setBrands] = useState<CarCheckbox[]>(carBrandPlaceholder);
  const [transmission, setTransmission] = useState<string>("");
  const transmissions: { value: string; label: string }[] = [
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
    { value: "all", label: "All" },
  ];

  const [features, setFeatures] = useState<CarCheckbox[]>(carRentalFeatures);

  const [localCarSearch, setLocalCarSearch] = useState<CarSearch>(carSearch);
  const [sortOption, setSortOption] = useState<string>("Price | desc");

  function onDateChange(
    date: MaterialUiPickersDate,
    type: "pickup_date" | "dropoff_date"
  ) {
    let newDate: Date;

    switch (type) {
      case "pickup_date":
        newDate = date === null ? new Date() : parseISO(date.toISOString());
        let dropoff_date: Date = parseISO(localCarSearch.dropoff_date);

        if (dropoff_date && isDateAfterOrEqual(newDate, dropoff_date)) {
          setLocalCarSearch({
            ...localCarSearch,
            dropoff_date: addDays(newDate, 1).toISOString(),
          });
        }

        setLocalCarSearch({ ...localCarSearch, pickup_date: newDate.toISOString() });
        break;
      case "dropoff_date":
        newDate = date === null ? new Date() : parseISO(date.toISOString());
        setLocalCarSearch({ ...localCarSearch, dropoff_date: newDate.toISOString() });
        break;
    }
  }

  function onSortOptionChange(
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) {
    setSortOption(event.target.value as string);
  }

  function onBrandChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedBrands: CarCheckbox[] = brands.map((brand) => {
      if (brand.name === changedCheck) {
        return { ...brand, checked: event.target.checked };
      } else {
        return { ...brand };
      }
    });

    setBrands(newSelectedBrands);
  }

  function onFeatureChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedFeatures: CarCheckbox[] = features.map((feature) => {
      if (feature.name === changedCheck) {
        return { ...feature, checked: event.target.checked };
      } else {
        return { ...feature };
      }
    });

    setFeatures(newSelectedFeatures);
  }

  function onTransmissionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTransmission((event.target as HTMLInputElement).value);
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Car rental in ${destinationCity.city}`}</title>
      </Helmet>

      {/* Image container */}
      <div className={style.topImageContainer}>
        <Navbar transparent />
        <ServicesToolbar transparent />

        {/* Title */}
        <div className={style.pageTitleContainer}>
          <Text
            component="hm"
            color="white"
            className={style.pageTitle}
          >{`Car Rental in ${destinationCity.city}`}</Text>
        </div>

        {/* Search params */}
        <Grid container spacing={2} className={style.searchParamsGrid}>
          {/* Location */}
          <Grid item className={style.locationGrid}>
            <Text color="white" component="h4">
              Pickup location
            </Text>
            <IataAutocomplete type="airport" flightDirection="to" />
          </Grid>

          {/* Dates */}
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {/* Pickup date */}
              <Grid item className={style.dateButtonGrid}>
                <Text color="white" component="h4">
                  Pickup
                </Text>
                <KeyboardDatePicker
                  value={parseISO(carSearch.pickup_date)}
                  labelFunc={(date, invalidLabel) =>
                    muiDateFormatter(date, invalidLabel, "date")
                  }
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => onDateChange(d, "pickup_date")}
                />
              </Grid>

              {/* Dropoff date */}
              <Grid item className={style.dateButtonGrid}>
                <Text color="white" component="h4">
                  Dropoff
                </Text>
                <KeyboardDatePicker
                  value={parseISO(carSearch.dropoff_date)}
                  labelFunc={(date, invalidLabel) =>
                    muiDateFormatter(date, invalidLabel, "date")
                  }
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => onDateChange(d, "dropoff_date")}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </ThemeProvider>

          {/* Button */}
          <Grid item className={style.buttonGrid}>
            <Grid
              container
              style={{ height: "100%" }}
              justify="flex-end"
              alignItems="flex-end"
            >
              <CustomButton style={{ fontSize: "18px" }} backgroundColor={Colors.GREEN}>
                Search
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {/* Page container */}
      <Grid container className={style.pageContainer} justify="center">
        {/* Sort */}
        <Grid item className={style.sortGrid}>
          <Grid container className={style.gridContainer}>
            <Grid container className={style.sortContainer}>
              <Text
                bold
                style={{ alignSelf: "end", margin: "auto 0px" }}
                color={Colors.BLUE}
              >
                Sort by
              </Text>

              <FormControl className={style.sortFormControl}>
                <Select
                  value={sortOption}
                  variant="outlined"
                  classes={{ icon: style.selectIcon }}
                  className={style.select}
                  onChange={onSortOptionChange}
                >
                  {sortOptions.map((option, i) => (
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
        </Grid>

        {/* Filters */}
        <Grid item className={style.filterGrid}>
          <div className={style.filterContainer}>
            {/* Brands */}
            <div>
              <Text component="h3" color={Colors.BLUE}>
                Brands
              </Text>
              <FormGroup style={{ marginLeft: "10px" }}>
                {brands.map((brand, i) => (
                  <FormControlLabel
                    key={i}
                    label={brand.name}
                    classes={{ label: style.formLabel }}
                    control={
                      <Checkbox
                        checked={brand.checked}
                        classes={{ colorSecondary: style.colorSecondary }}
                        icon={<FontAwesomeIcon icon={faSquare} />}
                        checkedIcon={
                          <FontAwesomeIcon icon={faCheckSquare} color={Colors.PURPLE} />
                        }
                        onChange={onBrandChange}
                        name={brand.name}
                      />
                    }
                  />
                ))}
              </FormGroup>
            </div>

            {/* Transmission */}
            <div style={{ marginTop: "20px" }}>
              <Text component="h3" color={Colors.BLUE}>
                Transmission
              </Text>
              <RadioGroup
                style={{ marginLeft: "10px" }}
                value={transmission}
                onChange={onTransmissionChange}
              >
                {transmissions.slice(0, 4).map((transmission, i) => (
                  <FormControlLabel
                    key={i}
                    label={transmission.label}
                    value={transmission.value}
                    classes={{ label: style.formLabel }}
                    control={<Radio classes={{ colorSecondary: style.colorSecondary }} />}
                  />
                ))}
              </RadioGroup>
            </div>

            {/* Features */}
            <div style={{ marginTop: "20px" }}>
              <Text component="h3" color={Colors.BLUE}>
                Features
              </Text>
              <FormGroup style={{ marginLeft: "10px" }}>
                {features.map((feature, i) => (
                  <FormControlLabel
                    key={i}
                    label={feature.name}
                    classes={{ label: style.formLabel }}
                    control={
                      <Checkbox
                        checked={feature.checked}
                        classes={{ colorSecondary: style.colorSecondary }}
                        icon={<FontAwesomeIcon icon={faSquare} />}
                        checkedIcon={
                          <FontAwesomeIcon icon={faCheckSquare} color={Colors.PURPLE} />
                        }
                        onChange={onFeatureChange}
                        name={feature.name}
                      />
                    }
                  />
                ))}
              </FormGroup>
            </div>
          </div>
        </Grid>

        {/* Cars cards */}
        <Grid item className={style.carsGrid}>
          <Grid container spacing={2}>
            {cars.map((car, i) => (
              <Grid key={i} item className={style.carsGridItem}>
                <CarsCard car={car} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}
