import { makeStyles, Theme } from "@material-ui/core";
import { Shadow } from "../../../styles";

export const carsCardStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    backdropFilter: "blur(4px)",
  },
  card: {
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT3D,
    backgroundColor: "white",
    padding: "15px",
  },
  image: {
    objectFit: "cover",
    width: "100%",
  },
  paper: {
    maxWidth: 715,
    padding: "30px 40px",
    borderRadius: 10,
  },
}));
