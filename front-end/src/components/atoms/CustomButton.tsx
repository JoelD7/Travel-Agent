import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { MouseEvent } from "react";
import { FONT } from "../../assets/fonts";
import { Colors } from "../../styles";

interface CustomButtonProps {
  color: string;
  label: string;
  rounded?: boolean;
  style: CreateCSSProperties<{}>;
  className: string;
  icon: IconDefinition;
  submit: boolean;
  onClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type CustomButtonType = PartialBy<
  CustomButtonProps,
  "color" | "style" | "icon" | "submit" | "onClick" | "className"
>;

export function CustomButton({
  color = Colors.BLUE,
  label,
  rounded,
  style,
  icon,
  onClick,
  submit,
  className,
}: CustomButtonType) {
  const buttonStyles = makeStyles({
    button: {
      backgroundColor: color ? color : Colors.BLUE,
      fontFamily: FONT,
      borderRadius: rounded ? '20px' : '',
      "&:hover": {
        backgroundColor: getHoverColor(color),
      },

      textTransform: "capitalize",
      color: "white",
      ...style,
    },
  });

  function getHoverColor(color: string | undefined): string {
    switch (color) {
      case Colors.PURPLE:
        return Colors.PURPLE_HOVER;

      case Colors.BLUE:
        return Colors.BLUE_HOVER;

        case Colors.GREEN:
          return Colors.GREEN_HOVER;
      default:
        return color ? color: "";
    }
  }

  const styles = buttonStyles();

  return (
    <Button
      className={styles.button}
      startIcon={icon ? <FontAwesomeIcon icon={icon} /> : <b></b>}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {label}
    </Button>
  );
}
