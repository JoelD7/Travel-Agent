import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Font } from "../../assets";
import { Colors } from "../../styles";
import { CustomButton } from "../atoms";
import { RestaurantFilters } from "../organisms";
interface RestaurantFilterDrawer {
  openDrawer: boolean;
}

export function RestaurantFilterDrawer() {
  const drawerStyles = makeStyles(() => ({
    drawer: {
      width: "250px",
      backgroundColor: "transparent",
      fontFamily: Font.Family,
      padding: "10px",
      "&.MuiPaper-elevation16": {
        boxShadow: "2px 2px 3px rgba(0,0,0,0)",
      },
    },
  }));

  const style = drawerStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <CustomButton
        icon={faFilter}
        backgroundColor={Colors.PURPLE}
        style={{ paddingLeft: "10px", fontSize: "14px" }}
        onClick={() => setOpenDrawer(true)}
      >
        Filters
      </CustomButton>

      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        classes={{ root: style.drawer, paper: style.drawer }}
      >
        <RestaurantFilters />
        {/* <RestaurantFilters setLoading={(value) => setLoading(value)} /> */}
      </Drawer>
    </div>
  );
}
