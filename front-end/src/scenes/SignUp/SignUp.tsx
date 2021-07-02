import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { MouseEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Font } from "../../assets";
import { logoType, signup } from "../../assets/images";
import { CustomButton, Footer, PasswordEye } from "../../components";
import { TextInput } from "../../components/atoms/TextInput";
import { Colors, signStyles } from "../../styles";
import { backend, ExceptionMessage, Routes } from "../../utils";

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
  const [emailTaken, setEmailTaken] = useState<boolean>(false);
  const [emailTakenText, setEmailTakenText] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState(false);

  function signUp(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    let { passwordConfirmation, ...signUpDto } = credentials;
    setLoadingButton(true);

    backend
      .post(`/auth/signup`, signUpDto)
      .then((res) => {
        setOpenSuccessSnack(true);
        setLoadingButton(false);

        setTimeout(() => {
          history.push(Routes.LOGIN);
        }, 1000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message === ExceptionMessage.BAD_CREDENTIALS
        ) {
          setEmailTaken(true);
          setLoadingButton(false);
          setEmailTakenText(error.response.data.message);
        }
      });
  }

  function updateState(name: string, value: string) {
    setCredentials({ ...credentials, [name]: value });
  }

  return (
    <div>
      <Grid className={style.mainContainerSignUp} container>
        <Grid item className={style.formGrid}>
          <div className={style.imageContainer}>
            <Link to={Routes.HOME} className={style.logoLinkContainer}>
              <img className={style.logotype} src={logoType} />
            </Link>
          </div>

          <Grid item className={style.formContainer}>
            <h1 className={style.title}>Sign up</h1>

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
                error={emailTaken}
                helperText={emailTakenText}
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
              <CustomButton
                onClick={signUp}
                submit={true}
                loading={loadingButton}
                style={{ width: "100%" }}
              >
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
