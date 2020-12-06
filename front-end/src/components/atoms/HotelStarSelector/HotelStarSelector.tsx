import React, { useState } from "react";
import { Colors } from "../../../styles";
import Ratings from "react-ratings-declarative";

interface HotelStarSelectorProps {
  value: number;
  updateState: (star: number) => void;
}

export function HotelStarSelector({ updateState, value }: HotelStarSelectorProps) {
  const [star, setStar] = useState(value);

  function onStarClicked(n: number) {
    setStar(n);
  }

  return (
    <div onBlur={() => updateState(star)}>
      <Ratings
        rating={star}
        widgetRatedColors={Colors.PURPLE}
        widgetHoverColors={Colors.PURPLE}
        widgetDimensions="35px"
        widgetSpacings="4px"
        changeRating={onStarClicked}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    </div>
  );
}
