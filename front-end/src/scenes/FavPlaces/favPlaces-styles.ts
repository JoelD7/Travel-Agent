import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const favPlacesStyles = makeStyles((theme: Theme) => ({
  cardText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  },
  favCard: {
    borderRadius: "10px",
    margin: "10px 5px",
    boxShadow: Shadow.LIGHT3D,
  },
  footerContainer: {
    position: "relative",
    zIndex: 3,
    marginTop: "250px",
    width: "90%",
    marginLeft: "auto",

    [theme.breakpoints.down(1000)]: {
      width: "100%",
    },
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  mainGrid: {
    marginLeft: "290px",
    width: "calc(100% - 330px)",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      margin: "auto",
    },
  },
  menuItemSelect: {
    borderBottom: `3px solid rgba(0,0,0,0)`,
    margin: "0px 5px",

    "&.MuiMenuItem-root": {
      fontFamily: Font.Family,
    },

    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `3px solid ${Colors.GREEN}`,
      },
    },
    "&.MuiListItem-button": {
      "&:hover": {
        borderBottom: `3px solid ${Colors.GREEN}`,
      },
    },
  },
  navbar: {
    width: "calc(100% - 251px)",
    marginLeft: "auto",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  select: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
      borderRadius: "10px",
      margin: "0px 5px",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },

    "& .MuiSelect-selectMenu": {
      fontFamily: Font.Family,
    },
  },
  selectIcon: {
    color: Colors.BLUE,
  },
  sortFormControl: {
    margin: "auto 10px auto 15px",
    borderRadius: "5px",
    width: "270px",
    boxShadow: "2px 2px 6px rgb(116 116 116 / 50%)",

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `#cecece !important`,
      },
      "&.Mui-focused fieldset": {
        borderColor: `#cecece !important`,
      },
    },
  },
}));
