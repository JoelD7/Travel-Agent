import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, InputAdornment, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { MouseEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Font } from "../../assets";
import { logoType, signup } from "../../assets/images";
import { CustomButton, Footer, Navbar, PasswordEye } from "../../components";
import { TextInput } from "../../components/atoms/TextInput";
import { Colors, signStyles } from "../../styles";
import { Routes, backend } from "../../utils";

interface SignUpValuesType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface VisibilityProps {
  [index: string]: boolean;
}

export function SignUp() {
  const style = signStyles();

  const [credentials, setCredentials] = useState<SignUpValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const history = useHistory();

  const [visibility, setVisibility] = useState<VisibilityProps>({
    password: false,
    passwordConfirmation: false,
  });

  async function signUp(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    let { passwordConfirmation, ...signUpDto } = credentials;
    let res = backend.post(`/auth/signup`, signUpDto);
    setOpenSuccessSnack(true);

    setTimeout(() => {
      history.push(Routes.LOGIN);
    }, 1000);
  }

  function googleSignUp(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {}

  function updateState(name: string, value: string) {
    setCredentials({ ...credentials, [name]: value });
  }

  return (
    <div>
      <Navbar variant="auth" />

      <Grid className={style.mainContainerSignUp} container>
        <Grid item className={style.formGrid}>
          <div className={style.imageContainer}>
            <Link to={Routes.HOME} style={{ outline: "none", border: "none" }}>
              <img className={style.logotype} src={logoType} />
            </Link>
          </div>

          <Grid item className={style.formContainer}>
            <h1 className={style.title}>Sign up</h1>
            <h5 style={{ color: Colors.BLUE, fontWeight: "normal" }}>
              Sign up with Google
            </h5>
            <CustomButton
              style={{ width: "100%" }}
              icon={faGoogle}
              onClick={googleSignUp}
            >
              Google Sign up
            </CustomButton>

            <Grid
              id="name"
              style={{ marginTop: "15px" }}
              container
              justify="space-between"
            >
              <TextInput
                name="firstName"
                value={credentials.firstName}
                label="First name"
                style={{ width: "45%", minWidth: "147px" }}
                updateState={updateState}
              />

              <TextInput
                name="lastName"
                value={credentials.lastName}
                label="Last name"
                style={{ width: "45%", minWidth: "147px" }}
                updateState={updateState}
              />
            </Grid>

            <Grid id="email" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Email"
                name="email"
                value={credentials.email}
                style={{ width: "100%" }}
                type="email"
                updateState={updateState}
              />
            </Grid>

            <Grid id="password" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Password"
                name="password"
                coPassword={credentials.passwordConfirmation}
                value={credentials.password}
                style={{ width: "100%" }}
                type={visibility.password ? "text" : "password"}
                updateState={updateState}
                endAdornment={
                  <PasswordEye
                    visible={visibility.password}
                    onClick={() =>
                      setVisibility({ ...visibility, password: !visibility.password })
                    }
                  />
                }
              />
            </Grid>

            <Grid id="passwordConfirmation" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Confirm password"
                name="passwordConfirmation"
                coPassword={credentials.password}
                value={credentials.passwordConfirmation}
                style={{ width: "100%" }}
                type={visibility.passwordConfirmation ? "text" : "password"}
                updateState={updateState}
                endAdornment={
                  <PasswordEye
                    visible={visibility.passwordConfirmation}
                    onClick={() =>
                      setVisibility({
                        ...visibility,
                        passwordConfirmation: !visibility.passwordConfirmation,
                      })
                    }
                  />
                }
              />
            </Grid>

            <Grid id="signUp" style={{ marginTop: "15px" }} container>
              <CustomButton onClick={signUp} submit={true} style={{ width: "100%" }}>
                Sign up
              </CustomButton>
            </Grid>

            <Grid id="redirectLogin" container>
              <p style={{ color: Colors.PURPLE }}>
                Already registered?
                <b>
                  <Link to={Routes.LOGIN} style={{ color: "blue" }}>
                    {" "}
                    Log in
                  </Link>
                </b>
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={style.imageGrid}>
          <img className={style.image} src={signup} />
        </Grid>
      </Grid>

      <Footer />

      <Snackbar
        open={openSuccessSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSuccessSnack(false)}
          severity="success"
        >
          Sign up successfull
        </Alert>
      </Snackbar>
    </div>
  );
}
