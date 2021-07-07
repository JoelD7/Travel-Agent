import { Slider } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { convertToUserCurrency, formatAsCurrency } from "../../../utils";
import { priceRangeStyles } from "./priceRange-styles";

interface PriceRange {
  baseCurrency: string;
  values: number[];
  max: number;
  updateState: (value: number[]) => void;
}

export function PriceRange({ updateState, values, max, baseCurrency }: PriceRange) {
  const style = priceRangeStyles();

  const [slider, setSlider] = useState<number[]>(values);

  useEffect(() => {
    setSlider(values);
  }, [values]);

  function onSliderChange(event: ChangeEvent<{}>, range: number | number[]) {
    setSlider(range as number[]);
  }

  function startStateUpdate() {
    if (hasStateChanged()) {
      updateState(slider);
    }
  }

  function hasStateChanged(): boolean {
    return slider[0] !== values[0] || slider[1] !== values[1];
  }

  return (
    <div
      onMouseLeave={() => {
        startStateUpdate();
      }}
    >
      <p style={{ textAlign: "center", fontSize: "16px" }}>{` ${formatAsCurrency(
        convertToUserCurrency(slider[0], baseCurrency)
      )} -  ${formatAsCurrency(convertToUserCurrency(slider[1], baseCurrency))}+`}</p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Slider
          value={slider}
          max={max}
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
