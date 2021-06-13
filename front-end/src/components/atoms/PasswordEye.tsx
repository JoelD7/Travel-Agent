import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, InputAdornment } from "@material-ui/core";
import React from "react";

interface PasswordProps {
  visible: boolean;
  onClick: () => void;
}

export function PasswordEye({ onClick, visible }: PasswordProps) {
  return (
    <InputAdornment position="end">
      <IconButton onClick={() => onClick()}>
        <FontAwesomeIcon transform="shrink-4" icon={visible ? faEye : faEyeSlash} />
      </IconButton>
    </InputAdornment>
  );
}
