import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const hotelsStyles = makeStyles((theme: Theme) => ({
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
  loadingCircle: {
    top: "125px",
    width: "80px",
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
    marginTop: "70px",
  },
  filterButtonGrid: {
    display: "none",
    [theme.breakpoints.down(1280)]: {
      display: "block",
      width: "30%",
    },
    [theme.breakpoints.down(876)]: {
      width: "20%",
    },
    [theme.breakpoints.down(548)]: {
      width: "100%",
    },
  },
  sortGrid: {
    width: "70%",
    marginLeft: "auto",
    [theme.breakpoints.down(876)]: {
      width: "80%",
    },
    [theme.breakpoints.down(600)]: {
      width: "100%",
      marginLeft: "0px",
      marginRight: "auto",
      marginTop: "10px",
    },
  },
  sortContainer: {
    padding: "10px",
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    marginLeft: "auto",
    width: "420px",
    [theme.breakpoints.down(600)]: {
      marginLeft: "0px",
      marginRight: "auto",
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
  hotelCardContainer: {
    marginLeft: "15px",
  },
  hotelCardContainerLoading: {
    filter: "blur(4px)",
  },
  hotelNameContainer: {
    width: "50%",
    margin: "10px 0px",
    [theme.breakpoints.down(484)]: {
      width: "100%",
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
  notFoundImg: {
    objectFit: "cover",
    height: "190px",
    margin: "20px 20px 0px 20px",
  },
  pageContentContainer: {
    [theme.breakpoints.down(578)]: {},
  },
  pageContainerChilds: {
    width: "85%",
    margin: "25px auto",
    position: "relative",
    [theme.breakpoints.down(621)]: {
      width: "95%",
    },
  },
  pagination: {
    margin: "40px auto",
  },
  paginationItemRoot: {
    fontFamily: Font.Family,
  },
  paginationItemPage: {
    "&.Mui-selected": {
      backgroundColor: Colors.BLUE,
      color: "white",
      "&:hover": {
        backgroundColor: Colors.BLUE_HOVER,
      },
    },
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
  redirectionDialog: {
    "&.MuiDialog-paperScrollPaper": {
      padding: "10px",
    },
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
      margin: "0px 5px",
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
  sortFilterGrid: {
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
    borderRadius: "5px",
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
