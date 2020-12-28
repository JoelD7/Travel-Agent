import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CircleScore, DashDrawer, IconText, Navbar, Text } from "../../components";
import { favPlacesStyles } from "./favPlaces-styles";
import { POICategory, poisPlaceholder } from "../../utils";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../styles";

interface POICategoryGroup {
  name: string;
  pluralName: string;
  places: POISearch[];
}

export function FavPlaces() {
  const styles = favPlacesStyles();

  const pois: POISearch[] = poisPlaceholder;
  let poiCategories = POICategory.POICategories;

  const [categoryGroups, setCategoryGroups] = useState<POICategoryGroup[]>();

  let categoryGroupsMap: { [index: string]: POICategoryGroup } = {};
  let categoryGroupsTemp: POICategoryGroup[] = [];

  useEffect(() => {
    groupPOIByCategory();
  }, []);

  function groupPOIByCategory() {
    //Create categories groups
    poiCategories.forEach((category) => {
      categoryGroupsMap = {
        ...categoryGroupsMap,
        [category.name]: {
          name: category.name,
          pluralName: category.pluralName,
          places: [],
        },
      };
    });

    //Group pois by category
    pois.forEach((poi) => {
      let curGroup = categoryGroupsMap[poi.categories[0].name];
      categoryGroupsMap = {
        ...categoryGroupsMap,
        [poi.categories[0].name]: {
          ...curGroup,
          places: [...curGroup.places, poi],
        },
      };
    });

    //Add groups to the array on which to iterate over
    //in order to render the JSX elements(cards).
    for (const category in categoryGroupsMap) {
      if (Object.prototype.hasOwnProperty.call(categoryGroupsMap, category)) {
        const group = categoryGroupsMap[category];
        categoryGroupsTemp.push(group);
      }
    }
    setCategoryGroups(categoryGroupsTemp);
  }

  return (
    <div className={styles.mainContainer}>
      <Navbar position="sticky" />
      <DashDrawer />

      <Grid container className={styles.mainGrid}>
        <Grid item xs={12}>
          <Text component="h1">Your favorite spots</Text>
          {categoryGroups && (
            <div>
              {categoryGroups
                .filter((group) => group.places.length > 0)
                .map((group, i) => (
                  <Grid container style={{ marginTop: "20px" }}>
                    <Grid item xs={12}>
                      <Text weight={500} component="h2">
                        {group.pluralName}
                      </Text>
                    </Grid>

                    {group.places.map((place: POISearch, i) => (
                      <Card key={i} className={styles.favCard}>
                        <CardActionArea>
                          <CardMedia component="img" height="150" src={place.photo} />
                          <CardContent>
                            <Text
                              weight={700}
                              style={{ color: Colors.BLUE }}
                              component="h4"
                            >
                              {place.name}
                            </Text>

                            <CircleScore
                              style={{ margin: "5px 0px 20px" }}
                              score={place.rating as number}
                            />

                            <IconText
                              icon={faMapMarkerAlt}
                              text={
                                place.location.formattedAddress
                                  ? place.location.formattedAddress.join(", ")
                                  : "No address"
                              }
                            />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Grid>
                ))}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
