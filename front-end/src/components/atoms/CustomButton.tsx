import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { MouseEvent } from "react";
import { FONT } from "../../assets/fonts";
import { BLUE, BLUE_HOVER } from "../../styles";

interface CustomButtonProps {
  color: string;
  label: string;
  style: CreateCSSProperties<{}>;
  icon: IconDefinition;
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type CustomButtonType = PartialBy<
  CustomButtonProps,
  "color" | "style" | "icon"
>;

export default function CustomButton({
  color,
  label,
  style,
  icon,
  onClick,
}: CustomButtonType) {
  const buttonStyles = makeStyles({
    button: {
      backgroundColor: color ? color : BLUE,
      fontFamily: FONT,
      "&:hover": {
        backgroundColor: BLUE_HOVER,
      },

      textTransform: "capitalize",
      color: "white",
      ...style,
    },
  });

  const styles = buttonStyles();

  return (
    <Button
      className={styles.button}
      startIcon={icon ? <FontAwesomeIcon icon={icon} /> : <b></b>}
      onClick={onClick} 
    >
      {label}
    </Button>
  );
}
