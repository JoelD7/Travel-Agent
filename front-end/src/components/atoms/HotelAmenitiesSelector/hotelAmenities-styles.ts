import { makeStyles, Theme } from "@material-ui/core";
import { FONT } from "../../../assets/fonts";
import { Colors } from "../../../styles";

export const hotelAmenitiesStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: '0px',
    fontWeight: 'bold',
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
      textDecoration: "underline black solid",
    },
  },
  dialogTitle: {
    padding: "0px",

    "& .MuiTypography-h6": {
      fontFamily: FONT,
      fontWeight: "bold",
      color: Colors.BLUE,
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
    fontFamily: FONT,
  },
  paper: {
    maxWidth: "1000px",
    width: "620px",
    padding: "20px",
  },
}));
