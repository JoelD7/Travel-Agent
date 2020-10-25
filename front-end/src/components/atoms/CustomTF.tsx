import { TextField } from "@material-ui/core";
import { CreateCSSProperties, makeStyles } from "@material-ui/styles";
import React, { ChangeEvent, ReactNode, useState } from "react";
import { FONT } from "../../assets/fonts";
import { Colors } from "../../styles";

interface CustomTFProps {
  value: string;
  updateState: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  containerStyle?: CreateCSSProperties<{}>;
  textStyle?: string;
  startAdornment?: ReactNode;
  size?: "small" | "medium";
  backgroundColor?: string;
  outlineColor?: string;
  width?: string;
  placeholder?: string;
  rounded?: boolean;
  numeric?: boolean;
}

export function CustomTF({
  containerStyle,
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
}: CustomTFProps) {
  const [text, setText] = useState(value);

  const fieldStyles = makeStyles({
    textField: {
      marginLeft: "10px",
      width: width,
      backgroundColor: backgroundColor,
      borderRadius: rounded ? "20px" : "5px",

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
      fontFamily: FONT,
      color: Colors.BLUE,
    },
    inputAdornedStart: {
      marginLeft: "5px",
    },
  });

  const style = fieldStyles();

  function onTextChanged(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
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
      value={text}
      size={size}
      placeholder={placeholder}
      className={style.textField}
      InputProps={{
        classes: {
          root: style.text,
          inputAdornedStart: style.inputAdornedStart,
        },
        startAdornment: startAdornment,
      }}
      variant={"outlined"}
      onChange={onTextChanged}
      onBlur={updateState}
    />
  );
}
