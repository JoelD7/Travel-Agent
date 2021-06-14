import { Grid, ThemeProvider, createMuiTheme } from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import {
  CustomButton,
  DashDrawer,
  IataAutocomplete,
  Navbar,
  PasswordEye,
  ProfilePicture,
  Text,
  TextInput,
} from "../../components";
import { Colors } from "../../styles";
import { IATALocation, selectOriginCity, LocationType } from "../../utils";
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

  const originCity: IATALocation = useSelector(selectOriginCity);

  const [visibility, setVisibility] = useState<VisibilityProps>({
    password: false,
    passwordConfirmation: false,
  });

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    origin: originCity,
    profilePic: "",
    password: "",
    passwordConfirmation: "",
  });
  const [changePassword, setChangePassword] = useState(false);

  function onChangePasswordClicked() {
    setChangePassword(true);
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
              updateProfilePic={(url) =>
                setCredentials({ ...credentials, profilePic: url })
              }
            />
          </Grid>
        </Grid>

        {/* First and lastname */}
        <Grid item xs={12} style={{ marginTop: 30 }}>
          <Grid container>
            <Grid item className={style.nameGrid}>
              <TextInput
                name="firstName"
                label="First Name"
                value={credentials.firstName}
                updateState={(name, value) =>
                  setCredentials({ ...credentials, [name]: value })
                }
              />
            </Grid>

            <Grid item style={{ marginLeft: 15 }} className={style.nameGrid}>
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
            <IataAutocomplete type="city" cityType={LocationType.ORIGIN} required />
          </Grid>
        </ThemeProvider>

        {changePassword && (
          <>
            {/* Current password */}
            <Grid style={{ marginTop: 10 }} item xs={12}>
              <TextInput
                name="password"
                label="Current Password"
                value={credentials.password}
                type={visibility.password ? "text" : "password"}
                endAdornment={
                  <PasswordEye
                    visible={visibility.password}
                    onClick={() =>
                      setVisibility({ ...visibility, password: !visibility.password })
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
                name="passwordConfirmation"
                label="Confirm Password"
                value={credentials.passwordConfirmation}
                type={visibility.passwordConfirmation ? "text" : "password"}
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

            <CustomButton style={{ marginLeft: 10 }} backgroundColor={Colors.GREEN}>
              Save changes
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
