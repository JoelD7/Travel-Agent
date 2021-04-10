import { makeStyles, Theme } from "@material-ui/core";
import { Shadow } from "../../../styles";

export const carsCardStyles = makeStyles((theme: Theme) => ({
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
}));
