import { makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { FunctionComponent } from "react";
import { Font } from "../../assets";

type Component = "h1" | "h2" | "h3" | "h4" | "h5" | "p";

export const Text: FunctionComponent<{
  component: Component;
  className?: string;
  weight?: "bold" | "bolder" | "normal";
  style?: CreateCSSProperties<{}>;
}> = ({ children, component, style, className, weight = "bold" }) => {
  let componentParser = {
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
      fontWeight: component === "h1" ? "bold" : component === "p" ? "normal" : weight,
      fontFamily: Font.Family,
      margin: `${component === "p" ? "0px 0px 10px 0px" : "2px 0px"}`,
      ...style,
    },
  });

  const styles = textStyles();

  return <p className={`${styles.text} ${className}`}>{children}</p>;
};
