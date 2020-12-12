import { makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { FunctionComponent } from "react";
import { Font } from "../../assets";

type Component = "h1" | "h2" | "h3";

export const Title: FunctionComponent<{
  component: Component;
  style: CreateCSSProperties<{}>;
}> = ({ children, component , style}) => {
  let componentParser = {
    h1: "28px",
    h2: "22px",
    h3: "20px",
  };

  const titleStyles = makeStyles({
    text: {
      fontSize: componentParser[component],
      fontWeight: "bold",
      fontFamily: Font.Family,
      ...style,
    },
  });

  const styles = titleStyles();

  return <p className={styles.text}>{children}</p>;
};
