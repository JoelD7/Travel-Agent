import { Slider } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { convertToUserCurrency, formatAsCurrency } from "../../../utils";
import { priceRangeStyles } from "./priceRange-styles";

interface PriceRange {
  baseCurrency: string;
  value: number[];
  max: number;
  updateState: (value: number[]) => void;
}

export function PriceRange({ updateState, value, max, baseCurrency }: PriceRange) {
  const style = priceRangeStyles();

  const [slider, setSlider] = useState<number[]>(value);

  useEffect(() => {
    setSlider(value);
  }, [value]);

  function onSliderChange(event: ChangeEvent<{}>, value: number | number[]) {
    setSlider(value as number[]);
  }

  return (
    <div onBlur={() => updateState(slider)}>
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
