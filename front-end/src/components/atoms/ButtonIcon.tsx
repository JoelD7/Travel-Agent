import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import React, { CSSProperties, MouseEvent, useState } from "react";
import { Colors } from "../../styles";

interface ButtonIconInterface {
  size: "small" | "medium";
  style?: CSSProperties;
  className?: string;
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

  const [hover, setHover] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        size={size}
        style={{...style, backgroundColor: hover ? primary : selected? primary: secondary}}
        className={className}
      >
        <FontAwesomeIcon
          icon={icon}
          color={hover ? (secondary ? secondary : primary): selected? secondary: primary   }
        />
      </IconButton>
    </ThemeProvider>
  );
}
