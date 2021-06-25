import { Grid, ThemeProvider, createMuiTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  DashDrawer,
  IataAutocomplete,
  Navbar,
  PasswordEye,
  ProfilePicture,
  ProgressCircle,
  Text,
  TextInput,
} from "../../components";
import { Colors } from "../../styles";
import {
  IATALocation,
  selectOriginCity,
  LocationType,
  Person,
  selectPerson,
  setPerson,
  backend,
  setUserTripsFromPerson,
  ProfileCredentials,
  ExceptionMessage,
} from "../../utils";
import { profileStyles } from "./profile-styles";

interface ProfileProps {}

interface VisibilityProps {
  [index: string]: boolean;
}

export function Profile({}: ProfileProps) {
  const theme = createMuiTheme({
    overrides: {
      MuiInputBase: {
        input: {
          fontSize: 16,
        },
      },
    },
  });
  const style = profileStyles();

  const person: Person | undefined = useSelector(selectPerson);

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState<VisibilityProps>({
    curPassword: false,
    newPassword: false,
    nePasswordConfirmation: false,
  });
  const [credentials, setCredentials] = useState<ProfileCredentials>({
    uuid: person ? person.uuid : "",
    firstName: person ? person.firstName : "",
    lastName: person ? person.lastName : "",
    email: person ? person.email : "",
    origin: "",
    profilePic: person ? person.profilePic : "",
    curPassword: null,
    newPassword: null,
    newPasswordConfirmation: "",
  });
  const [changePassword, setChangePassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [wrongPasswordText, setWrongPasswordText] = useState<string>("");

  useEffect(() => {
    if (person) {
      setLoading(false);

      setCredentials({
        uuid: person.uuid,
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        origin: "",
        profilePic: person.profilePic,
        curPassword: null,
        newPassword: null,
        newPasswordConfirmation: "",
      });
    }
  }, [person]);

  function onChangePasswordClicked() {
    setChangePassword(true);
  }

  function onSaveChangesClicked() {
    if (person) {
      setLoadingButton(true);

      backend
        .put(`/person/${person.uuid}`, credentials)
        .then((res) => {
          let editedPerson = res.data;

          setLoadingButton(false);
          dispatch(setPerson(editedPerson));
          setUserTripsFromPerson(editedPerson);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data.message === ExceptionMessage.INVALID_PASSWORD
          ) {
            setWrongPassword(true);
            setLoadingButton(false);
            setWrongPasswordText(error.response.data.message);
          }
        });
    }
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Navbar className={style.navbar} variant="dashboard" position="sticky" />
      <DashDrawer />

      {/* Content */}
      <Grid container className={style.pageContentContainer}>
        {loading && (
          <Grid container className={style.progressContainer}>
            <ProgressCircle />
          </Grid>
        )}

        {person && (
          <>
            {/* Profile */}
            <Grid item xs={12}>
              <Text component="h1" color={Colors.BLUE}>
                Profile
              </Text>
            </Grid>

            {/* Picture */}
            <Grid item xs={12}>
              <Grid container justify="center">
                <ProfilePicture
                  credentials={credentials}
                  updateCredentials={(updatedCredentials) =>
                    setCredentials({ ...credentials, ...updatedCredentials })
                  }
                  updateProfilePic={(url) =>
                    setCredentials({ ...credentials, profilePic: url })
                  }
                />
              </Grid>
            </Grid>

            {/* First and lastname */}
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Grid container>
                <Grid item className={style.firstNameGrid}>
                  <TextInput
                    name="firstName"
                    label="First Name"
                    value={credentials.firstName}
                    updateState={(name, value) =>
                      setCredentials({ ...credentials, [name]: value })
                    }
                  />
                </Grid>

                <Grid item style={{}} className={style.lastNameGrid}>
                  <TextInput
                    name="lastName"
                    label="Last Name"
                    value={credentials.lastName}
                    updateState={(name, value) =>
                      setCredentials({ ...credentials, [name]: value })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Email */}
            <Grid style={{ marginTop: 10 }} item xs={12}>
              <TextInput
                name="email"
                label="Email"
                value={credentials.email}
                type="email"
                updateState={(name, value) =>
                  setCredentials({ ...credentials, [name]: value })
                }
              />
            </Grid>

            {/* Origin */}
            <ThemeProvider theme={theme}>
              <Grid style={{ marginTop: 15 }} item xs={12}>
                <IataAutocomplete
                  type="city"
                  label="Origin city"
                  cityType={LocationType.ORIGIN}
                  required
                />
              </Grid>
            </ThemeProvider>

            {changePassword && (
              <>
                {/* Current password */}
                <Grid style={{ marginTop: 10 }} item xs={12}>
                  <TextInput
                    name="curPassword"
                    label="Current Password"
                    error={wrongPassword}
                    helperText={wrongPasswordText}
                    value={
                      credentials.curPassword === null
                        ? ""
                        : (credentials.curPassword as unknown as string)
                    }
                    type={visibility.curPassword ? "text" : "password"}
                    endAdornment={
                      <PasswordEye
                        visible={visibility.curPassword}
                        onClick={() =>
                          setVisibility({
                            ...visibility,
                            curPassword: !visibility.curPassword,
                          })
                        }
                      />
                    }
                    updateState={(name, value) =>
                      setCredentials({ ...credentials, [name]: value })
                    }
                  />
                </Grid>

                {/* New password */}
                <Grid style={{ marginTop: 10 }} item xs={12}>
                  <TextInput
                    name="newPassword"
                    label="New Password"
                    coPassword={credentials.newPasswordConfirmation}
                    value={
                      credentials.newPassword === null
                        ? ""
                        : (credentials.newPassword as unknown as string)
                    }
                    type={visibility.newPassword ? "text" : "password"}
                    endAdornment={
                      <PasswordEye
                        visible={visibility.newPassword}
                        onClick={() =>
                          setVisibility({
                            ...visibility,
                            newPassword: !visibility.newPassword,
                          })
                        }
                      />
                    }
                    updateState={(name, value) =>
                      setCredentials({ ...credentials, [name]: value })
                    }
                  />
                </Grid>

                {/* Confirm password */}
                <Grid style={{ marginTop: 10 }} item xs={12}>
                  <TextInput
                    name="newPasswordConfirmation"
                    label="Confirm New Password"
                    coPassword={
                      credentials.newPassword === null
                        ? ""
                        : (credentials.newPassword as unknown as string)
                    }
                    value={credentials.newPasswordConfirmation}
                    type={visibility.newPasswordConfirmation ? "text" : "password"}
                    endAdornment={
                      <PasswordEye
                        visible={visibility.newPasswordConfirmation}
                        onClick={() =>
                          setVisibility({
                            ...visibility,
                            newPasswordConfirmation: !visibility.newPasswordConfirmation,
                          })
                        }
                      />
                    }
                    updateState={(name, value) =>
                      setCredentials({ ...credentials, [name]: value })
                    }
                  />
                </Grid>
              </>
            )}

            {/* Buttons  */}
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Grid container justify="flex-end">
                <CustomButton
                  onClick={() => onChangePasswordClicked()}
                  backgroundColor={Colors.PURPLE}
                >
                  Change password
                </CustomButton>

                <CustomButton
                  style={{ marginLeft: 10 }}
                  onClick={() => onSaveChangesClicked()}
                  loading={loadingButton}
                  backgroundColor={Colors.GREEN}
                >
                  Save changes
                </CustomButton>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
