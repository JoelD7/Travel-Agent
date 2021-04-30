import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Grid, Card, CardActionArea, makeStyles, Theme } from "@material-ui/core";
import { format } from "date-fns";
import { useHistory } from "react-router";
import { Colors, Shadow } from "../../../styles";
import { Routes, rsvPoisPlaceholder } from "../../../utils";
import { CustomButton, IconText, Rating, Text } from "../../atoms";
import React from "react";

interface TripPOIs {
  showAll?: boolean;
}
export function TripPOIs({ showAll }: TripPOIs) {
  const tripPoisStyles = makeStyles((theme: Theme) => ({
    categoryIcon: {
      backgroundColor: Colors.PURPLE,
      borderRadius: "50px",
      height: "26px",
      marginRight: "5px",
    },
    card: {
      borderRadius: "10px",
      margin: "10px auto",
      boxShadow: Shadow.LIGHT3D,
      width: "25%",
    },
  }));

  const pois: RsvPOI[] = rsvPoisPlaceholder;

  const style = tripPoisStyles();

  const history = useHistory();

  function getPOIsToShow() {
    return showAll ? pois : pois.slice(0, 3);
  }

  return (
    <Grid container>
      {getPOIsToShow().map((poi) => (
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
              <img className={style.categoryIcon} src={`${poi.categoryIconUrl}`} alt="" />
              <Text style={{ fontSize: "14px", marginBottom: "0px" }}>
                {poi.category}
              </Text>
            </Grid>

            <IconText icon={faCalendar}>
              {format(poi.visitDate, "dd/MM/yyyy 'at' HH:mm")}
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
      ))}
    </Grid>
  );
}
