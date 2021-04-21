import { makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { FunctionComponent } from "react";
import { Font } from "../../assets";

export type TextComponent = "hm" | "h1" | "h2" | "h3" | "h4" | "h5" | "p";

export const Text: FunctionComponent<{
  component?: TextComponent;
  id?: string;
  bold?: boolean;
  color?: string;
  className?: string;
  weight?: "bold" | "bolder" | "normal" | 500 | 700;
  style?: CreateCSSProperties<{}>;
  endParagraph?: boolean;
}> = ({
  children,
  id,
  endParagraph,
  component = "p",
  style,
  className,
  bold,
  color = "black",
  weight,
}) => {
  let componentParser = {
    hm: "48px",
    h1: "32px",
    h2: "26px",
    h3: "22px",
    h4: "18px",
    h5: "16px",
    p: "16px",
  };

  const textStyles = makeStyles({
    text: {
      fontSize: componentParser[component],
      fontWeight: getFontWeight(),
      fontFamily: Font.Family,
      color: color,
      margin: `${component === "p" ? "0px 0px 10px 0px" : "2px 0px"}`,
      ...style,
    },
  });

  const styles = textStyles();

  function getFontWeight() {
    if (weight) {
      return weight;
    } else if (component === "p") {
      return bold ? "bold" : "normal";
    } else {
      return "bold";
    }
  }

  return (
    <p id={id} className={`${className} ${styles.text}`}>
      {children}
    </p>
  );
};
