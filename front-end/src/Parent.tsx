import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  AuthStatus,
  backend,
  Routes,
  selectIsAuthenticated,
  setIsAuthenticated,
  setLoginReferrer,
  store,
  useAppDispatch,
} from "./utils";

interface ParentProps {
  children: ReactNode;
}

export function Parent({ children }: ParentProps) {
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const curPathname = location.pathname;

  useEffect(() => {
    backend
      .get(`/auth/status`)
      .then((res) => {
        let status = res.data;

        if (status === AuthStatus.AUTHENTICATED) {
          dispatch(setIsAuthenticated(true));
        } else if (status === AuthStatus.NOT_AUTHENTICATED) {
          dispatch(setIsAuthenticated(false));
          dispatch(setLoginReferrer(curPathname));
          history.push(Routes.LOGIN);
        }
      })
      .catch((err) => {});
  }, []);

  function isAuthStatusRequestable(): boolean {
    return (
      !isAuthenticated && curPathname !== Routes.LOGIN && curPathname !== Routes.SIGNUP
    );
  }

  return <>{children}</>;
}
