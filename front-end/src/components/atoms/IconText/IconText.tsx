import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { useState } from "react";
import { Colors, Shadow } from "../../../styles";

interface IconTextProps {
  text: string;
  icon: IconDefinition;
  iconColor?: string;
  size?: string;
  style?: CreateCSSProperties<{}>;
}

export function IconText({
  text,
  icon,
  style,
  iconColor = Colors.PURPLE,
  size = "16px",
}: IconTextProps) {
  const iconTextStyles = makeStyles((theme: Theme) => ({
    mainContainer: {
      display: "flex",
      alignItems: "center",
      ...style,
    },
    iconContainer: {
      backgroundColor: iconColor,
      width: size,
      height: size,
      borderRadius: "50%",
      padding: "5px",
      marginRight: "5px",
    },
  }));

  const styles = iconTextStyles();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon
          icon={icon}
          color="white"
          style={{ width: size, height: size }}
        />
      </div>
      <p style={{ fontSize: "14px", margin: "0px" }}>{text}</p>
    </div>
  );
}
