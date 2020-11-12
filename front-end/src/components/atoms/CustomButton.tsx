import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { MouseEvent, ReactNode } from "react";
import { FONT } from "../../assets/fonts";
import { Colors } from "../../styles";

interface CustomButtonProps {
  avatar: ReactNode;
  backgroundColor: string;
  label: string;
  rounded: boolean;
  style: CreateCSSProperties<{}>;
  className: string;
  icon: IconDefinition;
  submit: boolean;
  textColor: string;
  onClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type CustomButtonType = PartialBy<
  CustomButtonProps,
  | "backgroundColor"
  | "style"
  | "icon"
  | "submit"
  | "onClick"
  | "className"
  | "avatar"
  | "textColor"
  | "rounded"
>;

export function CustomButton({
  avatar,
  backgroundColor = Colors.BLUE,
  label,
  rounded,
  style,
  icon,
  onClick,
  submit,
  textColor = "white",
  className,
}: CustomButtonType) {
  const buttonStyles = makeStyles({
    button: {
      backgroundColor: backgroundColor ? backgroundColor : Colors.BLUE,
      fontFamily: FONT,
      borderRadius: rounded ? "50px" : "",
      "&:hover": {
        backgroundColor: getHoverColor(backgroundColor),
      },
      fontSize: "18px",
      textTransform: "capitalize",
      color: backgroundColor === Colors.GREEN ? Colors.BLUE : textColor,
      cursor: "hand",
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

      case Colors.WHITE_TRANSPARENT:
        return Colors.WHITE_TRANSPARENT_HOVER;
      default:
        return color ? color : "";
    }
  }

  const styles = buttonStyles();

  function renderIcon(): ReactNode {
    return icon ? (
      <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={icon} />
    ) : avatar ? (
      avatar
    ) : (
      <b></b>
    );
  }

  return (
    <Button
      className={styles.button}
      startIcon={renderIcon()}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {label}
    </Button>
  );
}
