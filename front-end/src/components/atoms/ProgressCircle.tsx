import { CircularProgress, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React from "react";
import { Colors } from "../../styles";

interface ProgressCircle {
  style?: CSSProperties;
  className?: string;
  size?: number;
  color?: string;
}

export function ProgressCircle({
  style,
  size = 80,
  className,
  color = Colors.PURPLE,
}: ProgressCircle) {
  const circleStyles = makeStyles({
    circleColor: {
      color: color,
    },
  });
  const styles = circleStyles();

  return (
    <div
      style={{ margin: "auto", position: "relative", zIndex: 2, ...style }}
      className={className}
    >
      <CircularProgress
        classes={{ colorPrimary: styles.circleColor }}
        size={size}
        thickness={4}
      />
    </div>
  );
}
