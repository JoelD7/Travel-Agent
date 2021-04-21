import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const flightListStyles = makeStyles((theme: Theme) => ({
  autocompelteListbox: {
    fontFamily: Font.Family,
  },
  backgroundImage: {
    objectFit: "cover",
    position: "absolute",
    height: "55vh",
    width: "100%",
  },
  classParamGrid: {
    width: "25%",
    [theme.breakpoints.down(1245)]: {
      width: "33%",
    },
    [theme.breakpoints.down(1083)]: {
      width: "50%",
    },
    [theme.breakpoints.down(640)]: {
      width: "100%",
    },
  },
  autocompleteOption: {
    color: Colors.BLUE,
    fontWeight: "bold",
  },
  mainContainer: {
    fontFamily: Family,
    backgroundColor: Colors.BACKGROUND,
  },
  datepicker: {
    fontFamily: Family,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "5px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },

    "& .MuiInputBase-input": {
      padding: "5px 0px 5px 10px",
    },
    "& .MuiInputBase-root": {
      height: "32px",
      borderRadius: "5px",
      backgroundColor: "white",
    },
    "& .MuiInput-underline::after": {
      borderBottom: `2px solid ${Colors.GREEN_HOVER}`,
    },
  },
  datepickerGrid: {
    width: "25%",
    [theme.breakpoints.down(1262)]: {
      width: "30%",
    },
    [theme.breakpoints.down(1083)]: {
      width: "50%",
    },
    [theme.breakpoints.down(640)]: {
      width: "100%",
    },
  },
  datepickerGridFull: {
    width: "25%",
    [theme.breakpoints.down(1262)]: {
      width: "30%",
    },
    [theme.breakpoints.down(1083)]: {
      width: "50%",
    },
    [theme.breakpoints.down(640)]: {
      width: "100%",
    },
  },
  destinationTF: {
    width: "100%",
    "&.MuiInputBase-root": {
      height: "30px",
    },
  },
  drawer: {
    width: "250px",
    backgroundColor: "white",
    fontFamily: Font.Family,
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    marginLeft: "7px",
  },
  filtersContainer: {
    backgroundColor: "white",
    boxShadow: Shadow.MEDIUM3D,
    borderRadius: "5px",
    padding: "15px",
  },
  filtersGrid: {
    width: "25%",

    [theme.breakpoints.down(1215)]: {
      width: "30%",
    },
    [theme.breakpoints.down(1040)]: {
      display: "none",
    },
  },
  flightsGrid: {
    paddingLeft: "20px",
    width: "70%",

    [theme.breakpoints.down(1040)]: {
      margin: "auto",
      width: "90%",
    },

    [theme.breakpoints.down(736)]: {
      width: "100%",
    },

    [theme.breakpoints.down(500)]: {
      paddingLeft: "0px",
    },
  },
  filterButtonGrid: {
    display: "none",
    paddingLeft: "20px",
    marginBottom: "20px",
    [theme.breakpoints.down(1040)]: {
      display: "block",
      width: "50%",
    },
  },
  menuItemRoot: {
    fontFamily: Font.Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    fontSize: "16px",
    color: "white",

    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `2px solid ${Colors.GREEN}`,
      },
    },
    "&.MuiListItem-button": {
      "&:hover": {
        borderBottom: `2px solid ${Colors.GREEN}`,
      },
    },
  },
  notAvailableCardGrid: {
    height: "auto",
  },
  pagination: {
    margin: "20px 0px 40px 0px",
  },
  pageContentContainer: {
    width: "85%",
    margin: "auto",
    marginBottom: "60px",
    position: "relative",
    bottom: "10px",
    [theme.breakpoints.down(1318)]: {
      width: "95%",
    },
  },
  progressCircleGridLoading: {
    display: "flex",
    position: "absolute",
    top: "100px",
    left: "26%",
    [theme.breakpoints.down(1215)]: {
      left: "30%",
    },
    [theme.breakpoints.down(1040)]: {
      left: "12%",
      top: "160px",
    },
    [theme.breakpoints.down(783)]: {
      left: "9%",
    },
    [theme.breakpoints.down(630)]: {
      top: "200px",
    },
    [theme.breakpoints.down(736)]: {
      left: "0%",
    },
  },
  progressCircleGrid: {
    display: "flex",
  },
  pageContentContainerGrid: {},
  resevationParamsContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
    width: "85%",
    margin: "20px auto auto auto",
    position: "relative",
  },
  pageTitleContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
    width: "85%",
  },
  pageTitleContainerPic: {
    marginBottom: "35px",

    "&::before": {
      content: '""',
      background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
      width: "100%",
      position: "absolute",
      height: "55vh",
      zIndex: 1,
    },

    [theme.breakpoints.down(1000)]: {
      margin: "auto",
      marginBottom: "35px",
      width: "100%",
    },
  },
  passengerParamGrid: {
    width: "12.5%",
    [theme.breakpoints.down(1245)]: {
      width: "20%",
    },
    [theme.breakpoints.down(1083)]: {
      width: "33%",
    },
    [theme.breakpoints.down(440)]: {
      width: "50%",
    },
    [theme.breakpoints.down(330)]: {
      width: "100%",
    },
  },
  reservationOptionsToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    paddingLeft: "0px",
  },
  reservationParamText: {
    color: "white",
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
  },
  reservParamGrid: {
    width: "41%",
    [theme.breakpoints.down(1262)]: {
      width: "50%",
    },
    [theme.breakpoints.down(978)]: {
      width: "100%",
    },
  },
  reservationParamMenuItem: {
    "&. MuiListItem-button": {
      "&:hover": {
        borderColor: "#cecece",
      },
    },
  },
  searchBarInput: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    color: Colors.BLUE,
    "& .MuiInputBase-input": {
      position: "relative",
      bottom: "4px",
    },
  },
  selectControl: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
      "&.Mui-focused fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
    },
  },
  select: {
    height: "32px",
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
    },

    "& .MuiMenuItem-root": {
      fontFamily: Family,
    },
  },
}));
