import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { MouseEvent } from "react";
import { Colors } from "../../styles";

interface SliderArrowProps {
  direction: "right" | "left";
  iconSize?:
    | "xs"
    | "lg"
    | "sm"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  className?: string;
  onTop?: boolean;
  iconColor?: string;
  backgroundColor?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export function SliderArrow({
  onClick,
  onTop,
  direction,
  style,
  backgroundColor = Colors.BLUE,
  iconColor = "white",
  className,
  iconSize = "1x",
}: SliderArrowProps) {
  const sliderArrowStyles = makeStyles((theme: Theme) => ({
    iconContainer: {
      backgroundColor: backgroundColor,
      borderRadius: "50%",
      height: iconSize === "1x" ? "40px" : "56px",
      width: iconSize === "1x" ? "40px" : "56px",

      "&:hover": {
        backgroundColor: Colors.BLUE_HOVER,
      },
    },
  }));

  const styles = sliderArrowStyles();

  return (
    <IconButton
      onClick={onClick}
      className={styles.iconContainer}
      style={
        onTop
          ? direction === "right"
            ? { position: "absolute", zIndex: 2, left: "calc(100% - 72px)" }
            : { position: "absolute", zIndex: 2 }
          : {}
      }
    >
      <FontAwesomeIcon
        size={iconSize}
        icon={direction === "right" ? faChevronRight : faChevronLeft}
        color={iconColor}
        style={
          direction === "right"
            ? { position: "relative", left: "2px" }
            : { position: "relative", right: "2px" }
        }
      />
    </IconButton>
  );
}
