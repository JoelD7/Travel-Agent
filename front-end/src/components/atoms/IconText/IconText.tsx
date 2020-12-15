import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { useState } from "react";
import { Colors, Shadow } from "../../../styles";

interface IconTextProps {
  text?: string;
  icon: IconDefinition;
  iconColor?: string;
  size?: string;
  style?: CreateCSSProperties<{}>;
  className?: string;
  shadow?: boolean;
}

export function IconText({
  text = "",
  icon,
  style,
  iconColor = Colors.PURPLE,
  size = "16px",
  className,
  shadow,
}: IconTextProps) {
  const iconTextStyles = makeStyles((theme: Theme) => ({
    mainContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: '5px',
      ...style,
    },
    iconContainer: {
      backgroundColor: iconColor,
      width: size,
      height: size,
      borderRadius: "50%",
      padding: "2px 5px 8px 5px",
      marginRight: "5px",
      boxShadow: shadow ? Shadow.MEDIUM : '0px 0px 0px white',
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
      
      {className ? (
        <p className={className}>{text}</p>
      ) : (
        <p style={{ fontSize: "14px", margin: "0px" }}>{text}</p>
      )}
    </div>
  );
}
