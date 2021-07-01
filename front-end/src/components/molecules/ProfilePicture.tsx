import { faPencilAlt, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Grid, IconButton, makeStyles, Theme } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloudImage } from "../../assets";
import {
  deleteImageFromFirebase,
  proxyUrl,
  Person,
  selectPerson,
  ProfileCredentials,
  setPerson,
  setUserTripsFromPerson,
  backend,
  getProfileRef,
} from "../../utils";
import { IconTP } from "../atoms";
import { SinglePictureUploader } from "../organisms";

interface ProfilePictureProps {
  updateProfilePic: (url: string) => void;
  credentials: ProfileCredentials;
  updateCredentials: (credentials: ProfileCredentials) => void;
}

export function ProfilePicture({
  updateProfilePic,
  updateCredentials,
  credentials,
}: ProfilePictureProps) {
  const stylesFunction = makeStyles((theme: Theme) => ({
    deleteButton: {
      position: "absolute",
      marginTop: 80,
      marginRight: 107,
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
      margin: "auto",
    },

    uploadButton: {
      position: "absolute",
      marginLeft: 105,
      marginTop: 80,
    },
  }));

  const [url, setUrl] = useState<string>(CloudImage.avatar);
  const [images, setImages] = useState<File[]>([]);
  const hiddenInputFileRef = useRef<HTMLInputElement>(null);
  const person: Person | undefined = useSelector(selectPerson);
  const [autoUpload, setAutoUpload] = useState<boolean>(false);
  const [imageFetched, setImageFetched] = useState<boolean>(false);

  const style = stylesFunction();

  const dispatch = useDispatch();

  useEffect(() => {
    if (person && person.profilePic !== null) {
      setUrl(person.profilePic);

      fetch(proxyUrl + person.profilePic)
        .then((res) => res.blob())
        .then((blob) => {
          let imageFile = new File([blob], getFirebaseImageName(person.profilePic));
          setImageFetched(true);
          setImages([imageFile]);
        });
    }
  }, []);

  /**
   * Extracts the file name from the url.
   */
  function getFirebaseImageName(url: string): string {
    let urlNoParams = url.split("?")[0];
    let urlPaths = urlNoParams.split("%2F");

    return urlPaths[urlPaths.length - 1];
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

      setImages(imageFiles);
      setAutoUpload(true);
      setUrl(URL.createObjectURL(imageFiles[0]));
    }
  }

  function onUploadButtonClick() {
    //@ts-ignore
    hiddenInputFileRef.current.click();
  }

  async function deletePicture() {
    setUrl(CloudImage.avatar);

    let profileRef = getProfileRef();
    deleteImageFromFirebase(images[0], profileRef);
    setImages([]);

    updateCredentials({ ...credentials, profilePic: null });
    if (person) {
      const res = await backend.put(`/person/${person.uuid}`, {
        ...credentials,
        profilePic: null,
      });
      let editedPerson = res.data;

      dispatch(setPerson(editedPerson));
      setUserTripsFromPerson(editedPerson);
    }
  }

  function onPictureUploadSucess(url: string, savedName: string, image: File) {
    updateProfilePic(url);
  }

  function updateState(values: File[]) {
    if (values.length === 0) {
      //@ts-ignore
      hiddenInputFileRef.current.value = null;
      //@ts-ignore
      hiddenInputFileRef.current.files = null;
      setUrl(CloudImage.avatar);
    } else {
      setUrl(URL.createObjectURL(values[0]));
    }

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
      <IconButton
        disabled={!imageFetched}
        onClick={() => deletePicture()}
        className={style.deleteButton}
      >
        <IconTP icon={faTimes} />
      </IconButton>

      {images.length > 0 && (
        <SinglePictureUploader
          key={images[0].name}
          type="profilePic"
          picture={images[0]}
          uploadOnMount={autoUpload}
          onUpload={(url, savedName) => onPictureUploadSucess(url, savedName, images[0])}
          images={images}
          updateState={(values) => updateState(values)}
        />
      )}

      {/* Edit button */}
      <IconButton
        disabled={!imageFetched}
        onClick={() => onUploadButtonClick()}
        className={style.uploadButton}
      >
        {url === CloudImage.avatar ? (
          <IconTP icon={faPlus} />
        ) : (
          <IconTP icon={faPencilAlt} />
        )}
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
