import DateFnsUtils from "@date-io/date-fns";
import { faPlaneDeparture, faPlus, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  ThemeProvider,
  Grid,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  createMuiTheme,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addHours, compareAsc, parseISO } from "date-fns";
import React, { MouseEvent, useState } from "react";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import { muiDateFormatter } from "../../../utils";
import { IconText, Text } from "../../atoms";
import { includeInTripStyles } from "./includeInTripStyles";

interface IncludeInTripPopover {
  place: Restaurant | POI;
  tripAnchor: HTMLButtonElement | null;
  openPopover: boolean;
  setOpenPopover: (value: React.SetStateAction<boolean>) => void;
  setTripAnchor: (value: React.SetStateAction<HTMLButtonElement | null>) => void;
}

export function IncludeInTripPopover({
  place,
  tripAnchor,
  openPopover,
  setOpenPopover,
  setTripAnchor,
}: IncludeInTripPopover) {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
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
      MuiInputBase: {
        root: {
          fontFamily: Font.Family,
          color: Colors.BLUE,
        },
      },
      //@ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiTypography: {
        h3: {
          fontFamily: Font.Family,
        },
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
      MuiOutlinedInput: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            borderColor: "#cecece",
          },
        },
      },
      MuiPickerDTTabs: {
        tabs: {
          backgroundColor: Colors.GREEN,
        },
      },
      PrivateTabIndicator: {
        colorSecondary: {
          backgroundColor: "white",
        },
      },
      MuiPickersClock: {
        pin: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiPickersClockPointer: {
        pointer: {
          backgroundColor: Colors.BLUE,
        },
        thumb: {
          border: `14px solid ${Colors.BLUE}`,
        },
        noPoint: {
          backgroundColor: Colors.BLUE,
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
      MuiInput: {
        underline: {
          "&:hover": {
            "&:not(.Mui-disabled)": {
              "&::before": {
                borderBottom: `2px solid ${Colors.GREEN}`,
              },
            },
          },
          "&::after": {
            borderBottom: `2px solid ${Colors.PURPLE}`,
          },
        },
      },
    },
  });

  const style = includeInTripStyles();

  const [trip, setTrip] = useState<string>("Journey Through the Alps");
  const tripOptions = ["Journey Through the Alps", "Andes Walk", "Europe in the Snow"];

  const datetimePopoverParams = [
    {
      label: "Start",
      variable: "start",
    },
    {
      label: "End",
      variable: "end",
    },
  ];

  const [datetimePopover, setDatetimePopover] = useState<{ [index: string]: Date }>({
    start: new Date(),
    end: addHours(new Date(), 1),
  });

  const [openSnack, setOpenSnack] = useState(false);

  function onPopoverClose() {
    setTripAnchor(null);
    setOpenPopover(false);
  }

  function onPopoverDateChange(date: MaterialUiPickersDate, variable: string) {
    if (date === null) {
      setDatetimePopover({
        ...datetimePopover,
        [variable]: new Date(),
      });
      return;
    }

    if (variable === "start" && isStartDateAfterEndDate(date)) {
      setOpenSnack(true);
      setDatetimePopover({
        start: new Date(),
        end: addHours(new Date(), 1),
      });
      return;
    }

    setDatetimePopover({
      ...datetimePopover,
      [variable]: parseISO(date.toISOString()),
    });
  }

  function isStartDateAfterEndDate(start: MaterialUiPickersDate): boolean {
    let parsedDate: Date = start === null ? new Date() : parseISO(start.toISOString());
    return compareAsc(parsedDate, datetimePopover.end) !== -1;
  }

  return (
    <>
      <Popover
        open={openPopover}
        anchorEl={tripAnchor}
        onClose={() => onPopoverClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{ paper: style.popoverPaper }}
      >
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              {/* Trip */}
              <Grid item className={style.labelGrid}>
                <Grid container>
                  <IconText icon={faPlaneDeparture}></IconText>
                  <Text component="h4" bold color={Colors.BLUE}>
                    Trip
                  </Text>
                </Grid>
              </Grid>

              <Grid item className={style.selectGrid}>
                <FormControl>
                  <Select
                    value={trip}
                    style={{ height: "30px", width: "276px" }}
                    classes={{ icon: style.selectIcon }}
                    variant="outlined"
                    className={style.select}
                    onChange={(e) => setTrip(e.target.value as string)}
                  >
                    {tripOptions.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Datetimes */}
              {datetimePopoverParams.map((param) => (
                <Grid container key={param.label} style={{ marginTop: "10px" }}>
                  {/* label and icon */}
                  <Grid item className={style.labelGrid}>
                    <Grid container>
                      <IconText icon={faClock}></IconText>
                      <Text component="h4" bold color={Colors.BLUE}>
                        {param.label}
                      </Text>
                    </Grid>
                  </Grid>

                  {/* Select */}
                  <Grid item className={style.selectGrid}>
                    <KeyboardDateTimePicker
                      value={datetimePopover[param.variable]}
                      labelFunc={(date, invalidLabel) =>
                        muiDateFormatter(date, invalidLabel, "datetime")
                      }
                      className={style.datepicker}
                      minDate={new Date()}
                      format="EEE. d/MMM, yyyy 'at' h:mm"
                      onChange={(date) => onPopoverDateChange(date, param.variable)}
                    />
                  </Grid>
                </Grid>
              ))}

              {/* Add button */}
              <Grid container>
                <IconButton
                  style={{ margin: "10px 0px 0px auto", backgroundColor: Colors.GREEN }}
                >
                  <FontAwesomeIcon icon={faPlus} color="white" />
                </IconButton>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Popover>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnack(false)}
          severity="error"
        >
          The start date and time cannot be after the end date and time.
        </Alert>
      </Snackbar>
    </>
  );
}
