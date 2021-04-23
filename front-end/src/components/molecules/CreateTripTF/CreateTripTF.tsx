import { faFont } from "@fortawesome/free-solid-svg-icons";
import { makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import { IconTP } from "../../atoms";

interface CreateTripTF {
  value: string;
  updateState: (v: string) => void;
}

/**
 * Text field that holds the name of a
 * new trip.
 */
export function CreateTripTF({ value, updateState }: CreateTripTF) {
  const textFieldStyles = makeStyles((theme: Theme) => ({
    textField: {
      "& .MuiInputBase-root": {
        fontSize: 26,
        fontFamily: Font.Family,
        color: Colors.BLUE,
      },

      "& .MuiInput-underline": {
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
  }));

  const style = textFieldStyles();

  const [text, setText] = useState(value);

  function onTextChanged(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <TextField
      value={text}
      placeholder="Name your trip"
      multiline
      onBlur={() => updateState(text)}
      className={style.textField}
      onChange={onTextChanged}
      InputProps={{
        endAdornment: <IconTP style={{ marginLeft: 7 }} icon={faFont} />,
      }}
    />
  );
}
