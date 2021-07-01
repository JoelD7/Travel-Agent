import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogActions, DialogContent, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { lazy, useEffect, useState, Suspense } from "react";
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
import { Parent } from "./Parent";
import { Loading } from "./scenes";
import { Colors } from "./styles";
import {
  IATALocation,
  LocationType,
  Routes,
  selectIsAuthenticated,
  selectOriginCity,
} from "./utils";

const Home = lazy(() => import("./scenes/Home/HomeDefault"));
const Profile = lazy(() => import("./scenes/Profile/ProfileDefault"));
const Login = lazy(() => import("./scenes/Login/LoginDefault"));
const SignUp = lazy(() => import("./scenes/SignUp/SignUpDefault"));
const Hotels = lazy(() => import("./scenes/Hotels/HotelsDefault"));
const HotelDetails = lazy(() => import("./scenes/Hotels/HotelDetailsDefault"));
const Flights_Home = lazy(() => import("./scenes/Flights/Flights_HomeDefault"));
const Flight_List = lazy(() => import("./scenes/Flights/Flight_ListDefault"));
const Restaurant_List = lazy(() => import("./scenes/Restaurants/Restaurant_ListDefault"));
const RestaurantDetails = lazy(
  () => import("./scenes/Restaurants/RestaurantDetailsDefault")
);
const ThingsToDo = lazy(() => import("./scenes/ThingsToDo/ThingsToDoDefault"));
const ThingsToDoDetails = lazy(
  () => import("./scenes/ThingsToDo/ThingsToDoDetailsDefault")
);
const Trips = lazy(() => import("./scenes/Trip/TripsDefault"));
const TripDetails = lazy(() => import("./scenes/Trip/TripDetailsDefault"));
const FavPlaces = lazy(() => import("./scenes/FavPlaces/FavPlacesDefault"));
const Reservations = lazy(() => import("./scenes/Reservations/ReservationsDefault"));
const Itinerary = lazy(() => import("./scenes/Itinerary/ItineraryDefault"));
const NotFound = lazy(() => import("./scenes/NotFound/NotFoundDefault"));
const CarRental = lazy(() => import("./scenes/CarRental/CarRentalDefault"));
const CreateTrip = lazy(() => import("./scenes/CreateTrip/CreateTripDefault"));

export default function App() {
  const style = appStyles();

  const [openOriginCityDialog, setOpenOriginCityDialog] = useState(false);

  const originCity: IATALocation = useSelector(selectOriginCity);
  const [openRequiredFieldSnack, setOpenRequiredFieldSnack] = useState(false);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isOriginCityDefined()) {
      setOpenOriginCityDialog(true);
    }
  }, [isAuthenticated]);

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
        <Parent>
          <ScrollToTop>
            <Suspense fallback={<Loading />}>
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
                <Route exact path={`${Routes.TRIPS}/:uuid`} component={TripDetails} />
                <Route
                  exact
                  path={`${Routes.TRIPS}/:uuid/album/:uuid`}
                  component={Album}
                />
                <Route exact path={Routes.FAVORITE_PLACES} component={FavPlaces} />
                <Route exact path={Routes.RESERVATIONS} component={Reservations} />
                <Route exact path={Routes.ITINERARY} component={Itinerary} />
                <Route exact path={Routes.CAR_RENTAL} component={CarRental} />
                <Route exact path={Routes.CREATE_TRIP} component={CreateTrip} />
                <Route exact path={Routes.PROFILE} component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Parent>
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
