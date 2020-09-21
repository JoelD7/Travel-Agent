import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { logoType, signup } from "../../assets/images";
import { CustomButton } from "../../components";
import TextInput from "../../components/atoms/TextInput";
import { BLUE, signUpStyles } from "../../styles";

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

interface PasswordProps {
  name: string;
}

export default function SignUp() {
  const style = signUpStyles();

  const [values, setValues] = useState<SignUpValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [visibility, setVisibility] = useState<VisibilityProps>({
    password: false,
    passwordConfirmation: false,
  });

  function onNameChanged(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    let name = event.target.name;
    let value = event.target.value;

    setValues({ ...values, [name]: value });
  }

  function onPasswordChanged(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    let name = event.target.name;
    let value = event.target.value;

    setValues({ ...values, [name]: value });
  }

  function PasswordEye({ name }: PasswordProps) {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={() =>
            setVisibility({ ...visibility, [name]: !visibility[name] })
          }
        >
          <FontAwesomeIcon transform="shrink-4" icon={visibility[name] ? faEye : faEyeSlash} />
        </IconButton>
      </InputAdornment>
    );
  }

  return (
    <Grid className={style.mainContainer} container>
      <Grid item className={style.formGrid}>
        <div className={style.imageContainer}>
          <img className={style.logotype} src={logoType} />
        </div>

        <Grid item className={style.formContainer}>
          <h1 className={style.title}>Sign up</h1>
          <h5 style={{ color: BLUE, fontWeight: "normal" }}>
            Sign up with Google
          </h5>
          <CustomButton
            label="Google Sign up"
            style={{ width: "100%" }}
            icon={faGoogle}
          />

          <Grid style={{ marginTop: "15px" }} container justify="space-between">
            <TextInput
              name="firstName"
              onChange={onNameChanged}
              value={values.firstName}
              label="First name"
              className={style.nameTextField}
            />

            <TextInput
              name="lastName"
              onChange={onNameChanged}
              value={values.lastName}
              label="Last name"
              className={style.nameTextField}
            />
          </Grid>

          <Grid style={{ marginTop: "15px" }} container>
            <TextInput
              label="Email"
              name="email"
              value={values.email}
              style={{ width: "100%" }}
              type="email"
              onChange={onNameChanged}
            />
          </Grid>
          <Grid style={{ marginTop: "15px" }} container>
            <TextInput
              label="Password"
              name="password"
              value={values.password}
              style={{ width: "100%" }}
              type={visibility.password? "text" : "password"}
              onChange={onPasswordChanged}
              endAdornment={<PasswordEye name="password" />}
            />
          </Grid>
          <Grid style={{ marginTop: "15px" }} container>
            <TextInput
              label="Confirm password"
              name="passwordConfirmation"
              value={values.passwordConfirmation}
              style={{ width: "100%" }}
              type={visibility.passwordConfirmation ? "text" : "password"}
              onChange={onPasswordChanged}
              endAdornment={<PasswordEye name="passwordConfirmation" />}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={style.imageGrid}>
        <img className={style.image} src={signup} />
      </Grid>
    </Grid>
  );
}
