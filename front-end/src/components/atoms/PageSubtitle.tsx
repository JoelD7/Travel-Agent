import { Divider, makeStyles, Typography } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React from "react";

interface PageSubtitleProps {
  label: string;
  containerStyle?: CreateCSSProperties<{}>;
}

export function PageSubtitle({ label, containerStyle }: PageSubtitleProps) {
  const muiStyles = makeStyles({
    text: {
      margin: "auto",
      textAlign: "center",
      zIndex: 2,
      fontWeight: "bolder",
      padding: "0 5px 0 5px",
      backgroundColor: "white",
    },
    divider: {
      backgroundColor: "black",
      position: "absolute",
      marginTop: "16px",
      width: "90%",
      zIndex: 1,
    },
    container: {
      margin: "auto",
      marginBottom: "30px",
      width: "90%",
      display: "flex",
      justifyContent: "center",
      ...containerStyle,
    },
  });

  const styles = muiStyles();
  return (
    <div className={styles.container}>
      <Divider className={styles.divider} />
      <h2 className={styles.text}>{label}</h2>
    </div>
  );
}
