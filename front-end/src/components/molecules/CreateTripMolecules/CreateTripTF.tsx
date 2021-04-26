import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { makeStyles, TextField, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { useState } from "react";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import { formatAsCurrency } from "../../../utils";
import { IconTP } from "../../atoms";

interface CreateTripTF {
  value: string;
  updateState: (v: string) => void;
  placeholder: string;
  numeric?: boolean;
  style?: CSSProperties;
  icon: IconDefinition;
}

/**
 * Text field that holds the name of a
 * new trip.
 */
export function CreateTripTF({
  value,
  updateState,
  placeholder,
  numeric,
  style: styleParam,
  icon,
}: CreateTripTF) {
  const textFieldStyles = makeStyles((theme: Theme) => ({
    textField: {
      backgroundColor: Colors.TF_BACKGROUND,
      borderRadius: 10,

      "& .MuiInputBase-root": {
        fontSize: 18,
        borderRadius: 10,
        fontFamily: Font.Family,
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
      ...styleParam,
    },
  }));

  const style = textFieldStyles();

  const [text, setText] = useState(value);

  /**
   * When the textfield is used for numeric values
   * a formatter is applied to show the value as currency when the
   * component loses focus.
   *
   * This variable is used to store the unformatted value in
   * order to restore the text to its original form when
   * the component gets focus again.
   */
  const [unformattedText, setUnformattedText] = useState(value);

  function onTextChanged(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    let newValue = e.target.value;

    if (numeric) {
      if (Number.isFinite(Number(newValue)) || newValue === "") {
        setText(newValue);
        setUnformattedText(newValue);
      }
    } else {
      setText(newValue);
      setUnformattedText(newValue);
    }
  }

  function onBlur() {
    if (numeric) {
      setText(formatAsCurrency(Number(text)));
    }
    updateState(text);
  }

  return (
    <TextField
      value={text}
      variant="outlined"
      size="small"
      onBlur={() => onBlur()}
      onFocus={() => setText(unformattedText)}
      placeholder={placeholder}
      multiline={!numeric}
      className={style.textField}
      onChange={onTextChanged}
      InputProps={{
        endAdornment: <IconTP style={{ marginLeft: 7 }} icon={icon} />,
      }}
    />
  );
}
