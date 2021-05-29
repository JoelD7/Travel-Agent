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
      [theme.breakpoints.down(1060)]: {
        width: "100%",
      },
    },
    reservationLinkDivider: {
      backgroundColor: "#cecece",
      marginTop: 20,
      width: "100%",
      marginBottom: 10,
    },
    reservationInfoGrid: {
      width: "35%",
      [theme.breakpoints.down(1060)]: {
        width: "100%",
        marginTop: "20px",
      },
      [theme.breakpoints.down(675)]: {
        width: "100%",
      },
    },
    reservationInfoContainer: {
      padding: "20px",
      marginLeft: "auto",
      width: "85%",
      borderRadius: "10px",
      backgroundColor: "white",
      boxShadow: Shadow.LIGHT3D,
      [theme.breakpoints.down(1060)]: {
        marginLeft: "0px",
        width: "46%",
      },
      [theme.breakpoints.down(675)]: {
        width: "100%",
      },
      [theme.breakpoints.down(770)]: {
        width: "100%",
      },
    },
    reservationStatusContainer: {
      marginTop: 20,
      padding: "20px",
      marginLeft: "auto",
      width: "85%",
      borderRadius: "10px",
      backgroundColor: "white",
      boxShadow: Shadow.LIGHT3D,

      [theme.breakpoints.down(1060)]: {
        marginLeft: "20px",
        marginTop: 0,
        width: "46%",
      },
      [theme.breakpoints.down(900)]: {
        marginLeft: 0,
      },
      [theme.breakpoints.down(770)]: {
        marginTop: 20,
        width: "100%",
      },
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
    mainContainer: {
      fontFamily: Font.Family,
      backgroundColor: "white",
    },
    notFoundImg: {
      objectFit: "cover",
      height: "190px",
      margin: "20px 20px 0px 20px",
    },

    pageContainer: {
      width: "85%",
      margin: "auto auto 150px auto",
      [theme.breakpoints.down(500)]: {
        width: "93%",
      },
    },

    progressCircleContainer: {
      display: "flex",
      margin: "auto",
      position: "absolute",
      left: "50vw",
      top: "50vh",
    },

    redirectionDialog: {
      "&.MuiDialog-paperScrollPaper": {
        padding: "10px",
      },
    },

    roomsContainer: {
      marginTop: "40px",
      width: "902px",

      [theme.breakpoints.down(1027)]: {
        width: "89vw",
      },
    },
    roomsGrid: {
      width: "100%",
    },
    slider: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  })
);
