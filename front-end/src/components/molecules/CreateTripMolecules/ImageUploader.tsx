import React, { useRef, useState } from "react";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import { CustomButton, Text } from "../../atoms";
import { Colors } from "../../../styles";

interface ImageUploader {
  updateState: (value: string) => void;
  image: string;
}

export function ImageUploader({ updateState, image: imageParam }: ImageUploader) {
  const EMPTY_IMAGE = "/Travel-Agent/gallery.png";
  const IMAGE_WIDTH = 385;

  const [image, setImage] = useState(imageParam);

  const imageUploaderStyles = makeStyles((theme: Theme) => ({
    button: {
      fontSize: "14px !important",
    },
    buttonContainer: {
      marginTop: 10,
    },
    image: {
      objectFit: "cover",
      height: "100%",
      margin: "auto",
      borderRadius: 10,
    },
    imageGrid: {
      height: isImageEmpty() ? "90%" : "100%",
      display: "flex",
    },
    uploaderContainer: {
      border: "1px solid #cecece",
      borderRadius: 10,
      padding: isImageEmpty() ? 10 : 0,
      width: IMAGE_WIDTH,
      height: 265,
    },
  }));

  const style = imageUploaderStyles();

  const hiddenInputFileRef = useRef(null);

  function onUploadButtonClick() {
    //@ts-ignore
    hiddenInputFileRef.current.click();
  }

  function onRemoveImageClick() {
    setImage(EMPTY_IMAGE);
  }

  function onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      console.log(URL.createObjectURL(img));
    }
  }

  function isImageEmpty() {
    return image === EMPTY_IMAGE;
  }

  return (
    <div onBlur={() => updateState(image)}>
      <Grid container className={style.uploaderContainer}>
        <Grid item xs={12} className={style.imageGrid}>
          <img src={image} className={style.image} alt="trip-cover" />
        </Grid>

        {isImageEmpty() && (
          <Grid item xs={12} style={{ display: "flex" }}>
            <Text style={{ margin: "auto" }} color="#cecece">
              Upload an image
            </Text>
          </Grid>
        )}

        <input
          hidden
          ref={hiddenInputFileRef}
          type="file"
          name="trip-cover"
          onChange={onImageChange}
        />
      </Grid>

      {/* Buttons */}
      <Grid container className={style.buttonContainer}>
        {/* Choose an image */}
        <Grid item xs={12}>
          <CustomButton
            className={style.button}
            rounded
            onClick={() => onUploadButtonClick()}
          >
            {isImageEmpty() ? `Choose an image` : `Change the image`}
          </CustomButton>
        </Grid>

        {/* Remove an image */}
        <Grid item xs={12}>
          {!isImageEmpty() && (
            <CustomButton
              className={style.button}
              backgroundColor={Colors.RED}
              style={{ marginTop: 10 }}
              rounded
              onClick={() => onRemoveImageClick()}
            >
              Remove image
            </CustomButton>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
