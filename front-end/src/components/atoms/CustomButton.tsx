import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { MouseEvent, ReactNode } from "react";
import { Family } from "../../assets/fonts";
import { Colors } from "../../styles";
import { ProgressCircle } from "./ProgressCircle";

interface CustomButtonProps {
  avatar: ReactNode;
  backgroundColor: string;
  loading?: boolean;
  label?: string;
  size?: number;
  rounded: boolean;
  style: CreateCSSProperties<{}>;
  className: string;
  icon: IconDefinition;
  iconColor?: string;
  disabled?: boolean;
  submit: boolean;
  children?: ReactNode;
  textColor: string;
  type?: "text" | "rounded";
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
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
  children,
  style,
  icon,
  onClick,
  submit,
  disabled,
  loading,
  textColor = "white",
  iconColor,
  type,
  size = 16,
  className,
}: CustomButtonType) {
  const buttonStyles = makeStyles({
    button: {
      backgroundColor:
        type === "text" ? "inherit" : backgroundColor ? backgroundColor : Colors.BLUE,
      textDecoration: type === "text" ? "underline" : "",
      fontFamily: Family,
      padding: `5px ${icon ? "16px" : "10px"} 5px 10px`,
      borderRadius: rounded ? "50px" : "",
      "&:hover": {
        backgroundColor: getHoverColor(),
      },
      fontSize: `${size}px`,
      textTransform: "capitalize",
      color: backgroundColor === Colors.TRANSPARENT ? Colors.BLUE : textColor,
      cursor: "pointer",
      ...style,
    },
  });

  function getHoverColor(): string {
    if (type === "text") {
      return "";
    }

    switch (backgroundColor) {
      case Colors.PURPLE:
        return Colors.PURPLE_HOVER;

      case Colors.BLUE:
        return Colors.BLUE_HOVER;

      case Colors.GREEN:
        return Colors.GREEN_HOVER;

      case Colors.WHITE_TRANSPARENT:
        return Colors.WHITE_TRANSPARENT_HOVER;

      case Colors.RED:
        return Colors.RED_HOVER;

      case Colors.ORANGE:
        return Colors.ORANGE_HOVER;

      case Colors.TRANSPARENT:
        return Colors.TRANSPARENT_HOVER;
      default:
        return backgroundColor ? backgroundColor : "inherit";
    }
  }

  const styles = buttonStyles();

  function renderIcon(): ReactNode {
    return icon ? (
      iconColor ? (
        <div>
          <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={icon} color={iconColor} />
        </div>
      ) : (
        <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={icon} color={iconColor} />
      )
    ) : avatar ? (
      avatar
    ) : (
      <b></b>
    );
  }

  return (
    <Button
      className={`${styles.button} ${className}`}
      disabled={disabled || loading}
      startIcon={renderIcon()}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {loading ? (
        <Grid container alignItems="center" justify="center">
          <ProgressCircle style={{ top: 4 }} size={20} color="white" />{" "}
        </Grid>
      ) : (
        children
      )}
    </Button>
  );
}
