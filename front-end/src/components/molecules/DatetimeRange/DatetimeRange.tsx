import { Grid, Slider } from "@material-ui/core";
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

  function getDate(value: number) {
    let date: Date = new Date(value);
    return format(date, "dd/MM");
  }

  function getTime(value: number) {
    let date: Date = new Date(value);
    return format(date, "h:mm aa");
  }

  function startStateUpdate() {
    if (hasStateChanged()) {
      updateState(slider);
    }
  }

  function hasStateChanged(): boolean {
    return slider[0] !== sliderValue[0] || slider[1] !== sliderValue[1];
  }

  return (
    <div
      onMouseLeave={() => {
        startStateUpdate();
      }}
    >
      <Grid container className={style.textRangeGrid}>
        {/* Start */}
        <Grid item xs={6}>
          <Grid container justify="flex-start">
            <div>
              <p className={style.text}>{getDate(slider[0])}</p>
              <p className={style.text}>{getTime(slider[0])}</p>
            </div>
          </Grid>
        </Grid>

        {/* End */}
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            <div>
              <p className={style.text} style={{ textAlign: "end" }}>
                {getDate(slider[1])}
              </p>
              <p className={style.text} style={{ textAlign: "end" }}>
                {getTime(slider[1])}
              </p>
            </div>
          </Grid>
        </Grid>
      </Grid>

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
