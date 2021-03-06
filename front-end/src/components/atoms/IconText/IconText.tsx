import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { ReactNode } from "react";
import { Colors, Shadow } from "../../../styles";
import { Font } from "../../../assets";

interface IconTextProps {
  text?: string;
  fontSize?: number;
  icon: IconDefinition;
  backgroundColor?: string;
  iconColor?: string;
  size?: number;
  style?: CreateCSSProperties<{}>;
  textStyle?: CreateCSSProperties<{}>;
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
  textStyle,
  children,
  style,
  fontSize = 14,
  backgroundColor = Colors.PURPLE,
  iconColor = "white",
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
      backgroundColor: backgroundColor,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      //This means that the icon wont have a background circle
      padding: backgroundColor === "inherit" ? "0px" : "5px",
      marginRight: "5px",
      boxShadow: shadow ? Shadow.MEDIUM : "0px 0px 0px white",
      ...iconStyle,
    },
    text: {
      color: textColor,
      fontFamily: Font.Family,
      fontSize: `${fontSize}px`,
      margin: "0px",
      ...textStyle,
    },
  }));

  const styles = iconTextStyles();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon
          icon={icon}
          color={iconColor}
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
