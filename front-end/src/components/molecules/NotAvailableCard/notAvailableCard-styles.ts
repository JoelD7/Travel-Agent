import { makeStyles } from "@material-ui/core";
import { Shadow } from "../../../styles";

export const notAvailableCardStyles = makeStyles(() => ({
  noHotelsContainer: {
    borderRadius: "10px",
    marginLeft: "15px",
    boxShadow: Shadow.LIGHT,
    backgroundColor: "white",
    padding: "15px",
  },
  notFoundImg: {
    objectFit: "cover",
    height: "250px",
  },
}));
