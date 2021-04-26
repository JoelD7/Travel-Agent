import { makeStyles, Theme } from "@material-ui/core";
import { Shadow } from "../../../styles";

export const photoAlbumStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT3D,
    margin: "10px",
  },
}));
