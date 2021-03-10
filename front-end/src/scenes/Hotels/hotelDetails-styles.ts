import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const hotelDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordionRoot: {
      backgroundColor: Colors.BLUE,
      boxShadow: Shadow.MEDIUM3D,
      marginBottom: "10px",

      "&.Mui-expanded:last-child": {
        marginBottom: "40px",
        borderRadius: "10px",
      },
    },
    accordionRounded: {
      borderRadius: "10px",
      "&:last-child": {
        borderRadius: "10px",
      },
    },
    aboutHotelGrid: {
      width: "65%",
    },
    arrowLeft: {
      position: "absolute",
      zIndex: 2,
    },
    arrowRight: {
      position: "absolute",
      zIndex: 2,
      left: "1096px",
    },
    aboutHotelContainer: {
      borderRadius: "10px",
      backgroundColor: "white",
      padding: "35px",
      boxShadow: Shadow.MEDIUM,
    },
    imageSlider: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      height: "100%",
    },
    limitedAboutText: {
      display: "-webkit-box",
      WebkitLineClamp: 6,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    mainContainer: {
      fontFamily: Font.Family,
      backgroundColor: Colors.BACKGROUND,
    },
    notFoundImg: {
      objectFit: "cover",
      height: "190px",
      margin: "20px 20px 0px 20px",
    },
    paperImage: {
      maxWidth: "1100px",
      width: "1100px",
      height: "694px",
      minWidth: "525px",
      backgroundColor: "black",
    },
    pageContainer: {
      width: "85%",
      margin: "auto",
    },
    photoContainer: {
      height: "400px",
      margin: "50px 0px",
    },
    photoContainerImage: {
      height: "80vh",
    },
    photo: {
      objectFit: "cover",
      height: "100%",
      borderRadius: "10px",
      width: "97%",
      margin: "auto 5px",

      [theme.breakpoints.down(1140)]: {
        width: "auto",
        margin: "auto",
      },
    },
    photoInSlider: {
      objectFit: "cover",
      height: "100%",
      width: "100%",
    },
    progressCircleContainer: {
      display: "flex",
      margin: "auto",
      position: "absolute",
      left: "50vw",
      top: "50vh",
    },
    reservationInfoContainer: {
      padding: "20px",
      marginLeft: "auto",
      width: "85%",
      borderRadius: "10px",
      backgroundColor: "white",
      boxShadow: Shadow.MEDIUM,
    },
    redirectionDialog: {
      "&.MuiDialog-paperScrollPaper": {
        padding: "10px",
      },
    },
    reservationInfoGrid: {
      width: "35%",
    },
    roomsGrid: {
      width: "40%",
    },
    slider: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  })
);
