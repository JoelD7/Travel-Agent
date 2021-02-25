import { Grid } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Colors } from "../../../styles";
import { Text } from "../../atoms";
import { notAvailableCardStyles } from "./notAvailableCard-styles";

interface NotAvailableCard {
  children: ReactNode;
  title: string;
}

export function NotAvailableCard({ children, title }: NotAvailableCard) {
  const style = notAvailableCardStyles();
  return (
    <Grid container className={style.noHotelsContainer}>
      {/* Message */}
      <Grid item xs={8}>
        <Text component="h1" bold color={Colors.BLUE}>
          {title}
        </Text>

        <Text component="h4">{children}</Text>
      </Grid>

      {/* Image */}
      <Grid item xs={4}>
        <Grid alignItems="center" justify="center" container style={{ height: "100%" }}>
          <img
            src="/Travel-Agent/not-found.png"
            className={style.notFoundImg}
            alt="no hotels found"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
