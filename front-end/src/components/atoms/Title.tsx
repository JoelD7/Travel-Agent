import { makeStyles } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { FunctionComponent } from "react";
import { Font } from "../../assets";

type Component = "h1" | "h2" | "h3" | "h4";

export const Title: FunctionComponent<{
  component: Component;
  style?: CreateCSSProperties<{}>;
}> = ({ children, component , style}) => {
  let componentParser = {
    h1: "32px",
    h2: '26px',
    h3: "22px",
    h4: "18px",
  };

  const titleStyles = makeStyles({
    text: {
      fontSize: componentParser[component],
      fontWeight: "bold",
      fontFamily: Font.Family,
      marginBottom: '5px',
      ...style,
    },
  });

  const styles = titleStyles();

  return <p className={styles.text}>{children}</p>;
};
