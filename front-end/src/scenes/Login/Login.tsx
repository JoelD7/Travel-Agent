import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import { AnyAction } from "@reduxjs/toolkit";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { batchActions } from "redux-batched-actions";
import { loginImage, logoType } from "../../assets";
import { CustomButton, Footer } from "../../components";
import { TextInput } from "../../components/atoms/TextInput";
import { Colors, signStyles } from "../../styles";
import {
  backend,
  ExceptionMessage,
  mapPersonToDomainType,
  Person,
  Routes,
  selectLoginReferrer,
  setFavorites,
  setIsAuthenticated,
  setLoginReferrer,
  setPerson,
  setUserTrips,
} from "../../utils";

interface LoginType {
  email: string;
  password: string;
}

interface VisibilityProps {
  [index: string]: boolean;
}

interface PasswordProps {
  name: string;
}

export function Login() {
  const style = signStyles();

  const [visibility, setVisibility] = useState<VisibilityProps>({
    password: false,
  });
  const [credentials, setCredentials] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [wrongPasswordText, setWrongPasswordText] = useState<string>("");

  const history = useHistory();
  const dispatch = useDispatch();

  const loginReferrer: string = useSelector(selectLoginReferrer);

  let batchedActions: AnyAction[] = [];
  // console.log("email in login: ", credentials.email);

  async function login(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    // setLoading(true);
    // backend
    //   .post(
    //     `/auth/login`,
    //     `email=${credentials.email}&password=${credentials.password}&rememberMe=true`
    //   )
    //   .then((res) => {
    //     batchedActions.push(setIsAuthenticated(true));
    //     const loggedUser: Person = mapPersonToDomainType(res.data);
    //     batchedActions.push(setPerson(loggedUser));
    //     batchedActions.push(setFavorites(loggedUser.favoritePlaces));
    //     batchedActions.push(setUserTrips(loggedUser.trips));
    //     batchedActions.push(setLoginReferrer(""));
    //     dispatch(batchActions(batchedActions));
    //     setLoading(false);
    //     setWrongPassword(false);
    //     if (loginReferrer !== Routes.LOGIN && loginReferrer !== "") {
    //       history.push(loginReferrer);
    //     } else {
    //       history.push(Routes.HOME);
    //     }
    //   })
    //   .catch((error) => {
    //     if (
    //       error.response &&
    //       error.response.data.message === ExceptionMessage.BAD_CREDENTIALS
    //     ) {
    //       setWrongPassword(true);
    //       setLoading(false);
    //       setWrongPasswordText(error.response.data.message);
    //     }
    //   });
  }

  function PasswordEye({ name }: PasswordProps) {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setVisibility({ ...visibility, [name]: !visibility[name] })}
        >
          <FontAwesomeIcon
            transform="shrink-4"
            icon={visibility[name] ? faEye : faEyeSlash}
          />
        </IconButton>
      </InputAdornment>
    );
  }

  return (
    <div>
      <Grid className={style.mainContainerLogin} container>
        <Grid item className={style.formGrid}>
          <div className={style.imageContainer}>
            <Link to={Routes.HOME} className={style.logoLinkContainer}>
              <img className={style.logotype} src={logoType} />
            </Link>
          </div>

          <Grid item className={style.formContainer}>
            <h1 className={style.title}>Login</h1>

            <Grid id="email" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Email"
                name="email"
                error={wrongPassword}
                helperText={wrongPasswordText}
                updateState={(name, value) =>
                  setCredentials({ ...credentials, [name]: value })
                }
                value={credentials.email}
                style={{ width: "100%" }}
                type="email"
              />
            </Grid>

            <Grid id="password" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Password"
                name="password"
                error={wrongPassword}
                helperText={wrongPasswordText}
                updateState={(name, value) =>
                  setCredentials({ ...credentials, [name]: value })
                }
                value={credentials.password}
                style={{ width: "100%" }}
                type={visibility.password ? "text" : "password"}
                endAdornment={<PasswordEye name="password" />}
              />
            </Grid>

            <Grid id="signUp" style={{ marginTop: "15px" }} container>
              <CustomButton
                onClick={login}
                loading={loading}
                submit={true}
                style={{ width: "100%" }}
              >
                Log in
              </CustomButton>
            </Grid>

            <Grid id="redirectLogin" container>
              <p style={{ color: Colors.BLUE }}>
                Not registered?
                <b>
                  <Link to={Routes.SIGNUP} style={{ color: "blue" }}>
                    {" "}
                    Sign up
                  </Link>
                </b>
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={style.imageGrid}>
          <img className={style.image} src={loginImage} />
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}
