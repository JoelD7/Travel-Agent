import * as React from "react";
// import Login from "./scenes/Login/Login";
// import SignUp from "./scenes/SignUp/SignUp";
import {
  FlightDetails,
  Flights_Home,
  Flight_List,
  Home,
  Hotels,
  Login,
  RestaurantDetails,
  Restaurant_List,
  SignUp,
  ThingsToDo,
  ThingsToDoDetails,
  TripDetails,
  Trips,
} from "./scenes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from "./utils";
export default function App() {
  return (
    <Router basename="/Travel-Agent">
      <Switch>
        <Route exact path={Routes.HOME} component={Home} />
        <Route exact path={Routes.SIGNUP} component={SignUp} />
        <Route exact path={Routes.LOGIN} component={Login} />
        <Route exact path={Routes.HOTELS} component={Hotels} />
        <Route exact path={Routes.FLIGHTS} component={Flights_Home} />
        <Route exact path={Routes.FLIGHT_LIST} component={Flight_List} />
        <Route exact path={Routes.RESTAURANTS} component={Restaurant_List} />
        <Route exact path={`${Routes.RESTAURANTS}/:id`} component={RestaurantDetails} />
        <Route exact path={Routes.THINGS_TODO} component={ThingsToDo} />
        <Route exact path={`${Routes.THINGS_TODO}/:id`} component={ThingsToDoDetails} />
        <Route exact path={Routes.TRIPS} component={Trips} />
        <Route exact path={`${Routes.TRIPS}/:id`} component={TripDetails} />
      </Switch>
    </Router>
  );
}
