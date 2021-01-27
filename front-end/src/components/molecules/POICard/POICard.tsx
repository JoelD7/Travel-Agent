import { CardActionArea, Card, Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { thingsToDoStyles } from "../../../scenes/ThingsToDo/thingsToDo-styles";
import { CustomButton, IconText, Text } from "../../atoms";
import Rating from "react-rating";
import { Routes } from "../../../utils";
import { Colors } from "../../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";

interface POICard {
  poi: POISearch;
}

export function POICard({ poi }: POICard) {
  const style = thingsToDoStyles();
  const history = useHistory();

  return (
    <Card className={style.poiCard}>
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
        {poi.rating && (
          <Rating
            className={style.rating}
            initialRating={poi.rating}
            readonly
            emptySymbol={
              <FontAwesomeIcon
                style={{ margin: "0px 1px" }}
                icon={faCircleReg}
                color={Colors.PURPLE}
              />
            }
            fullSymbol={
              <FontAwesomeIcon
                style={{ margin: "0px 1px" }}
                icon={faCircle}
                color={Colors.PURPLE}
              />
            }
          />
        )}

        <IconText
          icon={faMapMarkerAlt}
          text={
            poi.location.address
              ? poi.location.address
              : poi.location.formattedAddress?.join(", ")
          }
        />

        {/* Category icon and text */}
        <Grid container alignItems="center">
          <img
            className={style.categoryIcon}
            src={`${poi.categories[0].icon.prefix}32${poi.categories[0].icon.suffix}`}
            alt=""
          />
          <Text style={{ fontSize: "14px", marginBottom: "0px" }}>
            {poi.categories[0].name}
          </Text>
        </Grid>

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
  );
}
