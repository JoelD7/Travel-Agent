import { Grid, makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { ChangeEvent, useRef, useState } from "react";
import { Colors, Shadow } from "../../../styles";
import { deleteImageFromFirebase, getUserTripRef, firebase } from "../../../utils";
import { CustomButton, Text } from "../../atoms";
import { SinglePictureUploader } from "../../organisms";

interface ImageUploader {
  updateState: (values: File[]) => void;
  images?: File[];
  multiple?: boolean; //To upload several images
  buttonText?: string;
  noImageText?: string;
  onPictureUploadSucess: (url: string, savedName: string, image: File) => void;
  disabled?: boolean;
  containerStyles?: CSSProperties;
}

export function ImageUploader({
  updateState,
  containerStyles,
  disabled = false,
  multiple,
  images: imagesParam,
  onPictureUploadSucess,
  noImageText = "Upload an image",
}: ImageUploader) {
  const EMPTY_IMAGE = "/Travel-Agent/gallery.png";
  const IMAGE_WIDTH = 385;

  const [images, setImages] = useState<File[]>([]);
  const [displayImage, setDisplayImage] = useState<string>(EMPTY_IMAGE);

  const imageUploaderStyles = makeStyles((theme: Theme) => ({
    button: {
      fontSize: "14px !important",
      boxShadow: Shadow.LIGHT3D,
    },
    buttonContainer: {
      marginTop: 2,
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
      ...containerStyles,
    },
  }));

  const style = imageUploaderStyles();

  const hiddenInputFileRef = useRef<HTMLInputElement>(null);

  function onUploadButtonClick() {
    //@ts-ignore
    hiddenInputFileRef.current.click();
  }

  function onRemoveImageClick() {
    //To remove the img from the <input> element.
    //@ts-ignore
    hiddenInputFileRef.current.value = null;
    //@ts-ignore
    hiddenInputFileRef.current.files = null;

    let picture: File = images[0];
    let userTripRef: firebase.storage.Reference = getUserTripRef();
    deleteImageFromFirebase(picture, userTripRef);

    setDisplayImage(EMPTY_IMAGE);
    setImages([]);
    updateState([]);
  }

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      let imageFiles: File[] = [];
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const imageFile = event.target.files[key];
          imageFiles.push(imageFile);
        }
      }

      if (multiple) {
        updateState(imageFiles);
      }

      setImages(imageFiles);
      setDisplayImage(URL.createObjectURL(imageFiles[0]));
    }
  }

  function isImageEmpty() {
    return displayImage === EMPTY_IMAGE;
  }

  function getButtonText() {
    if (multiple) {
      return `Choose your images`;
    } else {
      return isImageEmpty() ? "Choose an image" : "Change the image";
    }
  }

  function getPhotoQtyLabel(): string {
    return `Selected photos: ${images.length}`;
  }

  function updateThisState(values: File[]) {
    updateState(values);
    setImages(values);

    if (values.length > 0) {
      setDisplayImage(URL.createObjectURL(values[0]));
    } else {
      setDisplayImage(EMPTY_IMAGE);
      //@ts-ignore
      hiddenInputFileRef.current.value = null;
      //@ts-ignore
      hiddenInputFileRef.current.files = null;
    }
  }

  return (
    <div onBlur={multiple ? () => {} : () => updateState(images)}>
      <Grid container className={style.uploaderContainer}>
        <Grid item xs={12} className={style.imageGrid}>
          <img src={displayImage} className={style.image} alt="trip-cover" />
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
          {multiple && (
            <Text style={{ marginLeft: "auto", fontSize: 14 }}>{getPhotoQtyLabel()}</Text>
          )}

          {!multiple && images.length > 0 && (
            <SinglePictureUploader
              key={images[0].name}
              type="tripImages"
              picture={images[0]}
              onUpload={(url, savedName) =>
                onPictureUploadSucess(url, savedName, images[0])
              }
              images={images}
              updateState={(values) => updateThisState(values)}
            />
          )}

          {/* Multiple picture upload */}
          {multiple && images.length > 0 && (
            <>
              {images.map((image) => (
                // Image upload progress
                <SinglePictureUploader
                  type="tripImages"
                  key={image.name}
                  picture={image}
                  onUpload={(url, savedName) =>
                    onPictureUploadSucess(url, savedName, image)
                  }
                  images={images}
                  updateState={(values) => updateThisState(values)}
                />
              ))}
            </>
          )}
        </Grid>

        <Grid item xs={12} style={{ marginTop: 15 }}>
          <CustomButton
            className={style.button}
            backgroundColor={Colors.PURPLE}
            disabled={disabled}
            rounded
            onClick={() => onUploadButtonClick()}
          >
            {getButtonText()}
          </CustomButton>
        </Grid>

        {/* Remove an image */}
        <Grid item xs={12}>
          {!isImageEmpty() && !multiple && (
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
