import { Slider } from "@material-ui/core";
import { format } from "date-fns";
import React, { ChangeEvent, useState } from "react";
import { dateTimeRangeStyles } from "./dateTimeRange-styles";

interface DatetimeRange {
  value: Date[];
  max: Date;
  min: Date;
  updateState: (value: number[]) => void;
}

export function DatetimeRange({ updateState, value, max, min }: DatetimeRange) {
  const style = dateTimeRangeStyles();
  let sliderValue: number[] = value.map((date) => date.valueOf());

  const [slider, setSlider] = useState<number[]>(sliderValue);

  function onSliderChange(event: ChangeEvent<{}>, value: number | number[]) {
    setSlider(value as number[]);
  }

  function parseNumberToDateLabel(value: number) {
    let date: Date = new Date(value);
    return format(date, "EEE h:mm aa");
  }

  return (
    <div onBlur={() => updateState(slider)}>
      <div style={{ display: "flex", width: "88%", margin: "auto" }}>
        <p style={{ textAlign: "start", fontSize: "16px" }}>{`${parseNumberToDateLabel(
          slider[0]
        )}`}</p>

        <p
          style={{ textAlign: "end", fontSize: "16px", marginLeft: "auto" }}
        >{`${parseNumberToDateLabel(slider[1])}`}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Slider
          value={slider}
          step={900000}
          max={max.valueOf()}
          min={min.valueOf() < value[0].valueOf() ? min.valueOf() : value[0].valueOf()}
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
