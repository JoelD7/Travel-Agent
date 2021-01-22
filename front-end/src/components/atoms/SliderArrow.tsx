import React, { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
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
  style?: CreateCSSProperties<{}>;
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export function SliderArrow({
  onClick,
  direction,
  style,
  className,
  iconSize = "1x",
}: SliderArrowProps) {
  return (
    <IconButton onClick={onClick}>
      <FontAwesomeIcon
        size={iconSize}
        icon={direction === "right" ? faChevronCircleRight : faChevronCircleLeft}
        color={Colors.BLUE}
      />
    </IconButton>
  );
}
