import { Grid, makeStyles } from "@material-ui/core";
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
  const notAvailableCardStyles = makeStyles(() => ({
    noHotelsContainer: {
      borderRadius: "10px",
      marginLeft: "15px",
      boxShadow: Shadow.LIGHT,
      backgroundColor: "white",
      padding: "15px",
    },
    notFoundImg: {
      objectFit: "cover",
      height: `${imageHeight}px`,
    },
  }));

  const style = notAvailableCardStyles();
  return (
    <Grid container className={style.noHotelsContainer}>
      {/* Message */}
      <Grid item xs={variant === "horizontal" ? 8 : 12}>
        <Text component="h1" bold color={Colors.BLUE}>
          {title}
        </Text>

        <Text component="h4">{children}</Text>
      </Grid>

      {/* Image */}
      <Grid item xs={variant === "horizontal" ? 8 : 12}>
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
