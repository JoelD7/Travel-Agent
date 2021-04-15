import { Divider, makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React from "react";
import { Font } from "../../assets";
import { Colors } from "../../styles";

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
      fontSize: "26px",
      fontWeight: "bold",
      fontFamily: Font.Family,
      padding: "0 5px 0 5px",
      backgroundColor: Colors.BACKGROUND,
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
      <p className={styles.text}>{label}</p>
    </div>
  );
}
