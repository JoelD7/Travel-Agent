import { Divider, makeStyles } from "@material-ui/core";
import React from "react";

interface PageSubtitleProps {
  label: string;
}

export function PageSubtitle({ label }: PageSubtitleProps) {
  const muiStyles = makeStyles({
    text: {
      margin: "auto",
      textAlign: "center",
      zIndex: 2,
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
      width: "90%",
      display: "flex",
      justifyContent: "center",
    },
  });

  const style = muiStyles();
  return (
    <div className={style.container}>
      <Divider className={style.divider} />
      <h2 className={style.text}>{label}</h2>
    </div>
  );
}
