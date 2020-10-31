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
  className?: string;
  style?: CreateCSSProperties<{}>;
  onClick?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

export function SliderArrow({
  onClick,
  direction,
  style,
  className,
}: SliderArrowProps) {
  return (
    <IconButton onClick={onClick}>
      <FontAwesomeIcon
        icon={
          direction === "right" ? faChevronCircleRight : faChevronCircleLeft
        }
        color={Colors.BLUE}
      />
    </IconButton>
  );
}
