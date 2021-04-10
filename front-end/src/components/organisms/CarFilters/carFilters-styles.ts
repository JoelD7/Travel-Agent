import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";

export const carFiltersStyles = makeStyles((theme: Theme) => ({
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
    fontFamily: Font.Family,
  },
}));
