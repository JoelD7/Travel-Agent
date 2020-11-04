import { Slider } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { hotelPriceStyles } from "./hotelPrice-styles";

interface HotelPriceRange {
  value: number[];
  updateState: (value: number[]) => void;
}

export function HotelPriceRange({ updateState, value }: HotelPriceRange) {
  const style = hotelPriceStyles();

  const [slider, setSlider] = useState<number[]>(value);

  function onSliderChange(event: ChangeEvent<{}>, value: number | number[]) {
    setSlider(value as number[]);
  }

  return (
    <div onBlur={() => updateState(slider)}>
      <p
        style={{ textAlign: "center", fontSize: "16px" }}
      >{`$ ${slider[0]} - $ ${slider[1]}`}</p>

      <div
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Slider
          value={slider}
          onChange={onSliderChange}
          classes={{
            root: style.sliderRoot,
            track: style.sliderRailTrack,
            rail: style.sliderRailTrack,
            thumb: style.sliderThumb,
          }}
        />
      </div>
    </div>
  );
}
