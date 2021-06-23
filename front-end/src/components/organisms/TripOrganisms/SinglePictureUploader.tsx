import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, LinearProgress, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../styles";
import { compressImage, firebase, getProfileRef, getUserTripRef } from "../../../utils";
import { Text } from "../../atoms";

interface SinglePictureUploaderProps {
  onUpload: (url: string, savedName: string) => void;
  picture: File;
  images: File[];
  type: "tripImages" | "profilePic";
  /**
   * If set, the picture will upload to Firebase
   * when the component is mounted.
   */
  uploadOnMount?: boolean;
  updateState: (values: File[]) => void;
}

export function SinglePictureUploader({
  type,
  uploadOnMount = true,
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

  const [isDeleted, setIsDeleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const baseRef: firebase.storage.Reference =
    type === "tripImages" ? getUserTripRef() : getProfileRef();

  let imageRef: firebase.storage.Reference = baseRef.child(picture.name);

  useEffect(() => {
    if (uploadOnMount) {
      uploadPicture();
    }
  }, []);

  async function uploadPicture() {
    let fileToSave: File = picture;

    if (picture.size > 250000) {
      fileToSave = await compressImage(picture);
      imageRef = baseRef.child(fileToSave.name);
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
        imageRef = baseRef.child(fileToDelete.name);
      }

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
    <div style={{ width: "100%" }}>
      {uploadOnMount && (
        <>
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
        </>
      )}
    </div>
  );
}
