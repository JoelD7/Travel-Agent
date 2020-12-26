import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors } from "../../styles";

export const tripStyles = makeStyles((theme: Theme) => ({
  detailsGrid:{
    padding: '20px',
  },
  detailsContainer:{
    borderRadius: '10px',
    border: '1px solid #CECECE',
    padding: '10px',
  },
  mainContainer: {
    fontFamily: Font.Family,
    marginBottom: "40px",
    backgroundColor: Colors.BACKGROUND,
  },
  lastTripDataContainer: {
    marginTop: "13%",
  },
  pageContentGrid: {
    marginLeft: "275px",
    maxWidth: "82vw",
  },
  photosGrid:{
    marginTop: '20px',
  },
  photoTitleContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Travel-Agent/journey.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
    padding: "10px",
    borderRadius: "5px",
    color: "white",
    height: "345px",
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  tripCard: {
    width: "95%",
  },
  tripCardGrid: {
    marginTop: "20px",
  },
}));
