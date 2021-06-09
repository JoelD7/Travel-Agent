import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const tripStyles = makeStyles((theme: Theme) => ({
  appbarColor: {
    backgroundColor: Colors.GREEN,
  },
  appColorSecondary: {
    backgroundColor: "white",
    color: "white",
  },
  countryListGrid: {
    width: "100%",
    [theme.breakpoints.down(430)]: {
      display: "none",
    },
  },
  detailsContainer: {
    borderRadius: "10px",
    border: "1px solid #CECECE",
    padding: "10px",
  },
  footerContainer: {
    position: "relative",
    zIndex: 3,
    width: "90%",
    marginLeft: "auto",
    marginTop: "250px",

    [theme.breakpoints.down(1000)]: {
      width: "100%",
    },
  },

  itineraryButton: {
    fontSize: "16px",
    alignSelf: "flex-start",
    marginLeft: "auto",
    [theme.breakpoints.down(706)]: {
      display: "none",
    },
  },
  itineraryIconButton: {
    padding: "10px",
    marginLeft: "auto",
    backgroundColor: Colors.BLUE,
    "&:hover": {
      backgroundColor: Colors.BLUE_HOVER,
    },
    [theme.breakpoints.up(706)]: {
      display: "none",
    },
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  menuItemChild: {
    fontFamily: Font.Family,
    borderBottom: `3px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
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
  menuItemRoot: {
    fontFamily: Font.Family,
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
  navbar: {
    width: "calc(100% - 251px)",
    marginLeft: "auto",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
  pageContentGrid: {
    marginLeft: "265px",
    marginBottom: "100px",
    width: "calc(100% - 300px)",
    [theme.breakpoints.down(960)]: {
      margin: "auto",
      width: "90%",
    },
  },
  detailsGrid: {
    padding: "20px",
    width: "25%",
    [theme.breakpoints.down(1036)]: {
      width: "30%",
    },
    [theme.breakpoints.down(973)]: {
      width: "100%",
    },
  },
  photosGrid: {
    marginTop: "20px",
    width: "75%",
    [theme.breakpoints.down(1036)]: {
      width: "70%",
    },
    [theme.breakpoints.down(973)]: {
      width: "100%",
    },
  },
  photosPlacesDaysContainer: {
    width: "105px",
    marginBottom: 15,
  },
  photoTitleContainer: {
    padding: "10px",
    borderRadius: "5px",
    color: "white",
    height: "345px",
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  tabSlide: {
    width: "100%",
  },
  toolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    boxShadow: Shadow.LIGHT,
    margin: "20px 0px",
    borderRadius: "5px",
    justifyContent: "space-evenly",
    width: "750px",
    backgroundColor: Colors.GREEN,

    [theme.breakpoints.down(1116)]: {
      width: "94%",
    },
  },
  tripCard: {
    width: "95%",
    boxShadow: Shadow.LIGHT3D,
  },
  tripCardGrid: {
    marginTop: "20px",
  },
  tripCardContainerSlider: {
    width: "25%",
  },
  tripCardContainer: {
    width: "25%",
    [theme.breakpoints.down(1380)]: {
      width: "40%",
      margin: "10px 0px",
    },
    [theme.breakpoints.down(813)]: {
      width: "70%",
      margin: "10px 0px",
    },
    [theme.breakpoints.down(508)]: {
      width: "90%",
      margin: "10px 0px",
    },
  },
}));
