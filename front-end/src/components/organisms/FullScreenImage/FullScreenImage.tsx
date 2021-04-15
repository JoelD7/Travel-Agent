import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

interface FullScreenImage {
  source: string;
}

export function FullScreenImage({ source }: FullScreenImage) {
  const fullScreenImageStyles = makeStyles(() => ({
    photoInSlider: {
      objectFit: "cover",
      height: "100%",
      width: "100%",
      borderRadius: "10px",
    },
  }));

  const style = fullScreenImageStyles();

  let newImg = new Image();
  const [width, setWidth] = useState(0);

  newImg.onload = function () {
    setWidth(newImg.width);
  };

  newImg.src = source;

  return (
    <img
      src={source}
      alt=""
      style={{ maxWidth: `${width}px` }}
      className={style.photoInSlider}
    />
  );
}
