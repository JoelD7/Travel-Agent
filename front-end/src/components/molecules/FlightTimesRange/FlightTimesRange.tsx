import React from "react";
import { Colors } from "../../../styles";
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
  max: Date | undefined;
  min: Date | undefined;
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
    <div style={{ marginBottom: "25px" }}>
      <div>
        <p style={{ fontSize: "14px", color: Colors.BLUE }}>
          {" "}
          <b style={{ fontSize: "16px" }}>{label}</b> {city}
        </p>

        <DatetimeRange
          max={max ? max : new Date()}
          min={min ? min : new Date()}
          updateState={(slider) =>
            onDateRangeChanged(slider, flightDateRangeField, destinationDateRangeField)
          }
          value={destinationDateRangeValue as Date[]}
        />
      </div>
    </div>
  );
}
