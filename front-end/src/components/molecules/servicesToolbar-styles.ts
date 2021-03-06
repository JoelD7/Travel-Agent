import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const servicesToolbarStyles = makeStyles((theme: Theme) => ({
  menuItemRoot: {
    fontSize: 15,
    fontFamily: Family,
    fontWeight: "bold",
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    color: Colors.BLUE,
    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `2px solid ${Colors.BLUE}`,

        "&:hover": {
          backgroundColor: "rgba(0,0,0,0)",
        },
      },
    },
  },
  menuItemRootTransparent: {
    fontFamily: Family,
    fontSize: 15,
    fontWeight: "bold",
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    color: "white",
    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `2px solid white`,
      },
    },
  },
  servicesToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    width: 570,
    boxShadow: Shadow.LIGHT,
    margin: "20px auto",
    borderRadius: "50px",
    justifyContent: "center",
    backgroundColor: "white",

    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
  servicesToolbarTransparent: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    width: "650px",
    margin: "20px auto auto auto",
    justifyContent: "center",

    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
}));
