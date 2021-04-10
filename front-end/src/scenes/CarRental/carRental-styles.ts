import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const carRentalStyles = makeStyles((theme: Theme) => ({
  buttonGrid: {
    width: "30%",
  },
  carsGrid: {
    width: "75%",
    padding: "0px 27px",
  },
  carsGridItem: {
    width: "33%",
  },
  dateButtonGrid: {
    width: "20%",
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
  colorSecondary: {
    "&:hover": {
      backgroundColor: "rgba(149, 46, 228, 0.2)",
    },
    "&.Mui-checked": {
      color: Colors.PURPLE,

      "&:hover": {
        backgroundColor: "rgba(149, 46, 228, 0.2)",
      },
    },
  },
  formLabel: {
    fontFamily: Font.Family,
  },
  filterContainer: {
    width: "230px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT3D,
  },
  filterGrid: {
    width: "25%",
  },
  gridContainer: {
    justifyContent: "flex-end",
    // [theme.breakpoints.down(630)]: {
    //   justifyContent: "flex-start",
    // },
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
  locationGrid: {
    width: "30%",
  },
  mainContainer: {
    backgroundColor: Colors.BACKGROUND,
    fontFamily: Font.Family,
  },
  pageContainer: {
    width: "95%",
    margin: "115px auto 150px auto",
  },
  pageTitle: {
    margin: "25px 0px 0px 55px !important",
  },
  pageTitleContainer: {
    width: "fit-content",
    maxWidth: "505px",
  },
  topImageContainer: {
    height: "55vh",
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('/Travel-Agent/car-rental.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
  },
  searchParamsGrid: {
    borderRadius: "50px",
    width: "95%",
    margin: "auto",
    padding: "20px 30px",
    backgroundColor: Colors.BLUE,
    position: "relative",
    top: "157px",
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
  },
  selectIcon: {
    color: Colors.BLUE,
  },
  sortFormControl: {
    margin: "auto 10px auto 15px",
    borderRadius: "5px",
    width: "170px",
  },
}));
