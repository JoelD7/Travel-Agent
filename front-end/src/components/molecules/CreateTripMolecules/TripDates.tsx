import DateFnsUtils from "@date-io/date-fns";
import {
  createMuiTheme,
  Grid,
  makeStyles,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, parseISO } from "date-fns";
import React, { useState } from "react";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import { isDateAfterOrEqual, muiDateFormatter } from "../../../utils";
import { Text } from "../../atoms";

interface TripDates {
  startDate: Date;
  endDate: Date;
  updateDates: (startDate: Date, endDate: Date) => void;
}

export function TripDates({ startDate: start, endDate: end, updateDates }: TripDates) {
  const theme = createMuiTheme({
    overrides: {
      //@ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiTypography: {
        h4: {
          fontFamily: Font.Family,
        },
        subtitle1: {
          fontFamily: Font.Family,
        },
        body1: {
          fontFamily: Font.Family,
        },
        body2: {
          fontFamily: Font.Family,
        },
        caption: {
          fontFamily: Font.Family,
        },
      },
      MuiInput: {
        underline: {
          "&:hover:not(.Mui-disabled):before": {
            borderColor: Colors.BLUE,
          },

          "&::before": {
            borderColor: Colors.BLUE,
            content: '" "',
          },
          "&::after": {
            borderColor: Colors.GREEN,
            content: '" "',
          },
          "&.Mui-focused fieldset": {
            borderColor: "red",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: Font.Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiPickersDay: {
        current: {
          color: Colors.BLUE,
        },
        daySelected: {
          backgroundColor: Colors.BLUE,

          "&:hover": {
            backgroundColor: Colors.BLUE_HOVER,
          },
        },
      },
    },
  });

  const is1170OrLess = useMediaQuery("(max-width:1170px)");

  const tripDateStyles = makeStyles((theme: Theme) => ({
    dateGrid: {
      width: "40%",
      marginRight: 15,
      [theme.breakpoints.down(1310)]: {
        width: "45%",
      },
      [theme.breakpoints.down(1170)]: {
        width: "100%",
      },
    },
    datepicker: {
      backgroundColor: "white",
      fontFamily: Font.Family,
      width: "100%",
      maxWidth: "100%",
      borderRadius: "20px",

      "& .MuiIconButton-root": {
        color: Colors.BLUE,
      },

      "& .MuiOutlinedInput-root": {
        borderRadius: 10,
      },
      "& .MuiOutlinedInput-input": {
        padding: 15,
      },

      "& .MuiInputBase-input": {
        fontFamily: Font.Family,
      },
    },
  }));

  const style = tripDateStyles();

  const [startDate, setStartDate] = useState<Date>(start);
  const [endDate, setEndDate] = useState<Date>(end);

  function onDateChange(date: MaterialUiPickersDate, type: "from" | "to") {
    let newDate: Date = date === null ? new Date() : parseISO(date.toISOString());

    switch (type) {
      case "from":
        if (endDate && isDateAfterOrEqual(newDate, endDate)) {
          setEndDate(addDays(newDate, 1));
        }

        setStartDate(newDate);
        break;

      case "to":
        setEndDate(newDate);
        break;
    }
  }
  return (
    <Grid container onBlur={() => updateDates(startDate, endDate)}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* From */}
          <Grid item className={style.dateGrid}>
            <Text component="h4" color={Colors.GRAY}>
              From
            </Text>
            <KeyboardDatePicker
              value={startDate}
              inputVariant="outlined"
              labelFunc={(date, invalidLabel) =>
                muiDateFormatter(date, invalidLabel, "date")
              }
              className={style.datepicker}
              minDate={new Date()}
              format="dd MMM., yyyy"
              onChange={(d) => onDateChange(d, "from")}
            />
          </Grid>

          {/* To */}
          <Grid
            item
            className={style.dateGrid}
            style={
              is1170OrLess
                ? { marginLeft: "auto", marginTop: 15 }
                : { marginLeft: "auto" }
            }
          >
            <Text component="h4" color={Colors.GRAY}>
              To
            </Text>
            <KeyboardDatePicker
              value={endDate}
              inputVariant="outlined"
              labelFunc={(date, invalidLabel) =>
                muiDateFormatter(date, invalidLabel, "date")
              }
              className={style.datepicker}
              minDate={endDate}
              format="dd MMM., yyyy"
              onChange={(d) => onDateChange(d, "to")}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Grid>
  );
}
