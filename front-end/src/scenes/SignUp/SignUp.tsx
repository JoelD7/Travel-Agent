import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { logoType, signup } from "../../assets/images";
import { CustomButton } from "../../components";
import TextInput from "../../components/atoms/TextInput";
import { BLUE, PURPLE, signStyles } from "../../styles";
import { Formik, Form, FastField, useFormik } from "formik";
import * as yup from "yup";
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
  const style = signStyles();

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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    validationSchema: yup.object({
      firstName: yup.string().required("Required"),

      lastName: yup.string().required("Required"),

      email: yup.string().email("Invalid email address").required("Required"),
      password: yup.string().required("Password is required"),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match"),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
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
          <form onSubmit={formik.handleSubmit}>
            <Grid
              id="name"
              style={{ marginTop: "15px" }}
              container
              justify="space-between"
            >
              <TextInput
                name="firstName"
                // value={values.firstName}
                label="First name"
                className={style.nameTextField}
                // updateState={updateState}
                // onChange={formik.handleChange}
                setFieldValue={formik.setFieldValue}
                value={formik.values.firstName}
                error={
                  ((formik.touched.firstName !== undefined ? formik.touched.firstName : false) && (formik.errors.firstName !== '' ))
                }
                helperText={
                  formik.errors.firstName !== undefined
                    ? formik.errors.firstName
                    : ""
                }
              />

              <TextInput
                name="lastName"
                // value={values.lastName}
                label="Last name"
                className={style.nameTextField}
                updateState={updateState}
                setFieldValue={formik.setFieldValue}
                value={formik.values.lastName}
                error={
                  (formik.touched.lastName && formik.errors.lastName) !==
                  undefined
                }
                helperText={
                  formik.errors.lastName !== undefined
                    ? formik.errors.lastName
                    : ""
                }
              />
            </Grid>

            <Grid id="email" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Email"
                name="email"
                // value={values.email}
                style={{ width: "100%" }}
                type="email"
                updateState={updateState}
                setFieldValue={formik.setFieldValue}
                value={formik.values.email}
                error={
                  (formik.touched.email && formik.errors.email) !== undefined
                }
                helperText={
                  formik.errors.email !== undefined ? formik.errors.email : ""
                }
              />
            </Grid>

            <Grid id="password" style={{ marginTop: "15px" }} container>
              <TextInput
                label="Password"
                name="password"
                coPassword={values.passwordConfirmation}
                // value={values.password}
                style={{ width: "100%" }}
                type={visibility.password ? "text" : "password"}
                updateState={updateState}
                endAdornment={<PasswordEye name="password" />}
                setFieldValue={formik.setFieldValue}
                value={formik.values.password}
                error={
                  (formik.touched.password && formik.errors.password) !==
                  undefined
                }
                helperText={
                  formik.errors.password !== undefined
                    ? formik.errors.password
                    : ""
                }
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
                // value={values.passwordConfirmation}
                style={{ width: "100%" }}
                type={visibility.passwordConfirmation ? "text" : "password"}
                updateState={updateState}
                endAdornment={<PasswordEye name="passwordConfirmation" />}
                setFieldValue={formik.setFieldValue}
                value={formik.values.passwordConfirmation}
                error={
                  (formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation) !== undefined
                }
                helperText={
                  formik.errors.passwordConfirmation !== undefined
                    ? formik.errors.passwordConfirmation
                    : ""
                }
              />
            </Grid>
            <Grid id="signUp" style={{ marginTop: "15px" }} container>
              <CustomButton
                // onClick={signUp}
                label="Sign up"
                submit={true}
                style={{ width: "100%" }}
              />
            </Grid>
          </form>

          <Grid id="redirectLogin" container>
            <p style={{ color: PURPLE }}>
              Already registered?
              <b>
                <a href="/login">Sign in</a>
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
