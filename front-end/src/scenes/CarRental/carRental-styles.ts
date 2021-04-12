import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const carRentalStyles = makeStyles((theme: Theme) => ({
  backgroundImage: {
    objectFit: "cover",
    position: "absolute",
    height: "55vh",
    width: "100%",
  },
  buttonGrid: {
    width: "30%",
    [theme.breakpoints.down(1220)]: {
      width: "10%",
    },
    [theme.breakpoints.down(1015)]: {
      width: "30%",
    },
    [theme.breakpoints.down(835)]: {
      width: "20%",
    },
    [theme.breakpoints.down(655)]: {
      width: "100%",
    },
  },
  carsGrid: {
    width: "80%",
    padding: "0px 27px",
    [theme.breakpoints.down(1210)]: {
      width: "100%",
    },
  },
  carsGridItem: {
    width: "33%",
    minWidth: "325px",
    maxWidth: "430px",
    [theme.breakpoints.down(1350)]: {
      width: "45%",
    },
    [theme.breakpoints.down(805)]: {
      width: "50%",
    },
    [theme.breakpoints.down(740)]: {
      width: "65%",
    },
    [theme.breakpoints.down(565)]: {
      width: "90%",
    },
  },
  dateButtonGrid: {
    width: "20%",
    [theme.breakpoints.down(1220)]: {
      width: "25%",
    },
    [theme.breakpoints.down(1015)]: {
      width: "33%",
    },
    [theme.breakpoints.down(835)]: {
      width: "40%",
    },
    [theme.breakpoints.down(655)]: {
      width: "100%",
    },
  },
  datepicker: {
    backgroundColor: "white",
    fontFamily: Font.Family,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "5px",
    height: "32px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },

    "& .MuiInputBase-input": {
      padding: "5px 0px 5px 10px",
    },
    "& .MuiInputBase-root": {
      height: "32px",
    },
  },
  drawer: {
    width: "250px",
    backgroundColor: "white",
    fontFamily: Font.Family,
    padding: "10px",
    height: "auto",
    borderRadius: "10px",
    marginLeft: "7px",
  },
  filterContainer: {
    width: "190px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT3D,
  },
  filterButtonGrid: {
    display: "none",
    [theme.breakpoints.down(1210)]: {
      display: "block",
      width: "50%",
    },
    [theme.breakpoints.down(590)]: {
      width: "35%",
    },
    [theme.breakpoints.down(460)]: {
      width: "21%",
    },
    [theme.breakpoints.down(380)]: {
      width: "100%",
      marginBottom: "15px",
    },
  },
  filterGrid: {
    width: "20%",
    [theme.breakpoints.down(1210)]: {
      display: "none",
    },
  },
  gridContainer: {
    justifyContent: "flex-end",
    [theme.breakpoints.down(380)]: {
      width: "100%",
      justifyContent: "flex-start",
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
  locationDiv: {
    width: "100%",
    [theme.breakpoints.down(1015)]: {
      width: "55%",
    },
    [theme.breakpoints.down(730)]: {
      width: "70%",
    },
    [theme.breakpoints.down(655)]: {
      width: "100%",
    },
  },
  locationGrid: {
    width: "30%",
    [theme.breakpoints.down(1220)]: {
      width: "38%",
    },
    [theme.breakpoints.down(1015)]: {
      width: "100%",
    },
  },
  mainContainer: {
    backgroundColor: Colors.BACKGROUND,
    fontFamily: Font.Family,
  },
  pageContainer: {
    width: "95%",
    margin: "20px auto 150px auto",
    [theme.breakpoints.down(549)]: {
      margin: "75px ​auto 150px auto",
    },
    [theme.breakpoints.down(415)]: {
      width: "97%",
    },
  },
  pageTitleContainer: {
    width: "fit-content",
    padding: "35px",
  },
  topImageContainer: {
    height: "65vh",
    [theme.breakpoints.down(655)]: {
      height: "auto",
    },
    "&::before": {
      content: '""',
      background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
      width: "100%",
      position: "absolute",
      height: "55vh",
      zIndex: 1,
    },
  },
  searchParamsGrid: {
    borderRadius: "10px",
    width: "95%",
    margin: "auto auto 20px",
    padding: "10px",
    backgroundColor: Colors.BLUE,
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
      fontFamily: Font.Family,
    },
  },
  sortContainer: {
    width: "auto",
    marginBottom: "20px",
    background: "white",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT3D,
  },
  sortGrid: {
    width: "100%",
    [theme.breakpoints.down(1210)]: {
      width: "50%",
    },
    [theme.breakpoints.down(590)]: {
      width: "65%",
    },
    [theme.breakpoints.down(460)]: {
      width: "75%",
      marginLeft: "auto",
    },
    [theme.breakpoints.down(380)]: {
      width: "100%",
    },
  },
  selectIcon: {
    color: Colors.BLUE,
  },
  sortFormControl: {
    margin: "auto 10px auto 15px",
    borderRadius: "5px",
    width: "170px",
  },
  whiteParamText: {
    color: "white",
    fontSize: "14px",
    marginLeft: "5px",
    marginBottom: "3px !important",
    marginTop: "5px",
  },
}));
