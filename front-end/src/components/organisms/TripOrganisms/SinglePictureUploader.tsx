import { Grid, LinearProgress, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../styles";
import {
  storage,
  firebase,
  compressImage,
  selectIdPerson,
  AlbumPicture,
  selectAlbumPictures,
  getISODatetimeWithOffset,
  setAlbumPictures,
  selectAutoDeletePicture,
  store,
} from "../../../utils";
import { Text } from "../../atoms";

interface SinglePictureUploaderProps {
  picture: File;
}

export function SinglePictureUploader({ picture }: SinglePictureUploaderProps) {
  const stylesFunction = makeStyles((theme: Theme) => ({
    colorPrimary: {
      backgroundColor: "#3bab4252",
    },
    progressBar: {
      width: "85%",
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

  const [progress, setProgress] = useState(0);
  const idPerson: number = useSelector(selectIdPerson);
  const autoDeletePicture: boolean = useSelector(selectAutoDeletePicture);
  const userTripRef: firebase.storage.Reference = storage
    .ref()
    .child(`images/trips/${idPerson}`);
  const imageRef: firebase.storage.Reference = userTripRef.child(picture.name);

  useEffect(() => {
    uploadPicture();
  }, []);

  useEffect(() => {
    if (autoDeletePicture) {
      deletePicture();
    }
  }, [autoDeletePicture]);

  async function uploadPicture() {
    let fileToSave: File = picture;

    if (picture.size > 250000) {
      fileToSave = await compressImage(picture);
    }

    let uploadTask = imageRef.put(fileToSave);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {},
      async () => {
        let url: string = await uploadTask.snapshot.ref.getDownloadURL();

        let newAlbumPicture: AlbumPicture = {
          idPicture: null,
          pictureUrl: url,
          date: getISODatetimeWithOffset(new Date(picture.lastModified)),
        };

        const albumPictures: AlbumPicture[] = store.getState().tripSlice.albumPictures;
        let updatedAlbumPictures: AlbumPicture[] = [...albumPictures, newAlbumPicture];
        store.dispatch(setAlbumPictures(updatedAlbumPictures));
      }
    );
  }

  function deletePicture() {
    imageRef
      .delete()
      .then(() => {
        console.log(`Picture ${picture.name} deleted.`);
      })
      .catch((error) => {
        console.log(`Couldn't delete ${picture.name} | Error: ${error}`);
      });
  }

  return (
    <div>
      <Text style={{ fontSize: "14px", marginBottom: 0 }}>{picture.name}</Text>

      <Grid container alignItems="center">
        <LinearProgress
          className={style.progressBar}
          classes={{ colorPrimary: style.colorPrimary }}
          value={progress}
          variant="determinate"
        />
        <Text
          className={style.percentText}
          style={{ marginBottom: 0, marginLeft: 5 }}
        >{`${progress} %`}</Text>
      </Grid>
    </div>
  );
}
