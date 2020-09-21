import { createMuiTheme, makeStyles, TextField } from "@material-ui/core";
import {
  CreateCSSProperties,
  CSSProperties,
  ThemeProvider,
} from "@material-ui/styles";
import React, { ChangeEvent, ReactNode } from "react";
import { FONT } from "../../assets/fonts";
import { BLUE, PURPLE } from "../../styles";

interface TextInputProps {
  name: string;
  value: string;
  label: string;
  type: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  style: CreateCSSProperties<{}>;
  className: string;
  endAdornment: ReactNode;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type TextInputType = PartialBy<
  TextInputProps,
  "style" | "label" | "type" | "className" | "endAdornment"
>;

export default function TextInput({
  name,
  label,
  value,
  onChange,
  style,
  className,
  type,
  endAdornment,
}: TextInputType) {
  const theme = createMuiTheme({
    overrides: {
      MuiFormLabel: {
        root: {
          fontFamily: FONT,
        },
      },
      MuiInputLabel: {
        shrink: {
          color: PURPLE,
          "&$focused": {
            color: PURPLE,
          },
        },
      },
      MuiInput: {
        underline: {
          borderBottomColor: PURPLE,
          "&:hover": {
            borderBottomColor: PURPLE,
          },
          "&::after": {
            borderBottomColor: PURPLE,
          },
        },
      },
    },
  });

  const textStyles = makeStyles({
    textField: {
      width: "50%",
      ...style,
    },
    input: {
      fontFamily: FONT,
      color: BLUE,
    },
  });
  const styles = textStyles();

  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={className ? className : styles.textField}
        InputProps={{
          classes: { root: styles.input },
          type: type ? type : "text",
          endAdornment: endAdornment ? endAdornment : <b></b>,
        }}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
      />
    </ThemeProvider>
  );
}
