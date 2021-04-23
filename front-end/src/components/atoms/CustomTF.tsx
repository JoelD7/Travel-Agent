import { TextField } from "@material-ui/core";
import { AutocompleteRenderInputParams } from "@material-ui/lab";
import { CreateCSSProperties, makeStyles } from "@material-ui/styles";
import React, { ChangeEvent, ReactNode, useState } from "react";
import { Family } from "../../assets/fonts";
import { Colors } from "../../styles";

interface CustomTFProps {
  value: string;
  updateState?: (text: string) => void;
  containerStyle?: CreateCSSProperties<{}>;
  className?: string;
  textStyle?: string;
  startAdornment?: ReactNode;
  size?: "small" | "medium";
  backgroundColor?: string;
  outlineColor?: string;
  width?: string;
  placeholder?: string;
  rounded?: boolean;
  error?: boolean;
  helperText?: string;
  params?: AutocompleteRenderInputParams;
  numeric?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onFocus?: () => void;
}

export function CustomTF({
  containerStyle,
  onFocus,
  onChange,
  updateState,
  textStyle,
  value,
  startAdornment,
  size = "small",
  backgroundColor = "white",
  outlineColor = "#cecece",
  width = "300px",
  placeholder,
  rounded,
  numeric,
  params,
  className,
  error,
  helperText,
}: CustomTFProps) {
  const [text, setText] = useState(value);

  const fieldStyles = makeStyles({
    textField: {
      width: className ? "" : width,
      /**
       * If this has a background color, the "required alert" message's
       * background will have the same color, which is not
       * desired.
       */
      // backgroundColor: backgroundColor,
      borderRadius: rounded ? "20px" : "5px",

      "& .MuiInputBase-root": {
        height: "32px",
      },

      "& .MuiOutlinedInput-root": {
        borderRadius: rounded ? "20px" : "5px",
        "&:hover fieldset": {
          borderColor: outlineColor,
        },
        "&.Mui-focused fieldset": {
          borderColor: outlineColor,
        },
      },
      ...containerStyle,
    },
    text: {
      fontFamily: Family,
      color: Colors.BLUE,
    },
    inputAdornedStart: {
      marginLeft: "5px",
    },
  });

  const style = fieldStyles();

  function onTextChanged(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (numeric) {
      if (Number.isFinite(Number(e.target.value)) || e.target.value === "") {
        setText(e.target.value);
      }
    } else {
      setText(e.target.value);
    }
  }

  return (
    <TextField
      {...params}
      value={text}
      size={size}
      placeholder={placeholder}
      className={` ${className} ${style.textField}`}
      onFocus={onFocus}
      variant={"outlined"}
      // onChange={onTextChanged}
      onChange={onChange ? onChange : onTextChanged}
      onBlur={updateState ? () => updateState(text) : () => {}}
      error={error}
      helperText={helperText}
    />
  );
}
