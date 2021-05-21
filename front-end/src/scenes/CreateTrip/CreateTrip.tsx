import {
  faCalendar,
  faDollarSign,
  faFlag,
  faFont,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, Snackbar, useMediaQuery } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import { addDays } from "date-fns";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { Font } from "../../assets";
import {
  CountrySelector,
  CreateTripTF,
  CustomButton,
  DashDrawer,
  Footer,
  IconTP,
  ImageUploader,
  Navbar,
  Text,
  TripDates,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import { Routes } from "../../utils";
import { createTripStyles } from "./createTrip-styles";

export function CreateTrip() {
  const style = createTripStyles();
  const EMPTY_IMAGE = "/Travel-Agent/gallery.png";

  const [name, setName] = useState("");
  const [image, setImage] = useState<File>(new File([""], ""));
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [countries, setCountries] = useState<string[]>([]);

  const [budget, setBudget] = useState<string>("");

  const is1255OrLess = useMediaQuery("(max-width:1255px)");
  const is720OrLess = useMediaQuery("(max-width:720px)");
  const [openSnack, setOpenSnack] = useState(false);

  function updateDates(startDate: Date, endDate: Date) {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  function onBudgetChange(value: string) {
    setBudget(value);
  }

  async function onCreateTripClick() {
    // console.log("image stream: ", image.stream());
    let blob = new Blob([new Uint8Array(await image.arrayBuffer())], {
      type: image.type,
    });

    Axios.post(
      `${Routes.BACKEND_ROOT}/trip/create`,
      {
        idPerson: 2,
        name,
        countries: countries.join(", "),
        budget: Number(budget),
        startDate,
        endDate,
      },
      { withCredentials: true }
    )
      .then((res) => {
        console.log("Response: ", res);

        const formData = new FormData();
        formData.append("idTrip", res.data.idTrip);
        formData.append("image", image);

        Axios.post(`${Routes.BACKEND_ROOT}/trip/create/coverPhoto`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            setOpenSnack(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function getNameTFWidth() {
    return is1255OrLess ? "83%" : "62%";
  }

  function onAlbumCoverChange(images: File[]) {
    setImage(images[0]);
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Create a trip</title>
      </Helmet>

      <Navbar className={style.navbar} dashboard position="sticky" />
      <DashDrawer />

      {/* Page container */}
      <Grid container className={style.pageContainer}>
        {/* Create trip */}
        <Grid item xs={12} style={{ marginBottom: 25 }}>
          <Text component="h1" color={Colors.BLUE}>
            Create trip
          </Text>
        </Grid>

        {/* Params container */}
        <Grid item xs={12}>
          <Grid container className={style.paramsContainer}>
            {/* Left Pane */}
            <Grid item className={style.leftPane}>
              {/* Trip name */}
              <Text component="h4" color={Colors.BLUE}>
                Name your trip
              </Text>
              <CreateTripTF
                style={{ width: getNameTFWidth() }}
                value={name}
                updateState={(value) => setName(value)}
                icon={faFont}
                placeholder="Trip name"
              />

              {/* Image upload */}
              <div style={{ marginTop: 45 }}>
                <Grid container alignItems="center" style={{ width: 385 }}>
                  <Text component="h4" color={Colors.BLUE}>
                    Add a cover
                  </Text>

                  <IconTP style={{ marginLeft: 10 }} icon={faImage} />
                </Grid>

                <ImageUploader
                  images={[image]}
                  updateState={(images) => onAlbumCoverChange(images)}
                />
              </div>
            </Grid>

            {/* Right Pane */}
            <Grid item className={style.rightPane}>
              <Grid container style={{ height: "100%" }}>
                {/* Dates */}
                <Grid item xs={12}>
                  <Grid container>
                    <Text component="h4" color={Colors.BLUE}>
                      Dates
                    </Text>
                    <IconTP style={{ marginLeft: 10 }} icon={faCalendar} />
                  </Grid>

                  {/* Pickers container */}
                  <TripDates
                    startDate={startDate}
                    endDate={endDate}
                    updateDates={updateDates}
                  />
                </Grid>

                {/* Country selector */}
                <Grid item xs={12} style={is720OrLess ? { marginTop: 30 } : {}}>
                  <Grid container>
                    <Text component="h4" color={Colors.BLUE}>
                      Countries
                    </Text>
                    <IconTP style={{ marginLeft: 10 }} icon={faFlag} />
                  </Grid>

                  <CountrySelector
                    selectedCountries={countries}
                    updateState={(values) => {
                      setCountries(values);
                    }}
                  />
                </Grid>

                {/* Budget */}
                <Grid item xs={12} style={is720OrLess ? { marginTop: 30 } : {}}>
                  <Grid container>
                    <Text component="h4" color={Colors.BLUE}>
                      Budget
                    </Text>
                  </Grid>

                  <CreateTripTF
                    value={String(budget)}
                    updateState={(value) => onBudgetChange(value)}
                    placeholder="Enter a budget"
                    icon={faDollarSign}
                    numeric
                  />
                </Grid>

                {/* Save button */}
                <Grid
                  item
                  xs={12}
                  style={is720OrLess ? { marginTop: 30 } : { marginTop: "auto" }}
                >
                  <CustomButton
                    onClick={() => onCreateTripClick()}
                    style={{ boxShadow: Shadow.LIGHT3D }}
                    backgroundColor={Colors.GREEN}
                  >
                    Create trip
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={style.footerContainer}>
        <Footer />
      </div>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnack(false)}
          severity="success"
        >
          Trip created.
        </Alert>
      </Snackbar>
    </div>
  );
}
