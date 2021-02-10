import React, { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties, CSSProperties } from "@material-ui/styles";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
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
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export function SliderArrow({
  onClick,
  onTop,
  direction,
  style,
  className,
  iconSize = "1x",
}: SliderArrowProps) {
  const sliderArrowStyles = makeStyles((theme: Theme) => ({
    iconContainer: {
      backgroundColor: Colors.BLUE,
      borderRadius: "50%",
      height: "56px",
      width: "56px",

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
        color={"white"}
        style={
          direction === "right"
            ? { position: "relative", left: "2px" }
            : { position: "relative", right: "2px" }
        }
      />
    </IconButton>
  );
}
