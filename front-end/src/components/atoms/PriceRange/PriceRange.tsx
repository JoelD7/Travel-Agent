import { Slider } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectExchangeRate,
  ExchangeRate,
  selectBaseCurrency,
  formatAsCurrency,
} from "../../../utils";
import { priceRangeStyles } from "./priceRange-styles";

interface PriceRange {
  value: number[];
  max: number;
  updateState: (value: number[]) => void;
}

export function PriceRange({ updateState, value, max }: PriceRange) {
  const style = priceRangeStyles();

  const [slider, setSlider] = useState<number[]>(value);
  const exchangeRate: ExchangeRate = useSelector(selectExchangeRate);
  const baseCurrency: string = useSelector(selectBaseCurrency);

  useEffect(() => {
    setSlider(value);
  }, [value]);

  function onSliderChange(event: ChangeEvent<{}>, value: number | number[]) {
    setSlider(value as number[]);
  }

  return (
    <div onBlur={() => updateState(slider)}>
      <p style={{ textAlign: "center", fontSize: "16px" }}>{` ${formatAsCurrency(
        slider[0],
        baseCurrency,
        exchangeRate
      )} -  ${formatAsCurrency(slider[1], baseCurrency, exchangeRate)}+`}</p>

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
