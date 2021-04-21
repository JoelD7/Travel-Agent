import { Grid, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Colors, Shadow } from "../../../styles";
import { Text } from "../../atoms";
import { TextComponent } from "../../atoms/Text";

interface NotAvailableCard {
  children: ReactNode; //Detailed info
  title: string;
  imageHeight?: number;
  variant?: "vertical" | "horizontal";
}

export function NotAvailableCard({
  children,
  title,
  imageHeight = 250,
  variant = "horizontal",
}: NotAvailableCard) {
  const is610pxOrLess = useMediaQuery("(max-width:610px)");
  const is330pxOrLess = useMediaQuery("(max-width:330px)");

  const notAvailableCardStyles = makeStyles((theme: Theme) => ({
    imageContainer: {
      height: "100%",
      width: variant === "horizontal" ? "33.3%" : "100%",
      display: is330pxOrLess ? "none" : "block",
    },
    messageContainer: {
      width: is330pxOrLess ? "100%" : variant === "horizontal" ? "66.6%" : "100%",
    },
    notAvailableContainer: {
      height: "100%",
      borderRadius: "10px",
      boxShadow: Shadow.LIGHT,
      backgroundColor: "white",
      padding: "25px",
    },
    notFoundImg: {
      objectFit: "contain",
      width: "100%",
      height: `100%`,
      [theme.breakpoints.down(790)]: {
        height: "27vw",
      },
    },
    notFoundImg330: {
      objectFit: "contain",
      [theme.breakpoints.down(790)]: {
        height: "27vw",
      },
    },
  }));

  const style = notAvailableCardStyles();

  function getTitleComponentType(): TextComponent {
    return is610pxOrLess ? "h2" : "h1";
  }

  function getTextComponentType(): TextComponent {
    return is610pxOrLess ? "h5" : "h4";
  }

  return (
    <Grid container className={style.notAvailableContainer}>
      {/* Message */}
      <Grid item className={style.messageContainer}>
        <Text component={getTitleComponentType()} bold color={Colors.BLUE}>
          {title}
        </Text>

        {is330pxOrLess && (
          <img
            src="/Travel-Agent/not-found.png"
            className={style.notFoundImg330}
            alt="unavailable"
          />
        )}

        <Text component={getTextComponentType()} weight="normal">
          {children}
        </Text>
      </Grid>

      {/* Image */}
      <Grid item className={style.imageContainer}>
        <Grid alignItems="center" justify="center" container style={{ height: "100%" }}>
          <img
            src="/Travel-Agent/not-found.png"
            className={style.notFoundImg}
            alt="unavailable"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
