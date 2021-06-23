import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  AuthStatus,
  backend,
  Person,
  responseTripToDomainTrip,
  Routes,
  selectPerson,
  setIsAuthenticated,
  setLoginReferrer,
  setPerson,
  setUserTrips,
  setUserTripsFromPerson,
  useAppDispatch,
} from "./utils";

interface ParentProps {
  children: ReactNode;
}

export function Parent({ children }: ParentProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const curPathname = location.pathname;
  const person: Person | undefined = useSelector(selectPerson);

  useEffect(() => {
    if (!person) {
      fetchPerson();
    }

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

  async function fetchPerson() {
    const personUuidCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("personUuid="));

    if (personUuidCookie) {
      const uuid = personUuidCookie.split("=")[1];

      const res = await backend.get(`/person/${uuid}`);
      dispatch(setPerson(res.data));
      setUserTripsFromPerson(res.data);
    }
  }

  return <>{children}</>;
}
