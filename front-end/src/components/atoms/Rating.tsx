import { faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactRating from "react-rating";
import { Colors } from "../../styles";

interface Rating {
  score: number;
  type: "circle" | "star";
  readonly?: boolean;
  onChange?: (value: number) => void;
  size?: number;
}

export function Rating({ score, onChange, type, size = 16, readonly = true }: Rating) {
  return (
    <ReactRating
      initialRating={score}
      onChange={onChange}
      readonly={readonly}
      emptySymbol={
        <FontAwesomeIcon
          icon={type === "circle" ? faCircle : faStar}
          color={"#cecece"}
          style={{ width: `${size}px`, height: `${size}px`, margin: "0px 1px" }}
        />
      }
      fullSymbol={
        <FontAwesomeIcon
          icon={type === "circle" ? faCircle : faStar}
          color={Colors.PURPLE}
          style={{ width: `${size}px`, height: `${size}px`, margin: "0px 1px" }}
        />
      }
    />
  );
}
