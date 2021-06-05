import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CSSProperties } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";
import {
  AlbumPicture,
  backend,
  deleteImageFromFirebase,
  getISODatetimeWithOffset,
  selectAlbumPictures,
  selectIdPerson,
  selectUserTrips,
  setAlbumPictures,
  setTripDetail,
  setUserTrips,
  store,
  Trip,
  TripAlbum,
} from "../../../utils";
import { CustomButton, Text } from "../../atoms";
import { ImageUploader } from "../../molecules";

interface TripPictureUploaderProps {
  trip: Trip;
  open: boolean;
  onClose: () => void;
}

export const TripPictureUploader = React.memo(function Component({
  trip,
  open,
  onClose,
}: TripPictureUploaderProps) {
  const stylesFunction = makeStyles((theme: Theme) => ({
    albumPane: {
      width: "50%",
      [theme.breakpoints.down(810)]: {
        width: "100%",
      },
    },
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    closeButton: {
      marginLeft: "auto",
      width: "45px",
      top: 12,
      height: "45px",
      position: "absolute",
      left: "92%",
      [theme.breakpoints.down(500)]: {
        left: "89%",
      },
      [theme.breakpoints.down(420)]: {
        left: "87%",
      },
      [theme.breakpoints.down(470)]: {
        top: 20,
      },
      [theme.breakpoints.down(450)]: {
        top: 30,
      },
    },
    menuItemSelect: {
      borderBottom: `3px solid rgba(0,0,0,0)`,
      margin: "0px 5px",

      "&.MuiMenuItem-root": {
        fontFamily: Font.Family,
      },

      "&.MuiListItem-root": {
        "&.Mui-selected": {
          backgroundColor: "rgba(0,0,0,0)",
          borderBottom: `3px solid ${Colors.GREEN}`,
        },
      },
      "&.MuiListItem-button": {
        "&:hover": {
          borderBottom: `3px solid ${Colors.GREEN}`,
        },
      },
    },
    paper: {
      maxWidth: 855,
      padding: 30,
      height: "90vh",
      [theme.breakpoints.down(810)]: {
        maxWidth: 455,
      },
      [theme.breakpoints.down(585)]: {
        maxWidth: 855,
      },
    },
    photoSelectionGrid: {
      [theme.breakpoints.down(810)]: {
        width: "100%",
      },
    },
    saveButton: {
      boxShadow: Shadow.LIGHT3D,
      marginLeft: "auto",
      fontSize: 18,
    },
    saveButtonGrid: {
      marginTop: 20,
      [theme.breakpoints.down(810)]: {
        width: "100%",
        marginTop: 20,
      },
    },
    selectPhotosPane: {
      width: "50%",
      [theme.breakpoints.down(810)]: {
        width: "100%",
        marginTop: 20,
      },
    },

    select: {
      "& .MuiOutlinedInput-input": {
        padding: "10px 25px 10px 15px",
        borderRadius: "10px",
        margin: "0px 5px",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
      },

      "& .MuiSelect-selectMenu": {
        fontFamily: Font.Family,
      },
    },
    selectIcon: {
      color: Colors.BLUE,
    },
    sortFormControl: {
      borderRadius: "5px",
      width: "270px",
      boxShadow: "2px 2px 6px rgb(116 116 116 / 50%)",

      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: `#cecece !important`,
        },
        "&.Mui-focused fieldset": {
          borderColor: `#cecece !important`,
        },
      },
    },
    textfield: {
      backgroundColor: Colors.TF_BACKGROUND,
      marginBottom: 15,
      width: "84%",
      maxWidth: 335,

      "& .MuiInputBase-root": {
        fontSize: 16,
        borderRadius: 5,
        fontFamily: Font.Family,
      },

      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: Colors.GRAY_BORDER_HOVER,
        },
        "&.Mui-focused fieldset": {
          borderColor: Colors.GREEN,
        },
      },

      "& .MuiOutlinedInput-input": {
        padding: 10,
      },
    },
  }));

  const style = stylesFunction();

  const theme = useTheme();
  const dispatch = useDispatch();

  const imageUploaderStyles: CSSProperties = {
    maxWidth: 400,
    [theme.breakpoints.down(1255)]: {
      width: "385px",
    },
    [theme.breakpoints.down(930)]: {
      width: "95%",
    },
    [theme.breakpoints.down(850)]: {
      width: "90%",
    },
  };

  const [newAlbumName, setNewAlbumName] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [albumCover, setAlbumCover] = useState<File>(new File([""], ""));
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string>("");
  const [openSnack, setOpenSnack] = useState(false);

  const idPerson: number = useSelector(selectIdPerson);
  const albumPictures: AlbumPicture[] = useSelector(selectAlbumPictures);

  const is585pxOrLess = useMediaQuery("(max-width:585px)");

  const albumOptions: string[] = trip.albums.map((album) => album.name);
  const [albumOption, setAlbumOption] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<TripAlbum>();
  const [albums, setAlbums] = useState<TripAlbum[]>();

  useEffect(() => {}, []);

  function areAllPicturesUploaded(): boolean {
    return albumPictures.length === images.length;
  }

  function closeDialog() {
    if (albumPictures.length > 0) {
      deleteAllUploadedPictures();
    }

    onClose();

    setTimeout(() => {
      dispatch(setAlbumPictures([]));
      setImages([]);
    }, 1000);
  }

  async function saveAlbum() {
    dispatch(setAlbumPictures([]));

    let albumDTO: TripAlbum = getAlbumDTO();
    let response = await backend.post(`/album/create?idTrip=${trip.idTrip}`, albumDTO);
    setOpenSnack(true);
    addAlbumToStore(response.data);

    setTimeout(() => {
      onClose();
    }, 1000);
  }

  function getAlbumDTO(): TripAlbum {
    return selectedAlbum
      ? { ...selectedAlbum, pictures: albumPictures }
      : {
          idAlbum: null,
          name: newAlbumName,
          cover: albumCoverUrl,
          pictures: albumPictures,
        };
  }

  function addAlbumToStore(album: TripAlbum) {
    // let updatedUserTrips: Trip[] = userTrips.map((tr) => {
    //   if (tr.idTrip === trip.idTrip) {
    //     let updatedAlbums: TripAlbum[] = [...tr.albums, album];

    //     return { ...tr, albums: updatedAlbums };
    //   }

    //   return tr;
    // });

    let updatedAlbums: TripAlbum[] = [...trip.albums, album];
    dispatch(setTripDetail({ ...trip, albums: updatedAlbums }));
    // dispatch(setUserTrips(updatedUserTrips));
  }

  function onPictureUploadSucess(url: string, image: File) {
    let newAlbumPicture: AlbumPicture = {
      idPicture: null,
      pictureUrl: url,
      date: getISODatetimeWithOffset(new Date(image.lastModified)),
    };

    const albumPictures: AlbumPicture[] = store.getState().tripSlice.albumPictures;
    let updatedAlbumPictures: AlbumPicture[] = [...albumPictures, newAlbumPicture];
    dispatch(setAlbumPictures(updatedAlbumPictures));
  }

  function onAlbumCoverUploadSuccess(url: string, image: File) {
    setAlbumCoverUrl(url);
    onPictureUploadSucess(url, image);
  }

  function deleteAllUploadedPictures() {
    images.forEach((image) => {
      deleteImageFromFirebase(image);
    });
  }

  function onAlbumCoverChange(values: File[]) {
    if (values.length > 0) {
      setAlbumCover(values[0]);
      setImages([...images, values[0]]);
    } else {
      let updatedImages = images.filter((image) => image.name !== values[0].name);
      setImages(updatedImages);
      setAlbumCoverUrl("");
    }
  }

  function onAlbumOptionChange(value: string) {
    setAlbumOption(value);
    if (value === "") {
      setSelectedAlbum(undefined);
      return;
    }

    let albumFound: TripAlbum | undefined = trip.albums.find(
      (album) => album.name === value
    );

    if (albumFound) {
      setSelectedAlbum(albumFound);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => closeDialog()}
      fullScreen={is585pxOrLess}
      BackdropComponent={Backdrop}
      classes={{ paper: style.paper }}
      BackdropProps={{
        timeout: 500,
        classes: { root: style.backdrop },
      }}
    >
      <Grid container>
        {/* Title */}
        <Grid item xs={12} style={{ marginBottom: 20, marginRight: 20 }}>
          <Text component="h1" color={Colors.BLUE}>
            Upload photos
          </Text>
          <Text color={Colors.GRAY_TEXT}>
            <b>For trip: </b>
            {trip.name}
          </Text>

          {/* Close dialog button */}
          <IconButton className={style.closeButton} onClick={() => closeDialog()}>
            <FontAwesomeIcon icon={faTimes} color={Colors.BLUE} />
          </IconButton>
        </Grid>

        {/* Album pane */}
        <Grid item className={style.albumPane}>
          {/* Album selector */}
          <>
            <Text component="h2" color={Colors.BLUE}>
              Album
            </Text>
            <Text component="h5" color={Colors.BLUE}>
              Select an album
            </Text>

            <FormControl className={style.sortFormControl}>
              <Select
                value={albumOption}
                variant="outlined"
                classes={{ icon: style.selectIcon }}
                className={style.select}
                onChange={(e) => onAlbumOptionChange(e.target.value as string)}
              >
                <MenuItem classes={{ root: style.menuItemSelect }} value="">
                  <em>None</em>
                </MenuItem>

                {albumOptions.map((option, i) => (
                  <MenuItem
                    key={i}
                    classes={{ root: style.menuItemSelect }}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>

          {/* Create new album */}
          <>
            <Text component="h5" style={{ marginTop: 20 }} color={Colors.BLUE}>
              Or create a new one
            </Text>

            <TextField
              value={newAlbumName}
              disabled={selectedAlbum !== undefined}
              variant="outlined"
              className={style.textfield}
              onChange={(e) => setNewAlbumName(e.target.value)}
              placeholder="Album name"
            />

            <ImageUploader
              images={[albumCover]}
              disabled={selectedAlbum !== undefined}
              onPictureUploadSucess={onAlbumCoverUploadSuccess}
              containerStyles={imageUploaderStyles}
              updateState={(values) => onAlbumCoverChange(values)}
            />
          </>
        </Grid>

        {/* Select photos pane */}
        <Grid item className={style.selectPhotosPane}>
          <Grid container style={{ height: "100%" }}>
            {/* Photo selection */}
            <Grid item className={style.photoSelectionGrid}>
              <Text component="h2" color={Colors.BLUE} style={{ marginBottom: 15 }}>
                Select photos
              </Text>
              <ImageUploader
                images={images}
                onPictureUploadSucess={onPictureUploadSucess}
                multiple
                containerStyles={imageUploaderStyles}
                updateState={(values) => setImages([...images, ...values])}
              />
            </Grid>

            {/* Save button */}
            <Grid item className={style.saveButtonGrid}>
              <CustomButton
                disabled={!areAllPicturesUploaded()}
                className={style.saveButton}
                onClick={() => saveAlbum()}
                backgroundColor={Colors.GREEN}
              >
                Save
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnack(false)}
          severity="success"
        >
          Album created
        </Alert>
      </Snackbar>
    </Dialog>
  );
});
