import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogActions, DialogContent, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { appStyles } from "./app-styles";
import { Font } from "./assets";
import {
  Album,
  CustomButton,
  IataAutocomplete,
  IconTP,
  ScrollToTop,
  Text,
} from "./components";
import {
  CarRental,
  CreateTrip,
  FavPlaces,
  Flights_Home,
  Flight_List,
  Home,
  HotelDetails,
  Hotels,
  Itinerary,
  Login,
  NotFound,
  Reservations,
  RestaurantDetails,
  Restaurant_List,
  SignUp,
  ThingsToDo,
  ThingsToDoDetails,
  TripDetails,
  Trips,
} from "./scenes";
import { Colors } from "./styles";
import {
  fetchFavorites,
  fetchUserTrips,
  IATALocation,
  LocationType,
  Routes,
  selectOriginCity,
  selectUserTrips,
  Trip,
  useAppDispatch,
} from "./utils";

export default function App() {
  const style = appStyles();

  const [openOriginCityDialog, setOpenOriginCityDialog] = useState(false);

  const originCity: IATALocation = useSelector(selectOriginCity);
  const userTrips: Trip[] = useSelector(selectUserTrips);
  const [openRequiredFieldSnack, setOpenRequiredFieldSnack] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOriginCityDefined()) {
      setOpenOriginCityDialog(true);
    }

    if (userTrips.length === 0) {
      dispatch(fetchUserTrips(null));
    }

    dispatch(fetchFavorites(null));
  }, []);

  function isOriginCityDefined(): boolean {
    return localStorage.getItem(LocationType.ORIGIN) !== null;
  }

  function onContinueClick() {
    if (originCity === null) {
      setOpenRequiredFieldSnack(true);
      return;
    }

    setOpenOriginCityDialog(false);
  }

  return (
    <div>
      <Router basename="/Travel-Agent">
        <ScrollToTop>
          <Switch>
            <Route exact path={Routes.HOME} component={Home} />
            <Route exact path={Routes.SIGNUP} component={SignUp} />
            <Route exact path={Routes.LOGIN} component={Login} />
            <Route exact path={Routes.HOTELS} component={Hotels} />
            <Route exact path={`${Routes.HOTELS}/:id`} component={HotelDetails} />
            <Route exact path={Routes.FLIGHTS} component={Flights_Home} />
            <Route exact path={Routes.FLIGHT_LIST} component={Flight_List} />
            <Route exact path={Routes.RESTAURANTS} component={Restaurant_List} />
            <Route
              exact
              path={`${Routes.RESTAURANTS}/:id`}
              component={RestaurantDetails}
            />
            <Route exact path={Routes.THINGS_TODO} component={ThingsToDo} />
            <Route
              exact
              path={`${Routes.THINGS_TODO}/:id`}
              component={ThingsToDoDetails}
            />
            <Route exact path={Routes.TRIPS} component={Trips} />
            <Route exact path={`${Routes.TRIPS}/:id`} component={TripDetails} />
            <Route exact path={`${Routes.TRIPS}/:id/album/:id`} component={Album} />
            <Route exact path={Routes.FAVORITE_PLACES} component={FavPlaces} />
            <Route exact path={Routes.RESERVATIONS} component={Reservations} />
            <Route exact path={Routes.ITINERARY} component={Itinerary} />
            <Route exact path={Routes.CAR_RENTAL} component={CarRental} />
            <Route exact path={Routes.CREATE_TRIP} component={CreateTrip} />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Router>

      {/* Dialog */}
      <Dialog open={openOriginCityDialog} classes={{ paperWidthSm: style.paperWidthSm }}>
        <Grid container style={{ padding: "15px" }} alignItems="center">
          <IconTP icon={faMapMarkerAlt} size={40} style={{ padding: "10px" }} />
          <Text component="h2" style={{ marginLeft: "10px" }} bold color={Colors.BLUE}>
            Where are you from?
          </Text>
        </Grid>

        <DialogContent>
          <Text style={{ marginLeft: "12px" }}>
            Quickly answer this question before continue.
          </Text>
          <IataAutocomplete type="city" cityType={LocationType.ORIGIN} required />
        </DialogContent>

        <DialogActions style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton backgroundColor={Colors.GREEN} onClick={() => onContinueClick()}>
            Continue
          </CustomButton>
        </DialogActions>
      </Dialog>

      {/* Snack */}
      <Snackbar
        open={openRequiredFieldSnack}
        autoHideDuration={6000}
        onClose={() => setOpenRequiredFieldSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenRequiredFieldSnack(false)}
          severity="error"
        >
          The required field must be filled.
        </Alert>
      </Snackbar>
    </div>
  );
}
