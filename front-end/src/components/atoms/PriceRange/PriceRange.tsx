import { Slider } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectExchangeRate,
  ExchangeRate,
  selectEndCurrency,
  formatAsCurrency,
} from "../../../utils";
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
  const exchangeRate: ExchangeRate = useSelector(selectExchangeRate);
  const endCurrency: string = useSelector(selectEndCurrency);

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
        endCurrency,
        exchangeRate
      )} -  ${formatAsCurrency(slider[1], baseCurrency, endCurrency, exchangeRate)}+`}</p>

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
