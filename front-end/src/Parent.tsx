import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  AuthStatus,
  backend,
  Person,
  Routes,
  selectPerson,
  setFavorites,
  setIsAuthenticated,
  setLoginReferrer,
  setPerson,
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
  const [childrenVisible, setChildrenVisible] = useState(false);

  useEffect(() => {
    backend
      .get(`/auth/status`)
      .then((res) => {
        let status = res.data;

        if (status === AuthStatus.AUTHENTICATED) {
          dispatch(setIsAuthenticated(true));

          if (!person) {
            fetchPerson();
          }
        } else if (status === AuthStatus.NOT_AUTHENTICATED) {
          dispatch(setIsAuthenticated(false));
          dispatch(setLoginReferrer(curPathname));

          if (curPathname !== Routes.SIGNUP) {
            history.push(Routes.LOGIN);
          }
        }

        setChildrenVisible(true);
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
      dispatch(setFavorites(res.data.favoritePlaces));
      setUserTripsFromPerson(res.data);
    }
  }

  return <>{childrenVisible && children}</>;
}
