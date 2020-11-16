import * as React from "react";
// import Login from "./scenes/Login/Login";
// import SignUp from "./scenes/SignUp/SignUp";
import {
  Flights_Home,
  Flight_List,
  Home,
  Hotels,
  Login,
  Restaurant_List,
  SignUp,
} from "./scenes";
import {
  BrowserRouter as Router,
  Switch,
  Route as RRoute,
} from "react-router-dom";
import { Route } from "./utils";
export default function App() {
  return (
    <Router>
      <Switch>
        <RRoute exact path={Route.HOME} component={Home} />
        <RRoute exact path={Route.SIGNUP} component={SignUp} />
        <RRoute exact path={Route.LOGIN} component={Login} />
        <RRoute exact path={Route.HOTELS} component={Hotels} />
        <RRoute exact path={Route.FLIGHTS} component={Flights_Home} />
        <RRoute exact path={Route.FLIGHT_LIST} component={Flight_List} />
        <RRoute exact path={Route.RESTAURANTS} component={Restaurant_List} />
      </Switch>
    </Router>
  );
}
