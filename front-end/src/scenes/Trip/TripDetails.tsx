import {
  faCalendar,
  faChevronLeft,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardActionArea, Divider, Grid, IconButton } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import {
  CustomButton,
  DashDrawer,
  IconText,
  Navbar,
  PhotoAlbumCard,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import { tripPlaceholder } from "../../utils";
import { tripStyles } from "./trip-styles";

export function TripDetails() {
  const style = tripStyles();
  const trip = tripPlaceholder;

  return (
    <div className={style.mainContainer}>
      <Navbar position="sticky" />

      <DashDrawer />

      <Grid container className={style.pageContentGrid}>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <CustomButton icon={faChevronLeft} rounded label="All trips" />
        </Grid>

        <Grid key="photoTitle" item xs={12}>
          <div className={style.photoTitleContainer}>
            <Grid container alignItems="baseline">
              <Text component="h1" style={{ margin: "20px 10px 0px 0px" }}>
                {trip.name}
              </Text>
              <Text component="h4" style={{ marginTop: "20px", fontWeight: "normal" }}>
                {trip.countries.join(", ")}
              </Text>

              <CustomButton
                style={{ fontSize: "16px", alignSelf: "flex-start", marginLeft: "auto" }}
                icon={faCalendar}
                label="Itinerary"
              />
            </Grid>

            <div style={{ marginTop: "auto" }}>
              <Grid container className={style.lastTripDataContainer}>
                <Grid item xs={1}>
                  <Text
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Photos
                  </Text>
                  <Text component="h4" style={{ textAlign: "center" }}>
                    {trip.photos}
                  </Text>
                </Grid>
                <Grid item xs={1}>
                  <Text
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Places
                  </Text>
                  <Text component="h4" style={{ textAlign: "center" }}>
                    {trip.photos}
                  </Text>
                </Grid>
                <Grid item xs={1}>
                  <Text
                    component="h3"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Days
                  </Text>
                  <Text component="h4" style={{ textAlign: "center" }}>
                    {trip.days}
                  </Text>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>

        <Grid key="photos" item xs={9} className={style.photosGrid}>
          <Grid container>
            <Text weight="normal" component="h2">
              Photos
            </Text>
            <CustomButton
              icon={faPlusCircle}
              iconColor="#7e7e7e"
              label="Upload photo"
              backgroundColor="rgba(0,0,0,0)"
              textColor="#7e7e7e"
            />
          </Grid>

          <Grid container>
            <PhotoAlbumCard
              albumRoute=""
              name="Ballon day!"
              cover="/Travel-Agent/globes.jpg"
              photosQant={23}
            />
            <PhotoAlbumCard
              albumRoute=""
              name="Villages"
              cover="/Travel-Agent/country.jpg"
              photosQant={53}
            />
          </Grid>
        </Grid>

        <Grid key="details" item xs={3} className={style.detailsGrid}>
          <div className={style.detailsContainer}>
            <Text style={{color: `${Colors.BLUE}`}} component="h3">Key details</Text>
            <Divider style={{marginBottom: '10px'}} variant="fullWidth" />

            <Text component="h4">Countries</Text>
            <Text component="p">{trip.countries.join(", ")}</Text>

            <Text component="h4">From</Text>
            <Text component="p">{format(trip.startDate, "MMM. dd, yyyy")}</Text>

            <Text component="h4">To</Text>
            <Text component="p">{format(trip.endDate, "MMM. dd, yyyy")}</Text>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
