import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const servicesToolbarStyles = makeStyles((theme: Theme) => ({
  menuItemRoot: {
    fontFamily: Family,
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
  menuItemRootHome: {
    fontFamily: Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    color: "white",
    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `2px solid ${Colors.BLUE}`,

        "&:hover": {
          backgroundColor: "red",
        },
      },
    },
  },
  servicesToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    boxShadow: Shadow.LIGHT,
    margin: '20px auto',
    borderRadius: '50px',
    width: '38%',
    justifyContent: "center",
    backgroundColor: 'white',

    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
  servicesToolbarHome: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    marginTop: "20px",
    justifyContent: "center",

    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
}));