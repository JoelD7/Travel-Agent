import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const thingsToDoDetailsStyles = makeStyles((theme: Theme) => ({
  detailsGrid: {
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
    width: "50%",
    color: "white",
  },
  detailsContainer: {
    borderRadius: "5px",
    padding: "15px",
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.LIGHT,
    color: 'white'
  },
  images:{
    objectFit: "cover",
    width: '100%',
    height: "100%",
    margin: "auto",
  },
  imageGrid: {
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
    width: "48%",
    marginLeft: "10px",
    height: "500px",
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContentContainer: {
    width: "85%",
    margin: "auto auto 50px auto",
    borderRadius: '10px',
    boxShadow: Shadow.LIGHT,
    padding: '10px',
    backgroundColor: 'white',
  },
  tripButtonGrid: {
    margin: "auto 0px auto auto",
    [theme.breakpoints.down(780)]: {
      margin: "10px auto auto auto",
      width: "100%",
    },
  },
}));
