import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, LinearProgress, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../styles";
import { compressImage, firebase, selectIdPerson, storage } from "../../../utils";
import { Text } from "../../atoms";

interface SinglePictureUploaderProps {
  onUpload: (url: string, savedName: string) => void;
  picture: File;
  images: File[];
  updateState: (values: File[]) => void;
}

export function SinglePictureUploader({
  picture,
  onUpload,
  updateState,
  images,
}: SinglePictureUploaderProps) {
  const stylesFunction = makeStyles((theme: Theme) => ({
    colorPrimary: {
      backgroundColor: "#3bab4252",
    },
    progressBar: {
      width: "75%",
      borderRadius: 10,
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: Colors.GREEN,
      },
    },
    percentText: {
      fontSize: "14px",
    },
  }));

  const style = stylesFunction();

  const dispatch = useDispatch();

  const [isDeleted, setIsDeleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const idPerson: number = useSelector(selectIdPerson);
  const userTripRef: firebase.storage.Reference = storage
    .ref()
    .child(`images/trips/${idPerson}`);

  let imageRef: firebase.storage.Reference = userTripRef.child(picture.name);

  useEffect(() => {
    uploadPicture();
  }, []);

  async function uploadPicture() {
    let fileToSave: File = picture;

    if (picture.size > 250000) {
      fileToSave = await compressImage(picture);
      imageRef = userTripRef.child(fileToSave.name);
    }

    let uploadTask = imageRef.put(fileToSave);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {},
      () => {
        onUploadSuccess(uploadTask);
      }
    );
  }

  async function onUploadSuccess(uploadTask: firebase.storage.UploadTask) {
    let url: string = await uploadTask.snapshot.ref.getDownloadURL();
    let savedName = uploadTask.snapshot.ref.name;
    onUpload(url, savedName);
  }

  async function deletePicture() {
    if (!isDeleted) {
      let fileToDelete: File = picture;

      if (picture.size > 250000) {
        fileToDelete = await compressImage(picture);
        imageRef = userTripRef.child(fileToDelete.name);
      }
      console.log(imageRef.fullPath);
      imageRef
        .delete()
        .then(() => {
          setIsDeleted(true);

          let newImages: File[] = images.filter((image) => image.name !== picture.name);
          updateState(newImages);

          console.log(`Picture ${picture.name} deleted.`);
        })
        .catch((error) => {
          console.log(`Couldn't delete ${picture.name} | Error: ${error}`);
        });
    }
  }

  const formatAsInt = Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format;

  return (
    <div>
      <Text style={{ fontSize: "14px", marginBottom: 0 }}>{picture.name}</Text>

      <Grid container alignItems="center">
        <IconButton disabled={progress !== 100} onClick={() => deletePicture()}>
          <FontAwesomeIcon icon={faTimes} size="xs" color={Colors.BLUE} />
        </IconButton>

        <LinearProgress
          className={style.progressBar}
          classes={{ colorPrimary: style.colorPrimary }}
          value={progress}
          variant="determinate"
        />

        <Text
          className={style.percentText}
          style={{ marginBottom: 0, marginLeft: 5 }}
        >{`${formatAsInt(progress)} %`}</Text>
      </Grid>
    </div>
  );
}
