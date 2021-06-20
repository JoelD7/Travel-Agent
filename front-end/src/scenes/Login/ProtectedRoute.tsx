import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Routes, selectIsAuthenticated } from "../../utils";

interface ProtectedRouteProps {
  component: () => JSX.Element;
  path: string;
}

export function ProtectedRoute({ component, path }: ProtectedRouteProps) {
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  return (
    <Route
      exact
      path={path}
      render={({ location }) => {
        return isAuthenticated ? (
          { component }
        ) : (
          <Redirect
            to={{
              pathname: Routes.LOGIN,
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
}
