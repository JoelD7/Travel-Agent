import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Colors } from "../../../styles";

interface HotelStarSelectorProps {
  value: number;
  updateState: (star: number) => void;
}

export function HotelStarSelector({
  updateState,
  value,
}: HotelStarSelectorProps) {
  const [star, setStar] = useState(value);

  function onStarClicked(n: number) {
    setStar(n);
  }

  function getStarColor(n: number): string {
    return star >= n ? Colors.PURPLE : "#c4c4c4";
  }

  return (
    <div onBlur={() => updateState(star)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FontAwesomeIcon
          key={n}
          style={{cursor: 'pointer'}}
          icon={faStar}
          size="2x"
          color={getStarColor(n)}
          onClick={() => onStarClicked(n)}
        />
      ))}
    </div>
  );
}
