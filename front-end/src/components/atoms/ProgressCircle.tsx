import { CircularProgress, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React from "react";
import { Colors } from "../../styles";

interface ProgressCircle {
  style?: CSSProperties;
  className?: string;
}

export function ProgressCircle({ style, className }: ProgressCircle) {
  const circleStyles = makeStyles({
    circleColor: {
      color: Colors.PURPLE,
    },
  });
  const styles = circleStyles();

  return (
    <div
      style={{ margin: "auto", position: "relative", zIndex: 2 }}
      className={className}
    >
      <CircularProgress
        classes={{ colorPrimary: styles.circleColor }}
        size={80}
        thickness={4}
        style={style}
      />
    </div>
  );
}
