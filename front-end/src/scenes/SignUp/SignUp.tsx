import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { logoType, signup } from "../../assets/images";
import { CustomButton } from "../../components";
import TextInput from "../../components/atoms/TextInput";
import { BLUE, PURPLE, signUpStyles } from "../../styles";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { ObjectSchemaConstructor, ObjectSchema } from "yup";

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

  function signUp(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {}

  function googleSignUp(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {}

  function PasswordEye({ name }: PasswordProps) {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={() =>
            setVisibility({ ...visibility, [name]: !visibility[name] })
          }
        >
          <FontAwesomeIcon
            transform="shrink-4"
            icon={visibility[name] ? faEye : faEyeSlash}
          />
        </IconButton>
      </InputAdornment>
    );
  }

  function updateState(name: string, value: string) {
    setValues({ ...values, [name]: value });
  }

  function validationSchema(): ObjectSchema {
    return Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password is required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match"
      ),
    });
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
            onClick={googleSignUp}
          />

          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting }) => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }}
          >
            <Form>
              <Grid
                id="name"
                style={{ marginTop: "15px" }}
                container
                justify="space-between"
              >
                <TextInput
                  name="firstName"
                  value={values.firstName}
                  label="First name"
                  className={style.nameTextField}
                  updateState={updateState}
                />

                <TextInput
                  name="lastName"
                  value={values.lastName}
                  label="Last name"
                  className={style.nameTextField}
                  updateState={updateState}
                />
              </Grid>

              <Grid id="email" style={{ marginTop: "15px" }} container>
                <TextInput
                  label="Email"
                  name="email"
                  value={values.email}
                  style={{ width: "100%" }}
                  type="email"
                  updateState={updateState}
                />
              </Grid>

              <Grid id="password" style={{ marginTop: "15px" }} container>
                <TextInput
                  label="Password"
                  name="password"
                  coPassword={values.passwordConfirmation}
                  value={values.password}
                  style={{ width: "100%" }}
                  type={visibility.password ? "text" : "password"}
                  updateState={updateState}
                  endAdornment={<PasswordEye name="password" />}
                />
              </Grid>

              <Grid
                id="passwordConfirmation"
                style={{ marginTop: "15px" }}
                container
              >
                <TextInput
                  label="Confirm password"
                  name="passwordConfirmation"
                  coPassword={values.password}
                  value={values.passwordConfirmation}
                  style={{ width: "100%" }}
                  type={visibility.passwordConfirmation ? "text" : "password"}
                  updateState={updateState}
                  endAdornment={<PasswordEye name="passwordConfirmation" />}
                />
              </Grid>

              <Grid id="signUp" style={{ marginTop: "15px" }} container>
                <CustomButton
                  onClick={signUp}
                  label="Sign up"
                  submit={true}
                  style={{ width: "100%" }}
                />
              </Grid>
            </Form>
          </Formik>
          <Grid id="redirectLogin" container>
            <p style={{ color: PURPLE }}>
              Already registered?
              <b>
                <a href="#">Sign in</a>
              </b>
            </p>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={style.imageGrid}>
        <img className={style.image} src={signup} />
      </Grid>
    </Grid>
  );
}
