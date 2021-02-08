import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors } from "../../styles";
import ReactRating from "react-rating";
import {
  faCircle as faCircleReg,
  faStar as faStarReg,
} from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Rating {
  score: number;
  type: "circle" | "star";
  readonly?: boolean;
  onChange?: (value: number) => void;
  size?:
    | "xs"
    | "sm"
    | "lg"
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
}

export function Rating({ score, onChange, type, size = "1x", readonly }: Rating) {
  return (
    <ReactRating
      initialRating={score}
      onChange={onChange}
      readonly={readonly}
      emptySymbol={
        <FontAwesomeIcon
          style={{ margin: "0px 1px" }}
          icon={type === "circle" ? faCircleReg : faStarReg}
          color={Colors.PURPLE}
          size={size}
        />
      }
      fullSymbol={
        <FontAwesomeIcon
          style={{ margin: "0px 1px" }}
          icon={type === "circle" ? faCircle : faStar}
          color={Colors.PURPLE}
          size={size}
        />
      }
    />
  );
}
