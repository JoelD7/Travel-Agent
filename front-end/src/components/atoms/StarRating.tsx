import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors } from "../../styles";

interface StarRating {
  stars: number;
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

export function StarRating({ stars, size }: StarRating) {
  return (
    <div style={{ display: "flex" }}>
      {[1, 2, 3, 4, 5].map((star, i) => (
        <FontAwesomeIcon
          key={i}
          size={size}
          icon={faStar}
          color={star <= stars ? Colors.PURPLE : "#cecece"}
        />
      ))}
    </div>
  );
}
