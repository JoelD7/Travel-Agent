import { createMuiTheme, makeStyles, TextField } from "@material-ui/core";
import {
  CreateCSSProperties,
  CSSProperties,
  ThemeProvider,
} from "@material-ui/styles";
import React, { ChangeEvent, ReactNode, SetStateAction, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FONT } from "../../assets/fonts";
import { BLUE, PURPLE } from "../../styles";

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
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error: boolean;
  helperText: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type TextInputType = PartialBy<
  TextInputProps,
  | "style"
  | "label"
  | "type"
  | "className"
  | "endAdornment"
  | "coPassword"
  | "updateState"|"onChange" |"onBlur"
>;

export default function TextInput({
  name,
  label,
  value,
  style,
  className,
  type,
  endAdornment,
  coPassword,
  updateState,
  // onChange,
  onBlur,
  error,
  helperText,
  setFieldValue,
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
  const [text, setText] = useState(value);

  // const [error, setError] = useState(false);
  // const [helperText, setHelperText] = useState("");

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

//#region Methods
  function onChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (!Number.isFinite(Number(e.target.value)) || e.target.value === "") {
      setText(e.target.value);
    }
  }

  // function validateInput() {
  //   if (updateState !== undefined) {
  //     updateState(name, text);
  //   }

  //   if (text === "") {
  //     setError(true);
  //     setHelperText("Required");
  //     return;
  //   }

  //   switch (name) {
  //     case "email":
  //       if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)) {
  //         setError(true);
  //         setHelperText("Invalid email address");
  //       } else {
  //         setError(false);
  //         setHelperText("");
  //       }
  //       break;
  //     case "password":
  //     case "passwordConfirmation":
  //       if (coPassword && text !== coPassword && coPassword !== "") {
  //         setError(true);
  //         setHelperText("The passwords don't match");
  //       } else {
  //         setError(false);
  //         setHelperText("");
  //       }
  //       break;
  //     default:
  //       setError(false);
  //       setHelperText("");
  //       break;
  //   }
  // }
  //#endregion

  return (
    <ThemeProvider theme={theme}>
      <TextField
        // id={name}
        className={className ? className : styles.textField}
        InputProps={{
          classes: { root: styles.input },
          type: type ? type : "text",
          endAdornment: endAdornment ? endAdornment : <b></b>,
        }}
        name={name}
        label={label}
        value={text}
        error={error}
        helperText={helperText}
        onChange={onChange}
        onBlur={()=>setFieldValue(name, text)}
      />
    </ThemeProvider>
  );
}
