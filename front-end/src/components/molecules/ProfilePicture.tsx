import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Grid, IconButton, makeStyles, Theme } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  avatar,
  deleteImageFromFirebase,
  profileRef,
  Person,
  selectPerson,
} from "../../utils";
import { IconTP } from "../atoms";
import { SinglePictureUploader } from "../organisms";

interface ProfilePictureProps {
  updateProfilePic: (url: string) => void;
}

export function ProfilePicture({ updateProfilePic }: ProfilePictureProps) {
  const stylesFunction = makeStyles((theme: Theme) => ({
    deleteButton: {
      marginTop: 75,
      right: 147,
    },
    image: {
      objectFit: "contain",
      height: "89%",
    },
    imageContainer: {
      borderRadius: "50%",
      width: 135,
      height: 135,
      border: "1px solid #cecece",
      backgroundImage: `url('${url}')`,
      backgroundPositionX: "50%",
      backgroundSize: "cover",
    },

    uploadButton: {
      position: "absolute",
      marginLeft: 60,
      marginTop: 80,
    },
  }));

  const [url, setUrl] = useState(avatar);
  const [images, setImages] = useState<File[]>([]);
  const hiddenInputFileRef = useRef<HTMLInputElement>(null);
  const person: Person | undefined = useSelector(selectPerson);

  const style = stylesFunction();

  useEffect(() => {
    if (person && person.profilePic !== null) {
      fetch(person.profilePic)
        .then((res) => res.blob())
        .then((blob) => {
          setImages([new File([blob], "")]);
        });
    }
  }, []);

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      let imageFiles: File[] = [];
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const imageFile = event.target.files[key];
          imageFiles.push(imageFile);
        }
      }

      setImages(imageFiles);
      setUrl(URL.createObjectURL(imageFiles[0]));
    }
  }

  function onUploadButtonClick() {
    //@ts-ignore
    hiddenInputFileRef.current.click();
  }

  function deletePicture() {
    setUrl(avatar);
    setImages([]);
    deleteImageFromFirebase(images[0], profileRef);
  }

  function onPictureUploadSucess(url: string, savedName: string, image: File) {
    updateProfilePic(url);
  }

  function updateState(values: File[]) {
    setUrl(URL.createObjectURL(values[0]));
    setImages(values);
  }

  return (
    <Grid container justify="center" style={{ width: "auto" }}>
      {/* Picture */}
      <Grid
        container
        justify="center"
        alignItems="center"
        className={style.imageContainer}
      ></Grid>

      {/* Delete button */}
      <IconButton onClick={() => deletePicture()} className={style.deleteButton}>
        <IconTP icon={faTimes} />
      </IconButton>

      {images.length > 0 && (
        <SinglePictureUploader
          key={images[0].name}
          type="profilePic"
          picture={images[0]}
          onUpload={(url, savedName) => onPictureUploadSucess(url, savedName, images[0])}
          images={images}
          updateState={(values) => updateState(values)}
        />
      )}

      {/* Edit button */}
      <IconButton onClick={() => onUploadButtonClick()} className={style.uploadButton}>
        <IconTP icon={faPencilAlt} />
      </IconButton>

      <input
        hidden
        ref={hiddenInputFileRef}
        type="file"
        name="trip-cover"
        onChange={onImageChange}
      />
    </Grid>
  );
}
