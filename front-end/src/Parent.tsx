import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  AuthStatus,
  backend,
  Person,
  Routes,
  selectIsAuthenticated,
  setIsAuthenticated,selectPerson,
  setLoginReferrer, useAppDispatch
} from "./utils";

interface ParentProps {
  children: ReactNode;
}

export function Parent({ children }: ParentProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const curPathname = location.pathname;
  const person: Person | undefined = useSelector(selectPerson)

  useEffect(() => {
    if(!person){
      // const res = await backend.get
    }

    backend
      .get(`/auth/status`)
      .then((res) => {
        let status = res.data;
console.log(res.headers);
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


  return <>{children}</>;
}
