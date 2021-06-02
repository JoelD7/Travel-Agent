import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, CardActionArea, Grid, makeStyles, Theme } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React from "react";
import { useHistory } from "react-router";
import { Colors, Shadow } from "../../../styles";
import { Routes } from "../../../utils";
import { CustomButton, IconText, Rating, Text } from "../../atoms";
import { NotCreatedMessage } from "../../molecules";

interface TripPOIs {
  showAll?: boolean;
  pois: RsvPOI[];
}
export const TripPOIs = React.memo(function TripPOIs({ showAll, pois }: TripPOIs) {
  const tripPoisStyles = makeStyles((theme: Theme) => ({
    categoryIcon: {
      backgroundColor: Colors.PURPLE,
      borderRadius: "50px",
      height: "26px",
      marginRight: "5px",
    },
    card: {
      borderRadius: "10px",
      margin: "10px 5px",
      boxShadow: Shadow.LIGHT3D,
      width: "25%",

      [theme.breakpoints.only("md")]: {
        width: "35%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "48%",
      },
      [theme.breakpoints.down(686)]: {
        width: "90%",
      },
    },
  }));

  const style = tripPoisStyles();

  const history = useHistory();

  function getPOIsToShow() {
    return showAll ? pois : pois.slice(0, 3);
  }

  return (
    <Grid container>
      {getPOIsToShow().length > 0 ? (
        getPOIsToShow().map((poi) => (
          <Card className={style.card}>
            <CardActionArea
              style={{ padding: "10px" }}
              onClick={() => history.push(`${Routes.THINGS_TODO}/${poi.id}`)}
            >
              <Text
                bold
                style={{
                  color: Colors.BLUE,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                component="h4"
              >
                {poi.name}
              </Text>

              {/* POI Rating */}
              <Rating score={poi.rating} type="circle" />

              <IconText
                style={{ marginTop: 15 }}
                icon={faMapMarkerAlt}
                text={poi.formattedAddress}
              />

              {/* Category icon and text */}
              <Grid container alignItems="center">
                <img
                  className={style.categoryIcon}
                  src={`${poi.categoryIconUrl}`}
                  alt=""
                />
                <Text style={{ fontSize: "14px", marginBottom: "0px" }}>
                  {poi.category}
                </Text>
              </Grid>

              <IconText icon={faCalendar}>
                {format(parseISO(poi.visitDate), "dd/MM/yyyy 'at' HH:mm")}
              </IconText>

              <div style={{ display: "flex" }}>
                <CustomButton
                  onClick={() => history.push(`${Routes.THINGS_TODO}/${poi.id}`)}
                  backgroundColor={Colors.PURPLE}
                  style={{
                    borderRadius: "10px",
                    fontSize: "16px",
                    marginLeft: "auto",
                  }}
                >
                  Check out
                </CustomButton>
              </div>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <NotCreatedMessage
          type="POI"
          message="You have no places of interest added to this trip."
        />
      )}
    </Grid>
  );
});
