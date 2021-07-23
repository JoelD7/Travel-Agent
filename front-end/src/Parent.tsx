import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CloudImage } from "./assets";
import {
  AuthStatus,
  backend,
  Person,
  proxyUrl,
  Routes,
  selectPerson,
  setFavorites,
  setIsAuthenticated,
  setLoginReferrer,
  setPerson,
  setTripperLogoImg,
  setUserTripsFromPerson,
  useAppDispatch,
} from "./utils";

interface ParentProps {
  children: ReactNode;
}

export function Parent({ children }: ParentProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const curPathname = location.pathname;
  const person: Person | undefined = useSelector(selectPerson);
  const [childrenVisible, setChildrenVisible] = useState(false);

  useEffect(() => {
    getTripperLogoImage();

    fetchAuthenticationStatus();
  }, []);

  function fetchAuthenticationStatus() {
    backend
      .get(`/auth/status`)
      .then((res) => {
        let status = res.data;

        if (status === AuthStatus.AUTHENTICATED) {
          dispatch(setIsAuthenticated(true));

          if (!person) {
            fetchPerson();
          } else {
            setPersonDependencies(person);
          }
        } else if (status === AuthStatus.NOT_AUTHENTICATED) {
          dispatch(setIsAuthenticated(false));
          dispatch(setLoginReferrer(curPathname));

          if (curPathname !== Routes.SIGNUP) {
            // history.push(Routes.LOGIN);
          }
        }

        setChildrenVisible(true);
      })
      .catch((err) => {});
  }

  async function fetchPerson() {
    const personUuidCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("personUuid="));

    console.log(personUuidCookie);

    if (personUuidCookie) {
      let uuid = personUuidCookie.split("=")[1];

      const res = await backend.get(`/person/${uuid}`);
      setPersonDependencies(res.data);
    } else {
      let uuid = " ";
      const res = await backend.get(`/person/${uuid}`);
      setPersonDependencies(res.data);
    }
  }

  function setPersonDependencies(person: any) {
    dispatch(setPerson(person));
    dispatch(setFavorites(person.favoritePlaces));
    setUserTripsFromPerson(person);
  }

  function getTripperLogoImage() {
    if (localStorage.getItem("tripperLogo") === null) {
      let img = new Image();

      img.addEventListener(
        "load",
        function () {
          let imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");

          imgCanvas.width = img.width;
          imgCanvas.height = img.height;

          if (imgContext !== null) {
            imgContext.drawImage(img, 0, 0, img.width, img.height);
          }

          let imgAsDataURL = imgCanvas.toDataURL("image/png");

          try {
            localStorage.setItem("tripperLogo", imgAsDataURL);
            dispatch(setTripperLogoImg(imgAsDataURL));
          } catch (e) {
            console.log("Storage failed: " + e);
          }
        },
        false
      );

      img.onerror = function (e) {
        console.log("Not ok", e);
      };

      img.crossOrigin = "Anonymous";
      img.src = proxyUrl + CloudImage.logotypeWhite;
    } else {
      dispatch(setTripperLogoImg(localStorage.getItem("tripperLogo") as string));
    }
  }

  return <>{childrenVisible && children}</>;
}
