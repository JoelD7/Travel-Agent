import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const hotelsStyles = makeStyles((theme: Theme) => ({
  addressContactGrid: {
    display: "flex",
    justifyContent: "center",
    padding: "0px 10px 10px 10px",
    width: "49%",
    alignItems: "center",
    [theme.breakpoints.down(715)]: {
      width: "50%",
    },
  },
  background: {
    height: "55vh",
    width: "100%",
    position: "absolute",
    zIndex: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
  },
  cardData2: {
    display: "flex",
    padding: "0px 10px 10px 10px",

    width: "33%",

    [theme.breakpoints.down(715)]: {
      width: "50%",
    },
  },
  cardText: {
    fontSize: "14px",
  },
  datepicker: {
    backgroundColor: "white",
    fontFamily: Family,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "4px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },

    "& .MuiInputBase-input": {
      padding: "6px 7px 7px",
      // padding: "5px 0px 5px 10px",
    },
  },
  datepickerItemGrid: {
    borderRadius: "5px",
    width: "20%",

    [theme.breakpoints.down(1311)]: {
      width: "26%",
    },
    [theme.breakpoints.down(1060)]: {
      width: "35%",
    },
    [theme.breakpoints.down(791)]: {
      width: "50%",
    },
    [theme.breakpoints.down(578)]: {
      width: "100%",
    },
  },
  occupancyGrid: {
    width: "300px",
    [theme.breakpoints.down(550)]: {
      width: "100%",
    },
  },
  revervationParamsGrid: {
    width: "10%",

    [theme.breakpoints.down(1306)]: {
      width: "15%",
    },
    [theme.breakpoints.down(791)]: {
      width: "25%",
    },
    [theme.breakpoints.down(640)]: {
      width: "33%",
    },
  },
  defaultContentContainer: {
    height: "73%",
    [theme.breakpoints.down(950)]: {
      display: "none",
    },
  },
  smContentContainer: {
    display: "none",

    [theme.breakpoints.down(950)]: {
      display: "flex",
    },
  },
  drawer: {
    width: "250px",
    backgroundColor: Colors.BLUE,
    fontFamily: Family,
    color: "white",
    padding: "10px",
  },
  filtersGrid: {
    width: "25%",

    [theme.breakpoints.down(1280)]: {
      display: "none",
    },
  },
  filtersContainer: {
    borderRadius: "5px",
    boxShadow: Shadow.LIGHT3D,
    backgroundColor: "white",
    padding: "15px",
  },
  filterButtonGrid: {
    display: "none",
    marginBottom: "20px",
    [theme.breakpoints.down(1280)]: {
      display: "block",
      width: "50%",
    },
  },
  hotelsGrid: {
    width: "75%",
    [theme.breakpoints.down(1280)]: {
      width: "100%",
    },
  },
  hotelsGridLoading: {
    width: "75%",
    height: "45vh",
    display: "flex",
    [theme.breakpoints.down(1280)]: {
      width: "100%",
    },
  },
  hotelCard: {
    boxShadow: Shadow.LIGHT3D,
    margin: "0px 0px 15px 15px",
    borderRadius: "10px",
    display: "flex",
    backgroundColor: "white",
    width: "100%",

    [theme.breakpoints.down(1280)]: {
      marginLeft: "0px",
    },
  },
  hotelImage: {
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    height: "100%",
    width: "100%",
    maxHeight: "193px",

    [theme.breakpoints.down(950)]: {
      borderRadius: "10px 10px 0px 0px",
    },
  },
  hotelImageGrid: {
    width: "33%",

    [theme.breakpoints.down(950)]: {
      width: "100%",
      height: "250px",
    },

    [theme.breakpoints.down(621)]: {
      display: "none",
    },
  },
  hotelContentGrid: {
    width: "66%",

    [theme.breakpoints.down(950)]: {
      width: "100%",
    },
    [theme.breakpoints.down(621)]: {
      padding: "10px",
    },
  },
  hotelNameContainer: {
    width: "50%",
    margin: "10px 0px",
    [theme.breakpoints.down(484)]: {
      width: "100%",
    },
  },
  hotelStarContainer: {
    [theme.breakpoints.down(484)]: {
      width: "100%",
      margin: "3px 10px",
    },
  },

  mainContainer: {
    fontFamily: Family,
    backgroundColor: Colors.BACKGROUND,
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
  pageContentContainer: {
    [theme.breakpoints.down(578)]: {},
  },
  pageContainerChilds: {
    width: "85%",
    margin: "25px auto",
    position: "relative",
  },
  pageTitleGrid: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
  },
  pageTitleContainer: {
    backgroundColor: Colors.BLUE,
    alignSelf: "flex-end",
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
    position: "relative",
  },
  priceAndDetailsGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 10px 10px 10px",
    width: "49%",

    [theme.breakpoints.down(715)]: {
      width: "50%",
    },
  },
  popoverPaper: {
    width: "265px",
    maxHeight: "280px",
    padding: "10px",
  },
  occupancyParamText: {
    color: Colors.BLUE,
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
  },
  reservationParamBox: {
    width: "85%",
    margin: "40px auto",
    position: "relative",
  },
  select: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
      borderRadius: "10px",
    },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },

    "& .MuiMenuItem-root": {
      fontFamily: Family,
    },
  },
  selectIcon: {
    color: Colors.BLUE,
  },
  searchButton: {
    minWidth: "115px",
    boxShadow: Shadow.MEDIUM,
    color: Colors.BLUE,
    width: "100%",
  },
  searchButtonGrid: {
    width: "20%",
    marginLeft: "auto",

    [theme.breakpoints.down(755)]: {
      width: "30%",
    },
    [theme.breakpoints.down(670)]: {
      width: "100%",
    },
  },
  sortGrid: {
    marginLeft: "15px",
    marginBottom: "10px",
    width: "100%",
    [theme.breakpoints.down(824)]: {
      width: "100%",
    },
  },
  sortFormControl: {
    backgroundColor: "white",
    marginLeft: "15px",
    borderRadius: "10px",
  },
  sortContainer: {
    padding: "10px",
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    marginLeft: "auto",
    width: "31%",
  },
  textButton: {
    padding: "0px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
      textDecoration: "underline black solid",
    },
  },
  whiteParamText: {
    color: "white",
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
  },
}));
