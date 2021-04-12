import DateFnsUtils from "@date-io/date-fns";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare, faFilter } from "@fortawesome/free-solid-svg-icons";
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
  Drawer,
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
  CarFilters,
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
  selectCarSearchBrands,
  selectCarSearchFeatures,
  selectCarSearchTransmission,
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

  const brands: CarCheckbox[] = useSelector(selectCarSearchBrands);
  const features: CarCheckbox[] = useSelector(selectCarSearchFeatures);
  const transmission: string = useSelector(selectCarSearchTransmission);

  const transmissions: { value: string; label: string }[] = [
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
    { value: "all", label: "All" },
  ];

  const [openDrawer, setOpenDrawer] = useState(false);

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

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Car rental in ${destinationCity.city}`}</title>
      </Helmet>

      {/* Image container */}
      <Grid container className={style.topImageContainer}>
        <img
          src="/Travel-Agent/car-rental.jpg"
          className={style.backgroundImage}
          alt=""
        />

        <Grid item xs={12} style={{ zIndex: 1 }}>
          <Navbar transparent />
          <ServicesToolbar transparent />

          {/* Title */}
          <div className={style.pageTitleContainer}>
            <Text
              component="hm"
              color="white"
            >{`Car Rental in ${destinationCity.city}`}</Text>
          </div>
        </Grid>

        {/* Search params */}
        <Grid container spacing={2} className={style.searchParamsGrid}>
          {/* Location */}
          <Grid item className={style.locationGrid}>
            <Text color="white" className={style.whiteParamText} bold>
              Pickup location
            </Text>
            <div className={style.locationDiv}>
              <IataAutocomplete type="airport" flightDirection="to" />
            </div>
          </Grid>

          {/* Dates */}
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {/* Pickup date */}
              <Grid item className={style.dateButtonGrid}>
                <Text color="white" className={style.whiteParamText} bold>
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
                <Text color="white" className={style.whiteParamText} bold>
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
      </Grid>

      {/* Page container */}
      <Grid container className={style.pageContainer} justify="center">
        {/* Filter button */}
        <Grid item className={style.filterButtonGrid}>
          <Grid container alignItems="center" style={{ height: "100%" }}>
            <CustomButton
              icon={faFilter}
              backgroundColor={Colors.GREEN}
              style={{ paddingLeft: "10px", fontSize: "14px" }}
              onClick={() => setOpenDrawer(true)}
            >
              Filter
            </CustomButton>
          </Grid>
        </Grid>

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
            <CarFilters />
          </div>
        </Grid>

        {/* Cars cards */}
        <Grid item className={style.carsGrid}>
          <Grid container spacing={2} justify="center">
            {cars.map((car, i) => (
              <Grid key={i} item className={style.carsGridItem}>
                <CarsCard car={car} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Footer />

      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: style.drawer }}
      >
        <CarFilters />
      </Drawer>
    </div>
  );
}
