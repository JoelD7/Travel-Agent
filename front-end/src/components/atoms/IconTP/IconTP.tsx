import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { Colors, Shadow } from "../../../styles";

interface IconTP {
  icon: IconDefinition;
  size?: number;
  backgroundColor?: string;
  shadow?: boolean;
}

export function IconTP({
  shadow,
  icon,
  backgroundColor = Colors.PURPLE,
  size = 16,
}: IconTP) {
  const iconTPStyles = makeStyles(() => ({
    iconContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: backgroundColor,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      padding: "5px",
      boxShadow: shadow ? Shadow.MEDIUM : "0px 0px 0px white",
    },
  }));

  const style = iconTPStyles();

  return (
    <div className={style.iconContainer}>
      <FontAwesomeIcon
        icon={icon}
        color="white"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
}
