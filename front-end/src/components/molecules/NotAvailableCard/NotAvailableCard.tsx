import { Grid, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Colors, Shadow } from "../../../styles";
import { Text } from "../../atoms";

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
      width: "90%",
      margin: "auto",
      alignItems: "center",
      borderRadius: "10px",
      boxShadow: Shadow.LIGHT,
      backgroundColor: "white",
      padding: "25px",
    },
    notFoundImg: {
      objectFit: "contain",
      width: "75%",
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

  return (
    <Grid container className={style.notAvailableContainer}>
      {/* Message */}
      <Grid item className={style.messageContainer}>
        <Text component={"h2"} bold color={Colors.BLUE}>
          {title}
        </Text>

        {is330pxOrLess && (
          <img
            src="/Travel-Agent/not-found.png"
            className={style.notFoundImg330}
            alt="unavailable"
          />
        )}

        <Text weight="normal">{children}</Text>
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
