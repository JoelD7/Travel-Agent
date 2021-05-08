import React, { ChangeEvent, useRef, useState } from "react";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import { CustomButton, Text } from "../../atoms";
import { Colors, Shadow } from "../../../styles";

interface ImageUploader {
  updateState: (values: string[]) => void;
  images: string[];
  multiple?: boolean; //To upload several images
  buttonText?: string;
  noImageText?: string;
}

export function ImageUploader({
  updateState,
  multiple,
  images: imagesParam,
  noImageText = "Upload an image",
}: ImageUploader) {
  const EMPTY_IMAGE = "/Travel-Agent/gallery.png";
  const IMAGE_WIDTH = 385;

  const [images, setImages] = useState<string[]>(imagesParam);

  const imageUploaderStyles = makeStyles((theme: Theme) => ({
    button: {
      fontSize: "14px !important",
      boxShadow: Shadow.LIGHT3D,
    },
    buttonContainer: {
      marginTop: 10,
    },
    image: {
      objectFit: "cover",
      height: "100%",
      width: isImageEmpty() ? "auto" : "100%",
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

      [theme.breakpoints.down(1255)]: {
        width: "84%",
      },
    },
  }));

  const style = imageUploaderStyles();

  const hiddenInputFileRef = useRef(null);

  function onUploadButtonClick() {
    //@ts-ignore
    hiddenInputFileRef.current.click();
  }

  function onRemoveImageClick() {
    setImages([EMPTY_IMAGE]);
  }

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      let imageFiles: string[] = [];

      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const imageFile = event.target.files[key];
          imageFiles.push(URL.createObjectURL(imageFile));
        }
      }
      setImages(imageFiles);
    }
  }

  function isImageEmpty() {
    return images[0] === EMPTY_IMAGE;
  }

  function getButtonText() {
    if (multiple) {
      return `Choose your images`;
    } else {
      return isImageEmpty() ? "Choose an image" : "Change the image";
    }
  }

  return (
    <div onBlur={() => updateState(images)}>
      <Grid container className={style.uploaderContainer}>
        <Grid item xs={12} className={style.imageGrid}>
          <img src={images[0]} className={style.image} alt="trip-cover" />
        </Grid>

        {isImageEmpty() && (
          <Grid item xs={12} style={{ display: "flex" }}>
            <Text style={{ margin: "auto" }} color="#cecece">
              {noImageText}
            </Text>
          </Grid>
        )}

        <input
          hidden
          ref={hiddenInputFileRef}
          multiple={multiple}
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
            backgroundColor={Colors.PURPLE}
            rounded
            onClick={() => onUploadButtonClick()}
          >
            {getButtonText()}
          </CustomButton>
        </Grid>

        {/* Remove an image */}
        <Grid item xs={12}>
          {!isImageEmpty() && (
            <CustomButton
              className={style.button}
              backgroundColor={Colors.RED}
              style={{ marginTop: 10, boxShadow: Shadow.LIGHT3D }}
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
