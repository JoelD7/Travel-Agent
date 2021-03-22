import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { logoType, loginImage } from "../../assets";
import { CustomButton, Footer, Navbar } from "../../components";
import TextInput from "../../components/atoms/TextInput";
import { Colors, signStyles } from "../../styles";

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

  const [values, setValues] = useState<LoginType>({
    email: "",
    password: "",
  });

  function login(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {}

  function googleLogin(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {}

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
      <Navbar />
      <Grid className={style.mainContainerLogin} container>
        <Grid item className={style.formGrid}>
          <div className={style.imageContainer}>
            <img className={style.logotype} src={logoType} />
          </div>

          <Grid item className={style.formContainer}>
            <h1 className={style.title}>Login</h1>
            <h5 style={{ color: Colors.BLUE, fontWeight: "normal" }}>
              Login with Google
            </h5>
            <CustomButton style={{ width: "100%" }} icon={faGoogle} onClick={googleLogin}>
              Google Login
            </CustomButton>

            <Grid id="email" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Email"
                name="email"
                value={values.email}
                style={{ width: "100%" }}
                type="email"
              />
            </Grid>

            <Grid id="password" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Password"
                name="password"
                value={values.password}
                style={{ width: "100%" }}
                type={visibility.password ? "text" : "password"}
                endAdornment={<PasswordEye name="password" />}
              />
            </Grid>

            <Grid id="signUp" style={{ marginTop: "15px" }} container>
              <CustomButton onClick={login} submit={true} style={{ width: "100%" }}>
                Sign up
              </CustomButton>
            </Grid>

            <Grid id="redirectLogin" container>
              <p style={{ color: Colors.PURPLE }}>
                Not registered?
                <b>
                  <a href="/signup">Sign up</a>
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
