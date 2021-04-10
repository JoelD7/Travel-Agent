import { makeStyles, Theme } from "@material-ui/core";
import { Shadow } from "../../../styles";

export const carsCardStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT3D,
    backgroundColor: "white",
    padding: "15px",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  image: {
    objectFit: "cover",
    width: "100%",
  },
}));
