import { createMuiTheme, makeStyles, TextField } from "@material-ui/core";
import { CreateCSSProperties, ThemeProvider } from "@material-ui/styles";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";
import { Colors } from "../../styles";

interface TextInputProps {
  name: string;
  value: string;
  label: string;
  type: string;
  coPassword: string;
  style: CreateCSSProperties<{}>;
  className: string;
  updateState: (name: string, value: string) => void;
  endAdornment: ReactNode;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type TextInputType = PartialBy<
  TextInputProps,
  "style" | "label" | "type" | "className" | "endAdornment" | "coPassword" | "updateState"
>;

export function TextInput({
  name,
  label,
  value,
  style,
  className,
  type,
  endAdornment,
  coPassword,
  updateState,
}: TextInputType) {
  const theme = createMuiTheme({
    overrides: {
      MuiFormLabel: {
        root: {
          fontFamily: Family,
        },
      },
      MuiInputLabel: {
        shrink: {
          color: Colors.PURPLE,
          "&$focused": {
            color: Colors.PURPLE,
          },
        },
      },
      MuiInput: {
        underline: {
          borderBottomColor: Colors.PURPLE,
          "&:hover": {
            borderBottomColor: Colors.PURPLE,
          },
          "&::after": {
            borderBottomColor: Colors.PURPLE,
          },
        },
      },
    },
  });

  const [text, setText] = useState(value);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const textStyles = makeStyles({
    textField: {
      width: "100%",

      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: Colors.GRAY_BORDER_HOVER,
        },
        "&.Mui-focused fieldset": {
          borderColor: Colors.PURPLE,
        },
      },
      ...style,
    },
    input: {
      fontFamily: Font.Family,
      color: Colors.BLUE,

      "&.MuiOutlinedInput-notchedOutline": {
        "&:hover": {
          borderColor: Colors.PURPLE,
        },
      },

      "&.MuiOutlinedInput-input": {
        padding: 10,
      },
    },
    outlinedInput: {
      padding: 10,
    },

    inputLabel: {
      fontFamily: Font.Family,
      color: Colors.GRAY_TEXT,
    },
  });
  const styles = textStyles();

  useEffect(() => {
    setText(value);
  }, [value]);

  function onChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setText(e.target.value);
  }

  function validateInput() {
    if (updateState !== undefined) {
      updateState(name, text);
    }

    if (text === "") {
      setError(true);
      setHelperText("Required");
      return;
    }

    switch (name) {
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)) {
          setError(true);
          setHelperText("Invalid email address");
        } else {
          setError(false);
          setHelperText("");
        }
        break;
      case "newPassword":
      case "newPasswordConfirmation":
        if (coPassword && text !== coPassword && coPassword !== "") {
          setError(true);
          setHelperText("The passwords don't match");
        } else {
          setError(false);
          setHelperText("");
        }
        break;
      default:
        setError(false);
        setHelperText("");
        break;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="outlined"
        margin="dense"
        className={`${styles.textField} ${className}`}
        InputProps={{
          classes: { root: styles.input, input: styles.outlinedInput },
          type: type ? type : "text",
          endAdornment: endAdornment ? endAdornment : <b></b>,
        }}
        InputLabelProps={{
          classes: { root: styles.inputLabel },
        }}
        name={name}
        label={label}
        value={text}
        error={error}
        helperText={helperText}
        onChange={(e) => onChange(e)}
        onBlur={validateInput}
      />
    </ThemeProvider>
  );
}
