import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { ReactNode, useState } from "react";
import { Colors, Shadow } from "../../../styles";

interface IconTextProps {
  text?: string;
  fontSize?: number;
  icon: IconDefinition;
  iconColor?: string;
  size?: number;
  style?: CreateCSSProperties<{}>;
  //style for the icon container
  iconStyle?: CreateCSSProperties<{}>;
  children?: ReactNode;
  textColor?: string;
  className?: string;
  shadow?: boolean;
}

export function IconText({
  text = "",
  icon,
  iconStyle,
  children,
  style,
  fontSize = 14,
  iconColor = Colors.PURPLE,
  size = 16,
  className,
  shadow,
  textColor = "black",
}: IconTextProps) {
  const iconTextStyles = makeStyles((theme: Theme) => ({
    mainContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      ...style,
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: iconColor,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      padding: "5px",
      marginRight: "5px",
      boxShadow: shadow ? Shadow.MEDIUM : "0px 0px 0px white",
      ...iconStyle,
    },
    text: {
      color: textColor,
      fontSize: `${fontSize}px`,
      margin: "0px",
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
        <p className={`${styles.text} ${className}`}>{text ? text : children}</p>
      ) : (
        <p className={styles.text}>{text ? text : children}</p>
      )}
    </div>
  );
}
