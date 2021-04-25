import {
  faCalendar,
  faDollarSign,
  faFlag,
  faFont,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { addDays } from "date-fns";
import React, { useState } from "react";
import Helmet from "react-helmet";
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
import { Trip } from "../../utils";
import { createTripStyles } from "./createTrip-styles";

export function CreateTrip() {
  const style = createTripStyles();
  const EMPTY_IMAGE = "/Travel-Agent/gallery.png";

  const [name, setName] = useState("");
  const [image, setImage] = useState(EMPTY_IMAGE);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [countries, setCountries] = useState<string[]>([]);

  const [budget, setBudget] = useState<number>(0);

  const [trip, setTrip] = useState<Trip | undefined>();

  const is1255OrLess = useMediaQuery("(max-width:1255px)");
  const is720OrLess = useMediaQuery("(max-width:720px)");

  function updateDates(startDate: Date, endDate: Date) {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  function onBudgetChange(value: string) {
    setBudget(Number(value));
  }

  function onCreateTripClick() {
    console.log(image);
  }

  function getNameTFWidth() {
    return is1255OrLess ? "83%" : "62%";
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Create a trip</title>
      </Helmet>

      <Navbar position="sticky" />
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
              <Text component="h3" color={Colors.BLUE}>
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
                  <Text component="h3" color={Colors.BLUE}>
                    Add a cover
                  </Text>

                  <IconTP style={{ marginLeft: 10 }} icon={faImage} />
                </Grid>

                <ImageUploader image={image} updateState={(value) => setImage(value)} />
              </div>
            </Grid>

            {/* Right Pane */}
            <Grid item className={style.rightPane}>
              <Grid container style={{ height: "100%" }}>
                {/* Dates */}
                <Grid item xs={12}>
                  <Grid container>
                    <Text component="h3" color={Colors.BLUE}>
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
                    <Text component="h3" color={Colors.BLUE}>
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
                    <Text component="h3" color={Colors.BLUE}>
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
    </div>
  );
}
