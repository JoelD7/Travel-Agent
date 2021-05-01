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
  pageContentGrid: {
    marginLeft: "265px",
    width: "calc(100% - 300px)",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "85%",
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

  photoTitleContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Travel-Agent/journey.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
    padding: "10px",
    minWidth: "450px",
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
    width: "59%",
    backgroundColor: Colors.GREEN,
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
