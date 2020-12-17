import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { useState } from "react";
import { Colors, Shadow } from "../../../styles";

interface IconTextProps {
  text?: string;
  fontSize?: number;
  icon: IconDefinition;
  iconColor?: string;
  size?: number;
  style?: CreateCSSProperties<{}>;
  className?: string;
  shadow?: boolean;
}

export function IconText({
  text = "",
  icon,
  style,
  fontSize = 14,
  iconColor = Colors.PURPLE,
  size = 16,
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
      display: "flex",
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: iconColor,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      padding: "5px",
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
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>
      
      {className ? (
        <p className={className}>{text}</p>
      ) : (
        <p style={{ fontSize: `${fontSize}px`, margin: "0px" }}>{text}</p>
      )}
    </div>
  );
}
