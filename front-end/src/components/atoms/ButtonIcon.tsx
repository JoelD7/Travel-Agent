import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import React, { CSSProperties, MouseEvent, useState } from "react";

interface ButtonIconInterface {
  size: "small" | "medium";
  style?: CSSProperties;
  className?: string;
  selectable?: boolean;
  selected?: boolean;
  primary: string;
  secondary?: string;
  icon: IconProp;
  onClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ButtonIconType = PartialBy<ButtonIconInterface, "style">;

export function ButtonIcon({
  icon,
  size,
  style,
  onClick,
  className,
  primary,
  selected,
  secondary,
  selectable,
}: ButtonIconType) {
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

  /**
   * The color assigment logic changes depending 
   * whether the icon button is selectable or not.
   */
  function getStyle() {
    if (selectable) {
      return {
        ...style,
        backgroundColor: hover ? primary : selected ? primary : secondary,
      };
    } else {
      return style;
    }
  }

  function getIconColor() {
    if (selectable) {
      return hover
        ? secondary
          ? secondary
          : primary
        : selected
        ? secondary
        : primary;
    } else {
      return hover ? secondary : primary;
    }
  }

  const [hover, setHover] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        size={size}
        style={getStyle()}
        className={className}
      >
        <FontAwesomeIcon icon={icon} color={getIconColor()} />
      </IconButton>
    </ThemeProvider>
  );
}
