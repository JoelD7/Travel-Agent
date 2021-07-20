import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { MouseEvent } from "react";
import { Colors } from "../../styles";

type ArrowVariant = "regular" | "fullscreen";

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
  variant?: ArrowVariant;
  iconColor?: string;
  backgroundColor?: string;
  style?: CreateCSSProperties<{}>;
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export function SliderArrow({
  onClick,
  onTop,
  direction,
  variant = "regular",
  style,
  backgroundColor = Colors.BLUE,
  iconColor = "white",
  className,
  iconSize = "1x",
}: SliderArrowProps) {
  const is500pxOrLess = useMediaQuery("(max-width:500px)");
  const is370pxOrLess = useMediaQuery("(max-width:370px)");

  const sliderArrowStyles = makeStyles((theme: Theme) => ({
    iconContainer: {
      backgroundColor: getBackgroundColor(),
      borderRadius: "50%",
      height: iconSize === "1x" ? "40px" : "56px",
      width: iconSize === "1x" ? "40px" : "56px",

      "&:hover": {
        backgroundColor: getBackgroundColorHover(),
      },

      [theme.breakpoints.down(370)]: {
        height: iconSize === "1x" ? "30px" : "56px",
        width: iconSize === "1x" ? "30px" : "56px",
      },
    },
  }));

  const styles = sliderArrowStyles();

  function getBackgroundColor() {
    if (variant === "fullscreen" && is500pxOrLess) {
      return "#1313138f";
    }

    return backgroundColor;
  }

  function getBackgroundColorHover() {
    if (variant === "fullscreen" && is500pxOrLess) {
      return "#131313b0";
    }

    return Colors.BLUE_HOVER;
  }

  function getIconButtonStyle() {
    if (variant === "fullscreen" && is500pxOrLess) {
      return direction === "right" ? { right: 45, zIndex: 2 } : { left: 45, zIndex: 2 };
    }

    return {};
  }

  return (
    <IconButton
      onClick={onClick}
      className={styles.iconContainer}
      style={getIconButtonStyle()}
    >
      <FontAwesomeIcon
        size={is370pxOrLess ? "xs" : iconSize}
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
