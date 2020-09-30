import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import React, { CSSProperties, MouseEvent, useState } from "react";
import {  PURPLE } from "../../styles";

interface ButtonIconInterface {
  size: "small" | "medium";
  style: CSSProperties;
  icon: IconProp;
  onClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ButtonIconType = PartialBy<ButtonIconInterface, "style">;

export function ButtonIcon({ icon, size, style, onClick }: ButtonIconType) {
  const theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  });

  const [hover, setHover] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        size={size}
        style={style}
      >
        <FontAwesomeIcon icon={icon} color={hover ? PURPLE : "#b1b1b1"} />
      </IconButton>
    </ThemeProvider>
  );
}
