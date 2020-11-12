import React from "react";
import { DatetimeRange } from "../DatetimeRange/DatetimeRange";

interface FlightTimesRange {
  onDateRangeChanged: (
    slider: number[],
    flightDateRangeField: "exitFlightDates" | "returnFlightDates",
    destinationDateRangeField: "departureDatetimeRange" | "arrivalDatetimeRange"
  ) => void;

  flightDateRangeField: "exitFlightDates" | "returnFlightDates";
  destinationDateRangeField: "departureDatetimeRange" | "arrivalDatetimeRange";
  destinationDateRangeValue: Date[] | undefined;
  label: string;
  city: string;
  max: Date | undefined,
  min: Date | undefined,
}

export function FlightTimesRange({
  onDateRangeChanged,
  flightDateRangeField,
  destinationDateRangeField,
  destinationDateRangeValue,
  label,
  city,
  max, 
  min,
}: FlightTimesRange) {
  return (
    <div>
      <div>
        <p style={{ fontSize: "14px" }}>
          {" "}
          <b style={{ fontSize: "16px" }}>{label}</b> {city}
        </p>

        <DatetimeRange
          max={max ? max : new Date()}
          min={min ? min : new Date()}
          updateState={(slider) =>
            onDateRangeChanged(
              slider,
              flightDateRangeField,
              destinationDateRangeField
            )
          }
          value={destinationDateRangeValue as Date[]}
        />
      </div>
    </div>
  );
}
