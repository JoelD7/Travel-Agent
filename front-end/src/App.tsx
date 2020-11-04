import * as React from "react";
// import Login from "./scenes/Login/Login";
// import SignUp from "./scenes/SignUp/SignUp";
import { Home, Hotels, Login, SignUp } from "./scenes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default function App() {
  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/signup" component={SignUp} />
    //     <Route exact path="/login" component={Login} />
    //   </Switch>
    // </Router>
    <Hotels/>
  );
}
